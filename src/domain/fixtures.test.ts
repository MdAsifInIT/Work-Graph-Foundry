import { describe, expect, it } from "vitest";
import { loadDemoFixtures, validateDemoFixtures } from "./fixtures";

describe("demo fixtures", () => {
  it("load a valid enterprise access request fixture set", () => {
    const fixtures = loadDemoFixtures();
    const result = validateDemoFixtures(fixtures);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.summary.rawTraceCount).toBeGreaterThanOrEqual(55);
    expect(result.summary.caseCount).toBe(13);
    expect(result.summary.policyRuleCount).toBeGreaterThanOrEqual(4);
  });

  it("include the channels needed to demonstrate messy work traces", () => {
    const fixtures = loadDemoFixtures();
    const result = validateDemoFixtures(fixtures);

    expect(result.summary.channelCounts.email).toBeGreaterThan(0);
    expect(result.summary.channelCounts.ticket).toBeGreaterThan(0);
    expect(result.summary.channelCounts.chat).toBeGreaterThan(0);
    expect(result.summary.channelCounts.approval_log).toBeGreaterThan(0);
    expect(result.summary.channelCounts.system_action).toBeGreaterThan(0);
  });

  it("include a new incoming request for execution phases", () => {
    const fixtures = loadDemoFixtures();

    expect(fixtures.newIncomingTrace.caseId).toBe("case-2001");
    expect(fixtures.newIncomingTrace.metadata.system).toBe("Salesforce");
    expect(fixtures.newIncomingTrace.body).toMatch(/No privileged role requested/i);
  });
});
