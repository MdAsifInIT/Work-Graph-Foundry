# Phase 01: Product Scope

## Objective

Convert the product concept into clear MVP requirements, success criteria, and demo narrative.

## User-Facing Outcome

The product direction is locked around an enterprise-grade IT access request workflow that demonstrates observe, understand, map, reason, plan, simulate, govern, execute, and improve.

## Implementation Tasks

- Define target users.
- Select the MVP workflow.
- Write user journeys and acceptance criteria.
- Define non-goals.
- Describe the end-to-end demo story.

## Files Likely To Change

- `docs/implementation/01-product-requirements.md`
- `docs/implementation/04-demo-story.md`
- `docs/implementation/06-progress-tracker.md`
- `docs/implementation/phases/phase-01-product-scope.md`

## Data Contracts

Contract names are identified but not implemented: raw traces, normalized items, patterns, graph, proposal, simulation, governance, execution, and learning.

## UI Requirements

The first screen must be the operating dashboard. It must show pattern clusters, graph, insights, proposal, simulation, governance state, demo controls, execution, and learning loop.

## Agentic Behavior Covered

Defines the complete agentic loop expected from the product.

## Acceptance Criteria

- MVP use case is selected.
- Product success criteria are documented.
- Demo story is clear.
- Non-goals constrain scope.

## Verification Commands

```powershell
Get-Content -Raw .\docs\implementation\01-product-requirements.md
Get-Content -Raw .\docs\implementation\04-demo-story.md
```

## Demo Checkpoint

Presenter can explain the future demo path from the docs alone.

## Risks And Mitigations

- Risk: product scope becomes too broad.
- Mitigation: keep the golden path centered on IT access requests and move broad connector ambitions to extension points.

## Completion Notes

Completed for planning. The MVP workflow is IT access requests.

