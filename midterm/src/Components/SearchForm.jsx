import React from "react";

export default function SearchForm({ ingredient, onIngredientChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <input
        value={ingredient}
        onChange={onIngredientChange}
        placeholder="e.g., chicken, beef, tomato…"
        aria-label="Ingredient"
        style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8 }}
      />
      <button type="submit" style={{ padding: "10px 14px", borderRadius: 8 }}>
        Search
      </button>
    </form>
  );
}
