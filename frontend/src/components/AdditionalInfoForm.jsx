import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client/react";

import { UPDATE_RELEASE_ADDITIONAL_INFO } from "../graphql/mutations";

export default function AdditionalInfoForm({ release }) {
  const savedInfo = (release.additionalInfo ?? "").trim();

  const [additionalInfo, setAdditionalInfo] = useState(savedInfo);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const toastTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const [updateAdditionalInfo, { loading: savingInfo }] = useMutation(
    UPDATE_RELEASE_ADDITIONAL_INFO,
  );

  const normalizedAdditionalInfo = additionalInfo.trim();
  const hasChanges = normalizedAdditionalInfo !== savedInfo;

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
            additionalInfo: normalizedAdditionalInfo || null,
          },
        },
      });

      const savedValue = result.data?.updateReleaseAdditionalInfo?.additionalInfo ?? "";

      setAdditionalInfo(savedValue);
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }

      setSaveMessage("Information saved.");

      toastTimer.current = window.setTimeout(() => {
        setSaveMessage("");
        toastTimer.current = null;
      }, 2000);
    } catch (error) {
      setSaveError(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Additional Information</h2>

          <textarea
            name="additionalInfo"
            className="textarea textarea-bordered mt-2 min-h-32 w-full"
            value={additionalInfo}
            onChange={(event) => {
              setAdditionalInfo(event.target.value);

              if (toastTimer.current !== null) {
                window.clearTimeout(toastTimer.current);
                toastTimer.current = null;
              }

              setSaveMessage("");
              setSaveError("");
            }}
            placeholder="Add notes about this release..."
          />

          {saveError && (
            <div className="alert alert-error mt-3">
              <span>{saveError}</span>
            </div>
          )}

          <div className="card-actions mt-2 justify-end">
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
      {saveMessage && (
        <div className="toast toast-end toast-bottom z-100">
          <div
            role="status"
            aria-live="polite"
            className="alert alert-success w-auto max-w-xs shadow-lg"
          >
            <span className="text-sm">{saveMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
