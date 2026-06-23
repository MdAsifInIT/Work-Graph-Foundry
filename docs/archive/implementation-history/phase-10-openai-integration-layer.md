# Phase 10: OpenAI Integration Layer

## Objective

Add optional OpenAI-backed agent behavior behind a clean provider interface.

## User-Facing Outcome

The app can use real model calls when configured, while remaining fully demoable with deterministic mock agents.

## Implementation Tasks

- Define AI provider interface for extraction, clustering assistance, proposal generation, and policy reasoning where useful.
- Keep mock provider as default.
- Add OpenAI provider enabled only when `OPENAI_API_KEY` exists.
- Validate structured outputs before accepting provider results.
- Add fallback behavior and visible provider status.
- Document env vars and local behavior.
- Add tests for provider selection and fallback.

## Files Likely To Change

- `src/ai/`
- `src/domain/*`
- `.env.example`
- `README.md`

## Data Contracts

- `AiProvider`
- `AiProviderStatus`
- Structured outputs matching existing domain contracts.

## UI Requirements

Show whether mock AI or OpenAI is active. Provider failures must be non-blocking and visible.

## Agentic Behavior Covered

OpenAI can enhance observe, understand, reason, and plan, but the full loop must still work with mock agents.

## Acceptance Criteria

- App runs without API key.
- No secrets are committed.
- Invalid live responses do not break the demo.
- Mock and OpenAI providers share the same contract boundary.

## Verification Commands

```powershell
npm run typecheck
npm test
npm run build
```

## Demo Checkpoint

Run the app with no API key and confirm mock mode. If a key is configured locally, confirm provider status and one structured provider path.

## Risks And Mitigations

- Risk: network or model failures destabilize the demo.
- Mitigation: deterministic mock remains default fallback.

## Completion Notes

Completed. Added `AiProvider` abstraction, default `MockAiProvider`, optional `OpenAiResponsesProvider` using the Responses API with structured JSON schema output, provider status in the dashboard, `.env.example` model/key notes, README guidance not to expose API keys in browser code, and provider tests with mocked fetch. `npm run typecheck`, `npm test`, and `npm run build` pass.
