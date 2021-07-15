import React from "react";
import "./app.css";

const Tile = () => {
  return (
    <div className="special-tile-container">
      <div className="special-tile">
        <i className="fas fa-sync-alt"></i>
      </div>
      <div className="special-tile">
        <i className="fas fa-history"></i>
      </div>
      <div className="special-tile">
        <i className="fas fa-bolt"></i>
      </div>
    </div>
  );
};

export default Tile;
