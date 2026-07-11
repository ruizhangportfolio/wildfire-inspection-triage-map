# Wildfire Inspection Triage Map

## Product Requirements Brief

**Project type:** Independent product case study

**Contribution:** Product strategy, workflow design, requirements, trade-offs, validation planning, and Web GIS prototyping

**Build approach:** AI-assisted end-to-end prototype implementation

**Domain:** Local government, disaster response, public works, Web GIS, and geospatial decision support

**Prototype status:** Working Phase 1 MVP using synthetic operational data

**Evidence status:** Desk research, domain reasoning, and prototype exploration; not yet validated through customer interviews or production use

**Case study:** https://wildfire-case-study.vercel.app

**Live demo:** https://wildfire-inspection-triage-map.vercel.app

**GitHub repo:** https://github.com/ruizhangportfolio/wildfire-inspection-triage-map


---

## 1. Executive Summary

Wildfire Inspection Triage Map is an independent Web GIS product case study that explores how local government teams could prioritize post-wildfire property and public-asset inspections.

The case demonstrates how I approached an ambiguous government workflow as a product manager and prototype builder:

- Framed a post-wildfire inspection problem hypothesis.
- Defined an assumed stakeholder map for government operations.
- Translated the proposed workflow into testable product requirements.
- Scoped a Phase 1 MVP with explicit non-goals and trade-offs.
- Designed transparent priority logic intended to support, not replace, human judgment.
- Built a working Web GIS prototype using AI coding tools.
- Defined a validation framework for workflow value, decision quality, operational risk, and pilot readiness.
- Developed Nearmap integration hypotheses for imagery, property intelligence, and existing government GIS workflows.

The prototype uses a real basemap for geographic context and synthetic operational GeoJSON for product demonstration. It is not an official emergency-response system and does not represent real inspection recommendations or measured outcomes.

---

## 2. Evidence and Build Status

This project is a pre-validation portfolio prototype. The problem framing, stakeholder needs, requirements, scoring factors, and integration paths are hypotheses to test, not customer-approved findings.

### Current evidence

- Desk research into post-event inspection and government GIS workflows.
- Domain reasoning based on operational coordination, spatial data, and decision-support patterns.
- A working prototype that makes the proposed workflow concrete and testable.
- No customer interviews or usability studies have been completed.
- No production deployment, adoption, revenue, or measured operational impact is claimed.

### Product ownership and AI-assisted implementation

I defined the product concept, workflow, requirements, MVP scope, trade-offs, priority logic, validation plan, and integration hypotheses. I then used AI coding tools to implement the full application end to end.

AI accelerated implementation, but the product framing, prioritization choices, scope decisions, and evaluation strategy remain my responsibility.

---

## 3. Product Thesis

Aerial imagery and GIS layers create product value only when they help government teams make faster, explainable operational decisions.

The product thesis is that parcel context, imagery-change signals, reported incidents, road access, public-asset data, and workflow status could be packaged into a shared inspection-triage workflow, not just another map viewer.

---

## 4. Problem Hypothesis

After a wildfire, local government teams may need to decide which properties, roads, and public assets to inspect first while field capacity is limited and decision signals are split across maps, reports, spreadsheets, and departments.

The product hypothesis is that a shared, explainable triage queue could help teams move from situational awareness to a defensible inspection plan more efficiently.

Potential pain points to validate include:

- Inspection capacity may be limited immediately after a wildfire.
- Damage signals may be distributed across affected-area boundaries, incident reports, road conditions, parcel records, asset inventories, imagery, and local knowledge.
- GIS context and operational status may be separated across different tools.
- Coordinators may need to explain why one property, road, or asset is prioritized before another.
- Field teams may need clear next actions and status context, not only visual map layers.

This framing is based on desk research and domain reasoning. It has not yet been tested through interviews with emergency management, public works, GIS, or inspection teams.

---

## 5. Assumed Users and Stakeholders

The following stakeholder map guided the prototype design. Roles, decision rights, buying authority, and workflow ownership would need validation during discovery.

### Economic buyer

City or county government, emergency management leadership, or public works leadership responsible for disaster readiness, inspection coordination, and operational efficiency.

### Primary user

Inspection coordinator or public works operations manager responsible for prioritizing post-event field reviews and coordinating limited inspection capacity.

### Technical user

GIS analyst responsible for parcel, asset, incident, road-access, imagery, and map-context layers.

### Field user

Damage-assessment or inspection teams who need clear assignments, status context, and prioritization rationale.

### Potential internal product stakeholders

Sales engineering, customer success, product, and engineering teams supporting solution discovery, demos, pilots, implementation planning, and feedback loops.

---

## 6. MVP Scope and Non-Goals

The Phase 1 MVP makes the core inspection-prioritization workflow concrete enough to review and test.

### In scope

- Prioritized inspection queue.
- Connected map-to-triage workflow.
- Explainable priority scoring.
- Parcel and public-asset review.
- Reported incident and road-access context.
- Status review and workflow update.
- Layer visibility controls.
- Synthetic operational GeoJSON data model.
- Integration-ready map-layer structure.

### Non-goals for Phase 1

- Fire-spread prediction.
- Real-time emergency dispatch.
- Routing optimization.
- Production government data integration.
- Authentication and role-based permissions.
- Backend persistence and audit logging.
- Mobile field forms.

These capabilities were intentionally excluded so the prototype could focus on the inspection-triage decision loop.

---

## 7. Hypothesis-Driven Product Requirements

These requirements translate the proposed workflow into testable product behavior. They are not customer-approved specifications.

### Requirement 01 - Ranked inspection queue

**Pain point hypothesis:** Inspection capacity is limited after a wildfire and decision signals are scattered.

**Product requirement:** Rank inspection candidates using visible geospatial and operational signals.

**Prototype acceptance criteria:** Each queue item shows priority, score, rationale, recommended action, and workflow status.

**Phase 1 priority:** P0 because prioritization is the core workflow.

### Requirement 02 - Connected map-to-triage workflow

**Pain point hypothesis:** Map context and operational follow-up are often disconnected.

**Product requirement:** Keep map selection, feature highlight, triage detail, and queue movement connected.

**Prototype acceptance criteria:** Selecting a parcel or queue item updates the map, highlights the feature, and displays the matching triage record.

**Phase 1 priority:** P0 because spatial review must connect to operational action.

### Requirement 03 - Explainable priority rationale

**Pain point hypothesis:** Government teams need to justify why one property or asset is inspected before another.

**Product requirement:** Expose factor-level priority rationale instead of showing only a single score.

**Prototype acceptance criteria:** The triage panel shows factors such as exposure risk, incident proximity, asset criticality, road access, imagery-change signal, and workflow status.

**Phase 1 priority:** P0 because explainability is central to trust and cross-team alignment.

### Requirement 04 - Usable Web GIS interaction model

**Pain point hypothesis:** Users need operational control without overwhelming the map interface.

**Product requirement:** Provide layer controls, basemap selection, hover feedback, click selection, and queue-to-map navigation without cluttering the primary map view.

**Prototype acceptance criteria:** Users can toggle key layers, select features, review item details, and navigate from queue to map while preserving geographic context.

**Phase 1 priority:** P1 because it supports the core triage workflow.

---

## 8. Product Trade-offs

### 01. Operational triage over fire prediction

I treated the fire perimeter as an input rather than building a fire-spread model because the MVP problem was post-event inspection coordination, not emergency forecasting.

### 02. Explainable scoring over black-box automation

Government users may need to justify prioritization decisions, so I exposed priority factors instead of presenting an unexplained AI score.

### 03. Workflow panel over map popups

A persistent side panel supports repeated review, status updates, and queue-based work better than isolated map popups.

### 04. Synthetic data over premature live integration

I used synthetic GeoJSON to prototype and make the workflow testable before investing in ArcGIS REST, FeatureServer, imagery, or customer-specific integrations.

### 05. Decision-support MVP over a full field-operations platform

I kept routing, authentication, mobile field forms, and backend persistence out of Phase 1 so the prototype could focus on the inspection-prioritization workflow.

---

## 9. Priority Logic and Governance Questions

The prototype uses a transparent synthetic priority score to demonstrate how operational signals could be converted into an inspection queue.

### Example signal categories

- Exposure risk.
- Incident proximity.
- Asset criticality.
- Road-access constraints.
- Imagery-change signal.
- Workflow status.

The goal is not to automate government judgment. The goal is to help teams understand which items may need attention first and why.

A production design would also need to answer:

- How recent must each data source be?
- What happens when a required signal is missing?
- How are confidence and uncertainty displayed?
- Who owns and approves scoring weights?
- Can users override a recommendation and record a reason?
- Is there an audit history of source data, model version, weights, scores, overrides, and status changes?
- How are false positives and critical misses reviewed?

---

## 10. Core User Workflow

1. User opens the wildfire inspection map.
2. User reviews affected-area context, parcels, incidents, road access, and public assets.
3. User selects a parcel, asset, or inspection-queue item.
4. The map highlights the selected feature.
5. The triage panel displays priority, recommended action, workflow status, and factor-level rationale.
6. User reviews or updates the item status.
7. User moves through the queue to prioritize field-inspection decisions.

The proposed operational loop is: review, understand, prioritize, and act.

---

## 11. What I Built

I defined the product concept, workflow, requirements, and trade-offs, then used AI coding tools to implement the full application end to end. The Phase 1 prototype makes the core workflow testable before adding production integrations or field-operations complexity.

The prototype includes:

- Interactive Web GIS map.
- Parcel and public-asset layers.
- Reported incident layer.
- Road-access constraints.
- Priority scoring.
- Persistent triage panel.
- Inspection queue.
- Layer controls.
- Hover and click interactions.
- Queue-to-map navigation.
- Synthetic GeoJSON data model.
- Integration-ready layer structure.

---

## 12. Web GIS Implementation and Data Strategy

The prototype uses MapLibre GL JS for basemap rendering, GeoJSON sources and layers, visibility controls, feature hover and click selection, selected-feature highlighting, and queue-to-map camera navigation.

### Real geographic context

The basemap provides real geographic context for the prototype environment.

### Synthetic operational layers

Operational layers are synthetic and used for product demonstration, including:

- Wildfire affected-area boundary.
- Parcels and public assets.
- Reported incidents.
- Road-access constraints.
- Priority scores and imagery-change indicators.
- Workflow statuses and recommended actions.

The source structure could later support public GIS datasets, ArcGIS REST services, FeatureServer endpoints, aerial imagery, or customer-specific government layers.

---

## 13. What I Would Validate Next

### 01. Problem and stakeholder assumptions

Interview emergency management, public works, GIS, inspection, and field-operations participants to verify the problem, ownership, current tools, buying process, and cost of the existing workflow.

### 02. Priority rationale comprehension

Test whether coordinators can correctly explain the factors, data recency, and uncertainty behind a priority recommendation.

### 03. Signal importance and risk

Validate which signals matter, how experts define critical candidates, and what false-positive and false-negative costs are acceptable.

### 04. Workflow value

Compare the prototype with the current workflow using a predefined scenario, measuring speed, unassisted completion, decision quality, and critical misses.

### 05. Data and pilot readiness

Assess data freshness, coverage, schema, permissions, persistence, reporting, integration, auditability, and operational handoff requirements.

---

## 14. Validation Metrics I Would Track

For this pre-validation prototype, I would first test whether the workflow improves speed without degrading decision quality, while treating critical misses and data readiness as guardrails. These are proposed metrics, not measured results.

### Workflow outcome

- **Review-ready queue cycle time:** Median time from opening a predefined scenario to confirming a defensible inspection queue, compared with the current-workflow baseline.
- **Unassisted task completion rate:** Percent of test users completing parcel review, rationale review, and status update without facilitator help.

### Decision quality and explainability

- **Priority agreement rate:** Percent of expert-defined high-priority candidates included in the user's final inspection queue.
- **Rationale comprehension rate:** Percent of users who correctly identify the main priority factors, source recency, and uncertainty behind a recommendation.

### Operational risk and pilot readiness

- **Critical miss rate:** Percent of expert-defined critical candidates omitted from the user's final inspection queue.
- **Required-layer readiness:** Percent of required data layers meeting freshness, coverage, schema, permission, and auditability criteria.

I would establish the baseline and define acceptable thresholds with domain experts before setting pilot success criteria.

---

## 15. Nearmap Integration Hypotheses

The opportunity is not simply to add another imagery layer. It is to test how current imagery and derived property intelligence could improve a government decision workflow while preserving traceability and existing GIS governance.

### 01. Use post-event imagery freshness as an operational signal

Evaluate whether recent aerial capture and historical comparison can replace the prototype's simulated imagery-change input.

### 02. Add AI-derived property signals with visible confidence

Test which property attributes improve prioritization while exposing source date, confidence, and missing-data states.

### 03. Deliver insights into existing government GIS workflows

Explore Esri and API integration paths so imagery and derived insights support current public-works systems instead of creating another isolated map viewer.

These are application hypotheses for a future pilot, not claims about an existing Nearmap implementation.

---

## 16. Prototype Disclaimer

This is an independent portfolio case study, not an official emergency-response product.

Phase 1 uses local synthetic operational GeoJSON for parcels, incidents, public assets, road constraints, priority scores, imagery-change indicators, statuses, and recommended actions. The basemap provides real geographic context, but the operational layers and workflow signals are simulated.

The prototype should not be used for real emergency response, public-safety operations, or official inspection prioritization.
