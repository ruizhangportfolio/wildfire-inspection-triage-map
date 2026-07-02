import type { InspectionStatus } from "../types";

const statuses: InspectionStatus[] = [
  "Unreviewed",
  "Needs Inspection",
  "Assigned",
  "Inspected",
  "Cleared",
  "Follow-up Needed"
];

interface StatusControlProps {
  value: InspectionStatus;
  onChange: (status: InspectionStatus) => void;
}

function StatusControl({ value, onChange }: StatusControlProps) {
  return (
    <div className="statusControl">
      <label htmlFor="inspection-status">Workflow Status</label>
      <select
        id="inspection-status"
        value={value}
        onChange={(event) => onChange(event.target.value as InspectionStatus)}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatusControl;
