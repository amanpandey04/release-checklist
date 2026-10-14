import { GET_RELEASES } from "./queries";

export function addReleaseToList(cache, release) {
  cache.updateQuery({ query: GET_RELEASES }, (existing) => {
    if (!existing) return existing;

    const releases = existing.releases.filter((item) => item.id !== release.id);

    releases.push(release);

    releases.sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      ...existing,
      releases,
    };
  });
}

export function removeReleaseFromList(cache, releaseId) {
  cache.updateQuery({ query: GET_RELEASES }, (existing) => {
    if (!existing) return existing;

    return {
      ...existing,
      releases: existing.releases.filter((release) => release.id !== releaseId),
    };
  });
}
