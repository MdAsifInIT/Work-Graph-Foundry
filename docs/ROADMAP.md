# Roadmap And Current State

This document explains where the project stands today and how to develop it further.

## Current MVP State

Work Graph Foundry is demo-ready as a local-first MVP.

Implemented:

- React dashboard-first product experience.
- IT access request fixture dataset.
- Fixture validation.
- Ingestion and normalization.
- Work graph generation.
- Pattern detection and bottleneck scoring.
- Governed automation proposal generation.
- Historical simulation.
- Governance approval and audit events.
- Safe mock execution.
- Learning-loop recommendation.
- Deterministic mock AI provider.
- Optional OpenAI Responses API provider boundary.
- Unit tests for domain modules and dashboard flow.

Not implemented yet:

- backend API
- database
- live enterprise connectors
- real provisioning
- user authentication
- role-based access control
- production deployment
- server-side OpenAI integration
- persistent audit storage

## Near-Term Improvements

### 1. Server-Side OpenAI API Layer

Add a small trusted server-side API that owns `OPENAI_API_KEY` and calls `OpenAiResponsesProvider`.

Deliverables:

- server route for proposal generation
- request and response validation
- safe fallback to mock provider
- tests with mocked OpenAI responses
- README setup notes

Why it matters:

This enables live model behavior without exposing secrets in browser code.

### 2. Interactive Graph View

Replace or enhance the structured graph panel with an interactive graph.

Deliverables:

- selectable nodes
- edge detail panel
- highlighted bottleneck path
- exception path styling
- mobile fallback table

Why it matters:

The graph is the product's strongest visual metaphor. Interactivity would make the process map easier to inspect.

### 3. Dataset Import And Export

Allow demo operators to load and save fixture sets.

Deliverables:

- JSON import
- validation error report
- export current scenario
- sample fixture templates

Why it matters:

This makes the product easier to adapt for procurement, onboarding, finance, or customer support workflows.

### 4. Proposal Versioning

Persist proposal versions and governance decisions.

Deliverables:

- proposal history
- revision comments
- approval state by version
- audit timeline

Why it matters:

Governed automation requires traceability over time.

### 5. Browser Smoke Tests

Add automated browser-level tests for the golden path.

Deliverables:

- load sample
- approve
- run case
- reset
- desktop/mobile assertions
- no horizontal overflow check

Why it matters:

The current unit tests cover logic well. Browser tests would guard layout and interaction regressions.

## Workflow Expansion Roadmap

### Procurement

Potential workflow:

- vendor request
- finance review
- legal review
- compliance screening
- approval threshold
- purchase order creation

Good demo value:

- policy-heavy
- clear approval paths
- strong governance story

### Employee Onboarding

Potential workflow:

- HR trigger
- IT access
- device provisioning
- payroll setup
- facilities task
- security training

Good demo value:

- cross-functional graph
- many systems
- visible orchestration

### Finance Exceptions

Potential workflow:

- invoice exception
- missing purchase order
- manager review
- finance approval
- audit note

Good demo value:

- measurable delays
- risk and policy checks
- high audit relevance

## Productionization Path

A production product should add these layers in order:

1. Server-side API and secret management.
2. Persistent storage for traces, normalized items, graphs, proposals, simulations, approvals, audit events, and execution runs.
3. Authentication and role-based access control.
4. Enterprise connectors for ticketing, email, chat, identity, and provisioning systems.
5. Connector ingestion workers and scheduled sync.
6. Tool execution allowlists and approval policies.
7. Observability for model calls, connector failures, simulation drift, overrides, and execution failures.
8. Deployment configuration.

## Data Model Expansion

Future data model additions:

- organizations and teams
- users and roles
- connector accounts
- source system metadata
- process graph versions
- proposal versions
- simulation run history
- execution tool registry
- policy catalog versions
- learning feedback records

## Security And Governance Roadmap

Security work should focus on:

- never exposing secrets to browser code
- storing audit events immutably
- approving tool execution by proposal version
- limiting real tool actions to allowlisted operations
- logging all model inputs and outputs that influence automation
- separating low-risk automation from human-review paths

## Testing Roadmap

Current tests are unit and component tests. Add:

- browser smoke tests
- fixture schema tests for imported datasets
- accessibility checks
- provider fallback tests
- regression tests for new workflows
- contract tests for server routes once added

## Definition Of Demo Ready

The MVP remains demo-ready when:

- it runs without API keys
- the golden path completes in under five minutes
- typecheck, tests, build, and audit pass
- dashboard panels do not overlap on desktop or mobile
- governance blocks execution before approval
- mock execution remains safe and auditable

## Non-Goals For The MVP

- real enterprise provisioning
- production connector authentication
- multi-tenant security
- deployment automation
- exposing OpenAI credentials in browser code
