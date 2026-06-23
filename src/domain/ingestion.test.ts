import { describe, expect, it } from "vitest";
import { loadDemoFixtures } from "./fixtures";
import { ingestWorkTraces } from "./ingestion";

describe("ingestWorkTraces", () => {
  it("normalizes raw traces into canonical work items", () => {
    const fixtures = loadDemoFixtures();
    const result = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);

    expect(result.items).toHaveLength(13);
    expect(result.summary.rawTraceCount).toBeGreaterThanOrEqual(55);
    expect(result.summary.normalizedItemCount).toBe(13);
    expect(result.summary.sourceCounts.email).toBe(13);
    expect(result.summary.systemCounts.Salesforce).toBeGreaterThanOrEqual(3);
    expect(result.issues).toEqual([]);
  });

  it("preserves policy exceptions for human review", () => {
    const fixtures = loadDemoFixtures();
    const result = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const privileged = result.items.find((item) => item.caseId === "case-1004");

    expect(privileged?.requestType).toBe("privileged_access");
    expect(privileged?.status).toBe("needs_human");
    expect(privileged?.policyFlags).toContain("security_review_required");
    expect(privileged?.policyFlags).toContain("exception_review_required");
  });

  it("links normalized items back to source traces", () => {
    const fixtures = loadDemoFixtures();
    const result = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const first = result.items[0];

    expect(first.sourceTraceIds.length).toBeGreaterThanOrEqual(4);
    expect(first.submittedAt).toBe("2026-05-01T09:14:00Z");
    expect(first.approver).toBe("Ari Patel");
  });
});
