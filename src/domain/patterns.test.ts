import { describe, expect, it } from "vitest";
import { loadDemoFixtures } from "./fixtures";
import { ingestWorkTraces } from "./ingestion";
import { detectWorkPatterns } from "./patterns";

describe("detectWorkPatterns", () => {
  it("detects repeated work patterns and ranks automation opportunities", () => {
    const fixtures = loadDemoFixtures();
    const ingestion = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const result = detectWorkPatterns(ingestion.items);

    expect(result.patterns.length).toBeGreaterThanOrEqual(4);
    expect(result.patterns[0].label).toBe("Standard application access");
    expect(result.patterns[0].volume).toBeGreaterThanOrEqual(6);
    expect(result.opportunities[0].score).toBe(result.patterns[0].opportunityScore);
  });

  it("surfaces manager approval as the access workflow bottleneck", () => {
    const fixtures = loadDemoFixtures();
    const ingestion = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const result = detectWorkPatterns(ingestion.items);
    const standardPattern = result.patterns.find((pattern) => pattern.id === "pattern-standard_access");
    const bottleneck = result.bottlenecks.find((item) => item.patternId === standardPattern?.id);

    expect(standardPattern?.bottleneck).toBe("Manager approval");
    expect(bottleneck?.averageDelayHours).toBeGreaterThan(24);
    expect(bottleneck?.evidence).toMatch(/waited at least 24 hours/i);
  });
});
