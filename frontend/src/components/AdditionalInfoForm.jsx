import { useState } from "react";
import { useMutation } from "@apollo/client/react";

import { UPDATE_RELEASE_ADDITIONAL_INFO } from "../graphql/mutations";

export default function AdditionalInfoForm({ release }) {
  const savedInfo = release.additionalInfo ?? "";

  const [additionalInfo, setAdditionalInfo] = useState(savedInfo);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const [updateAdditionalInfo, { loading: savingInfo }] = useMutation(
    UPDATE_RELEASE_ADDITIONAL_INFO,
  );

  const hasChanges = additionalInfo !== (release.additionalInfo ?? "");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!hasChanges) return;

    setSaveMessage("");
    setSaveError("");

    try {
      const result = await updateAdditionalInfo({
        variables: {
          input: {
            releaseId: release.id,
            additionalInfo,
          },
        },
      });

      const savedValue = result.data?.updateReleaseAdditionalInfo?.additionalInfo ?? "";

      setAdditionalInfo(savedValue);
      setSaveMessage("Information saved.");
    } catch (error) {
      setSaveError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Additional Information</h2>

        <textarea
          name="additionalInfo"
          className="textarea textarea-bordered mt-2 min-h-32 w-full"
          value={additionalInfo}
          onChange={(event) => {
            setAdditionalInfo(event.target.value);
            setSaveMessage("");
            setSaveError("");
          }}
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
          <button type="submit" className="btn btn-primary" disabled={!hasChanges || savingInfo}>
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
  );
}
