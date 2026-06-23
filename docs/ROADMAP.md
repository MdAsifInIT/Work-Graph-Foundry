# Roadmap

## Current MVP

- Local-first React dashboard.
- IT access request fixture set.
- Typed ingestion, normalization, graph, pattern, planner, simulation, governance, execution, and learning modules.
- Deterministic mock AI provider.
- Optional OpenAI provider boundary.
- Safe mock execution tools.

## Next Improvements

1. Add a server-side API layer for live OpenAI calls.
2. Add richer graph visualization with selectable nodes and edge details.
3. Add import/export for trace datasets.
4. Add persistent proposal versions and saved demo runs.
5. Add more workflows such as procurement, onboarding, or finance exceptions.
6. Add accessibility and keyboard-flow refinements.
7. Add browser-based smoke tests for the full demo path.

## Productionization Path

- Replace fixtures with authenticated enterprise connectors.
- Add storage for work traces, proposals, approvals, and audit logs.
- Add role-based access control.
- Add secure tool execution with allowlisted enterprise actions.
- Add observability for model calls, simulation drift, overrides, and execution failures.
- Add deployment configuration and secret management.

## Non-Goals For Current MVP

- Real enterprise provisioning.
- Production connector auth.
- Multi-tenant controls.
- Deployment automation.
- Exposing OpenAI credentials to browser code.
