# Phase 02: Technical Foundation

## Objective

Create the app foundation for a local-first Work Graph Foundry demo.

## User-Facing Outcome

A developer can install dependencies, start the app, and see the initial dashboard shell locally.

## Implementation Tasks

- Scaffold a TypeScript/Vite/React application.
- Add package scripts for dev, build, preview, type check, and tests where practical.
- Add base styling and enterprise dashboard layout primitives.
- Add initial app shell with placeholder regions for the full demo workflow.
- Add README run instructions and environment variable notes.

## Files Likely To Change

- `package.json`
- `index.html`
- `src/`
- `vite.config.ts`
- `tsconfig*.json`
- `README.md`
- `.env.example`

## Data Contracts

No full contracts yet. Add only minimal placeholder types needed for app state if required.

## UI Requirements

- First viewport is dashboard-first, not a landing page.
- Layout supports dense panels, tables, badges, graph region, and audit-style content.
- Avoid decorative marketing composition.

## Agentic Behavior Covered

Foundation only; no product agent behavior yet.

## Acceptance Criteria

- Dependencies install.
- Dev server starts.
- Build or type check runs.
- Initial dashboard shell renders.
- README explains local run path.

## Verification Commands

```powershell
npm install
npm run dev
npm run build
npm run typecheck
npm test
```

If a script is intentionally unavailable early, document the reason and add it before Phase 12.

## Demo Checkpoint

Open the app locally and confirm the first screen is the operating dashboard shell.

## Risks And Mitigations

- Risk: local Node/npm is unavailable or outdated.
- Mitigation: inspect versions first and choose the simplest compatible scaffold.

## Completion Notes

Completed. Created the Vite 6/React/TypeScript foundation, base dashboard shell, README, `.env.example`, test setup, and package scripts. Initial verification found missing Vite CSS declarations, a config typing issue for Vitest, and later Vite 8/Vite 7 Windows build and audit instability from broad `latest` ranges. The stack is now pinned to Vite 6.4.3 with `--configLoader runner`. `npm run typecheck`, `npm test`, `npm run build`, and `npm audit --audit-level=low` pass.
