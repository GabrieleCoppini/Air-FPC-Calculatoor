import React, { useState } from "react";
import { calculateFlightFootprint } from "../../stores/apiClient";

import "../FlightFootprint/FlighrFootprint.css";

const FlightFootprint = ({
  apiKey,
  segments,
  from,
  to,
  airports,
  passengers,
  cabinClass,
  onCalculationDone,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const findAirportName = (code) => {
    if (!airports || airports.length === 0) return code;
    const airport = airports.find(
      (a) => a.code.toUpperCase() === code.toUpperCase()
    );
    return airport ? airport.name : code;
  };

  const handleCalculate = async () => {
    if (!segments.length) {
      setError("Please enter valid airports before calculating.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await calculateFlightFootprint(apiKey, segments, cabinClass);
      setResult(data);
      if (onCalculationDone) {
        onCalculationDone();
      }
    } catch (err) {
      setError("Error during footprint calculation.");
    } finally {
      setLoading(false);
    }
  };

  const footprint = result?.footprint ?? null;
  const fromName = findAirportName(from);
  const toName = findAirportName(to);

  return (
      <div>
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="flight-footprint-button"
        >
          {loading ? "Calculating..." : "Calculate Footprint"}
        </button>
    
        {error && <p className="flight-footprint-error">{error}</p>}
    
        {footprint !== null && (
         <div className="flight-footprint-container">
         <ul>
           <li data-label="Cabin Class">{cabinClass}</li>
           <li data-label="Departure Airport">{fromName} ({from.toUpperCase()})</li>
           <li data-label="Arrival Airport">{toName} ({to.toUpperCase()})</li>
           <li data-label="Footprint per passenger">{footprint} kg CO2</li>
           <li data-label="Total Footprint">{footprint * passengers} kg CO2</li>
         </ul>
       </div>
       
        )}
      </div>
    );
    
};

export default FlightFootprint;
