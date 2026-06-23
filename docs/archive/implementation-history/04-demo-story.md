# Demo Story

## Demo Setup

Run the local app, open the dashboard, and use the seeded IT access request scenario. The app should work without a network connection after dependencies are installed.

## Presenter Script

1. "We start with messy enterprise work traces, not a predefined workflow."
2. Load the IT access request sample data.
3. Show discovered repeated patterns and select the main access-request cluster.
4. Open the work graph and point out requester, manager approval, policy check, IT provisioning, audit log, and exception path.
5. Show the bottleneck insight: manager approval is delaying most cases.
6. Open the automation proposal and show trigger, rules, actions, escalations, confidence, risk, and audit rationale.
7. Run simulation against historical cases and show pass, needs-human, and policy-risk outcomes.
8. Approve the proposal as the process owner or compliance reviewer.
9. Run the approved workflow against a new incoming request.
10. Show audit trail and learning recommendation.

## Screens To Show

- Operating dashboard with work pattern clusters.
- Work graph panel with selected access-request process.
- Bottleneck and automation opportunity insight.
- Governed automation proposal.
- Simulation results summary and case table.
- Governance approval panel with reviewer comments.
- Execution timeline for new request.
- Learning-loop recommendation panel.

## Expected User Actions

- Load sample data.
- Select the access-request cluster.
- Generate or inspect automation proposal.
- Run simulation.
- Approve proposal.
- Run new request.
- Review learning recommendation.
- Reset demo if needed.

## Scripted In-App Path

The dashboard shows the path as: load traces, discover pattern, inspect graph, simulate, approve, run case, improve.

## Value Metrics

- Historical replay pass, needs-human, and policy-risk counts.
- Avoided delay hours from cases that can pass the governed workflow.
- Execution gate state before and after approval.
- Learning recommendation after the new request run.

## Value Moments

- The system discovers the process from traces instead of asking the user to draw it.
- The work graph makes invisible coordination visible.
- The proposal is governed, typed, and auditable.
- Simulation makes automation review credible before execution.
- The approved workflow reduces manual coordination while escalating risky cases.
- The learning loop shows improvement after the first execution.

## Fallback Plan

If live OpenAI is unavailable, use deterministic mock agents. The presenter should call this out as deliberate demo hardening: the architecture supports live model calls, but the demo remains reliable without external services.
