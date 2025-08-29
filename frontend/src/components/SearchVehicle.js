import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import VehicleList from "./VehicleLists"

import { vehicleAPI } from "../Services/api";
const SearchVehicles = () => {
  const [searchData, setSearchData] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: new Date(),
  });
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setSearchData({ ...searchData, startTime: date });
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = {
        capacityRequired: searchData.capacityRequired,
        fromPincode: searchData.fromPincode,
        toPincode: searchData.toPincode,
        startTime: searchData.startTime.toISOString(),
      };
      const response = await vehicleAPI.getAvailableVehicles(params);
      setVehicles(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search vehicles");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {" "}
      <h2>Search Available Vehicles</h2>{" "}
      <form onSubmit={handleSearch}>
        {" "}
        <div>
          {" "}
          <label>Capacity Required (KG):</label>{" "}
          <input
            type="number"
            name="capacityRequired"
            value={searchData.capacityRequired}
            onChange={handleChange}
            min="0"
            required
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label>From Pincode:</label>{" "}
          <input
            type="text"
            name="fromPincode"
            value={searchData.fromPincode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            required
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label>To Pincode:</label>{" "}
          <input
            type="text"
            name="toPincode"
            value={searchData.toPincode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            required
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label>Start Time:</label>{" "}
          <DatePicker
            selected={searchData.startTime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            required
          />{" "}
        </div>{" "}
        <button type="submit" disabled={loading}>
          {" "}
          {loading ? "Searching..." : "Search Availability"}{" "}
        </button>{" "}
      </form>{" "}
      {error && <div className="error">{error}</div>}{" "}
      <VehicleList
        vehicles={vehicles}
        searchData={searchData}
        onBookingSuccess={() => setVehicles([])}
        Clear
        results
        after
        booking
      />
    </div>
  );
};

export default SearchVehicles;
