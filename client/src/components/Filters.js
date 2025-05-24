import React, { useState, useEffect } from "react";

const occasionsList = ["party", "casual", "formal", "wedding"];
const stylesList = ["bohemian", "sporty", "classic", "formal"];

export default function Filters({ onFilterChange }) {
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  // Toggle selection for occasions
  const toggleOccasion = (occasion) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion)
        ? prev.filter((o) => o !== occasion)
        : [...prev, occasion]
    );
  };

  // Toggle selection for styles
  const toggleStyle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // Notify parent when filters change
  useEffect(() => {
    onFilterChange({
      occasion: selectedOccasions,
      style: selectedStyles,
    });
  }, [selectedOccasions, selectedStyles, onFilterChange]);

  return (
    <div>
      <h3>Filter by Occasion</h3>
      {occasionsList.map((occasion) => (
        <label key={occasion} style={{ marginRight: 10 }}>
          <input
            type="checkbox"
            checked={selectedOccasions.includes(occasion)}
            onChange={() => toggleOccasion(occasion)}
          />
          {occasion}
        </label>
      ))}

      <h3>Filter by Style</h3>
      {stylesList.map((style) => (
        <label key={style} style={{ marginRight: 10 }}>
          <input
            type="checkbox"
            checked={selectedStyles.includes(style)}
            onChange={() => toggleStyle(style)}
          />
          {style}
        </label>
      ))}
    </div>
  );
}
