import { useMemo, useState } from "react";
import type { InspectionStatus, PriorityLevel, TriageItem } from "../types";
import { getRecommendedActionDetails } from "../utils/recommendations";

interface QueueTabProps {
  items: TriageItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
}

const priorityFilters: Array<"All" | PriorityLevel> = ["All", "High", "Medium", "Low"];
const statusFilters: Array<"All" | InspectionStatus> = [
  "All",
  "Unreviewed",
  "Needs Inspection",
  "Assigned",
  "Inspected",
  "Cleared",
  "Follow-up Needed"
];

function QueueTab({ items, selectedItemId, onSelectItem }: QueueTabProps) {
  const [priorityFilter, setPriorityFilter] = useState<(typeof priorityFilters)[number]>("All");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]>("All");

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const priorityMatches =
          priorityFilter === "All" || item.priorityLevel === priorityFilter;
        const statusMatches = statusFilter === "All" || item.status === statusFilter;
        return priorityMatches && statusMatches;
      }),
    [items, priorityFilter, statusFilter]
  );

  return (
    <div className="queueTab">
      <div className="queueSummary">
        <div>
          <p className="eyebrow">Inspection Queue</p>
          <h2>{items.length} queued items</h2>
        </div>
        <span>{items.filter((item) => item.priorityLevel === "High").length} high priority</span>
      </div>

      <div className="filterGroup" aria-label="Queue filters">
        <div className="segmentedControl">
          {priorityFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={priorityFilter === filter ? "active" : ""}
              onClick={() => setPriorityFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="statusFilter">
          Status
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as (typeof statusFilters)[number])
            }
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="queueList">
        {filteredItems.map((item) => {
          const recommendedAction = getRecommendedActionDetails(item);

          return (
            <button
              type="button"
              key={item.id}
              className={item.id === selectedItemId ? "queueCard selected" : "queueCard"}
              onClick={() => onSelectItem(item.id)}
            >
              <div className="queueCardTop">
                <span className={`priorityPill ${item.priorityLevel.toLowerCase()}`}>
                  {item.priorityLevel}
                </span>
                <strong>{item.priorityScore}/100</strong>
              </div>
              <h3>{item.name}</h3>
              <p>{recommendedAction.title}</p>
              <div className="queueMeta">
                <span>{item.itemType === "parcel" ? item.parcelId : item.assetCategory}</span>
                <span>{item.status}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QueueTab;
