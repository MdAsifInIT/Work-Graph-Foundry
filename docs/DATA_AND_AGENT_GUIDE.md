# Data And Agent Walkthrough

This guide explains the data model, seeded demo data, deterministic agent behavior, and how to safely extend Work Graph Foundry.

## What The Data Represents

The current MVP models an enterprise IT access request workflow. In a real organization, this work is scattered across systems:

- an employee sends an email
- a ticket is created
- a chat follow-up happens
- a manager approves
- IT provisions access
- an audit log is written

Work Graph Foundry turns those scattered traces into a coherent work item and process graph.

## Fixture Data

The demo data lives in `src/fixtures/demoData.ts`.

It includes:

- historical access request cases
- raw traces for each case
- policy rules
- approval history records
- one new incoming request for execution

The fixture data is intentionally realistic enough to support the full demo story:

- multiple departments
- multiple systems
- different urgency values
- standard and policy-sensitive requests
- manager approval delays
- exception paths
- provisioned and manual-review outcomes

## Raw Trace Contract

`RawWorkTrace` represents an observed signal before normalization.

Important fields:

- `id`: unique trace id
- `caseId`: groups traces into one work case
- `channel`: email, ticket, chat, approval log, or system action
- `occurredAt`: event timestamp
- `actor`: person or system responsible for the trace
- `participants`: people or teams involved
- `subject`: source-specific title
- `body`: source-specific content
- `metadata`: department, system, ticket id, region, severity

Raw traces are messy by design. They are the product's input, not the final operating model.

## Normalized Work Item Contract

`NormalizedWorkItem` is the canonical case object produced by ingestion.

Important fields:

- `requester`
- `requesterDepartment`
- `requestType`
- `urgency`
- `systems`
- `approver`
- `status`
- `submittedAt`
- `approvedAt`
- `completedAt`
- `policyFlags`
- `exceptions`
- `outcome`
- `sourceTraceIds`

This object is the bridge between messy enterprise traces and structured automation.

## Policy Data

`PolicyRule` describes governance constraints for request types.

Current policies cover:

- standard application access
- privileged access
- contractor access
- finance system access

Policies define:

- risk level
- whether human review is required
- escalation role
- request types they apply to

The planner and simulation modules use policy data to avoid unsafe automation.

## Agentic Behavior Model

The MVP represents agentic behavior as deterministic modules. This is deliberate. It makes the demo repeatable and makes the "AI" loop inspectable.

| Agent Role | Module | Responsibility |
| --- | --- | --- |
| Observer | `ingestion.ts` | Convert raw traces into normalized work items. |
| Mapper | `graph.ts` | Build process nodes, edges, and metrics. |
| Pattern analyst | `patterns.ts` | Detect repeated work and bottlenecks. |
| Planner | `planner.ts` | Generate governed automation proposals. |
| Simulator | `simulation.ts` | Replay historical cases against a proposal. |
| Governance reviewer | `governance.ts` | Track approval and audit events. |
| Executor | `execution.ts` | Run safe mock tool calls after approval. |
| Learner | `execution.ts` | Recommend improvements from signals. |

## Proposal Contract

`AutomationProposal` is the central AI-like output.

It contains:

- trigger
- required data
- eligibility rules
- policy checks
- actions
- escalations
- confidence
- risk level
- expected value
- audit rationale
- version

Any future live model output should match this contract before the UI accepts it.

## Simulation Contract

`SimulationResult` explains how the proposal would have behaved on historical cases.

Case statuses:

- `pass`: eligible for automation after approval.
- `fail`: missing required information.
- `needs_human`: policy or exception requires review.
- `policy_risk`: high-risk access must stay under human control.

Simulation exists to make governance credible. It shows what the automation will and will not do.

## Governance Contract

`GovernanceRecord` captures:

- proposal id
- reviewer role
- decision
- comments
- timestamp
- proposal version

Execution checks these records before running. A proposal must be approved at the correct version before mock tools are called.

## Execution Contract

`ExecutionRun` captures:

- proposal id
- incoming request trace id
- execution status
- mock tool calls
- audit trail

The current MVP never calls real enterprise tools. Tool calls are explicit mock records shown in the UI.

## Learning Contract

`LearningRecommendation` captures:

- signal source
- recommendation
- expected impact
- risk level
- suggested proposal change

The current recommendation is based on simulation and execution signals. For example, exception-heavy cases can be split into a human-review lane.

## Mock AI Provider

`MockAiProvider` is the default provider. It delegates to deterministic TypeScript logic.

Use mock behavior when:

- running local demos
- running tests
- building UI
- working without credentials
- presenting in unreliable network environments

## OpenAI Provider Boundary

`OpenAiResponsesProvider` is implemented as a boundary for trusted runtimes.

It is designed to:

- call the Responses API
- request structured JSON
- validate the response shape
- return an `AutomationProposal`

The current browser app does not use a live API key. A future server-side route should own the key and call this provider.

## How To Add A New Agent Output

1. Define the TypeScript contract in `src/domain/types.ts`.
2. Add deterministic fixture-backed behavior first.
3. Add tests for valid and invalid cases.
4. Add UI only after domain tests pass.
5. If using OpenAI, define structured output schema.
6. Validate model output before it reaches the dashboard.

## How To Add More Demo Data

1. Add raw traces with realistic channel variation.
2. Ensure every case has enough signals for normalization.
3. Add policy rules if new risk behavior exists.
4. Add approval history when approval is part of the process.
5. Run fixture validation tests.
6. Check that graph, pattern, and simulation outputs still make sense.

## Current Data Limitations

- Data is seeded for demo clarity, not scale.
- There is no persistence layer.
- There are no live connectors.
- Source text is realistic but not imported from real systems.
- The model does not yet learn over time; it produces a recommendation from deterministic signals.

These limitations are acceptable for the MVP and are called out in the roadmap.
