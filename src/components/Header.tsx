function Header() {
  return (
    <header className="topHeader">
      <div className="brandBlock">
        <p className="eyebrow">Phase 1 Triage MVP</p>
        <h1>Wildfire Inspection Triage Map</h1>
        <p>Geospatial triage prototype for San Diego County post-wildfire inspections</p>
      </div>
      <div className="scenarioBar" aria-label="Scenario metadata">
        <span>Scenario: Post-Wildfire Inspection</span>
        <span>Area: San Pasqual Valley / Escondido</span>
        <span>Data Mode: Public GIS + Simulated Product Signals</span>
        <span>Status: Prototype</span>
      </div>
    </header>
  );
}

export default Header;
