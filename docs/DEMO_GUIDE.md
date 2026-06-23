# Demo Guide

## Setup

```powershell
npm install
npm run dev
```

Fallback:

```powershell
npm run build
npm run preview
```

## Presenter Path

1. Open the dashboard.
2. Click `Load Sample`.
3. Show the raw trace transformed into a normalized work item.
4. Show the IT access request graph.
5. Show repeated workflow detection and manager approval delay.
6. Show the governed automation proposal.
7. Show simulation outcomes: pass, needs-human, policy-risk, avoided delay.
8. Click `Approve`.
9. Click `Run Case`.
10. Show mock tool calls and the learning-loop recommendation.
11. Click `Reset` to demonstrate replayability.

## Value Moments

- The system discovers a workflow from traces instead of asking the user to draw one.
- The graph makes hidden coordination visible.
- The proposal includes policy checks and escalation paths, not vague AI text.
- Simulation tests the automation before execution.
- Governance blocks execution until approval.
- Execution uses safe mock tools.
- Learning recommends a future improvement from observed signals.

## Fallback Talk Track

If live OpenAI is unavailable, say:

"The demo uses deterministic mock agents by default so the governed work loop is reliable. The code includes a structured OpenAI Responses API provider boundary for trusted server-side integration."

## Acceptance Checklist

- No API key required.
- Demo completes in under five minutes.
- Reset works.
- No broken panels in the golden path.
- Simulation and approval are visible before execution.
