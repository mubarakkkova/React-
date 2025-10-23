import React from "react";

export default function AreaFilter({ areas, area, onAreaChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <select
        value={area}
        onChange={(e) => onAreaChange(e.target.value)}
        aria-label="Cuisine (Area)"
        style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8 }}
      >
        {areas.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
    </div>
  );
}
