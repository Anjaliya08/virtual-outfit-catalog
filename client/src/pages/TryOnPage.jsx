import React from "react";
import OutfitTryOn from "../components/OutfitTryon";

export default function TryOnPage() {
  // sample outfit image (should be transparent PNG)
  const outfitImage = "/sample-outfit.png"; // Place this image in public folder

  return (
    <div>
      <OutfitTryOn outfitImage={outfitImage} />
    </div>
  );
}
