# Wildfire Inspection Triage Map

## One-Page PRD v0.1

### Product Summary

Wildfire Inspection Triage Map is a geospatial decision-support prototype for San Diego County emergency management and public works teams. It helps users prioritize property and public-asset inspections after a wildfire by combining affected-area boundaries, public GIS data, reported incidents, access constraints, imagery-change indicators, and inspection workflow status.

### Problem

After a wildfire, local government teams need to quickly determine which properties, roads, and public assets should be inspected first. The affected area may already be known, but inspection capacity is limited, road access may be constrained, and damage signals are often scattered across maps, resident reports, imagery, and asset databases.

### Product Opportunity

Turn fragmented geospatial and operational signals into a prioritized inspection workflow, helping teams move from situational awareness to field action.

### Target Users

**Primary Users:**
Emergency management and public works operations teams responsible for coordinating post-wildfire inspection priorities.

**Supporting Users:**
GIS analysts, field inspection coordinators, property assessment teams, and public asset management teams.

### MVP Goal

Design and build a polished map-based prototype that allows users to:

1. View a wildfire affected-area boundary.
2. Overlay parcels, public assets, roads, reported incidents, and access constraints.
3. Click a parcel or public asset to understand its inspection priority.
4. Review explainable priority factors and recommended actions.
5. Move high-priority items into an inspection queue and update workflow status.

### MVP Scope

**Included in MVP:**

* Dark interactive map interface.
* Wildfire affected-area layer.
* Parcel and public-asset layers.
* Reported incident markers.
* Road access / constraint layer.
* Clickable triage panel for selected parcels and assets.
* Inspection priority level and numeric score.
* Explainable priority factors.
* Recommended action.
* Inspection queue.
* Status workflow.
* Product Notes tab with product goal, assumptions, user story, acceptance criteria, and roadmap.

**Out of Scope for MVP:**

* User authentication.
* Backend database.
* Real-time dispatch.
* Official emergency response system integration.
* Full routing optimization.
* Real AI damage detection.
* Production-level parcel or asset management.

### Data Strategy

Use real public GIS data where possible for parcels, roads, public assets, and historical wildfire boundaries. Use simulated product data for reported incidents, imagery-change indicators, inspection statuses, priority scores, and workflow actions.

**Real / public data:**

* Historical wildfire boundary, simplified and clipped for prototype use.
* Parcels / properties.
* Roads.
* Fire stations.
* Schools.
* Hospitals.
* Selected public works or road assets where available.

**Simulated product data:**

* Reported incidents.
* Imagery-change indicators.
* Inspection status.
* Priority score.
* Recommended action.
* Workflow history.

### Priority Logic

Each parcel or public asset receives both a priority level and numeric score.

Example:

**Priority: High — 87/100**

Priority factors include:

* Exposure Risk.
* Incident Proximity.
* Asset Criticality.
* Access Risk.
* Imagery Change Indicator.
* Inspection Coverage Gap.

Priority output:

* **High Priority:** inspect first.
* **Medium Priority:** review after high-priority queue.
* **Low Priority:** monitor or clear after remote review.

### Core User Flow

1. User opens the wildfire triage map.
2. User reviews affected area, incident points, parcels, assets, and road constraints.
3. User clicks a parcel or public asset.
4. The triage panel shows priority score, risk factors, recommended action, imagery-change concept, and status.
5. User adds or reviews the item in the inspection queue.
6. User updates status from Unreviewed to Needs Inspection, Assigned, Inspected, Cleared, or Follow-up Needed.

### Key Product Decisions

**Decision 1: Treat affected area as an input, not a model output.**
The product starts from an external wildfire boundary and focuses on triage, prioritization, and workflow.

**Decision 2: Use explainable scoring instead of black-box risk labels.**
Priority is based on visible factors such as exposure, nearby reports, asset criticality, access risk, imagery-change indicators, and inspection coverage.

**Decision 3: Build around operational workflow, not just map visualization.**
The product includes an inspection queue and status tracking so users can move from map review to field action.

**Decision 4: Keep the interface lightweight.**
The MVP focuses on high-value layers, triage cards, and next actions instead of a dense GIS dashboard.

### User Story

As a public works operations coordinator, I want to view high-priority parcels and public assets in an inspection queue so that I can assign limited field teams to the most urgent locations first.

### Acceptance Criteria

* User can view wildfire affected area, parcels, public assets, reported incidents, and road access constraints on the map.
* User can click a parcel or public asset and see priority level, numeric score, risk factors, recommended action, and inspection status.
* User can filter or review inspection queue items by priority and status.
* User can update an item's inspection status.
* User can understand whether each data layer is based on public GIS data or simulated product data.
* User can view product notes explaining MVP scope, data assumptions, and future roadmap.

### Future Roadmap

**Phase 1: Triage MVP**
Interactive map, priority scoring, triage panel, inspection queue, status workflow, and product notes.

**Phase 2: Field Operations Support**
Team assignment, mobile-friendly inspection updates, exportable inspection lists, and simple route planning.

**Phase 3: Imagery and Analytics Enhancement**
Before / after imagery comparison, automated change indicators, event comparison, reporting dashboard, and integration-ready API concepts.
