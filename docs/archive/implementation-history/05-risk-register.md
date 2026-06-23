# Risk Register

| ID | Category | Risk | Mitigation | Status |
| --- | --- | --- | --- | --- |
| R-001 | Technical | Repo has no app foundation, so setup may uncover local Node or package constraints. | Confirm tooling in Phase 02 and keep stack simple. | Mitigated |
| R-002 | Demo | Demo may feel like a static mock if logic is too shallow. | Implement deterministic end-to-end data transformations, simulation, governance, and execution state. | Open |
| R-003 | Product | Scope could sprawl into broad enterprise automation. | Keep MVP centered on IT access requests and document non-goals. | Open |
| R-004 | AI | Live model calls may fail or be unavailable. | Make mock provider default and OpenAI optional. | Open |
| R-005 | Security | Secrets could accidentally be committed. | Use env vars, `.env.example`, and never hardcode keys. | Open |
| R-006 | UX | Dashboard could become cluttered or unreadable. | Use dense but organized panels, responsive constraints, and visual verification. | Open |
| R-007 | Data | Fixtures may not feel realistic. | Seed multiple channels, departments, systems, timestamps, approvals, exceptions, and outcomes. | Open |
| R-008 | Governance | Automation may appear to bypass human review. | Require approval before execution and expose audit trail. | Open |
| R-009 | Testing | UI and logic may diverge late in implementation. | Test core modules separately and smoke-test the full demo path. | Open |
| R-010 | Time | Building all phases may exceed a single iteration. | Prioritize the golden demo path before optional polish. | Open |

## Current Highest Risks

1. Demo credibility depends on realistic data and visible logic, not decorative UI.
2. The dashboard must explain the product in the first viewport while staying operationally dense.
3. Optional OpenAI integration must not destabilize the local mock demo.

## Updates

- Phase 02 confirmed Node/npm availability, installed dependencies, and established a verified Vite/React/TypeScript foundation.
- Phase 12 verified the production browser artifact on desktop and mobile widths. Vite dev optimization can be sandbox-sensitive, but production build and preview/static artifact verification pass.
