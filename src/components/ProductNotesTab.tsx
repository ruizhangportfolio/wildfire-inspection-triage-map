function ProductNotesTab() {
  return (
    <div className="notesTab">
      <section>
        <p className="eyebrow">Product Goal</p>
        <h2>Move from situational awareness to field action.</h2>
        <p>
          Help emergency management and public works teams prioritize post-wildfire
          inspections when field capacity, road access, and damage signals are constrained.
        </p>
      </section>

      <section>
        <h3>MVP Scope</h3>
        <p>
          Map-based triage, priority scoring, inspection queue, status workflow, and
          product notes. No authentication, backend services, dispatch integration,
          routing optimization, or real AI damage detection are included in Phase 1.
        </p>
      </section>

      <section>
        <h3>Data Assumptions</h3>
        <p>
          Public GIS data will be used where possible for parcels, roads, public assets,
          and wildfire boundaries. In this Phase 1 demo, reported incidents,
          imagery-change indicators, inspection statuses, and priority scores are
          simulated for product demonstration purposes. The basemap is interchangeable
          between no-token Web GIS basemap sources, while operational layers remain local
          synthetic GeoJSON.
        </p>
      </section>

      <section>
        <h3>Scenario Area</h3>
        <p>
          This Phase 1 prototype uses a synthetic inspection zone placed in a
          wildfire-adjacent area of San Diego County near San Pasqual Valley and
          Escondido. The operational layers are simulated for product demonstration,
          while the basemap provides real geographic context.
        </p>
      </section>

      <section>
        <h3>Web GIS API Implementation</h3>
        <ul className="notesList">
          <li>Uses MapLibre GL JS for dark basemap rendering, camera control, and interactive map behavior.</li>
          <li>Supports compact basemap switching between Esri Dark Gray, CARTO Dark, and Synthetic Grid fallback.</li>
          <li>Loads local GeoJSON sources for wildfire boundary, parcels, assets, incidents, and road access overlays.</li>
          <li>Uses layer visibility toggles, feature hover and click interactions, selected-feature highlighting, and data-driven priority styling.</li>
          <li>Uses fitBounds and flyTo for initial framing and queue-item navigation without claiming live routing optimization.</li>
          <li>Phase 1 uses local synthetic GeoJSON to validate the workflow; these sources can be replaced with public GIS APIs or ArcGIS FeatureServer endpoints in Phase 2.</li>
        </ul>
      </section>

      <section>
        <h3>User Story</h3>
        <p>
          As a public works operations coordinator, I want to review high-priority
          parcels and public assets in an inspection queue so that I can assign limited
          field teams to the most urgent locations first.
        </p>
      </section>

      <section>
        <h3>Acceptance Criteria</h3>
        <ul className="notesList">
          <li>User can view wildfire affected area, parcels, public assets, incidents, and road constraints.</li>
          <li>User can click a parcel or asset and see priority, score, factors, action, and status.</li>
          <li>User can review queue items by priority and status.</li>
          <li>User can update inspection status.</li>
          <li>User can distinguish public GIS layers from simulated product signals.</li>
        </ul>
      </section>

      <section>
        <h3>Roadmap</h3>
        <div className="roadmap">
          <span>Phase 1: Triage MVP</span>
          <span>Phase 2: Field operations support</span>
          <span>Phase 3: Imagery and analytics enhancement</span>
        </div>
      </section>
    </div>
  );
}

export default ProductNotesTab;
