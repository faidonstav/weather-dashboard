import React from "react";
import "./HighlightCard.css"

function HighlightCard({ title, icon: Icon, children, className = "" }) {
  return <div className={`highlight-card ${className}`}><div className="mini-card-title">{Icon && <Icon size={14} />}{title}</div>{children}</div>;
}

export default HighlightCard