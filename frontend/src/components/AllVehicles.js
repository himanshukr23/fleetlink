import React, { useState, useEffect } from "react";
import { vehicleAPI } from "../Services/api";
import "../Styles/App.css";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await vehicleAPI.getAllVehicles();
        setVehicles(response.data);
      } catch (err) {
        setError("Failed to fetch vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>All Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capacity (KG)</th>
              <th>Tyres</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td>{vehicle.name}</td>
                <td>{vehicle.capacityKg}</td>
                <td>{vehicle.tyres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllVehicles;