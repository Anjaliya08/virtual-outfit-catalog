import React, { useState } from "react";
import { Rnd } from "react-rnd";
import "./OutfitTryOn.css";

export default function OutfitTryOn({ outfitImage }) {
  const [userImage, setUserImage] = useState(null);
  const [opacity, setOpacity] = useState(1);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="tryon-container">
      <h2 className="tryon-title">🧍‍♀️ Virtual Try-On</h2>

      <label htmlFor="upload" className="upload-btn">
        Upload Your Face
        <input type="file" id="upload" accept="image/*" onChange={handleUpload} hidden />
      </label>

      {userImage && (
        <div className="slider-container">
          <label>Opacity:</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
          />
        </div>
      )}

      <div className="image-preview">
        {outfitImage && <img src={outfitImage} alt="Outfit" className="outfit-img" />}

        {userImage && (
          <Rnd
            default={{
              x: 150,
              y: 50,
              width: 100,
              height: 100,
            }}
            bounds="parent"
          >
            <img
              src={userImage}
              alt="Face"
              className="user-img"
              style={{ opacity }}
            />
          </Rnd>
        )}
      </div>
    </div>
  );
}
