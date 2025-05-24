import React, { useEffect, useState } from "react";
import axios from "axios";
import OutfitCard from "../components/OutfitCard";
import "./Home.css"; // Make sure this CSS file is created

const Home = () => {
  const [outfits, setOutfits] = useState([]);
  const [occasion, setOccasion] = useState("all");

  const occasions = ["all", "casual", "party", "wedding", "formal"];

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/outfits${
            occasion !== "all" ? `?occasion=${occasion}` : ""
          }`
        );
        setOutfits(res.data);
      } catch (err) {
        console.error("Error fetching outfits:", err);
        setOutfits([]); // Clear outfits on error
      }
    };

    fetchOutfits();
  }, [occasion]);

  return (
    <div className="home-container">
      <h1 className="title">Virtual Outfit Catalog</h1>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="occasion">Filter by Occasion:</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="occasion-select"
        >
          {occasions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Outfit Cards Grid */}
      <div className="outfit-grid">
        {outfits.length > 0 ? (
          outfits.map((outfit) => <OutfitCard key={outfit._id} outfit={outfit} />)
        ) : (
          <p className="no-results">No outfits found for this occasion.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
