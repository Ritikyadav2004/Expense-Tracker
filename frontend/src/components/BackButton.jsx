import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="btn-pill btn-pill-outline text-xs px-4 py-2 inline-flex items-center gap-1.5 font-medium transition"
    >
      <span>←</span>
      <span>Back</span>
    </button>
  );
}

export default BackButton;