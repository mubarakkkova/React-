import React from "react";

export default function MealCard({ meal, expanded, onToggle, details, detailsLoading }) {
  return (
    <article style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
      />
      <div style={{ padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>{meal.strMeal}</h3>
          <button onClick={onToggle} style={{ padding: "6px 10px", borderRadius: 8 }}>
            {expanded ? "Hide" : "Details"}
          </button>
        </div>

        {expanded && (
          <div style={{ marginTop: 8, fontSize: 14 }}>
            {detailsLoading && <p>Loading details…</p>}
            {!detailsLoading && details && (
              <>
                <p><b>Category:</b> {details.strCategory || "—"}</p>
                <p><b>Area:</b> {details.strArea || "—"}</p>
                <p style={{ marginTop: 8 }}><b>Instructions:</b></p>
                <p style={{ whiteSpace: "pre-wrap", marginTop: 4 }}>
                  {details.strInstructions?.slice(0, 400) || "—"}{details.strInstructions && details.strInstructions.length > 400 ? "…" : ""}
                </p>
                {details.strSource && (
                  <a href={details.strSource} target="_blank" rel="noopener noreferrer">
                    Source
                  </a>
                )}
                {details.strYoutube && (
                  <>
                    {" · "}
                    <a href={details.strYoutube} target="_blank" rel="noopener noreferrer">
                      YouTube
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
