import { Link } from "react-router";

const statusStyles = {
  PLANNED: "badge-ghost",
  ONGOING: "badge-warning",
  DONE: "badge-success",
};

export default function ReleaseCard({ release }) {
  const progress =
    release.totalSteps === 0
      ? 0
      : Math.round((release.completedStepsCount / release.totalSteps) * 100);

  return (
    <article className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="card-body gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="card-title">{release.name}</h2>

            <p className="text-sm text-base-content/60">{release.date}</p>
          </div>

          <span className={`badge ${statusStyles[release.status]}`}>{release.status}</span>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-base-content/70">Checklist progress</span>

            <span className="font-medium">
              {release.completedStepsCount}/{release.totalSteps}
            </span>
          </div>

          <progress className="progress progress-primary w-full" value={progress} max="100" />
        </div>

        <div className="card-actions justify-end">
          <Link to={`/releases/${release.id}`} className="btn btn-outline btn-sm">
            View Release
          </Link>
        </div>
      </div>
    </article>
  );
}
