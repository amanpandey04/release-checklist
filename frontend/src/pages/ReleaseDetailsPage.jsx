import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { Link, useNavigate, useParams } from "react-router";

import Checklist from "../components/Checklist";
import { DELETE_RELEASE, UPDATE_RELEASE_ADDITIONAL_INFO } from "../graphql/mutations";
import { GET_RELEASE } from "../graphql/queries";

const statusStyles = {
  PLANNED: "badge-ghost",
  ONGOING: "badge-warning",
  DONE: "badge-success",
};

export default function ReleaseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    loading: releaseLoading,
    error: releaseError,
    refetch,
  } = useQuery(GET_RELEASE, {
    variables: { id },
  });

  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [updateAdditionalInfo, { loading: savingInfo }] = useMutation(
    UPDATE_RELEASE_ADDITIONAL_INFO,
  );

  const [deleteRelease, { loading: deleting }] = useMutation(DELETE_RELEASE, {
    onCompleted: () => {
      navigate("/");
    },
  });

  if (releaseLoading) {
    return (
      <section className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </section>
    );
  }

  if (releaseError) {
    return (
      <section className="rounded-lg border border-error/30 bg-error/10 p-6">
        <h1 className="text-xl font-semibold text-error">Failed to load release</h1>

        <p className="mt-2 text-sm text-base-content/70">{releaseError.message}</p>
      </section>
    );
  }

  if (!data?.release) {
    return (
      <section className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Release not found</h1>

        <Link to="/" className="btn btn-primary">
          Back to Releases
        </Link>
      </section>
    );
  }

  const release = data.release;

  const progress =
    release.totalSteps === 0
      ? 0
      : Math.round((release.completedStepsCount / release.totalSteps) * 100);

  async function handleSaveAdditionalInfo(event) {
    event.preventDefault();

    setSaveMessage("");
    setSaveError("");

    const formData = new FormData(event.currentTarget);
    const additionalInfo = String(formData.get("additionalInfo") ?? "");

    try {
      await updateAdditionalInfo({
        variables: {
          input: {
            releaseId: release.id,
            additionalInfo,
          },
        },
      });

      setSaveMessage("Information saved.");
    } catch (error) {
      setSaveError(error.message);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${release.name}"? This cannot be undone.`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteRelease({
        variables: {
          id: release.id,
        },
      });
    } catch (error) {
      window.alert(`Failed to delete release: ${error.message}`);
    }
  }

  async function handleChecklistUpdated() {
    await refetch();
  }

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
              <h1 className="text-3xl font-bold tracking-tight">{release.name}</h1>

              <p className="mt-1 text-base-content/60">
                Due {new Date(release.date).toLocaleString()}
              </p>
            </div>

            <span className={`badge badge-lg ${statusStyles[release.status]}`}>
              {release.status}
            </span>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Progress</span>

              <span className="text-sm text-base-content/70">
                {release.completedStepsCount}/{release.totalSteps} completed
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

        <Checklist
          releaseId={release.id}
          steps={release.steps}
          onUpdated={handleChecklistUpdated}
        />
      </div>

      <form
        key={release.id}
        onSubmit={handleSaveAdditionalInfo}
        className="card border border-base-300 bg-base-100 shadow-sm"
      >
        <div className="card-body">
          <h2 className="card-title">Additional Information</h2>

          <textarea
            name="additionalInfo"
            className="textarea textarea-bordered mt-2 min-h-32 w-full"
            defaultValue={release.additionalInfo ?? ""}
            placeholder="Add notes about this release..."
          />

          {saveMessage && (
            <div className="alert alert-success mt-3">
              <span>{saveMessage}</span>
            </div>
          )}

          {saveError && (
            <div className="alert alert-error mt-3">
              <span>{saveError}</span>
            </div>
          )}

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary" disabled={savingInfo}>
              {savingInfo ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                "Save Information"
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="flex justify-end">
        <button className="btn btn-error btn-outline" onClick={handleDelete} disabled={deleting}>
          {deleting ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Deleting...
            </>
          ) : (
            "Delete Release"
          )}
        </button>
      </div>
    </section>
  );
}
