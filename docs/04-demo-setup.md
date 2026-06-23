# 4. Demo Setup

## 4.1 Requirements

Required:

- Node.js compatible with the installed package versions.
- npm.
- Local browser.
- No external services.
- No OpenAI API key.
- No enterprise credentials.

Optional:

- `OPENAI_API_KEY` for future trusted server-side integration. The current browser demo does not use it.

## 4.2 Local Run Steps

Install:

```powershell
npm install
```

Start dev server:

```powershell
npm run dev
```

Open the printed local URL.

Fallback production path:

```powershell
npm run build
npm run preview
```

Use this fallback if Vite dev optimization is blocked by the environment.

## 4.3 Demo Walkthrough

### 4.3.1 Open The Dashboard

Start with the dashboard. Explain that Work Graph Foundry begins from traces, not a manually designed workflow.

Point out:

- `Load Sample`
- `Run Case`
- `Reset`
- script path strip
- deterministic mock AI mode
- governed execution state

### 4.3.2 Load Sample Data

Click `Load Sample`.

Explain:

"The sample data represents access requests spread across email, tickets, chat, approval logs, and system actions."

Show:

- raw traces count
- normalized items count
- warning count
- top system

### 4.3.3 Show Raw-To-Normalized Evidence

Explain:

"The system converts messy traces into a canonical work item with requester, department, request type, system, status, and source links."

This is the observe step.

### 4.3.4 Show The Work Graph

Explain:

"The work graph shows the process path: requester, manager approval, policy check, provisioning, audit log, exception review, and outcome."

This is the map step.

### 4.3.5 Show Pattern Detection

Explain:

"The system discovers standard application access as a repeated workflow and identifies manager approval as the bottleneck."

This is the understand and reason step.

### 4.3.6 Show The Proposal

Explain:

"The planner generates a structured automation proposal with trigger, rules, actions, escalations, confidence, risk, expected value, and audit rationale."

This is the plan step.

### 4.3.7 Show Simulation

Explain:

"The proposal is replayed against historical cases before it can run."

Point out:

- pass
- needs human
- policy risk
- avoided delay
- execution gate blocked

This is the simulate step.

### 4.3.8 Approve

Click `Approve`.

Explain:

"Approval creates an audit event and opens the execution gate."

This is the govern step.

### 4.3.9 Run Case

Click `Run Case`.

Explain:

"The new request runs through safe mock tools. No real enterprise system is changed."

This is the execute step.

### 4.3.10 Show Learning

Explain:

"The learning loop recommends splitting exception-heavy cases into a human-review lane."

This is the improve step.

## 4.4 Reset And Recovery

Click `Reset` to replay the demo.

If the app appears stale:

1. Refresh the browser.
2. Restart the dev or preview server.
3. Rebuild with `npm run build`.

If live AI is unavailable:

Use the default mock mode. The demo is designed for this.

If dev server fails:

Use:

```powershell
npm run build
npm run preview
```

## 4.5 Presenter Talk Track

Short version:

"Work Graph Foundry observes how work actually moves, builds a live graph, finds repeated patterns and bottlenecks, proposes governed automation, simulates it against history, requires human approval, executes safely, and learns from exceptions."

## 4.6 Demo Acceptance Checklist

Before presenting:

- `npm run build` passes.
- `npm test` passes.
- `Load Sample` renders all main panels.
- `Approve` opens the execution gate.
- `Run Case` shows mock tool calls.
- Learning recommendation appears.
- `Reset` clears demo state.
- No API key is required.
- Mobile layout has no horizontal overflow.
