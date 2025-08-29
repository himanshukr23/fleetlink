// import React from "react";
// import { Route, Routes, Link } from "react-router-dom";

// import AddVehicle from "./components/AddVehicle";
// import SearchVehicles from "./components/SearchVehicle";
// import "./Styles/App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Vehicle Booking System</h1>
//         <nav>
//           <Link to="/">Home</Link> |{" "}
//           <Link to="/add-vehicle">Add Vehicle</Link> |{" "}
//           <Link to="/search">Search & Book</Link>
//         </nav>
//       </header>
//       <main className="App-main">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/add-vehicle" element={<AddVehicle />} />
//           <Route path="/search" element={<SearchVehicles />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h2>Welcome to Vehicle Booking System</h2>
//       <p>Manage your fleet and book vehicles for deliveries</p>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes, Link } from "react-router-dom";

import AddVehicle from "./components/AddVehicle";
import SearchVehicles from "./components/SearchVehicle";
import BookedVehicles from "./components/BookedVehicles"; // Import the new component
import "./Styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vehicle Booking System</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/add-vehicle">Add Vehicle</Link> |{" "}
          <Link to="/search">Search & Book</Link> |{" "}
          <Link to="/booked-vehicles">View Bookings</Link> {/* Add this link */}
        </nav>
      </header>
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/search" element={<SearchVehicles />} />
          <Route path="/booked-vehicles" element={<BookedVehicles />} /> {/* Add this route */}
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to Vehicle Booking System</h2>
      <p>Manage your fleet and book vehicles for deliveries</p>
    </div>
  );
}

export default App;
