# Data And Agent Design

## Core Data Contracts

The implementation should define TypeScript types for these concepts:

- `RawWorkTrace`: source channel, raw text, timestamps, participants, attachments, and source metadata.
- `NormalizedWorkItem`: requester, department, request type, target systems, urgency, approver, status, timestamps, policy flags, exceptions, outcome, and source trace ids.
- `WorkPattern`: cluster id, label, volume, repeatability score, representative items, bottlenecks, risks, and opportunity score.
- `WorkGraph`: nodes, edges, selected pattern id, graph metrics, and highlighted path.
- `GraphNode`: actor, system, policy, approval, action, exception, or outcome.
- `GraphEdge`: source, target, transition label, count, average duration, and exception rate.
- `AutomationProposal`: trigger, required data, eligibility rules, policy checks, actions, escalations, confidence, risk, expected value, and audit rationale.
- `SimulationResult`: case-level result, aggregate results, policy risks, human-review cases, avoided delay, and failure reasons.
- `GovernanceRecord`: reviewer role, decision, comments, timestamp, proposal version, and audit event ids.
- `ExecutionRun`: incoming request, workflow version, mock tool calls, status, audit trail, and outcome.
- `LearningRecommendation`: signal source, recommendation, expected impact, risk, and suggested proposal change.

## Agent Responsibilities

- Observer agent: Classifies raw traces and extracts structured work item fields.
- Pattern agent: Groups similar work and names the discovered process.
- Graph agent: Builds a human-readable work graph from normalized items.
- Insight agent: Reasons about bottlenecks, risk, and automation value.
- Planner agent: Creates governed automation specs.
- Simulation agent: Replays historical cases against the proposal.
- Governance agent: Explains policy risk and records review state.
- Execution agent: Executes approved workflow steps through mock tools.
- Learning agent: Converts failures and overrides into improvement recommendations.

## Prompt Contracts

Any live OpenAI call must request structured JSON matching the TypeScript contract for the target output. Prompt text should include:

- Task role and scope.
- Input object schema.
- Required output schema.
- Governance constraints.
- Instruction to surface uncertainty and escalation needs.
- Instruction not to invent unavailable integrations or secrets.

## Structured Output Examples

Example proposal shape:

```json
{
  "id": "proposal-access-standard-v1",
  "patternId": "pattern-it-access-standard",
  "trigger": "New low-risk application access request",
  "eligibilityRules": ["requester has active employee status", "manager approval exists", "system is in approved catalog"],
  "actions": ["validate policy", "create provisioning task", "write audit log"],
  "escalations": ["privileged access", "missing manager", "policy exception"],
  "confidence": 0.86,
  "riskLevel": "medium",
  "auditRationale": "Historical cases show repeatable approval and provisioning path with manager approval bottleneck."
}
```

## Mock Vs Real OpenAI Behavior

- Mock provider: deterministic classification, clustering, proposal generation, simulation labels, and learning recommendations from fixture data.
- OpenAI provider: optional Responses API provider boundary for selected agent steps when an API key is injected from a trusted runtime.
- Fallback: if OpenAI is unavailable, invalid, or returns invalid structured output, use the mock provider and show a non-blocking provider status.

## Safety And Governance Rules

- Never execute automation unless a proposal is approved.
- Never call real enterprise tools in the MVP.
- Never commit secrets.
- Show uncertainty, policy exceptions, and human-review cases.
- Maintain an audit trail for proposal, simulation, approval, execution, and learning events.
