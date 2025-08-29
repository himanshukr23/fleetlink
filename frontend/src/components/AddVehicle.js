import React, { useState } from "react";
import { vehicleAPI } from "../Services/api";
const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await vehicleAPI.addVehicle({
        ...formData,
        capacityKg: parseInt(formData.capacityKg),
        tyres: parseInt(formData.tyres),
      });
      setMessage("Vehicle added successfully!");
      setFormData({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add vehicle");
    }
  };
  return (
    <div>
      {" "}
      <h2>Add New Vehicle</h2>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <div>
          {" "}
          <label>Name:</label>{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label>Capacity (KG):</label>{" "}
          <input
            type="number"
            name="capacityKg"
            value={formData.capacityKg}
            onChange={handleChange}
            min="0"
            required
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <label>Tyres:</label>{" "}
          <input
            type="number"
            name="tyres"
            value={formData.tyres}
            onChange={handleChange}
            min="0"
            required
          />{" "}
        </div>{" "}
        <button type="submit">Add Vehicle</button>{" "}
      </form>{" "}
      {message && <div className="success">{message}</div>}{" "}
      {error && <div className="error">{error}</div>}{" "}
    </div>
  );
};
export default AddVehicle;
