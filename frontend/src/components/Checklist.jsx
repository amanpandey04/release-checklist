export default function Checklist({ steps }) {
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
            onChange={() => {}}
          />

          <span className={step.completed ? "line-through opacity-60" : ""}>{step.label}</span>
        </label>
      ))}
    </div>
  );
}
