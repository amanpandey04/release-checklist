export const typeDefs = `#graphql
  enum ReleaseStatus {
    PLANNED
    ONGOING
    DONE
  }

  type ReleaseStep {
    id: ID!
    label: String!
    completed: Boolean!
  }

  type Release {
    id: ID!
    name: String!
    date: String!
    additionalInfo: String
    status: ReleaseStatus!
    steps: [ReleaseStep!]!
    completedStepsCount: Int!
    totalSteps: Int!
  }

  input CreateReleaseInput {
    name: String!
    date: String!
    additionalInfo: String
  }

  input SetStepCompletionInput {
    releaseId: ID!
    stepId: ID!
    completed: Boolean!
  }

  input UpdateReleaseAdditionalInfoInput {
    releaseId: ID!
    additionalInfo: String
  }

  type Query {
    releases: [Release!]!
    release(id: ID!): Release
  }

  type Mutation {
    createRelease(input: CreateReleaseInput!): Release!
    setStepCompletion(input: SetStepCompletionInput!): Release!
    updateReleaseAdditionalInfo(
      input: UpdateReleaseAdditionalInfoInput!
    ): Release!
    deleteRelease(id: ID!): Boolean!
  }
`;
