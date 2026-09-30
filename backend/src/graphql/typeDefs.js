export const typeDefs = `#graphql
  enum ReleaseStatus {
    PLANNED
    ONGOING
    DONE
  }

  type Release {
    id: ID!
    name: String!
    date: String!
    additionalInfo: String
    status: ReleaseStatus!
  }

  type Query {
    releases: [Release!]!
    release(id: ID!): Release
  }

  type Mutation {
    createRelease(
      name: String!
      date: String!
      additionalInfo: String
    ): Release!
  }
`;
