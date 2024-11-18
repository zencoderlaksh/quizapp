import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the user details to localStorage
    const userDetails = { username, country, age };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Redirect to the category selection page
    navigate("/categories");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-blue-400 text-white">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="px-4 py-2 rounded-lg w-full text-black"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="px-4 py-2 rounded-lg w-full text-black"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="px-4 py-2 rounded-lg w-full text-black"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-3 rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
