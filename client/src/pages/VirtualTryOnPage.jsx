import React, { useState, useEffect } from "react";
import axios from "axios";
import OutfitTryOn from "../components/OutfitTryon";
import "./VirtualTryOnPage.css";

export default function VirtualTryOnPage() {
  const [outfits, setOutfits] = useState([]);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/outfits")
      .then(res => setOutfits(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="virtual-tryon-page">
      <h1 className="title">👗 Virtual Try-On</h1>

      <div className="select-section">
        <label htmlFor="outfit-select">Choose an outfit:</label>
        <select
          id="outfit-select"
          onChange={e => {
            const outfit = outfits.find(o => o._id === e.target.value);
            setSelectedOutfit(outfit);
          }}
        >
          <option value="">-- Select an outfit --</option>
          {outfits.map(o => (
            <option key={o._id} value={o._id}>{o.name}</option>
          ))}
        </select>
      </div>

      {selectedOutfit && (
        <OutfitTryOn outfitImage={`http://localhost:5000${selectedOutfit.imageUrl}`} />
      )}
    </div>
  );
}
