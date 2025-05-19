import React, { useState, useEffect } from "react";
import '../AirportInput/AirportInput.css';

const AirportInput = ({ label, airports, onSelect }) => {
  const [query, setQuery] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!query) {
      setFilteredAirports([]);
      return;
    }
    const q = query.toLowerCase();
    const results = airports.filter(
      (airport) =>
        (airport.name && airport.name.toLowerCase().includes(q)) ||
        (airport.city && airport.city.toLowerCase().includes(q)) ||
        (airport.code && airport.code.toLowerCase().includes(q))
    );
    setFilteredAirports(results.slice(0, 10));
  }, [query, airports]);

  const handleSelect = (airport) => {
    setQuery(`${airport.name} (${airport.code})`);
    setShowSuggestions(false);
    onSelect(airport.code);
  };

  return (
    <div className="airport-input">
      <label>{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        autoComplete="off"
        placeholder="Digit name, city or IATA code Airport"
      />
      {showSuggestions && filteredAirports.length > 0 && (
        <ul>
          {filteredAirports.map((airport) => (
            <li
              key={airport.code}
              onClick={() => handleSelect(airport)}
            >
              {airport.name} ({airport.code}) - {airport.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportInput;
