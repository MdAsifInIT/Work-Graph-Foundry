import type { AutomationProposal, NormalizedWorkItem, SimulationCaseStatus, SimulationResult } from "./types";

export function simulateAutomation(proposal: AutomationProposal, historicalItems: NormalizedWorkItem[]): SimulationResult {
  const caseResults = historicalItems
    .filter((item) => item.sourceTraceIds.length > 0)
    .map((item) => {
      const status = classifyCase(proposal, item);

      return {
        caseId: item.caseId,
        status,
        reason: reasonForStatus(status, item)
      };
    });

  const passed = caseResults.filter((result) => result.status === "pass").length;
  const failed = caseResults.filter((result) => result.status === "fail").length;
  const needsHuman = caseResults.filter((result) => result.status === "needs_human").length;
  const policyRisk = caseResults.filter((result) => result.status === "policy_risk").length;

  return {
    proposalId: proposal.id,
    totalCases: caseResults.length,
    passed,
    failed,
    needsHuman,
    policyRisk,
    avoidedDelayHours: passed * 24,
    caseResults
  };
}

function classifyCase(proposal: AutomationProposal, item: NormalizedWorkItem): SimulationCaseStatus {
  if (!item.approver || item.systems.length === 0) {
    return "fail";
  }

  if (item.requestType === "privileged_access" || proposal.riskLevel === "high") {
    return "policy_risk";
  }

  if (item.exceptions.length > 0 || item.policyFlags.length > 0 || item.outcome === "manual_review") {
    return "needs_human";
  }

  return "pass";
}

function reasonForStatus(status: SimulationCaseStatus, item: NormalizedWorkItem): string {
  if (status === "pass") {
    return "Meets eligibility rules and can proceed after approval gate.";
  }

  if (status === "fail") {
    return "Missing approver or target system required for safe automation.";
  }

  if (status === "policy_risk") {
    return "Privileged or high-risk access must remain under human review.";
  }

  return item.exceptions.length
    ? `Exception requires review: ${item.exceptions.join(", ")}.`
    : "Policy flag requires human review before provisioning.";
}
