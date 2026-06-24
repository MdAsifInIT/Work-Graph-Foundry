import type { GraphEdge, GraphNode, NormalizedWorkItem, RiskLevel, ScenarioId, WorkGraph } from "./types";

type GraphNodeRole =
  | "requester"
  | "manager-approval"
  | "policy-check"
  | "system-action"
  | "audit-log"
  | "exception-review"
  | "outcome";

export function buildWorkGraph(items: NormalizedWorkItem[], scenarioId: ScenarioId, patternId: string): WorkGraph {
  const total = items.length || 1;
  const exceptionCount = items.filter((item) => item.exceptions.length > 0).length;
  const provisionedCount = items.filter((item) => item.status === "provisioned").length;
  const humanReviewCount = items.filter((item) => item.status === "needs_human").length;
  const nodeIds: Record<GraphNodeRole, string> = {
    requester: nodeId(scenarioId, patternId, "actor", "requester"),
    "manager-approval": nodeId(scenarioId, patternId, "approval", "manager-approval"),
    "policy-check": nodeId(scenarioId, patternId, "policy", "policy-check"),
    "system-action": nodeId(scenarioId, patternId, "system", "system-action"),
    "audit-log": nodeId(scenarioId, patternId, "action", "audit-log"),
    "exception-review": nodeId(scenarioId, patternId, "exception", "exception-review"),
    outcome: nodeId(scenarioId, patternId, "outcome", "outcome")
  };

  const nodes: GraphNode[] = [
    node(nodeIds.requester, "actor", "Requester", total, "low"),
    node(nodeIds["manager-approval"], "approval", "Manager approval", total, "medium"),
    node(nodeIds["policy-check"], "policy", "Policy check", total, exceptionCount ? "medium" : "low"),
    node(nodeIds["system-action"], "system", "System action", provisionedCount, "low"),
    node(nodeIds["audit-log"], "action", "Audit log", provisionedCount, "low"),
    node(nodeIds["exception-review"], "exception", "Exception review", humanReviewCount, humanReviewCount ? "high" : "low"),
    node(nodeIds.outcome, "outcome", "Outcome", total, exceptionCount ? "medium" : "low")
  ];

  const approvalDelayHours = average(
    items.map((item) => (item.approvedAt ? hoursBetween(item.submittedAt, item.approvedAt) : 0))
  );
  const averageCycleTimeHours = average(
    items.map((item) => hoursBetween(item.submittedAt, item.completedAt ?? item.approvedAt ?? item.submittedAt))
  );
  const exceptionRate = exceptionCount / total;

  const edges: GraphEdge[] = [
    edge(
      edgeId(scenarioId, patternId, "requester", "submits", "manager-approval"),
      nodeIds.requester,
      nodeIds["manager-approval"],
      "submits request",
      total,
      approvalDelayHours,
      0
    ),
    edge(
      edgeId(scenarioId, patternId, "manager-approval", "approval-received", "policy-check"),
      nodeIds["manager-approval"],
      nodeIds["policy-check"],
      "approval received",
      total,
      1.2,
      exceptionRate
    ),
    edge(
      edgeId(scenarioId, patternId, "policy-check", "eligible-action", "system-action"),
      nodeIds["policy-check"],
      nodeIds["system-action"],
      "eligible for action",
      provisionedCount,
      1.1,
      0
    ),
    edge(
      edgeId(scenarioId, patternId, "system-action", "audit-event", "audit-log"),
      nodeIds["system-action"],
      nodeIds["audit-log"],
      "write audit event",
      provisionedCount,
      0.2,
      0
    ),
    edge(
      edgeId(scenarioId, patternId, "policy-check", "human-review", "exception-review"),
      nodeIds["policy-check"],
      nodeIds["exception-review"],
      "requires human review",
      humanReviewCount,
      4.5,
      humanReviewCount / total
    ),
    edge(
      edgeId(scenarioId, patternId, "audit-log", "complete", "outcome"),
      nodeIds["audit-log"],
      nodeIds.outcome,
      "complete",
      provisionedCount,
      0.1,
      0
    ),
    edge(
      edgeId(scenarioId, patternId, "exception-review", "manual-decision", "outcome"),
      nodeIds["exception-review"],
      nodeIds.outcome,
      "manual decision",
      humanReviewCount,
      2.8,
      0
    )
  ];

  return {
    id: graphId(scenarioId, patternId),
    patternId,
    nodes,
    edges,
    metrics: {
      averageCycleTimeHours: round(averageCycleTimeHours),
      exceptionRate: round(exceptionRate),
      approvalDelayHours: round(approvalDelayHours)
    }
  };
}

function graphId(scenarioId: ScenarioId, patternId: string): string {
  return id("graph", scenarioId, patternId);
}

function nodeId(
  scenarioId: ScenarioId,
  patternId: string,
  kind: GraphNode["kind"],
  role: GraphNodeRole
): string {
  return id("node", scenarioId, patternId, kind, role);
}

function edgeId(
  scenarioId: ScenarioId,
  patternId: string,
  sourceRole: GraphNodeRole,
  relation: string,
  targetRole: GraphNodeRole
): string {
  return id("edge", scenarioId, patternId, sourceRole, relation, targetRole);
}

function id(...parts: string[]): string {
  return parts.join("-");
}

function node(id: string, kind: GraphNode["kind"], label: string, count: number, riskLevel: RiskLevel): GraphNode {
  return { id, kind, label, count, riskLevel };
}

function edge(
  id: string,
  source: string,
  target: string,
  label: string,
  count: number,
  averageDurationHours: number,
  exceptionRate: number
): GraphEdge {
  return {
    id,
    source,
    target,
    label,
    count,
    averageDurationHours: round(averageDurationHours),
    exceptionRate: round(exceptionRate)
  };
}

function average(values: number[]): number {
  const populated = values.filter((value) => Number.isFinite(value));

  if (!populated.length) {
    return 0;
  }

  return populated.reduce((sum, value) => sum + value, 0) / populated.length;
}

function hoursBetween(start: string, end: string): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
