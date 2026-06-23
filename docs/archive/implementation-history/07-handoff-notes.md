# Handoff Notes

## What Was Built

Work Graph Foundry is now a local-first Vite/React/TypeScript demo for enterprise work intelligence and governed automation. The implemented IT access request flow supports:

- Loading realistic multi-channel work traces.
- Normalizing traces into typed work items.
- Building a work graph with approval, policy, provisioning, audit, exception, and outcome nodes.
- Detecting repeated work patterns and manager approval bottlenecks.
- Generating a governed automation proposal.
- Simulating the proposal against historical cases.
- Approving the proposal with audit records.
- Running an approved new request through safe mock tools.
- Producing a learning-loop recommendation.
- Resetting and replaying the demo.

## How To Run

```powershell
npm install
npm run dev
```

If Vite dev dependency optimization is blocked by the local sandbox, use the production artifact path:

```powershell
npm run build
npm run preview
```

## Demo Path

1. Click `Load Sample`.
2. Review normalized evidence, graph, pattern, bottleneck, and proposal panels.
3. Review historical simulation and execution gate state.
4. Click `Approve`.
5. Click `Run Case`.
6. Review mock tool calls and learning-loop recommendation.
7. Click `Reset` to replay.

## Verification Completed

- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm audit --audit-level=low`
- Browser smoke test on production static artifact at desktop and mobile widths.

## Known Limitations

- Live enterprise connectors are mocked with local fixtures.
- Real provisioning tools are intentionally replaced by safe mock tool calls.
- OpenAI integration is implemented as a provider boundary; browser demo defaults to mock mode to avoid exposing API keys.
- Data is seeded for demo clarity rather than production scale.

## Recommended Next Improvements

- Add a small server-side API wrapper for live OpenAI calls.
- Add a richer graph visualization with node selection and edge details.
- Add import/export for trace fixture sets.
- Add persisted demo state and proposal versions.
