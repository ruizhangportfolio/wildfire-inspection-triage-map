# Wildfire Inspection Triage Map
## Product Requirements Brief

### 1. Product Context

Wildfire Inspection Triage Map is a Phase 1 portfolio prototype for post-wildfire inspection prioritization in San Diego County. It combines a real dark basemap for geographic context with local synthetic operational GeoJSON layers for wildfire boundary, parcels, public assets, incidents, road access, priority signals, and workflow status.

The prototype is designed to demonstrate product thinking for a GIS decision-support workflow, not to represent live emergency operations or real inspection results.

### 2. Product Thesis

Post-wildfire inspection teams need more than a map. They need a clear way to translate scattered geospatial and operational signals into a prioritized queue of field actions.

The product thesis is that a focused Web GIS interface can help operations teams move from situational awareness to inspection triage by combining location context, priority logic, explainability, and workflow status in one view.

### 3. Customer Problem

After a wildfire, public agencies may need to review many parcels, roads, and public assets with limited field capacity. Damage signals can come from different places: affected-area boundaries, reported incidents, road access constraints, imagery-change indicators, asset records, and local knowledge.

Without a shared triage workflow, teams may spend too much time switching between maps, spreadsheets, reports, and status trackers before deciding what should be inspected first.

### 4. Target Users & Stakeholders

- Emergency management and public works operations coordinators who need to prioritize inspection work.
- GIS analysts who prepare and maintain spatial layers for operational review.
- Field inspection coordinators who need a queue of locations with clear next actions.
- Asset and infrastructure teams responsible for public facilities, roads, and service continuity.
- Leadership or cross-functional stakeholders who need a transparent view of prioritization logic.

### 5. MVP Scope

Phase 1 focuses on a polished, map-based triage workflow:

- Dark Web GIS map with real basemap context.
- Synthetic wildfire affected-area boundary.
- Synthetic parcel, public asset, incident, and road-access layers.
- Click and hover interactions for map features.
- Right-side Triage panel with item details, priority score, workflow status, recommended action, priority factors, and imagery concept.
- Inspection Queue tab with priority and status context.
- Product Notes tab explaining assumptions, scope, and future integration readiness.
- Compact Layers control with basemap selector, layer toggles, and collapsed legend.

### 6. Non-Goals for Phase 1

- No backend services or persistent database.
- No user authentication or role-based permissions.
- No live emergency-response integration.
- No real AI damage detection.
- No routing optimization or dispatch workflow.
- No paid APIs or secret tokens.
- No claim that synthetic parcels, incidents, scores, statuses, or inspection recommendations are real.

### 7. Product Requirements

- The map must make the sample inspection area understandable within a real geographic context.
- Operational layers must remain visually dominant over the basemap.
- Users must be able to identify interactive parcels, assets, incidents, and road-access segments through hover feedback.
- Clicking an interactive feature must select it, highlight it, and update the Triage panel without opening a map popup.
- Queue item selection must pan the map safely without over-zooming beyond reliable basemap tile levels.
- Priority scoring must be explainable through visible factors, not presented as a black-box output.
- Recommended action must appear high enough in the Triage panel to support decision-making.
- Layer visibility and basemap selection must be available without cluttering the map.
- Documentation must clearly distinguish synthetic operational data from real basemap context.

### 8. Acceptance Criteria

- User can view the wildfire boundary, parcels, public assets, incidents, road-access constraints, and selected feature highlight.
- User can hover over interactive features and see pointer feedback, visual emphasis, and a lightweight tooltip.
- User can click a parcel or asset and see name, type, address or ID, priority score, status, recommended action, and priority factors.
- User can click each Queue item and confirm the map pans safely, the selected feature highlights correctly, and the Triage panel resets to the top.
- User can expand Layers, switch basemaps, toggle layers, open the Legend, and collapse the control again.
- Product Notes and README explain that Phase 1 uses synthetic operational GeoJSON with a real basemap for geographic context.
- The app can run locally with `npm install`, `npm run dev`, and production build commands.

### 9. Product Trade-offs

- Used synthetic operational GeoJSON to validate product workflow before integrating real public GIS services.
- Chose explainable scoring over complex predictive modeling so users can understand why an item is prioritized.
- Kept full details in the right-side panel instead of map popups to preserve map clarity.
- Limited queue navigation zoom to maintain geographic context and avoid unavailable raster tiles.
- Avoided backend and authentication so the Phase 1 prototype stays deployable, reviewable, and portfolio-ready.

### 10. Priority Logic

Each parcel or public asset receives a simulated priority level and numeric score. The score is based on product-defined factors that mirror the kinds of signals a real workflow could use:

- Exposure risk within or near the affected area.
- Proximity to reported incidents.
- Asset criticality.
- Road access risk or constraints.
- Imagery-change indicator concept.
- Inspection coverage gap or unresolved workflow status.

Priority output is intentionally simple:

- High: assign field inspection and verify visible changes.
- Medium: review after high-priority items or when crews are nearby.
- Low: monitor or clear after remote review if no additional signals appear.

### 11. Success Metrics I Would Track

- Time to identify the highest-priority inspection items.
- Percentage of queue items reviewed and moved to a workflow status.
- User comprehension of why an item is high, medium, or low priority.
- Map interaction success rate for selecting parcels, assets, incidents, and queue items.
- Reduction in manual switching between maps, reports, and spreadsheets during triage.
- In a future real-data phase: inspection outcome accuracy, false-positive review burden, and field-team feedback on priority usefulness.

### 12. Future Integration Opportunities

- Replace local synthetic GeoJSON with public GIS datasets or ArcGIS REST / FeatureServer endpoints.
- Connect parcel, road, asset, and incident layers from county or city GIS services.
- Add field assignment, inspection updates, and exportable inspection lists.
- Integrate before / after imagery sources and human-reviewed change indicators.
- Add audit history, status persistence, and stakeholder reporting.
- Explore routing or crew planning only after the core triage workflow is validated.

### 13. Prototype Disclaimer

This is a portfolio prototype, not an official emergency-response product. Phase 1 uses local synthetic operational GeoJSON for parcels, incidents, public assets, road constraints, priority scores, imagery-change indicators, statuses, and recommended actions. The basemap provides real geographic context, but the operational layers and workflow signals are simulated for product demonstration.

The prototype is structured so synthetic sources can be replaced with public GIS APIs or ArcGIS FeatureServer endpoints in a future phase.
