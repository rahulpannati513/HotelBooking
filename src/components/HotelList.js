import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotel, setHotel] = useState(null);

  // Fetch a single hotel (your hotel) from API
  useEffect(() => {
    fetch("http://localhost:8080/api/hotels/1") // Assuming '1' is your hotel's ID
      .then((response) => response.json())
      .then((data) => {
        console.log("Hotel", data);
        setHotel(data); // Set the state to the fetched hotel
      })
      .catch((error) => console.error("Error fetching hotel:", error));
  }, []);

  if (!hotel) {
    return (
      <div className="text-center">
        <p>Loading hotel details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Welcome to {hotel.name}
      </h2>

      {/* Hotel information card */}
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:opacity-90">
        <Link to={`/hotel/${hotel.id}`} className="block">
          {/* Hotel image */}
          <div
            className="h-56 w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                hotel.imageUrl ||
                "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              })`,
            }}
          ></div>
          <div className="p-6">
            <h3 className="text-3xl font-semibold text-gray-800">
              {hotel.name}
            </h3>
            <p className="text-lg text-gray-600">{hotel.location}</p>
            <p className="mt-4 text-gray-700">
              {hotel.description || "A beautiful hotel for a perfect stay."}
            </p>
            <div className="mt-6">
              <Link
                to={`/hotel/${hotel.id}`}
                className="text-blue-500 hover:underline text-lg font-medium"
              >
                View More Details
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HotelList;
