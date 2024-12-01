import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RoomList = () => {
  const { id } = useParams(); // Access hotelId from URL
  const [rooms, setRooms] = useState([]);

  // Fetch rooms for selected hotel
  useEffect(() => {
    fetch(`http://localhost:8080/api/rooms?hotelId=${id}`)
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, [id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4">Rooms at Hotel {id}</h2>
      <ul className="space-y-4">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="border p-4 rounded-md shadow-md cursor-pointer hover:bg-gray-100"
          >
            <Link to={`/book/${id}/${room.id}`}>
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-sm text-gray-500">{room.description}</p>
              <p className="font-bold">{room.price} USD/night</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
