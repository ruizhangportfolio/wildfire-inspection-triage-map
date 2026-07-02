import { useEffect, useRef } from "react";
import ProductNotesTab from "./ProductNotesTab";
import QueueTab from "./QueueTab";
import TriageTab from "./TriageTab";
import type { InspectionStatus, PanelTab, TriageItem } from "../types";

interface RightPanelProps {
  activeTab: PanelTab;
  selectedItem: TriageItem | null;
  queueItems: TriageItem[];
  onTabChange: (tab: PanelTab) => void;
  onSelectQueueItem: (id: string) => void;
  onStatusChange: (id: string, status: InspectionStatus) => void;
}

const tabs: Array<{ id: PanelTab; label: string }> = [
  { id: "triage", label: "Triage" },
  { id: "queue", label: "Queue" },
  { id: "notes", label: "Product Notes" }
];

function RightPanel({
  activeTab,
  selectedItem,
  queueItems,
  onTabChange,
  onSelectQueueItem,
  onStatusChange
}: RightPanelProps) {
  const panelContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab === "triage") {
      panelContentRef.current?.scrollTo({ top: 0 });
    }
  }, [activeTab, selectedItem?.id]);

  return (
    <aside className="rightPanel" aria-label="Inspection triage panel">
      <nav className="panelTabs" aria-label="Panel tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "panelTab active" : "panelTab"}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="panelContent" ref={panelContentRef}>
        {activeTab === "triage" && (
          <TriageTab selectedItem={selectedItem} onStatusChange={onStatusChange} />
        )}
        {activeTab === "queue" && (
          <QueueTab
            items={queueItems}
            selectedItemId={selectedItem?.id ?? null}
            onSelectItem={onSelectQueueItem}
          />
        )}
        {activeTab === "notes" && <ProductNotesTab />}
      </div>
    </aside>
  );
}

export default RightPanel;
