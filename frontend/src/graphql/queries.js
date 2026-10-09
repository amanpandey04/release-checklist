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

export const GET_RELEASE = gql`
  query GetRelease($id: ID!) {
    release(id: $id) {
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
