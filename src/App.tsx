import { useMemo, useState } from "react";
import Header from "./components/Header";
import LayerControls from "./components/LayerControls";
import MapView from "./components/MapView";
import RightPanel from "./components/RightPanel";
import { defaultLayerVisibility, initialTriageItems } from "./data/syntheticGeoData";
import type { BasemapKey, InspectionStatus, LayerVisibility, PanelTab, TriageItem } from "./types";

const initialSelectedId = "parcel-101";

function App() {
  const [items, setItems] = useState<TriageItem[]>(initialTriageItems);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(initialSelectedId);
  const [activeTab, setActiveTab] = useState<PanelTab>("triage");
  const [layerVisibility, setLayerVisibility] =
    useState<LayerVisibility>(defaultLayerVisibility);
  const [basemap, setBasemap] = useState<BasemapKey>("esriDark");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedItemId) ?? null,
    [items, selectedItemId]
  );

  const queueItems = useMemo(
    () =>
      items
        .filter((item) => item.inQueue)
        .sort((a, b) => b.priorityScore - a.priorityScore),
    [items]
  );

  const handleSelectItem = (id: string, tab: PanelTab = "triage") => {
    setSelectedItemId(id);
    setActiveTab(tab);
  };

  const handleStatusChange = (id: string, status: InspectionStatus) => {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleLayerToggle = (layer: keyof LayerVisibility) => {
    setLayerVisibility((currentVisibility) => ({
      ...currentVisibility,
      [layer]: !currentVisibility[layer]
    }));
  };

  return (
    <div className="appShell">
      <Header />
      <main className="mainWorkspace">
        <section className="mapStage" aria-label="Wildfire inspection triage map">
          <MapView
            items={items}
            selectedItemId={selectedItemId}
            layerVisibility={layerVisibility}
            basemap={basemap}
            onSelectItem={(id) => handleSelectItem(id, "triage")}
          />
          <LayerControls
            visibility={layerVisibility}
            basemap={basemap}
            onBasemapChange={setBasemap}
            onToggle={handleLayerToggle}
          />
        </section>
        <RightPanel
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedItem={selectedItem}
          queueItems={queueItems}
          onSelectQueueItem={(id) => handleSelectItem(id, "triage")}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}

export default App;
