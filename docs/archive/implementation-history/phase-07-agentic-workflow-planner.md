# Phase 07: Agentic Workflow Planner

## Objective

Generate governed automation proposals for selected work patterns.

## User-Facing Outcome

Users can inspect a credible automation plan with triggers, rules, actions, escalations, confidence, risk, expected value, and audit rationale.

## Implementation Tasks

- Implement `AutomationProposal` contract.
- Build deterministic mock planner from pattern, graph, policy, and insight inputs.
- Include eligibility rules and escalation paths.
- Add confidence, risk, and expected impact scoring.
- Add proposal UI.
- Prepare provider boundary for optional OpenAI planner.
- Add tests for proposal generation and policy-sensitive cases.

## Files Likely To Change

- `src/domain/planner*`
- `src/ai/`
- `src/components/proposal*`

## Data Contracts

- `AutomationProposal`
- `AutomationRule`
- `AutomationAction`
- `EscalationPath`
- `ProposalRisk`

## UI Requirements

Proposal panel must show structured sections, not freeform chatbot output. It must make human review and policy exceptions obvious.

## Agentic Behavior Covered

Reason and plan.

## Acceptance Criteria

- Proposal is deterministic without live OpenAI.
- Proposal never recommends automating high-risk exceptions without human review.
- Proposal includes audit rationale and expected value.
- Provider abstraction can support live OpenAI later.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Generate or open the proposed access-request automation and show eligibility rules plus escalation paths.

## Risks And Mitigations

- Risk: proposal feels vague.
- Mitigation: use explicit rules, actions, inputs, risks, and audit rationale.

## Completion Notes

Completed. Added deterministic governed automation proposal generation from selected pattern, graph, policy rules, bottleneck, and opportunity inputs. Proposal includes trigger, required data, eligibility rules, policy checks, actions, escalations, confidence, risk, expected value, audit rationale, and version. Added proposal dashboard panel and planner tests. `npm run typecheck`, `npm test`, and `npm run build` pass.
