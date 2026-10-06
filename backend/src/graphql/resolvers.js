import { RELEASE_STEPS } from "../constants/releaseSteps.js";
import { calculateReleaseStatus } from "../utils/releaseStatus.js";

import {
  getReleases,
  getReleaseById,
  createRelease,
  setStepCompletion,
  updateReleaseAdditionalInfo,
  deleteRelease,
} from "../services/releaseService.js";

export const resolvers = {
  Query: {
    releases: () => getReleases(),

    release: (_, { id }) => getReleaseById(id),
  },

  Release: {
    status: (release) => {
      return calculateReleaseStatus(release.completedStepIds);
    },

    steps: (release) => {
      return RELEASE_STEPS.map((step) => ({
        ...step,
        completed: release.completedStepIds.includes(step.id),
      }));
    },

    completedStepsCount: (release) => {
      return release.completedStepIds.length;
    },

    totalSteps: () => {
      return RELEASE_STEPS.length;
    },
  },

  Mutation: {
    createRelease: (_, { input }) => {
      return createRelease(input);
    },

    setStepCompletion: (_, { input }) => {
      return setStepCompletion(input);
    },

    updateReleaseAdditionalInfo: (_, { input }) => {
      return updateReleaseAdditionalInfo(input);
    },

    deleteRelease: (_, { id }) => {
      return deleteRelease(id);
    },
  },
};
