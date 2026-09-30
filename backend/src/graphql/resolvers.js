import { releases } from "../data/releases.js";

export const resolvers = {
  Query: {
    releases: () => releases,

    release: (_, args) => {
      return releases.find((release) => release.id === args.id) ?? null;
    },
  },

  Mutation: {
    createRelease: (_, args) => {
      const newRelease = {
        id: String(releases.length + 1),
        name: args.name,
        date: args.date,
        additionalInfo: args.additionalInfo ?? null,
        status: "PLANNED",
      };

      releases.push(newRelease);

      return newRelease;
    },
  },
};
