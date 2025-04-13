import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MatchedProfilesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    axios.get(`http://localhost:5000/api/swipes/matches/${userId}`)
      .then(res => setMatches(res.data))
      .catch(err => console.error("❌ Error fetching matches", err));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-100 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">Your Matches</h2>

      <div className="grid gap-4">
        {matches.map((user) => (
          <div key={user._id} className="bg-white rounded-xl shadow-md p-4 text-center w-72">
            <img
              src={`http://localhost:5000/uploads/${user.image}`}
              alt={user.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p>{user.email}</p>
            <p className="italic">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchedProfilesPage;
