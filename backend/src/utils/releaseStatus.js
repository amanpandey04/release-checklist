import { RELEASE_STEPS } from "../constants/releaseSteps.js";

export function calculateReleaseStatus(completedStepIds) {
  const completedCount = completedStepIds.length;
  const totalSteps = RELEASE_STEPS.length;

  if (completedCount === 0) {
    return "PLANNED";
  }

  if (completedCount === totalSteps) {
    return "DONE";
  }

  return "ONGOING";
}
