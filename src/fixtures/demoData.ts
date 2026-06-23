import type {
  ApprovalHistoryRecord,
  DemoFixtureSet,
  PolicyRule,
  RawWorkTrace,
  RequestType,
  SourceChannel,
  Urgency
} from "../domain/types";

interface CaseSeed {
  id: string;
  requester: string;
  department: string;
  manager: string;
  system: string;
  requestType: RequestType;
  urgency: Urgency;
  region: string;
  submittedAt: string;
  approvedAt: string;
  completedAt?: string;
  exception?: string;
  outcome: "approved" | "manual_review" | "rejected";
}

const seeds: CaseSeed[] = [
  {
    id: "case-1001",
    requester: "Maya Chen",
    department: "Revenue Operations",
    manager: "Ari Patel",
    system: "Salesforce",
    requestType: "standard_access",
    urgency: "normal",
    region: "NA",
    submittedAt: "2026-05-01T09:14:00Z",
    approvedAt: "2026-05-02T15:20:00Z",
    completedAt: "2026-05-02T16:05:00Z",
    outcome: "approved"
  },
  {
    id: "case-1002",
    requester: "Jon Bell",
    department: "Finance",
    manager: "Priya Shah",
    system: "NetSuite",
    requestType: "finance_system_access",
    urgency: "high",
    region: "NA",
    submittedAt: "2026-05-01T11:42:00Z",
    approvedAt: "2026-05-03T18:10:00Z",
    completedAt: "2026-05-04T10:30:00Z",
    exception: "quarter_close_urgency",
    outcome: "manual_review"
  },
  {
    id: "case-1003",
    requester: "Elena Ruiz",
    department: "Customer Success",
    manager: "Nora Ellis",
    system: "Zendesk",
    requestType: "standard_access",
    urgency: "normal",
    region: "EMEA",
    submittedAt: "2026-05-02T08:20:00Z",
    approvedAt: "2026-05-06T12:04:00Z",
    completedAt: "2026-05-06T13:12:00Z",
    outcome: "approved"
  },
  {
    id: "case-1004",
    requester: "Owen Brooks",
    department: "Engineering",
    manager: "Samira Khan",
    system: "GitHub Enterprise",
    requestType: "privileged_access",
    urgency: "normal",
    region: "NA",
    submittedAt: "2026-05-03T14:05:00Z",
    approvedAt: "2026-05-04T14:40:00Z",
    exception: "privileged_repository_admin",
    outcome: "manual_review"
  },
  {
    id: "case-1005",
    requester: "Iris Wu",
    department: "People",
    manager: "Devon Lane",
    system: "Workday",
    requestType: "standard_access",
    urgency: "low",
    region: "APAC",
    submittedAt: "2026-05-04T04:10:00Z",
    approvedAt: "2026-05-05T06:34:00Z",
    completedAt: "2026-05-05T08:00:00Z",
    outcome: "approved"
  },
  {
    id: "case-1006",
    requester: "Ravi Menon",
    department: "Marketing",
    manager: "Ari Patel",
    system: "Looker",
    requestType: "analytics_access",
    urgency: "normal",
    region: "APAC",
    submittedAt: "2026-05-05T06:50:00Z",
    approvedAt: "2026-05-08T09:18:00Z",
    completedAt: "2026-05-08T10:02:00Z",
    outcome: "approved"
  },
  {
    id: "case-1007",
    requester: "Tessa Green",
    department: "Legal",
    manager: "Marin Ito",
    system: "ContractWorks",
    requestType: "contractor_access",
    urgency: "normal",
    region: "EMEA",
    submittedAt: "2026-05-06T10:22:00Z",
    approvedAt: "2026-05-07T15:44:00Z",
    exception: "contractor_end_date_missing",
    outcome: "manual_review"
  },
  {
    id: "case-1008",
    requester: "Miles Carter",
    department: "Sales",
    manager: "Nora Ellis",
    system: "Salesforce",
    requestType: "standard_access",
    urgency: "high",
    region: "NA",
    submittedAt: "2026-05-06T13:11:00Z",
    approvedAt: "2026-05-10T16:30:00Z",
    completedAt: "2026-05-10T17:15:00Z",
    outcome: "approved"
  },
  {
    id: "case-1009",
    requester: "Anika Rao",
    department: "Revenue Operations",
    manager: "Ari Patel",
    system: "Salesforce",
    requestType: "standard_access",
    urgency: "normal",
    region: "APAC",
    submittedAt: "2026-05-07T05:18:00Z",
    approvedAt: "2026-05-11T08:42:00Z",
    completedAt: "2026-05-11T09:35:00Z",
    outcome: "approved"
  },
  {
    id: "case-1010",
    requester: "Noah Stein",
    department: "Engineering",
    manager: "Samira Khan",
    system: "GitHub Enterprise",
    requestType: "standard_access",
    urgency: "normal",
    region: "EMEA",
    submittedAt: "2026-05-08T12:02:00Z",
    approvedAt: "2026-05-09T14:14:00Z",
    completedAt: "2026-05-09T15:00:00Z",
    outcome: "approved"
  },
  {
    id: "case-1011",
    requester: "Keiko Tan",
    department: "Finance",
    manager: "Priya Shah",
    system: "NetSuite",
    requestType: "finance_system_access",
    urgency: "normal",
    region: "APAC",
    submittedAt: "2026-05-09T03:44:00Z",
    approvedAt: "2026-05-13T07:30:00Z",
    exception: "segregation_of_duties_review",
    outcome: "manual_review"
  },
  {
    id: "case-1012",
    requester: "Grace Miller",
    department: "Customer Success",
    manager: "Nora Ellis",
    system: "Zendesk",
    requestType: "standard_access",
    urgency: "low",
    region: "NA",
    submittedAt: "2026-05-10T15:28:00Z",
    approvedAt: "2026-05-12T19:08:00Z",
    completedAt: "2026-05-12T20:11:00Z",
    outcome: "approved"
  },
  {
    id: "case-1013",
    requester: "Mateo Silva",
    department: "Marketing",
    manager: "Devon Lane",
    system: "Looker",
    requestType: "analytics_access",
    urgency: "high",
    region: "LATAM",
    submittedAt: "2026-05-11T13:25:00Z",
    approvedAt: "2026-05-15T17:18:00Z",
    completedAt: "2026-05-15T18:01:00Z",
    exception: "campaign_launch_urgency",
    outcome: "approved"
  }
];

export const policyRules: PolicyRule[] = [
  {
    id: "policy-standard-access",
    label: "Standard application access",
    description: "Standard employee requests require active employment, manager approval, and approved application catalog membership.",
    appliesTo: ["standard_access", "analytics_access"],
    riskLevel: "low",
    requiresHumanReview: false,
    escalationRole: "manager"
  },
  {
    id: "policy-privileged-access",
    label: "Privileged access review",
    description: "Privileged access requires security review and system owner confirmation before provisioning.",
    appliesTo: ["privileged_access"],
    riskLevel: "high",
    requiresHumanReview: true,
    escalationRole: "security"
  },
  {
    id: "policy-contractor-access",
    label: "Contractor access expiry",
    description: "Contractor access requires end date and compliance review for data-sensitive systems.",
    appliesTo: ["contractor_access"],
    riskLevel: "medium",
    requiresHumanReview: true,
    escalationRole: "compliance"
  },
  {
    id: "policy-finance-access",
    label: "Finance system access",
    description: "Finance system access requires manager approval and audit note for quarter-close exceptions.",
    appliesTo: ["finance_system_access"],
    riskLevel: "medium",
    requiresHumanReview: true,
    escalationRole: "it_operations"
  }
];

function makeTrace(seed: CaseSeed, channel: SourceChannel, index: number): RawWorkTrace {
  const ticketId = `IT-${seed.id.replace("case-", "")}`;
  const occurredAt =
    channel === "email"
      ? seed.submittedAt
      : channel === "approval_log"
        ? seed.approvedAt
        : channel === "system_action" && seed.completedAt
          ? seed.completedAt
          : seed.submittedAt;

  const subjectByChannel: Record<SourceChannel, string> = {
    email: `Access request for ${seed.system}`,
    ticket: `${ticketId}: ${seed.requester} needs ${seed.system}`,
    chat: `Follow-up on ${seed.system} access`,
    approval_log: `${seed.manager} approval for ${seed.system}`,
    system_action: `${seed.system} provisioning update`
  };

  const bodyByChannel: Record<SourceChannel, string> = {
    email: `${seed.requester} from ${seed.department} requested ${seed.system} access with ${seed.urgency} urgency in ${seed.region}.`,
    ticket: `Catalog request ${ticketId} is categorized as ${seed.requestType}. ${seed.exception ? `Exception noted: ${seed.exception}.` : "No exception noted."}`,
    chat: `${seed.requester} asked IT for status because manager approval is the gating step.`,
    approval_log: `${seed.manager} approved request ${ticketId} for ${seed.requester}.`,
    system_action:
      seed.outcome === "approved"
        ? `IT provisioned ${seed.system} and wrote audit log for ${ticketId}.`
        : `IT routed ${ticketId} for manual review before provisioning.`
  };

  return {
    id: `${seed.id}-${channel}-${index}`,
    caseId: seed.id,
    channel,
    occurredAt,
    actor: channel === "approval_log" ? seed.manager : seed.requester,
    participants: [seed.requester, seed.manager, "IT Access Operations"],
    subject: subjectByChannel[channel],
    body: bodyByChannel[channel],
    metadata: {
      department: seed.department,
      system: seed.system,
      ticketId,
      region: seed.region,
      severity: seed.urgency
    }
  };
}

function tracesForSeed(seed: CaseSeed): RawWorkTrace[] {
  const channels: SourceChannel[] =
    seed.outcome === "approved"
      ? ["email", "ticket", "chat", "approval_log", "system_action"]
      : ["email", "ticket", "chat", "approval_log"];

  return channels.map((channel, index) => makeTrace(seed, channel, index + 1));
}

export const rawTraces: RawWorkTrace[] = seeds.flatMap(tracesForSeed);

export const approvalHistory: ApprovalHistoryRecord[] = seeds.map((seed) => ({
  id: `${seed.id}-approval`,
  caseId: seed.id,
  approver: seed.manager,
  role: seed.requestType === "privileged_access" ? "system_owner" : "manager",
  decision: seed.outcome === "rejected" ? "rejected" : "approved",
  requestedAt: seed.submittedAt,
  decidedAt: seed.approvedAt,
  comments: seed.exception
    ? `Approved with exception review required: ${seed.exception}.`
    : `Approved standard ${seed.system} access.`
}));

export const newIncomingTrace: RawWorkTrace = {
  id: "case-2001-email-1",
  caseId: "case-2001",
  channel: "email",
  occurredAt: "2026-05-15T09:08:00Z",
  actor: "Leah Morgan",
  participants: ["Leah Morgan", "Ari Patel", "IT Access Operations"],
  subject: "Need Salesforce access for enterprise renewal work",
  body: "Leah Morgan from Revenue Operations needs normal Salesforce access for renewal forecasting. Manager is Ari Patel. No privileged role requested.",
  metadata: {
    department: "Revenue Operations",
    system: "Salesforce",
    ticketId: "IT-2001",
    region: "NA",
    severity: "normal"
  }
};

export const demoFixtures: DemoFixtureSet = {
  rawTraces,
  policyRules,
  approvalHistory,
  newIncomingTrace
};
