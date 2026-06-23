# Phase 04: Work Ingestion

## Objective

Build ingestion and normalization from raw work traces into canonical work items.

## User-Facing Outcome

Users can load messy traces and see that the system has observed and normalized real work signals.

## Implementation Tasks

- Implement fixture import.
- Normalize raw trace text and metadata into typed work items.
- Validate required fields and surface incomplete or ambiguous traces.
- Produce ingestion summary metrics.
- Add dashboard panel or logs for source coverage and normalization status.
- Add tests for happy path, missing fields, multi-channel duplicates, and exceptions.

## Files Likely To Change

- `src/domain/ingestion*`
- `src/domain/normalization*`
- `src/data/`
- `src/components/`

## Data Contracts

- `RawWorkTrace`
- `NormalizedWorkItem`
- `IngestionSummary`
- `NormalizationIssue`

## UI Requirements

Show loaded trace count, normalized item count, source channels, warnings, and representative raw-to-normalized example.

## Agentic Behavior Covered

Observe.

## Acceptance Criteria

- Raw fixture traces load deterministically.
- Normalized items include requester, department, request type, target systems, urgency, approver, status, timestamps, policy flags, exceptions, outcome, and source trace ids.
- Invalid or incomplete traces are visible as warnings, not silent failures.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Click "Load sample data" and show messy traces transformed into normalized work items.

## Risks And Mitigations

- Risk: normalization looks like magic.
- Mitigation: show source trace snippets and extracted fields side by side.

## Completion Notes

Completed. Added deterministic ingestion and normalization from raw traces to canonical work items, validation issues, ingestion summary metrics, source trace linkage, policy flag extraction, and dashboard evidence for raw-to-normalized transformation. Added tests for normalized items, exception preservation, and source linkage. `npm run typecheck`, `npm test`, `npm run build`, and `npm audit --audit-level=low` pass.
