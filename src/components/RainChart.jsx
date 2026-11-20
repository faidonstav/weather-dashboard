import React from "react";
import "./RainChart.css"

function RainChart({ probability, amount }) {
  const chance = Number.isFinite(probability) ? Math.round(probability) : null;
  const amountText = Number.isFinite(amount) ? `${amount.toFixed(1)} mm` : "--";

  return (
    <div className="rain-chart">
      <div className="rain-reading">
        <strong>{chance === null ? "--" : `${chance}%`}</strong>
        <span>chance of rain</span>
      </div>
      <div
        className="rain-probability-track"
        role="progressbar"
        aria-label="Chance of rain"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={chance ?? 0}
      >
        <span style={{ width: `${chance ?? 0}%` }} />
      </div>
      <div className="rain-amount">
        <span>Expected today</span>
        <strong>{amountText}</strong>
      </div>
    </div>
  );
}

export default RainChart