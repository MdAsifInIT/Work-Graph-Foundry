# Phase 11: Demo Experience

## Objective

Polish the end-to-end demo so it is reliable, clear, and presenter-friendly.

## User-Facing Outcome

A presenter can run a crisp five-minute enterprise demo showing the full agentic loop.

## Implementation Tasks

- Add one-click sample load.
- Add demo reset.
- Add seeded scenario and deterministic sequence.
- Add visible before/after value metrics.
- Add presenter notes or demo script in docs.
- Add polished empty and completed states.
- Verify the golden path in browser.

## Files Likely To Change

- `src/demo*`
- `src/components/`
- `docs/implementation/04-demo-story.md`
- `README.md`

## Data Contracts

- `DemoScenario`
- `DemoStep`
- `DemoMetric`

## UI Requirements

Demo controls must be easy to find but not dominate the dashboard. The product must still feel like a real operating tool.

## Agentic Behavior Covered

Full observe-to-improve loop.

## Acceptance Criteria

- Demo can be completed in under five minutes.
- Reset returns the app to known state.
- Value metrics are visible.
- Presenter script matches the actual UI.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
npm run dev
```

## Demo Checkpoint

Run the full scripted demo twice from reset without manual data fixes.

## Risks And Mitigations

- Risk: demo requires too much narration.
- Mitigation: make each step and value moment visible in the UI.

## Completion Notes

Completed. Added scripted in-app demo path, reset control, avoided-delay value metric, README demo path, and updated demo story documentation. The dashboard can replay sample load, proposal review, simulation, approval, run case, learning recommendation, and reset. `npm run typecheck`, `npm test`, and `npm run build` pass.
