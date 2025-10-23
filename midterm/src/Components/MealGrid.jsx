import React from "react";
import MealCard from "./MealCard.jsx";

export default function MealGrid({ meals, expandedId, onToggle, detailsCache, detailsLoading }) {
  if (!meals.length) return <p>No results.</p>;

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0, margin: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 12
      }}
    >
      {meals.map((m) => (
        <li key={m.idMeal}>
          <MealCard
            meal={m}
            expanded={expandedId === m.idMeal}
            onToggle={() => onToggle(m.idMeal)}
            details={detailsCache[m.idMeal] || null}
            detailsLoading={detailsLoading && expandedId === m.idMeal}
          />
        </li>
      ))}
    </ul>
  );
}
