import { Link } from "react-router";
import Checklist from "../components/Checklist";

const sampleRelease = {
  id: "1",
  name: "Version 2.4.0",
  date: "October 10, 2026",
  status: "ONGOING",
  completedStepsCount: 4,
  totalSteps: 8,
  additionalInfo: "Major frontend update. Waiting for final QA approval.",
  steps: [
    {
      id: "changes-reviewed",
      label: "Review all merged changes",
      completed: true,
    },
    {
      id: "changelog-updated",
      label: "Update CHANGELOG",
      completed: true,
    },
    {
      id: "migrations-verified",
      label: "Verify database migrations",
      completed: false,
    },
    {
      id: "tests-passed",
      label: "Run automated tests",
      completed: true,
    },
    {
      id: "release-notes-ready",
      label: "Prepare release notes",
      completed: false,
    },
    {
      id: "staging-deployed",
      label: "Deploy to staging",
      completed: true,
    },
    {
      id: "qa-completed",
      label: "Complete QA verification",
      completed: false,
    },
    {
      id: "production-deployed",
      label: "Deploy to production",
      completed: false,
    },
  ],
};

const statusStyles = {
  PLANNED: "badge-ghost",
  ONGOING: "badge-warning",
  DONE: "badge-success",
};

export default function ReleaseDetailsPage() {
  const progress = Math.round((sampleRelease.completedStepsCount / sampleRelease.totalSteps) * 100);

  return (
    <section className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        ← All Releases
      </Link>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{sampleRelease.name}</h1>

              <p className="mt-1 text-base-content/60">Due {sampleRelease.date}</p>
            </div>

            <span className={`badge badge-lg ${statusStyles[sampleRelease.status]}`}>
              {sampleRelease.status}
            </span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Progress</span>

              <span className="text-sm text-base-content/70">
                {sampleRelease.completedStepsCount}/{sampleRelease.totalSteps} completed
              </span>
            </div>

            <progress className="progress progress-primary w-full" value={progress} max="100" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Checklist</h2>

          <p className="mt-1 text-sm text-base-content/60">
            Complete each step as the release progresses.
          </p>
        </div>

        <Checklist steps={sampleRelease.steps} />
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Additional Information</h2>

          <textarea
            className="textarea textarea-bordered mt-2 min-h-32 w-full"
            defaultValue={sampleRelease.additionalInfo}
            placeholder="Add notes about this release..."
          />

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Save Information</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-error btn-outline">Delete Release</button>
      </div>
    </section>
  );
}
