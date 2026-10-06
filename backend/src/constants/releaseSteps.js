export const RELEASE_STEPS = [
  {
    id: "changes-reviewed",
    label: "Review all merged changes",
  },
  {
    id: "changelog-updated",
    label: "Update CHANGELOG",
  },
  {
    id: "migrations-verified",
    label: "Verify database migrations",
  },
  {
    id: "tests-passed",
    label: "Run automated tests",
  },
  {
    id: "release-notes-ready",
    label: "Prepare release notes",
  },
  {
    id: "staging-deployed",
    label: "Deploy to staging",
  },
  {
    id: "qa-completed",
    label: "Complete QA verification",
  },
  {
    id: "production-deployed",
    label: "Deploy to production",
  },
];
