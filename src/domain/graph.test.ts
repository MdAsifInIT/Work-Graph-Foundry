import { describe, expect, it } from "vitest";
import { loadDemoFixtures, loadDemoScenario } from "./fixtures";
import { buildWorkGraph } from "./graph";
import { ingestWorkTraces } from "./ingestion";
import { detectWorkPatterns } from "./patterns";
import type { ScenarioId, WorkGraph } from "./types";

describe("buildWorkGraph", () => {
  it("builds the access request graph from normalized items", () => {
    const fixtures = loadDemoFixtures();
    const ingestion = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const detection = detectWorkPatterns(ingestion.items);
    const topPattern = detection.patterns[0];

    if (!topPattern) {
      throw new Error("Expected a top pattern");
    }

    const graph = buildWorkGraph(ingestion.items, "it-access", topPattern.id);

    expect(graph.nodes.map((node) => node.label)).toEqual([
      "Requester",
      "Manager approval",
      "Policy check",
      "System action",
      "Audit log",
      "Exception review",
      "Outcome"
    ]);
    expect(graph.edges).toHaveLength(7);
    expect(graph.nodes.map((node) => [node.kind, node.count, node.riskLevel])).toEqual([
      ["actor", 13, "low"],
      ["approval", 13, "medium"],
      ["policy", 13, "medium"],
      ["system", 9, "low"],
      ["action", 9, "low"],
      ["exception", 4, "high"],
      ["outcome", 13, "medium"]
    ]);
    expect(graph.metrics).toEqual({
      averageCycleTimeHours: 63.35,
      exceptionRate: 0.38,
      approvalDelayHours: 62.72
    });
  });

  it("separates provisioned and exception review paths", () => {
    const fixtures = loadDemoFixtures();
    const ingestion = ingestWorkTraces(fixtures.rawTraces, fixtures.approvalHistory);
    const detection = detectWorkPatterns(ingestion.items);
    const topPattern = detection.patterns[0];

    if (!topPattern) {
      throw new Error("Expected a top pattern");
    }

    const graph = buildWorkGraph(ingestion.items, "it-access", topPattern.id);

    const provisioning = graph.edges.find(
      (edge) => edge.id === "edge-it-access-pattern-standard_access-policy-check-eligible-action-system-action"
    );
    const exception = graph.edges.find(
      (edge) => edge.id === "edge-it-access-pattern-standard_access-policy-check-human-review-exception-review"
    );

    expect(provisioning?.count).toBeGreaterThan(exception?.count ?? 0);
    expect(exception?.exceptionRate).toBeGreaterThan(0);
  });

  it("builds deterministic ids across repeated builds", () => {
    const first = buildScenarioGraph("it-access", "pattern-standard_access");
    const second = buildScenarioGraph("it-access", "pattern-standard_access");

    expect(graphIdentity(first)).toEqual(graphIdentity(second));
  });

  it("does not reuse node or edge ids between IT access and procurement graphs", () => {
    const itAccess = buildScenarioGraph("it-access", "pattern-standard_access");
    const procurement = buildScenarioGraph("procurement-intake", "pattern-software_procurement");
    const itElementIds = new Set([...itAccess.nodes.map((node) => node.id), ...itAccess.edges.map((edge) => edge.id)]);
    const procurementElementIds = [
      ...procurement.nodes.map((node) => node.id),
      ...procurement.edges.map((edge) => edge.id)
    ];

    expect(procurementElementIds.filter((id) => itElementIds.has(id))).toEqual([]);
  });

  it("uses expected scenario-scoped graph, node, and edge ids", () => {
    const itAccess = buildScenarioGraph("it-access", "pattern-standard_access");
    const procurement = buildScenarioGraph("procurement-intake", "pattern-software_procurement");

    expect(itAccess.id).toBe("graph-it-access-pattern-standard_access");
    expect(itAccess.patternId).toBe("pattern-standard_access");
    expect(itAccess.nodes.map((node) => node.id)).toContain("node-it-access-pattern-standard_access-actor-requester");
    expect(itAccess.edges.map((edge) => edge.id)).toContain(
      "edge-it-access-pattern-standard_access-requester-submits-manager-approval"
    );

    expect(procurement.id).toBe("graph-procurement-intake-pattern-software_procurement");
    expect(procurement.patternId).toBe("pattern-software_procurement");
    expect(procurement.nodes.map((node) => node.id)).toContain(
      "node-procurement-intake-pattern-software_procurement-approval-manager-approval"
    );
    expect(procurement.edges.map((edge) => edge.id)).toContain(
      "edge-procurement-intake-pattern-software_procurement-policy-check-human-review-exception-review"
    );
  });

  it("keeps procurement graph counts and metrics unchanged", () => {
    const graph = buildScenarioGraph("procurement-intake", "pattern-software_procurement");

    expect(graph.nodes).toHaveLength(7);
    expect(graph.edges).toHaveLength(7);
    expect(graph.nodes.map((node) => [node.kind, node.count, node.riskLevel])).toEqual([
      ["actor", 10, "low"],
      ["approval", 10, "medium"],
      ["policy", 10, "medium"],
      ["system", 6, "low"],
      ["action", 6, "low"],
      ["exception", 4, "high"],
      ["outcome", 10, "medium"]
    ]);
    expect(graph.metrics).toEqual({
      averageCycleTimeHours: 66.13,
      exceptionRate: 0.4,
      approvalDelayHours: 65.41
    });
  });
});

function buildScenarioGraph(scenarioId: ScenarioId, patternId: string): WorkGraph {
  const scenario = loadDemoScenario(scenarioId);
  const ingestion = ingestWorkTraces(scenario.fixtures.rawTraces, scenario.fixtures.approvalHistory);
  const pattern = detectWorkPatterns(ingestion.items).patterns.find((item) => item.id === patternId);

  if (!pattern) {
    throw new Error(`Expected pattern: ${patternId}`);
  }

  return buildWorkGraph(ingestion.items, scenarioId, pattern.id);
}

function graphIdentity(graph: WorkGraph) {
  return {
    id: graph.id,
    nodeIds: graph.nodes.map((node) => node.id),
    edgeIds: graph.edges.map((edge) => edge.id)
  };
}
