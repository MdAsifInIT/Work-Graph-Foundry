import { expect, type Page, test } from "@playwright/test";

const DEMO_STORAGE_KEY = "work-graph-foundry.demo-state.v1";

type ScenarioExpectation = {
  id: "it-access" | "procurement-intake";
  label: string;
  graphTitle: string;
  patternLabel: string;
  mockOutput: string;
};

type StoredDemoState = {
  selectedScenarioId: string;
  sampleLoaded: boolean;
  analysisRequested: boolean;
  proposalRequested: boolean;
  governanceDecision: string;
  runRequested: boolean;
  proposals: unknown[];
  executionRuns: unknown[];
  recommendations: unknown[];
};

const scenarios: ScenarioExpectation[] = [
  {
    id: "it-access",
    label: "IT access requests",
    graphTitle: "IT access request flow",
    patternLabel: "Standard application access",
    mockOutput: "mock task IT-2001 created"
  },
  {
    id: "procurement-intake",
    label: "Procurement intake",
    graphTitle: "Procurement intake flow",
    patternLabel: "Software procurement intake",
    mockOutput: "mock task PR-4001 created"
  }
];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate((storageKey) => window.localStorage.removeItem(storageKey), DEMO_STORAGE_KEY);
  await page.reload();
});

for (const scenario of scenarios) {
  test(`runs the ${scenario.id} golden demo path and reset clears generated output`, async ({ page }) => {
    await runGoldenPath(page, scenario);

    const exported = await exportSummary(page);
    expect(exported.scenarioId).toBe(scenario.id);
    expect(exported.state.selectedScenarioId).toBe(scenario.id);
    expect(exported.state.proposals).toHaveLength(1);
    expect(exported.state.executionRuns).toHaveLength(1);

    await resetDemo(page, scenario);
  });
}

test("recovers a generated run after reload and restores seeded localStorage after reset", async ({ page }) => {
  const scenario = scenarios[0];

  await runGoldenPath(page, scenario);
  await expect(page.getByText(scenario.mockOutput)).toBeVisible();

  const savedRun = await readStoredDemoState(page);
  expect(savedRun.selectedScenarioId).toBe(scenario.id);
  expect(savedRun.proposalRequested).toBe(true);
  expect(savedRun.runRequested).toBe(true);
  expect(savedRun.executionRuns).toHaveLength(1);

  await page.reload();

  await expect(page.getByRole("heading", { name: "Enterprise Work Intelligence Console" })).toBeVisible();
  await expect(page.getByRole("heading", { name: scenario.graphTitle })).toBeVisible();
  await expect(page.getByRole("heading", { name: scenario.patternLabel })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance-gated workflow runner" })).toBeVisible();
  await expect(page.getByText(scenario.mockOutput)).toBeVisible();
  await expect(page.getByRole("button", { name: "Run safe mock execution" })).toBeEnabled();

  await resetDemo(page, scenario);

  const resetState = await readStoredDemoState(page);
  expect(resetState).toMatchObject({
    selectedScenarioId: scenario.id,
    sampleLoaded: false,
    analysisRequested: false,
    proposalRequested: false,
    governanceDecision: "pending",
    runRequested: false
  });
  expect(resetState.proposals).toHaveLength(0);
  expect(resetState.executionRuns).toHaveLength(0);
  expect(resetState.recommendations).toHaveLength(0);

  await page.reload();

  await expect(page.getByLabel("Operational summary").getByText(scenario.label, { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: scenario.graphTitle })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Governance-gated workflow runner" })).toHaveCount(0);
  await expect(page.getByText(scenario.mockOutput)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Run safe mock execution" })).toBeDisabled();
});

async function runGoldenPath(page: Page, scenario: ScenarioExpectation) {
  await page.getByLabel("Select demo scenario").selectOption(scenario.id);
  await expect(page.getByLabel("Operational summary").getByText(scenario.label, { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Load scenario" }).click();
  await expect(page.getByText("Raw traces")).toBeVisible();
  await expect(page.getByText("Cases")).toBeVisible();

  await page.getByRole("button", { name: "Analyze workflow" }).click();
  await expect(page.getByRole("heading", { name: scenario.graphTitle })).toBeVisible();
  await expect(page.getByRole("heading", { name: scenario.patternLabel })).toBeVisible();

  await page.getByRole("button", { name: "Generate automation proposal" }).click();
  await expect(page.getByRole("heading", { name: "Governed automation proposal" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governance-gated replay before execution" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Run safe mock execution" })).toBeDisabled();
  await expect(page.getByText("Blocked").first()).toBeVisible();

  await page.getByRole("button", { name: "Approve" }).click();
  await expect(page.getByText("Open").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Run safe mock execution" })).toBeEnabled();

  await page.getByRole("button", { name: "Run safe mock execution" }).click();
  await expect(page.getByRole("heading", { name: "Governance-gated workflow runner" })).toBeVisible();
  await expect(page.getByText(scenario.mockOutput)).toBeVisible();
}

async function exportSummary(page: Page) {
  await page.getByRole("button", { name: "Export Summary" }).click();

  const runSummary = page.getByRole("textbox", { name: "Run summary JSON", exact: true });
  await expect(runSummary).not.toHaveValue("");

  return JSON.parse(await runSummary.inputValue()) as {
    scenarioId: string;
    state: {
      selectedScenarioId: string;
      proposals: unknown[];
      executionRuns: unknown[];
    };
  };
}

async function resetDemo(page: Page, scenario: ScenarioExpectation) {
  await page.getByRole("button", { name: "Reset seeded demo state" }).click();

  await expect(page.getByLabel("Operational summary").getByText(scenario.label, { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: scenario.graphTitle })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Governed automation proposal" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Governance-gated workflow runner" })).toHaveCount(0);
  await expect(page.getByText(scenario.mockOutput)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Run safe mock execution" })).toBeDisabled();
}

async function readStoredDemoState(page: Page) {
  const handle = await page.waitForFunction((storageKey) => {
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      return undefined;
    }

    return JSON.parse(raw);
  }, DEMO_STORAGE_KEY);

  return handle.jsonValue() as Promise<StoredDemoState>;
}
