import type { Point, Polygon } from "geojson";

export type PriorityLevel = "High" | "Medium" | "Low";

export type InspectionStatus =
  | "Unreviewed"
  | "Needs Inspection"
  | "Assigned"
  | "Inspected"
  | "Cleared"
  | "Follow-up Needed";

export type RiskRating = "Low" | "Medium" | "High" | "Critical";

export type RecommendedAction =
  | "Assign field inspection"
  | "Verify with imagery first"
  | "Monitor / hold for later review"
  | "Mark as cleared"
  | "Flag access constraint";

export type TriageItemType = "parcel" | "asset";

export type AssetCategory =
  | "Fire Station"
  | "School"
  | "Hospital"
  | "Public Works"
  | "Water Facility";

export interface RiskFactors {
  exposureRisk: RiskRating;
  incidentProximity: RiskRating;
  assetCriticality: RiskRating;
  accessRisk: RiskRating;
  imageryChangeIndicator: RiskRating;
  inspectionCoverageGap: RiskRating;
}

export interface TriageItem {
  id: string;
  name: string;
  itemType: TriageItemType;
  assetCategory?: AssetCategory;
  parcelId?: string;
  address: string;
  geometry: Polygon | Point;
  priorityLevel: PriorityLevel;
  priorityScore: number;
  status: InspectionStatus;
  recommendedAction: RecommendedAction;
  riskFactors: RiskFactors;
  imageryChange: Exclude<RiskRating, "Critical">;
  inQueue: boolean;
  dataSource: "Public GIS layer concept + simulated product signals";
}

export interface Incident {
  id: string;
  type: "Structure Damage" | "Smoke Report" | "Blocked Access" | "Utility Issue";
  severity: "Moderate" | "High" | "Severe";
  coordinates: [number, number];
  label: string;
}

export interface RoadAccess {
  id: string;
  name: string;
  accessStatus: "Open" | "Limited" | "Blocked";
  geometry: GeoJSON.LineString;
}

export interface LayerVisibility {
  wildfire: boolean;
  parcels: boolean;
  assets: boolean;
  incidents: boolean;
  roads: boolean;
  priority: boolean;
}

export type PanelTab = "triage" | "queue" | "notes";

export type BasemapKey = "cartoDark" | "esriDark" | "synthetic";
