import React from "react";

const ClearSearchButtons = ({ onClearAll }) => {
  return (
    <button
      type="button"
      onClick={() => {
        onClearAll();
        window.location.reload();
      }}
      style={{
        marginTop: 12,
        padding: "8px 16px",
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: "bold",
      }}
      aria-label="Clear all search inputs and reload page"
    >
      Clear Search and Reload
    </button>
  );
};

export default ClearSearchButtons;

