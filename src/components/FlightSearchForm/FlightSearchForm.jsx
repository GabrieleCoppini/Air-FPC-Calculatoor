import React, { useState, useEffect } from "react";
import { IoMdAirplane } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import AirportInput from "../AirportInput/AirportInput";
import FlightFootprint from "../FlightFootprint/FlightFootprint";
import ClearSearchButtons from "../ClearSearchButtons/ClearSearchButtons";
import { loadAirports } from "../../stores/airportsSlice";
import { apiKey } from "../../stores/apiClient";
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa';

import './FlightSearchForm.css'; 

const FlightSearchForm = () => {
  const dispatch = useDispatch();
  const { airports, loading, error } = useSelector((state) => state.airports);

  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [calculationDone, setCalculationDone] = useState(false);

  useEffect(() => {
    dispatch(loadAirports());
  }, [dispatch]);

  const segments =
    fromCode && toCode
      ? [{ origin: fromCode.toUpperCase(), destination: toCode.toUpperCase() }]
      : [];



      if (loading) return (
        <div className="status-message loading">
          <FaSpinner className="icon spin" />
          <span>Loading airports...</span>
        </div>
      );
      
      if (error) return (
        <div className="status-message error">
          <FaExclamationCircle className="icon" />
          <span>Error loading airports: {error}</span>
        </div>
      );
      

  const resetSearch = () => {
    setFromCode("");
    setToCode("");
    setPassengers(1);
    setCabinClass("economy");
    setCalculationDone(false);
  };

  return (
    <div className="flight-search-form">
      <h1> <IoMdAirplane /> Flight Carbon Footprint Calculator</h1>
      <AirportInput label="From" airports={airports} onSelect={setFromCode} />
      <AirportInput label="To" airports={airports} onSelect={setToCode} />

      <label>Passengers</label>
      <input
        type="number"
        min={1}
        value={passengers}

        onChange={(e) => setPassengers(e.target.value)}
      
      />

      <label>Cabin Class</label>
      <select

            value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
           >
         <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business</option>
           <option value="first">First</option>
           </select>

      <FlightFootprint
        apiKey={apiKey}
        segments={segments}
        from={fromCode.toUpperCase()}
        to={toCode.toUpperCase()}
        airports={airports}
        passengers={passengers}
        cabinClass={cabinClass}
        onCalculationDone={() => setCalculationDone(true)}
      />

      {calculationDone && <ClearSearchButtons onClearAll={resetSearch} />}
    </div>
  );
};

export default FlightSearchForm;
