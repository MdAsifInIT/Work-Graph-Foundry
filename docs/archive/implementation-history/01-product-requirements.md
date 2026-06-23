# Product Requirements

## Product Summary

Work Graph Foundry is an AI-native operating layer for enterprise work. It observes messy work traces across channels, turns them into normalized work items, discovers repeated work patterns, builds live work graphs, proposes governed automations, simulates those automations against history, and improves from operational feedback.

## Target Users

- Operations leaders who need visibility into hidden manual workflows.
- IT process owners responsible for access management and service delivery.
- Compliance and risk reviewers who need auditable automation decisions.
- Automation teams looking for high-value repeatable processes.
- Demo judges evaluating agentic enterprise software.

## Enterprise Problem

Enterprise work is fragmented across email, chat, tickets, approvals, documents, and system logs. Teams often automate only after a human has manually mapped the process. Work Graph Foundry demonstrates a stronger loop: observe the real work first, infer the process, reason about bottlenecks and risk, and generate automation under governance.

## MVP Use Case

The MVP uses IT access requests:

- Employees request access through messy email, ticket, and chat traces.
- The system extracts requester, department, target system, urgency, approver, policy flags, timestamps, exceptions, and outcome.
- Repeated access-request patterns are clustered.
- The selected cluster produces a work graph and bottleneck insights.
- The system proposes a governed automation for low-risk requests.
- The proposal is simulated, approved, executed on a new request, and improved.

## User Stories

- As an operations leader, I can load sample work traces and immediately see discovered work patterns.
- As an IT process owner, I can inspect a selected access-request graph and understand where work gets delayed.
- As a compliance reviewer, I can inspect policy checks, exceptions, simulation outcomes, and approval history before automation is enabled.
- As an automation owner, I can approve a proposed workflow and run it on a new request using safe mock tools.
- As a demo presenter, I can reset and replay the demo path without external dependencies.

## Acceptance Criteria

- The first screen is a dense operating dashboard with pattern clusters, graph, insights, proposal, simulation, governance, execution, and learning-loop panels.
- The demo path is clear without a long verbal explanation.
- Every AI-like output has a typed contract.
- The app works without `OPENAI_API_KEY`.
- Governance and audit state are visible, not hidden behind a chatbot interaction.
- The app uses realistic enterprise data and avoids toy placeholders.

## Non-Goals

- Production enterprise connector authentication.
- Real provisioning against enterprise systems.
- Multi-tenant security implementation.
- Full RBAC administration.
- Long-running background jobs.
- Deployment automation.

