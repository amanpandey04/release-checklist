import { gql } from "@apollo/client";

export const CREATE_RELEASE = gql`
  mutation CreateRelease($input: CreateReleaseInput!) {
    createRelease(input: $input) {
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

export const SET_STEP_COMPLETION = gql`
  mutation SetStepCompletion($input: SetStepCompletionInput!) {
    setStepCompletion(input: $input) {
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

export const UPDATE_RELEASE_ADDITIONAL_INFO = gql`
  mutation UpdateReleaseAdditionalInfo($input: UpdateReleaseAdditionalInfoInput!) {
    updateReleaseAdditionalInfo(input: $input) {
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

export const DELETE_RELEASE = gql`
  mutation DeleteRelease($id: ID!) {
    deleteRelease(id: $id)
  }
`;
