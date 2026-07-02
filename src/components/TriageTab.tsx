import type { CSSProperties } from "react";
import StatusControl from "./StatusControl";
import type { InspectionStatus, RiskFactors, RiskRating, TriageItem } from "../types";
import { getRecommendedActionDetails } from "../utils/recommendations";

interface TriageTabProps {
  selectedItem: TriageItem | null;
  onStatusChange: (id: string, status: InspectionStatus) => void;
}

const factorLabels: Array<[keyof RiskFactors, string]> = [
  ["exposureRisk", "Exposure Risk"],
  ["incidentProximity", "Incident Proximity"],
  ["assetCriticality", "Asset Criticality"],
  ["accessRisk", "Access Risk"],
  ["imageryChangeIndicator", "Imagery Change Indicator"],
  ["inspectionCoverageGap", "Inspection Coverage Gap"]
];

const ratingWeight: Record<RiskRating, number> = {
  Low: 25,
  Medium: 52,
  High: 78,
  Critical: 96
};

function TriageTab({ selectedItem, onStatusChange }: TriageTabProps) {
  if (!selectedItem) {
    return (
      <div className="emptyState">
        <div className="emptyMapGlyph" />
        <h2>Select a parcel or public asset</h2>
        <p>
          Select a parcel or public asset on the map to review inspection priority, risk
          factors, recommended action, and workflow status.
        </p>
      </div>
    );
  }

  const recommendedAction = getRecommendedActionDetails(selectedItem);

  return (
    <div className="triageTab">
      <div className="itemHeader">
        <div>
          <p className="eyebrow">{selectedItem.itemType === "parcel" ? "Parcel" : "Public Asset"}</p>
          <h2>{selectedItem.name}</h2>
          <p className="muted">
            {selectedItem.parcelId ?? selectedItem.assetCategory} · {selectedItem.address}
          </p>
        </div>
        <span className={`priorityPill ${selectedItem.priorityLevel.toLowerCase()}`}>
          {selectedItem.priorityLevel}
        </span>
      </div>

      <div className="scoreCard">
        <div>
          <span className="scoreLabel">Priority</span>
          <strong>
            {selectedItem.priorityLevel} — {selectedItem.priorityScore}/100
          </strong>
        </div>
        <div className="scoreRing" style={{ "--score": selectedItem.priorityScore } as CSSProperties}>
          <span>{selectedItem.priorityScore}</span>
        </div>
      </div>

      <StatusControl
        value={selectedItem.status}
        onChange={(status) => onStatusChange(selectedItem.id, status)}
      />

      <section className="recommendationCard">
        <span>Recommended Action</span>
        <strong>{recommendedAction.title}</strong>
        <p>{recommendedAction.description}</p>
      </section>

      <section className="panelSection">
        <div className="sectionTitleRow">
          <h3>Priority Factors</h3>
          <span>Simulated scoring</span>
        </div>
        <div className="factorList">
          {factorLabels.map(([key, label]) => {
            const rating = selectedItem.riskFactors[key];
            return (
              <div className="factorRow" key={key}>
                <div>
                  <span>{label}</span>
                  <strong className={`riskText ${rating.toLowerCase()}`}>{rating}</strong>
                </div>
                <div className="factorTrack">
                  <span style={{ width: `${ratingWeight[rating]}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panelSection">
        <div className="sectionTitleRow">
          <h3>Imagery Concept</h3>
          <span>No real AI detection</span>
        </div>
        <div className="imageryGrid">
          <div className="imageryTile before">
            <span>Before Event</span>
          </div>
          <div className="imageryTile after">
            <span>After Event</span>
          </div>
        </div>
        <p className="changeIndicator">
          Change Indicator: <strong>{selectedItem.imageryChange}</strong>
        </p>
      </section>

      <p className="dataFootnote">{selectedItem.dataSource}</p>
    </div>
  );
}

export default TriageTab;
