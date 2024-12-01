import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-yellow-300">
          Hotel Booking
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="text-lg hover:text-yellow-300">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
