# Phase 09: Operator Dashboard

## Objective

Build the complete dashboard-first product experience.

## User-Facing Outcome

Users can run the full Work Graph Foundry workflow from one enterprise-grade operating dashboard.

## Implementation Tasks

- Compose dashboard panels for ingestion, patterns, graph, insights, proposal, simulation, governance, execution, and learning.
- Add scenario state management for the golden demo path.
- Add responsive desktop and mobile layouts.
- Add empty, loading, warning, and completed states.
- Verify visual layout in browser.

## Files Likely To Change

- `src/App*`
- `src/components/`
- `src/styles*`
- `src/state*`

## Data Contracts

Uses contracts from Phases 03-08. May add `DemoState` and `DashboardViewModel`.

## UI Requirements

- Enterprise-grade: quiet, dense, organized, credible.
- No landing page, decorative blobs, or generic chatbot-first UI.
- First viewport shows product capability and demo controls.
- Text must fit in panels and controls on desktop and mobile.

## Agentic Behavior Covered

Observe, understand, map, reason, plan, simulate, govern, execute, and improve are visible in one workflow.

## Acceptance Criteria

- Full demo path is usable from the UI.
- Layout works at desktop and mobile widths.
- Important states are visible and understandable.
- No broken or overlapping content in checked viewports.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
npm run dev
```

## Demo Checkpoint

Complete the golden path from sample load through learning recommendation in the browser.

## Risks And Mitigations

- Risk: dashboard becomes visually crowded.
- Mitigation: prioritize the selected process and use compact, scannable panels with clear hierarchy.

## Completion Notes

Completed. Dashboard now supports sample loading, normalization evidence, graph view, pattern list, bottleneck insight, automation proposal, simulation, governance approval, new-request execution, mock tool call display, and learning recommendation. Added execution and learning domain logic with tests. `npm run typecheck`, `npm test`, and `npm run build` pass.
