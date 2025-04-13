// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Anna Tutoring App 💡</h1>

      <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition">
        Login
      </button>

      <button onClick={() => navigate('/register')} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition">
        Register
      </button>

      <button
  onClick={() => navigate('/matches')}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  View Matches
</button>

      <button onClick={() => navigate('/profiles')} className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition">
        Browse Profiles 💚💔
      </button>
    </div>
  );
}

export default HomePage;
