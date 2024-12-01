import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const { hotelId, roomId } = useParams();
  const [room, setRoom] = useState({});
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch room details based on roomId
  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms/${roomId}`)
      .then((response) => response.json())
      .then((data) => setRoom(data))
      .catch((error) => console.error("Error fetching room details:", error));
  }, [roomId]);

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingInfo = {
      hotelId,
      roomId,
      userName: bookingDetails.name,
      userEmail: bookingDetails.email,
      checkInDate: bookingDetails.checkIn,
      checkOutDate: bookingDetails.checkOut,
    };

    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Booking successful!");
          setBookingDetails({ name: "", email: "", checkIn: "", checkOut: "" });
          navigate("/"); // Redirect back to the home page
        } else {
          setMessage("Booking failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4">Book {room.name}</h2>
      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={bookingDetails.name}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={bookingDetails.email}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Check-in Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={bookingDetails.checkIn}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, checkIn: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Check-out Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={bookingDetails.checkOut}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, checkOut: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Confirm Booking
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-lg font-semibold">{message}</div>
      )}
    </div>
  );
};

export default BookingForm;
