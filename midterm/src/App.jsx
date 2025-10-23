import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SearchForm from "./components/SearchForm.jsx";
import AreaFilter from "./components/AreaFilter.jsx";
import MealGrid from "./components/MealGrid.jsx";
import Loading from "./components/Loading.jsx";
import ErrorMsg from "./components/ErrorMsg.jsx";

const API = "https://www.themealdb.com/api/json/v1/1";

export default function App() {
  const [ingredient, setIngredient] = useState("chicken");
  const [areas, setAreas] = useState(["All"]);
  const [area, setArea] = useState("All");

  const [mealsByIngredient, setMealsByIngredient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [expandedId, setExpandedId] = useState(null);
  const [detailsCache, setDetailsCache] = useState({}); 
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/list.php?a=list`);
        const data = await res.json();
        const list = (data.meals || []).map(m => m.strArea).filter(Boolean);
        setAreas(["All", ...list]);
      } catch {
      }
    })();
  }, []);

  async function fetchByIngredient(ing) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/filter.php?i=${encodeURIComponent(ing)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMealsByIngredient(data.meals || []);
      setExpandedId(null);
    } catch (e) {
      setMealsByIngredient([]);
      setError("Не удалось загрузить рецепты. Попробуйте другой ингредиент.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchByIngredient(ingredient);
    
  }, []); 

  const [areaIds, setAreaIds] = useState(null); 
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (area === "All") { setAreaIds(null); return; }
      try {
        const res = await fetch(`${API}/filter.php?a=${encodeURIComponent(area)}`);
        const data = await res.json();
        const ids = new Set((data.meals || []).map(m => m.idMeal));
        if (!cancelled) setAreaIds(ids);
      } catch {
        if (!cancelled) setAreaIds(new Set()); 
      }
    })();
    return () => { cancelled = true; };
  }, [area]);

  const filteredMeals = useMemo(() => {
    if (!areaIds) return mealsByIngredient;           
    return mealsByIngredient.filter(m => areaIds.has(m.idMeal));
  }, [mealsByIngredient, areaIds]);

  async function toggleExpand(idMeal) {
    if (expandedId === idMeal) {
      setExpandedId(null);
      return;
    }
    if (detailsCache[idMeal]) {
      setExpandedId(idMeal);
      return;
    }
    setDetailsLoading(true);
    try {
      const res = await fetch(`${API}/lookup.php?i=${idMeal}`);
      const data = await res.json();
      const detail = (data.meals || [])[0];
      setDetailsCache(prev => ({ ...prev, [idMeal]: detail || null }));
      setExpandedId(idMeal);
    } catch {

    } finally {
      setDetailsLoading(false);
    }
  }

  function handleIngredientChange(e) { setIngredient(e.target.value); }
  function handleSubmit(e) {
    e.preventDefault();
    fetchByIngredient(ingredient.trim());
  }
  function handleAreaChange(val) { setArea(val); }

  return (
    <div className="app">
      <Header />

      <section className="section card">
        <SearchForm
          ingredient={ingredient}
          onIngredientChange={handleIngredientChange}
          onSubmit={handleSubmit}
        />
      </section>

      <section className="section card">
        <AreaFilter
          areas={areas}
          area={area}
          onAreaChange={handleAreaChange}
        />
      </section>

      {loading && <Loading />}
      {error && <ErrorMsg message={error} />}

      {!loading && !error && (
        <section className="section">
          <MealGrid
            meals={filteredMeals}
            expandedId={expandedId}
            onToggle={toggleExpand}
            detailsCache={detailsCache}
            detailsLoading={detailsLoading}
          />
        </section>
      )}
    </div>
  );
}
