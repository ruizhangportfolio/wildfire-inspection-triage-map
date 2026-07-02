import type { FeatureCollection, LineString, Point, Polygon } from "geojson";
import type { Incident, RoadAccess, TriageItem } from "../types";

const parcel = (
  id: string,
  name: string,
  parcelId: string,
  address: string,
  coordinates: [number, number][],
  priorityLevel: TriageItem["priorityLevel"],
  priorityScore: number,
  status: TriageItem["status"],
  recommendedAction: TriageItem["recommendedAction"],
  riskFactors: TriageItem["riskFactors"],
  imageryChange: TriageItem["imageryChange"],
  inQueue = false
): TriageItem => ({
  id,
  name,
  parcelId,
  address,
  itemType: "parcel",
  geometry: {
    type: "Polygon",
    coordinates: [[...coordinates, coordinates[0]]]
  },
  priorityLevel,
  priorityScore,
  status,
  recommendedAction,
  riskFactors,
  imageryChange,
  inQueue,
  dataSource: "Public GIS layer concept + simulated product signals"
});

const asset = (
  id: string,
  name: string,
  assetCategory: TriageItem["assetCategory"],
  address: string,
  coordinates: [number, number],
  priorityLevel: TriageItem["priorityLevel"],
  priorityScore: number,
  status: TriageItem["status"],
  recommendedAction: TriageItem["recommendedAction"],
  riskFactors: TriageItem["riskFactors"],
  imageryChange: TriageItem["imageryChange"],
  inQueue = false
): TriageItem => ({
  id,
  name,
  assetCategory,
  address,
  itemType: "asset",
  geometry: {
    type: "Point",
    coordinates
  },
  priorityLevel,
  priorityScore,
  status,
  recommendedAction,
  riskFactors,
  imageryChange,
  inQueue,
  dataSource: "Public GIS layer concept + simulated product signals"
});

export const wildfireBoundary: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "wf-2026-sample",
        name: "Sample Wildfire Affected Area",
        dataSource: "Historical wildfire boundary concept, simplified for prototype"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-117.0815, 33.091],
            [-117.074, 33.101],
            [-117.058, 33.103],
            [-117.041, 33.098],
            [-117.0305, 33.086],
            [-117.033, 33.073],
            [-117.046, 33.0645],
            [-117.0645, 33.063],
            [-117.079, 33.071],
            [-117.085, 33.082],
            [-117.0815, 33.091]
          ]
        ]
      }
    }
  ]
};

export const initialTriageItems: TriageItem[] = [
  parcel(
    "parcel-101",
    "Highland Ridge Residence",
    "SD-APN-271-081-11",
    "18420 Highland Valley Rd",
    [
      [-117.073, 33.0915],
      [-117.0688, 33.0916],
      [-117.0684, 33.0888],
      [-117.0728, 33.0886]
    ],
    "High",
    91,
    "Needs Inspection",
    "Assign field inspection",
    {
      exposureRisk: "Critical",
      incidentProximity: "High",
      assetCriticality: "Medium",
      accessRisk: "High",
      imageryChangeIndicator: "High",
      inspectionCoverageGap: "High"
    },
    "High",
    true
  ),
  parcel(
    "parcel-102",
    "Coyote Wash Parcel",
    "SD-APN-271-081-12",
    "18462 Highland Valley Rd",
    [
      [-117.0684, 33.0914],
      [-117.0642, 33.0916],
      [-117.064, 33.0887],
      [-117.0682, 33.0888]
    ],
    "High",
    87,
    "Unreviewed",
    "Verify with imagery first",
    {
      exposureRisk: "High",
      incidentProximity: "High",
      assetCriticality: "Medium",
      accessRisk: "Medium",
      imageryChangeIndicator: "High",
      inspectionCoverageGap: "High"
    },
    "High",
    true
  ),
  parcel(
    "parcel-103",
    "Oak Spur Residence",
    "SD-APN-271-081-13",
    "18504 Highland Valley Rd",
    [
      [-117.0638, 33.0913],
      [-117.0597, 33.0913],
      [-117.0594, 33.0886],
      [-117.0637, 33.0886]
    ],
    "Medium",
    68,
    "Assigned",
    "Verify with imagery first",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "Medium",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium"
  ),
  parcel(
    "parcel-104",
    "Mesa Edge Parcel",
    "SD-APN-271-081-14",
    "18540 Highland Valley Rd",
    [
      [-117.0592, 33.0912],
      [-117.0551, 33.0911],
      [-117.0548, 33.0884],
      [-117.0591, 33.0885]
    ],
    "Low",
    41,
    "Cleared",
    "Mark as cleared",
    {
      exposureRisk: "Low",
      incidentProximity: "Low",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Medium"
    },
    "Low"
  ),
  parcel(
    "parcel-105",
    "Boulder Gate Property",
    "SD-APN-271-082-01",
    "18385 Wildcat Canyon Spur",
    [
      [-117.075, 33.0878],
      [-117.0707, 33.0878],
      [-117.0706, 33.085],
      [-117.0748, 33.0848]
    ],
    "High",
    84,
    "Needs Inspection",
    "Flag access constraint",
    {
      exposureRisk: "High",
      incidentProximity: "Medium",
      assetCriticality: "Medium",
      accessRisk: "Critical",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium"
  ),
  parcel(
    "parcel-106",
    "Sycamore Lane Parcel",
    "SD-APN-271-082-02",
    "18425 Wildcat Canyon Spur",
    [
      [-117.0704, 33.0877],
      [-117.0661, 33.0877],
      [-117.066, 33.0849],
      [-117.0703, 33.0849]
    ],
    "Medium",
    72,
    "Unreviewed",
    "Assign field inspection",
    {
      exposureRisk: "Medium",
      incidentProximity: "High",
      assetCriticality: "Low",
      accessRisk: "Medium",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium",
    true
  ),
  parcel(
    "parcel-107",
    "Sage Hollow Residence",
    "SD-APN-271-082-03",
    "18478 Wildcat Canyon Spur",
    [
      [-117.0658, 33.0875],
      [-117.0615, 33.0876],
      [-117.0614, 33.0848],
      [-117.0657, 33.0848]
    ],
    "Medium",
    63,
    "Inspected",
    "Monitor / hold for later review",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "Medium"
    },
    "Medium"
  ),
  parcel(
    "parcel-108",
    "Rock Creek Parcel",
    "SD-APN-271-082-04",
    "18516 Wildcat Canyon Spur",
    [
      [-117.0612, 33.0875],
      [-117.057, 33.0874],
      [-117.0568, 33.0847],
      [-117.0611, 33.0847]
    ],
    "Low",
    38,
    "Unreviewed",
    "Monitor / hold for later review",
    {
      exposureRisk: "Low",
      incidentProximity: "Low",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Medium"
    },
    "Low"
  ),
  parcel(
    "parcel-109",
    "Granite Lookout Property",
    "SD-APN-271-083-01",
    "18290 Summit Crest Dr",
    [
      [-117.077, 33.0839],
      [-117.0727, 33.0839],
      [-117.0726, 33.0811],
      [-117.0768, 33.081]
    ],
    "High",
    89,
    "Follow-up Needed",
    "Assign field inspection",
    {
      exposureRisk: "Critical",
      incidentProximity: "High",
      assetCriticality: "Medium",
      accessRisk: "High",
      imageryChangeIndicator: "High",
      inspectionCoverageGap: "Medium"
    },
    "High",
    true
  ),
  parcel(
    "parcel-110",
    "Valley View Parcel",
    "SD-APN-271-083-02",
    "18334 Summit Crest Dr",
    [
      [-117.0723, 33.0838],
      [-117.068, 33.0838],
      [-117.0679, 33.081],
      [-117.0722, 33.081]
    ],
    "Medium",
    59,
    "Unreviewed",
    "Verify with imagery first",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "Medium",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "Medium"
    },
    "Medium"
  ),
  parcel(
    "parcel-111",
    "Chaparral Ridge Lot",
    "SD-APN-271-083-03",
    "18392 Summit Crest Dr",
    [
      [-117.0676, 33.0837],
      [-117.0633, 33.0837],
      [-117.0631, 33.0809],
      [-117.0675, 33.0809]
    ],
    "Low",
    46,
    "Cleared",
    "Mark as cleared",
    {
      exposureRisk: "Low",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Low"
    },
    "Low"
  ),
  parcel(
    "parcel-112",
    "Adobe Canyon Parcel",
    "SD-APN-271-083-04",
    "18438 Summit Crest Dr",
    [
      [-117.0629, 33.0837],
      [-117.0585, 33.0836],
      [-117.0584, 33.0808],
      [-117.0628, 33.0808]
    ],
    "Medium",
    66,
    "Assigned",
    "Verify with imagery first",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "High",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "Medium"
    },
    "Medium"
  ),
  parcel(
    "parcel-113",
    "Dry Creek Residence",
    "SD-APN-271-084-01",
    "18175 Ridge Fire Rd",
    [
      [-117.0785, 33.0797],
      [-117.0742, 33.0798],
      [-117.074, 33.077],
      [-117.0783, 33.0769]
    ],
    "High",
    82,
    "Needs Inspection",
    "Flag access constraint",
    {
      exposureRisk: "High",
      incidentProximity: "High",
      assetCriticality: "Low",
      accessRisk: "Critical",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium",
    true
  ),
  parcel(
    "parcel-114",
    "Cedar Draw Parcel",
    "SD-APN-271-084-02",
    "18222 Ridge Fire Rd",
    [
      [-117.0738, 33.0797],
      [-117.0695, 33.0797],
      [-117.0693, 33.0769],
      [-117.0737, 33.0769]
    ],
    "Medium",
    57,
    "Unreviewed",
    "Monitor / hold for later review",
    {
      exposureRisk: "Medium",
      incidentProximity: "Low",
      assetCriticality: "Low",
      accessRisk: "Medium",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "High"
    },
    "Low"
  ),
  parcel(
    "parcel-115",
    "Willow Bend Residence",
    "SD-APN-271-084-03",
    "18284 Ridge Fire Rd",
    [
      [-117.069, 33.0796],
      [-117.0647, 33.0796],
      [-117.0645, 33.0768],
      [-117.0689, 33.0768]
    ],
    "Low",
    35,
    "Cleared",
    "Mark as cleared",
    {
      exposureRisk: "Low",
      incidentProximity: "Low",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Low"
    },
    "Low"
  ),
  parcel(
    "parcel-116",
    "East Mesa Parcel",
    "SD-APN-271-084-04",
    "18346 Ridge Fire Rd",
    [
      [-117.0643, 33.0795],
      [-117.06, 33.0795],
      [-117.0598, 33.0767],
      [-117.0642, 33.0767]
    ],
    "Medium",
    61,
    "Inspected",
    "Monitor / hold for later review",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "Low",
      accessRisk: "Low",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "Low"
    },
    "Medium"
  ),
  asset(
    "asset-201",
    "San Pasqual Fire Station 84",
    "Fire Station",
    "18411 Highland Valley Rd",
    [-117.0669, 33.0936],
    "High",
    93,
    "Assigned",
    "Assign field inspection",
    {
      exposureRisk: "High",
      incidentProximity: "Medium",
      assetCriticality: "Critical",
      accessRisk: "High",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium",
    true
  ),
  asset(
    "asset-202",
    "Canyon View Elementary",
    "School",
    "18320 Summit Crest Dr",
    [-117.0715, 33.0819],
    "High",
    88,
    "Needs Inspection",
    "Assign field inspection",
    {
      exposureRisk: "High",
      incidentProximity: "Medium",
      assetCriticality: "Critical",
      accessRisk: "Medium",
      imageryChangeIndicator: "High",
      inspectionCoverageGap: "High"
    },
    "High",
    true
  ),
  asset(
    "asset-203",
    "Ridgecrest Water Pump Station",
    "Water Facility",
    "18502 Wildcat Canyon Spur",
    [-117.0616, 33.0862],
    "Medium",
    74,
    "Unreviewed",
    "Verify with imagery first",
    {
      exposureRisk: "Medium",
      incidentProximity: "Medium",
      assetCriticality: "High",
      accessRisk: "Medium",
      imageryChangeIndicator: "Medium",
      inspectionCoverageGap: "High"
    },
    "Medium",
    true
  ),
  asset(
    "asset-204",
    "County Road Yard East",
    "Public Works",
    "18205 Ridge Fire Rd",
    [-117.0762, 33.0778],
    "Medium",
    69,
    "Follow-up Needed",
    "Flag access constraint",
    {
      exposureRisk: "Medium",
      incidentProximity: "High",
      assetCriticality: "High",
      accessRisk: "High",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Medium"
    },
    "Low"
  ),
  asset(
    "asset-205",
    "Valley Emergency Clinic",
    "Hospital",
    "18565 Highland Valley Rd",
    [-117.0543, 33.0898],
    "Medium",
    71,
    "Inspected",
    "Monitor / hold for later review",
    {
      exposureRisk: "Medium",
      incidentProximity: "Low",
      assetCriticality: "Critical",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Low"
    },
    "Low"
  ),
  asset(
    "asset-206",
    "Temporary Staging Lot Bravo",
    "Public Works",
    "18410 Ridge Fire Rd",
    [-117.0623, 33.0781],
    "Low",
    49,
    "Cleared",
    "Mark as cleared",
    {
      exposureRisk: "Low",
      incidentProximity: "Low",
      assetCriticality: "Medium",
      accessRisk: "Low",
      imageryChangeIndicator: "Low",
      inspectionCoverageGap: "Low"
    },
    "Low"
  )
];

export const reportedIncidents: Incident[] = [
  {
    id: "incident-1",
    type: "Structure Damage",
    severity: "Severe",
    coordinates: [-117.0714, 33.0902],
    label: "Resident report, 08:40"
  },
  {
    id: "incident-2",
    type: "Blocked Access",
    severity: "High",
    coordinates: [-117.0748, 33.0855],
    label: "Deputy report, 09:05"
  },
  {
    id: "incident-3",
    type: "Smoke Report",
    severity: "Moderate",
    coordinates: [-117.0616, 33.0892],
    label: "Call center, 09:25"
  },
  {
    id: "incident-4",
    type: "Utility Issue",
    severity: "High",
    coordinates: [-117.0672, 33.0861],
    label: "Utility crew, 09:45"
  },
  {
    id: "incident-5",
    type: "Structure Damage",
    severity: "High",
    coordinates: [-117.0763, 33.0783],
    label: "Field observer, 10:15"
  },
  {
    id: "incident-6",
    type: "Blocked Access",
    severity: "Severe",
    coordinates: [-117.079, 33.0808],
    label: "Roads division, 10:24"
  },
  {
    id: "incident-7",
    type: "Smoke Report",
    severity: "Moderate",
    coordinates: [-117.0588, 33.083],
    label: "Resident report, 10:41"
  },
  {
    id: "incident-8",
    type: "Utility Issue",
    severity: "Moderate",
    coordinates: [-117.0642, 33.0924],
    label: "Dispatch note, 10:55"
  },
  {
    id: "incident-9",
    type: "Structure Damage",
    severity: "High",
    coordinates: [-117.0688, 33.0812],
    label: "Imagery review cue, 11:10"
  },
  {
    id: "incident-10",
    type: "Blocked Access",
    severity: "High",
    coordinates: [-117.0528, 33.0868],
    label: "Public works, 11:18"
  }
];

export const roadAccess: RoadAccess[] = [
  {
    id: "road-1",
    name: "Highland Valley Road",
    accessStatus: "Limited",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.082, 33.0924],
        [-117.073, 33.092],
        [-117.064, 33.0919],
        [-117.053, 33.0912],
        [-117.043, 33.0897]
      ]
    }
  },
  {
    id: "road-2",
    name: "Wildcat Canyon Spur",
    accessStatus: "Blocked",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.077, 33.0872],
        [-117.071, 33.0864],
        [-117.065, 33.0861],
        [-117.058, 33.0858]
      ]
    }
  },
  {
    id: "road-3",
    name: "Summit Crest Drive",
    accessStatus: "Open",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.079, 33.0818],
        [-117.071, 33.0819],
        [-117.063, 33.0818],
        [-117.056, 33.0815]
      ]
    }
  },
  {
    id: "road-4",
    name: "Ridge Fire Road",
    accessStatus: "Limited",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.08, 33.0779],
        [-117.073, 33.0778],
        [-117.066, 33.0778],
        [-117.059, 33.0777]
      ]
    }
  },
  {
    id: "road-5",
    name: "Coyote Wash Connector",
    accessStatus: "Open",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.0665, 33.094],
        [-117.067, 33.09],
        [-117.0672, 33.086],
        [-117.0674, 33.082],
        [-117.0675, 33.078]
      ]
    }
  },
  {
    id: "road-6",
    name: "Granite Lookout Lane",
    accessStatus: "Blocked",
    geometry: {
      type: "LineString",
      coordinates: [
        [-117.0774, 33.083],
        [-117.0794, 33.0812],
        [-117.0802, 33.0788]
      ]
    }
  }
];

export const incidentsFeatureCollection: FeatureCollection<Point, Incident> = {
  type: "FeatureCollection",
  features: reportedIncidents.map((incident) => ({
    type: "Feature",
    properties: incident,
    geometry: {
      type: "Point",
      coordinates: incident.coordinates
    }
  }))
};

export const roadAccessFeatureCollection: FeatureCollection<LineString, Omit<RoadAccess, "geometry">> = {
  type: "FeatureCollection",
  features: roadAccess.map((road) => ({
    type: "Feature",
    properties: {
      id: road.id,
      name: road.name,
      accessStatus: road.accessStatus
    },
    geometry: road.geometry
  }))
};

export const defaultLayerVisibility = {
  wildfire: true,
  parcels: true,
  assets: true,
  incidents: true,
  roads: true,
  priority: true
};
