# Wildfire Inspection Triage Map

A portfolio-ready GIS product prototype for post-wildfire inspection prioritization in San Diego County.

The app helps emergency management and public works teams review an affected-area boundary, parcels, public assets, reported incidents, road access constraints, inspection priority scores, and workflow status in one focused map experience.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL printed in the terminal.

## Tech Stack

- React
- Vite
- TypeScript
- MapLibre GL
- Esri Dark Gray and CARTO Dark raster basemaps, no API key required
- Local synthetic GeoJSON / TypeScript data
- Plain CSS

## Product Goal

Help emergency management and public works teams prioritize post-wildfire inspections when field capacity is limited and damage signals are scattered across maps, incident reports, imagery concepts, and asset records.

## Phase 1 Scope

- Dark interactive MapLibre map
- Wildfire affected-area boundary
- Parcel and public asset layers
- Reported incident markers
- Road access constraints
- Clickable triage panel
- Explainable priority scoring
- Preloaded inspection queue
- Status workflow updates
- Product Notes tab with PM context

The Phase 1 prototype intentionally does not include backend services, authentication, dispatch integration, full route optimization, real AI damage detection, paid APIs, or production parcel/asset management.

## Data Assumptions

All data in this Phase 1 prototype is local and synthetic. It is structured to mimic the future shape of public GIS layers and product signals:

- Wildfire boundary, parcels, roads, and public assets are represented as public GIS layer concepts.
- Reported incidents, imagery-change indicators, inspection statuses, priority scores, and recommended actions are simulated product signals.
- The dark basemap selector supports no-token Esri Dark Gray, CARTO Dark, and a synthetic grid fallback with attribution where required.
- The basemap provides real geographic context for the synthetic San Diego County inspection scenario.
- Operational wildfire, parcel, asset, incident, road-access, priority, status, and recommendation data remain local and synthetic in Phase 1.
- The sample inspection zone is placed near San Pasqual Valley / Escondido in San Diego County to give the synthetic workflow believable wildland-urban interface context.
- The data lives in `src/data/syntheticGeoData.ts` so Phase 2 can replace it with real public GIS sources without rewriting the UI model.

## Web GIS API Implementation

- Uses MapLibre GL JS / Web GIS APIs for interchangeable dark basemap rendering.
- Provides compact basemap switching between Esri Dark Gray, CARTO Dark, and Synthetic Grid fallback.
- Uses GeoJSON sources and layers for wildfire boundary, parcel, asset, incident, and road-access overlays.
- Supports layer visibility toggles for operational map layers.
- Uses feature hover and click interactions for parcels, assets, incidents, and road-access context while keeping the Triage panel as the detail view.
- Uses selected feature highlighting with a cyan overlay.
- Uses camera control, `fitBounds`, and `flyTo` for initial map framing and queue item navigation.
- Uses data-driven styling based on priority level and workflow status.
- Phase 1 uses local synthetic GeoJSON to validate the product workflow. The app is structured so these local sources can be replaced with public GIS APIs or ArcGIS FeatureServer endpoints in Phase 2.

## Phase Plan

- **Phase 1: Triage MVP**: interactive map, priority scoring, triage panel, inspection queue, status workflow, and product notes.
- **Phase 2: Field Operations Support**: team assignment, mobile-friendly inspection updates, exportable inspection lists, and simple route planning.
- **Phase 3: Imagery and Analytics Enhancement**: before/after imagery comparison, automated change indicators, event comparison, reporting dashboard, and integration-ready API concepts.
