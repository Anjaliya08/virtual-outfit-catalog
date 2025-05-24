import React, { useState, useEffect, useCallback } from "react";
import OutfitCard from "./OutfitCard";
import Filters from "./Filters";

export default function OutfitList() {
  const [outfits, setOutfits] = useState([]);
  const [filters, setFilters] = useState({ occasion: [], style: [] });

  // Fetch outfits with current filters
  const fetchOutfits = useCallback(async () => {
    let query = [];
    if (filters.occasion.length > 0)
      query.push(`occasion=${filters.occasion.join(",")}`);
    if (filters.style.length > 0) query.push(`style=${filters.style.join(",")}`);

    const queryString = query.length > 0 ? "?" + query.join("&") : "";

    try {
      const res = await fetch(`/api/outfits${queryString}`);
      const data = await res.json();
      setOutfits(data);
    } catch (err) {
      console.error("Failed to fetch outfits", err);
    }
  }, [filters]);

  // Fetch on filters change
  useEffect(() => {
    fetchOutfits();
  }, [fetchOutfits]);

  return (
    <div>
      <Filters onFilterChange={setFilters} />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {outfits.length === 0 ? (
          <p>No outfits found for selected filters.</p>
        ) : (
          outfits.map((outfit) => <OutfitCard key={outfit._id} outfit={outfit} />)
        )}
      </div>
    </div>
  );
}
