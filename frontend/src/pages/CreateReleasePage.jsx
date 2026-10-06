import { Link } from "react-router";

export default function CreateReleasePage() {
  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          ← Back to Releases
        </Link>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">Create Release</h1>

        <p className="mt-2 text-base-content/70">
          Add a new release and start tracking its checklist.
        </p>
      </div>

      <form className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-5">
          <label className="form-control w-full">
            <span className="mb-2 font-medium">Release name</span>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Version 2.5.0"
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-2 font-medium">Due date</span>

            <input type="datetime-local" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <span className="mb-2 font-medium">Additional information</span>

            <textarea
              className="textarea textarea-bordered min-h-36 w-full"
              placeholder="Optional notes about this release..."
            />
          </label>

          <div className="card-actions justify-end">
            <Link to="/" className="btn btn-ghost">
              Cancel
            </Link>

            <button type="submit" className="btn btn-primary">
              Create Release
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
