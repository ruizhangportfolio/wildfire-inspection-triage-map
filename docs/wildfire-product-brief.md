# Wildfire Inspection Triage Map  
## Product Requirements Brief

**Project type:** Portfolio prototype  
**Role:** Product Owner / Product Manager / Web GIS Prototype Builder  
**Domain:** Government workflows, Web GIS, disaster response, public works, geospatial decision support  
**Prototype status:** Phase 1 MVP  
**Live demo:** https://wildfire-inspection-triage-map.vercel.app  
**GitHub repo:** https://github.com/ruizhangportfolio/wildfire-inspection-triage-map  

---

## 1. Executive Summary

Wildfire Inspection Triage Map is a Web GIS decision-support prototype for helping local government teams prioritize post-wildfire property and public-asset inspections.

This brief demonstrates how I approached the project as a product manager, not only as a builder:

- Defined a post-wildfire inspection triage workflow for government operations teams.
- Translated fragmented geospatial and operational signals into explainable product requirements.
- Scoped a Phase 1 MVP with clear non-goals and product trade-offs.
- Designed a transparent priority logic that supports user trust rather than replacing human judgment.
- Outlined future integration paths for public GIS services, aerial imagery, imagery-change detection, and government workflow pilots.

The prototype uses a real Web GIS basemap for geographic context and synthetic operational GeoJSON layers to demonstrate the workflow. It is not an official emergency-response system.

---

## 2. Product Context

After a wildfire, local government teams often need to coordinate inspections across affected parcels, roads, public assets, reported incidents, and infrastructure access constraints. The problem is not simply visualizing the affected area. The harder operational problem is deciding what should be inspected first, why it should be prioritized, and how teams can move from map review to field action.

This prototype explores how a map-based product could help emergency management, public works, GIS, and inspection teams review post-event signals in one workflow and turn them into a prioritized inspection queue.

The Phase 1 MVP focuses on triage and explainability. It does not attempt to predict fire spread, dispatch emergency responders, optimize field routes, or serve as a production government system.

---

## 3. Product Thesis

Aerial imagery and GIS layers create product value only when they help government teams make faster, explainable operational decisions.

This prototype explores how parcel context, imagery-change signals, reported incidents, road access, and public-asset data could be packaged into a government-facing inspection triage workflow — not just another map viewer.

---

## 4. Customer Problem

After a wildfire, local government teams do not simply need to “see a map.” They need to decide which properties, roads, and public assets should be inspected first when inspection capacity is limited, signals are fragmented, and multiple departments need a shared explanation for prioritization.

The affected area may already be known. The operational challenge is turning scattered geospatial and field signals into an inspection queue that teams can trust, explain, and act on.

Common pain points include:

- Inspection capacity is limited immediately after a wildfire.
- Damage signals may be distributed across maps, resident reports, road conditions, parcel records, asset inventories, and imagery.
- GIS context and operational status are often separated across different tools.
- Teams need to justify why one property, road, or asset is prioritized before another.
- Field teams need clear next actions, not just visual map layers.
- Government users need transparency and workflow confidence before relying on prioritization logic.

---

## 5. Target Users & Stakeholders

### Economic buyer

City or county government, emergency management leadership, and public works leadership responsible for disaster response readiness, inspection coordination, and operational efficiency.

### Primary user

Inspection coordinator or public works operations manager responsible for prioritizing post-event field reviews and coordinating limited inspection capacity.

### Technical user

GIS analyst responsible for maintaining parcel layers, public assets, incident data, road access constraints, and map context.

### Field user

Damage assessment or inspection teams who need clear assignments, status context, and prioritization rationale.

### Internal product stakeholders

Sales engineering, customer success, product, and engineering teams supporting government solution discovery, demos, pilots, implementation planning, and feedback loops.

---

## 6. MVP Scope

The Phase 1 MVP focuses on validating the core inspection-prioritization workflow.

### In scope

- Prioritized inspection queue
- Map-to-triage workflow
- Explainable priority scoring
- Parcel and public-asset review
- Reported incident and road-access context
- Status review / workflow update
- Layer visibility controls
- Synthetic operational GeoJSON data model
- Integration-ready map layer structure

### Non-goals for Phase 1

- Fire-spread prediction
- Real-time emergency dispatch
- Routing optimization
- Production government data integration

Authentication, backend persistence, mobile field forms, field routing, and user permissions were intentionally left out of Phase 1 so the prototype could focus on the core triage workflow.

---

## 7. Product Requirements

### Requirement 01 — Prioritized inspection queue

**Pain point:**  
Inspection capacity is limited after a wildfire, but decision signals are scattered across maps, resident reports, road conditions, asset data, and imagery.

**Product requirement:**  
Provide a ranked inspection queue that combines geospatial and operational signals into an explainable priority order.

**Acceptance criteria:**  
Each queue item shows priority level, score, recommended action, workflow status, and contributing factors.

**Priority:**  
P0 for Phase 1 because inspection prioritization is the core workflow.

---

### Requirement 02 — Connected map and triage workflow

**Pain point:**  
Map context and operational follow-up are often disconnected.

**Product requirement:**  
Keep parcel selection, map highlight, triage details, and queue movement connected in one workflow.

**Acceptance criteria:**  
Selecting a parcel or queue item updates the map, highlights the selected feature, and displays the matching triage record.

**Priority:**  
P0 for Phase 1 because the product must connect spatial review with operational action.

---

### Requirement 03 — Explainable priority rationale

**Pain point:**  
Government teams need to justify why one property or asset is inspected before another.

**Product requirement:**  
Expose factor-level priority rationale instead of showing only a single score.

**Acceptance criteria:**  
The triage panel displays visible priority factors such as exposure risk, incident proximity, asset criticality, road access, imagery-change signal, and workflow status.

**Priority:**  
P0 for Phase 1 because explainability is required for trust and cross-team alignment.

---

### Requirement 04 — Usable Web GIS interaction model

**Pain point:**  
Users need operational control without overwhelming the map interface.

**Product requirement:**  
Provide layer controls, basemap selection, hover feedback, click selection, and queue-to-map navigation without cluttering the primary map view.

**Acceptance criteria:**  
Users can toggle key layers, select features, review item details, and navigate from queue to map while preserving geographic context.

**Priority:**  
P1 for Phase 1 because it improves usability after the core triage workflow is working.

---

## 8. Product Trade-offs

### 01. Operational triage over fire prediction

I treated the fire perimeter as an input rather than building a fire-spread model because the MVP problem was post-event inspection coordination, not emergency forecasting.

### 02. Explainable scoring over black-box automation

Government users need to justify prioritization decisions, so I exposed priority factors instead of presenting an unexplained AI score.

### 03. Workflow panel over map popups

A persistent side panel supports repeated review, status updates, and queue-based work better than isolated map popups.

### 04. Synthetic data over premature live integration

I used synthetic GeoJSON to validate the workflow before investing in ArcGIS REST, FeatureServer, or customer-specific data integrations.

### 05. Decision-support MVP over full field-operations platform

I kept routing, authentication, mobile field forms, and backend persistence out of Phase 1 so the prototype could focus on the core inspection-prioritization workflow.

---

## 9. Priority Logic

The prototype uses a transparent priority score to demonstrate how operational signals could be converted into an inspection queue. The scoring model is synthetic, but the product logic is designed to be explainable and integration-ready.

Priority is represented through visible factors rather than an unexplained score.

### Example signal categories

- Exposure risk
- Incident proximity
- Asset criticality
- Road access constraints
- Imagery-change signal
- Workflow status

The goal is not to automate government judgment. The goal is to help teams understand which items need attention first and why.

---

## 10. Core User Workflow

1. User opens the wildfire inspection map.
2. User reviews affected-area context, parcels, incidents, road access, and public assets.
3. User selects a parcel, asset, or inspection queue item.
4. The map highlights the selected feature.
5. The triage panel displays priority level, score, recommended action, workflow status, and factor-level rationale.
6. User reviews or updates the item status.
7. User moves through the queue to prioritize field inspection decisions.

The workflow is designed around a repeated operational loop: review, understand, prioritize, and act.

---

## 11. What I Built

I built the Phase 1 prototype to validate the core product workflow before adding production data integrations or field-operations complexity.

The prototype includes:

- Interactive Web GIS map
- Parcel and public-asset layers
- Reported incident layer
- Road access constraints
- Priority scoring
- Triage panel
- Inspection queue
- Layer controls
- Hover and click interactions
- Queue-to-map navigation
- Synthetic GeoJSON data model
- Integration-ready layer structure

---

## 12. Web GIS Implementation

The prototype uses MapLibre GL JS for basemap rendering, GeoJSON sources and layers, layer visibility toggles, feature hover and click selection, selected-feature highlighting, and queue-to-map camera navigation.

Phase 1 uses synthetic operational GeoJSON data while preserving a structure that could later support public GIS datasets, ArcGIS REST services, FeatureServer endpoints, or customer-specific government GIS layers.

The implementation is intentionally lightweight. It validates the product workflow before introducing production architecture, authentication, database persistence, field routing, or customer-specific data pipelines.

---

## 13. Data Strategy

### Real geographic context

The basemap provides real geographic context for the prototype environment.

### Synthetic operational layers

Operational layers are synthetic and used for product demonstration, including:

- Wildfire affected-area boundary
- Parcels
- Public assets
- Reported incidents
- Road access constraints
- Priority scores
- Imagery-change indicators
- Workflow statuses
- Recommended actions

This separation is intentional. It allows the prototype to demonstrate the product workflow without implying access to official emergency-response data or production government systems.

---

## 14. Success Metrics I Would Track

Because this is a portfolio prototype, the following are proposed validation metrics rather than measured production results.

### Workflow efficiency

- Time to identify top inspection candidates
- Number of clicks from map selection to recommended action
- Reduction in manual switching between maps, reports, and spreadsheets

### Trust and explainability

- Percent of priority decisions with visible rationale
- Coordinator confidence in priority ranking during user testing
- User comprehension of why an item is high, medium, or low priority

### Pilot and business readiness

- Percent of queue items with clear next action
- Pilot readiness for public works or emergency management workflows
- Sales demo usefulness for government disaster-response use cases

---

## 15. What I Would Validate Next

### 01. User trust in priority explanations

Test whether inspection coordinators understand and trust the factor-level rationale behind priority scores.

### 02. Signal importance

Validate which signals matter most to government users: imagery change, parcel type, road access, incident reports, or asset criticality.

### 03. Workflow speed

Measure whether users can move from map review to inspection action faster than with separate map, spreadsheet, and reporting workflows.

### 04. Data integration readiness

Explore integration paths for public GIS datasets, ArcGIS REST services, FeatureServer endpoints, and high-resolution aerial imagery products.

### 05. Pilot readiness

Identify what would be required for a public works or emergency management pilot, including data availability, user permissions, workflow status persistence, reporting needs, and operational handoff.

---

## 16. Future Integration Opportunities

For a geospatial intelligence product, the opportunity is not just displaying imagery or GIS layers. The opportunity is packaging those signals into government workflows that support property assessment, public safety, asset management, disaster response, and field operations.

Potential future integrations include:

- Public GIS datasets
- ArcGIS REST / FeatureServer endpoints
- High-resolution aerial imagery
- Imagery-change detection
- Parcel and property intelligence
- Public asset and infrastructure layers
- Road access and transportation network data
- Field assignment and inspection status persistence
- Exportable inspection lists and stakeholder reporting
- Sales engineering demo scenarios
- Customer success feedback loops

These integrations would help turn the Phase 1 prototype from a standalone workflow demo into a configurable government solution concept.

---

## 17. Prototype Disclaimer

This is a portfolio prototype, not an official emergency-response product.

Phase 1 uses local synthetic operational GeoJSON for parcels, incidents, public assets, road constraints, priority scores, imagery-change indicators, statuses, and recommended actions. The basemap provides real geographic context, but operational layers and workflow signals are simulated for product demonstration.

The prototype is intended to demonstrate product thinking, Web GIS workflow design, MVP scoping, explainable prioritization logic, and future integration planning. It should not be used for real emergency response, public safety operations, or official inspection prioritization.