import { prisma } from "../db/prisma.js";
import { RELEASE_STEPS } from "../constants/releaseSteps.js";

function validateReleaseDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid release date.");
  }

  return parsedDate;
}

function validateStepId(stepId) {
  const exists = RELEASE_STEPS.some((step) => step.id === stepId);

  if (!exists) {
    throw new Error(`Invalid release step: ${stepId}`);
  }
}

export async function getReleases() {
  return prisma.release.findMany({
    orderBy: {
      date: "asc",
    },
  });
}

export async function getReleaseById(id) {
  return prisma.release.findUnique({
    where: {
      id,
    },
  });
}

export async function createRelease({ name, date, additionalInfo }) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Release name cannot be empty.");
  }

  const parsedDate = validateReleaseDate(date);

  return prisma.release.create({
    data: {
      name: trimmedName,
      date: parsedDate,
      additionalInfo: additionalInfo?.trim() || null,
    },
  });
}

export async function setStepCompletion({ releaseId, stepId, completed }) {
  validateStepId(stepId);

  const release = await prisma.release.findUnique({
    where: {
      id: releaseId,
    },
  });

  if (!release) {
    throw new Error("Release not found.");
  }

  const completedStepIds = new Set(release.completedStepIds);

  if (completed) {
    completedStepIds.add(stepId);
  } else {
    completedStepIds.delete(stepId);
  }

  const orderedCompletedStepIds = RELEASE_STEPS.filter((step) => completedStepIds.has(step.id)).map(
    (step) => step.id,
  );

  return prisma.release.update({
    where: {
      id: releaseId,
    },
    data: {
      completedStepIds: {
        set: orderedCompletedStepIds,
      },
    },
  });
}

export async function updateReleaseAdditionalInfo({ releaseId, additionalInfo }) {
  const release = await prisma.release.findUnique({
    where: {
      id: releaseId,
    },
  });

  if (!release) {
    throw new Error("Release not found.");
  }

  return prisma.release.update({
    where: {
      id: releaseId,
    },
    data: {
      additionalInfo: additionalInfo?.trim() || null,
    },
  });
}

export async function deleteRelease(id) {
  const release = await prisma.release.findUnique({
    where: {
      id,
    },
  });

  if (!release) {
    throw new Error("Release not found.");
  }

  await prisma.release.delete({
    where: {
      id,
    },
  });

  return true;
}
