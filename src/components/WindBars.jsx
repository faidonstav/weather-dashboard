import React from "react";
import "./WindBars.css"

function WindBars() {
  return <div className="wind-bars">{Array.from({ length: 19 }, (_, i) => <i key={i} style={{ height: `${14 + Math.sin((i + 1) / 3) * 17 + (i % 4) * 4}px` }} className={i === 9 || i === 10 ? "highlight" : ""} />)}</div>;
}

export default WindBars