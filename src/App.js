import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import HotelList from "./components/HotelList";
import RoomList from "./components/RoomList";
import BookingForm from "./components/BookingForm";

const App = () => {
  return (
    <Router>
      {/* Header is placed above the Routes to ensure it's visible on all pages */}
      <Header />

      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
        <Routes>
          {/* Home route to display all hotels */}
          <Route path="/" element={<HotelList />} />

          {/* Route to display rooms for a specific hotel */}
          <Route path="/hotel/:id" element={<RoomList />} />

          {/* Route to handle booking for a selected room */}
          <Route path="/book/:hotelId/:roomId" element={<BookingForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
