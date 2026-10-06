import { gql } from "@apollo/client";

export const GET_RELEASES = gql`
  query GetReleases {
    releases {
      id
      name
      date
      additionalInfo
      status
      completedStepsCount
      totalSteps
      steps {
        id
        label
        completed
      }
    }
  }
`;
