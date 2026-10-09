import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Link, useNavigate } from "react-router";

import { CREATE_RELEASE } from "../graphql/mutations";

export default function CreateReleasePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [formError, setFormError] = useState("");

  const [createRelease, { loading }] = useMutation(CREATE_RELEASE, {
    onCompleted: (data) => {
      navigate(`/releases/${data.createRelease.id}`);
    },
    onError: (error) => {
      setFormError(error.message);
    },
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    await createRelease({
      variables: {
        input: {
          name,
          date,
          additionalInfo,
        },
      },
    });
  }

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

      <form onSubmit={handleSubmit} className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-5">
          <label className="form-control w-full">
            <span className="mb-2 font-medium">Release name</span>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Version 2.5.0"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-2 font-medium">Due date</span>

            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="mb-2 font-medium">Additional information</span>

            <textarea
              className="textarea textarea-bordered min-h-36 w-full"
              placeholder="Optional notes about this release..."
              value={additionalInfo}
              onChange={(event) => setAdditionalInfo(event.target.value)}
            />
          </label>

          {formError && (
            <div className="alert alert-error">
              <span>{formError}</span>
            </div>
          )}

          <div className="card-actions justify-end">
            <Link to="/" className="btn btn-ghost">
              Cancel
            </Link>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating...
                </>
              ) : (
                "Create Release"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
