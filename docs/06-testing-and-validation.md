# 6. Testing And Validation

## 6.1 Unit Tests

Run:

```powershell
npm test
```

Current unit coverage includes:

- fixture validation
- ingestion and normalization
- graph generation
- pattern detection
- planner output
- simulation and governance
- execution and learning
- AI provider parsing

## 6.2 Integration Tests

The current test suite includes integration-style checks across domain modules.

Important examples:

- building a proposal from fixtures, ingestion, graph, patterns, and policies
- simulating that proposal against historical work items
- verifying governance blocks execution until approval
- verifying execution emits mock tool calls after approval

Future integration tests should cover:

- imported datasets
- server-side OpenAI provider route
- connector ingestion
- persisted proposal versions
- audit event retrieval

## 6.3 UI Smoke Tests

Current UI coverage lives in `src/App.test.tsx`.

It checks:

- dashboard first screen renders
- `Load Sample` reveals normalized evidence
- graph and proposal panels appear
- simulation and governance appear
- approval opens the execution gate
- `Run Case` shows mock tool output
- learning recommendation appears
- `Reset` clears run state

## 6.4 Agentic Verification Steps

When an agent validates this repo, it should perform these steps:

1. Read `README.md`.
2. Read numbered docs in `docs/`.
3. Run `rg --files` to inspect the repo.
4. Run `npm run typecheck`.
5. Run `npm test`.
6. Run `npm run build`.
7. Run `npm audit --audit-level=low`.
8. Start preview with `npm run preview`.
9. Open the app.
10. Click `Load Sample`.
11. Confirm graph, patterns, proposal, simulation, governance, execution, and learning panels render.
12. Click `Approve`.
13. Confirm execution gate is open.
14. Click `Run Case`.
15. Confirm mock tool calls and learning recommendation.
16. Click `Reset`.
17. Confirm run-specific state clears.
18. Check mobile width for horizontal overflow.

## 6.5 Full Verification Command Set

```powershell
npm run typecheck
npm test
npm run build
npm audit --audit-level=low
```

Expected current baseline:

- typecheck passes
- 9 test files pass
- 21 tests pass
- build passes
- audit reports 0 vulnerabilities

## 6.6 Test Map

| Behavior | Test File |
| --- | --- |
| Dashboard golden path | `src/App.test.tsx` |
| Provider behavior | `src/ai/providers.test.ts` |
| Fixture validation | `src/domain/fixtures.test.ts` |
| Ingestion | `src/domain/ingestion.test.ts` |
| Graph generation | `src/domain/graph.test.ts` |
| Pattern scoring | `src/domain/patterns.test.ts` |
| Proposal generation | `src/domain/planner.test.ts` |
| Simulation and governance | `src/domain/simulation.test.ts` |
| Execution and learning | `src/domain/execution.test.ts` |

## 6.7 Manual Browser Validation

Manual smoke path:

1. `npm run build`
2. `npm run preview`
3. Open preview URL.
4. Click `Load Sample`.
5. Confirm all major panels render.
6. Click `Approve`.
7. Confirm execution gate changes from `Blocked` to `Open`.
8. Click `Run Case`.
9. Confirm `provisioning task WGF-2001 created`.
10. Confirm learning recommendation mentions human-review lane.
11. Click `Reset`.
12. Confirm run output disappears.

## 6.8 Mobile Validation

At a mobile-width viewport:

- top controls should wrap cleanly
- script path should stack
- status cards should stack
- panels should not overflow horizontally
- text should not overlap
- golden path should remain usable

## 6.9 What To Test When Extending

For a new workflow:

- fixture validity
- normalization fields
- graph nodes and edges
- pattern ranking
- bottleneck evidence
- proposal rules
- simulation classifications
- approval gate
- execution behavior
- learning recommendation

For live OpenAI support:

- server route validation
- missing key behavior
- model failure fallback
- invalid structured output rejection
- successful structured output parsing

For enterprise connectors:

- connector auth failure
- empty sync
- partial sync
- malformed source records
- duplicate source records
- provenance preservation

## 6.10 Release Checklist

Before a release or push:

- docs updated
- README links current
- no secrets committed
- `.env.example` updated if env vars changed
- tests pass
- build passes
- audit clean
- manual golden path checked
- working tree clean
