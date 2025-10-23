import React from "react";

export default function Header() {
  return (
    <header style={{ marginBottom: 16 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Meal Finder</h1>
      <p style={{ color: "#555", marginTop: 8 }}>
        Search by ingredient, filter by cuisine, view recipe details.
      </p>
    </header>
  );
}
