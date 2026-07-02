import { useState } from "react";
import type { BasemapKey, LayerVisibility } from "../types";

interface LayerControlsProps {
  visibility: LayerVisibility;
  basemap: BasemapKey;
  onToggle: (layer: keyof LayerVisibility) => void;
  onBasemapChange: (basemap: BasemapKey) => void;
}

const layerOptions: Array<{ key: keyof LayerVisibility; label: string }> = [
  { key: "wildfire", label: "Wildfire Boundary" },
  { key: "parcels", label: "Parcels" },
  { key: "assets", label: "Public Assets" },
  { key: "incidents", label: "Reported Incidents" },
  { key: "roads", label: "Road Access" },
  { key: "priority", label: "Priority Layer" }
];

const basemapOptions: Array<{ key: BasemapKey; label: string }> = [
  { key: "esriDark", label: "Esri Dark Gray" },
  { key: "cartoDark", label: "CARTO Dark" },
  { key: "synthetic", label: "Synthetic Grid" }
];

function LayerControls({
  visibility,
  basemap,
  onToggle,
  onBasemapChange
}: LayerControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedBasemapLabel =
    basemapOptions.find((option) => option.key === basemap)?.label ?? "Esri Dark Gray";

  return (
    <div className="layerControls" aria-label="Map legend and layer controls">
      <button
        className="layerToggleButton"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        Layers
      </button>
      {isOpen && (
        <div className="layerPanel">
          <div className="layerHeader">
            <strong>Layers</strong>
            <button
              className="layerCloseButton"
              type="button"
              aria-label="Collapse layers panel"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
          <div className="layerSourceSummary">
            <span>Basemap: {selectedBasemapLabel}</span>
            <span>Operational Layers: Synthetic Phase 1 GeoJSON</span>
          </div>
          <label className="basemapSelect">
            Basemap
            <select
              value={basemap}
              onChange={(event) => onBasemapChange(event.target.value as BasemapKey)}
            >
              {basemapOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className="layerToggleGrid">
            {layerOptions.map((option) => (
              <label key={option.key} className="toggleRow">
                <input
                  type="checkbox"
                  checked={visibility[option.key]}
                  onChange={() => onToggle(option.key)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <details className="legendDisclosure">
            <summary>Legend</summary>
            <div className="legendGrid">
              <span>
                <i className="legendDot high" /> High Priority
              </span>
              <span>
                <i className="legendDot medium" /> Medium Priority
              </span>
              <span>
                <i className="legendDot low" /> Low Priority
              </span>
              <span>
                <i className="legendLine blocked" /> Blocked Access
              </span>
              <span>
                <i className="legendLine limited" /> Limited Access
              </span>
              <span>
                <i className="legendDot incident" /> Reported Incident
              </span>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

export default LayerControls;
