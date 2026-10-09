import { useMutation } from "@apollo/client/react";

import { SET_STEP_COMPLETION } from "../graphql/mutations";

export default function Checklist({ releaseId, steps, onUpdated }) {
  const [setStepCompletion, { loading }] = useMutation(SET_STEP_COMPLETION, {
    onCompleted: (data) => {
      onUpdated?.(data.setStepCompletion);
    },
    onError: (error) => {
      console.error("Failed to update checklist step:", error);
    },
  });

  async function handleChange(step) {
    await setStepCompletion({
      variables: {
        input: {
          releaseId,
          stepId: step.id,
          completed: !step.completed,
        },
      },
    });
  }

  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <label
          key={step.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-base-300 bg-base-100 p-4 transition hover:bg-base-200"
        >
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={step.completed}
            onChange={() => handleChange(step)}
            disabled={loading}
          />

          <span className={step.completed ? "line-through opacity-60" : ""}>{step.label}</span>
        </label>
      ))}
    </div>
  );
}
