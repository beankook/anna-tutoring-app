import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';

function ProfileSwipePage() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    console.log("👀 Retrieved from localStorage:", storedRole);

    if (!storedRole) {
      console.error("❌ No role found in localStorage!");
      return;
    }

    axios
      .get(`http://localhost:5000/api/users/profiles?role=${storedRole}`)
      .then((res) => {
        console.log("✅ Profiles fetched:", res.data);
        setProfiles(res.data);
      })
      .catch((err) => {
        console.error("🔥 Error fetching profiles:", err.response?.data || err.message);
      });
  }, []);

  const swiped = (direction, profile) => {
    const fromUser = parseInt(localStorage.getItem('userId')); // 👈 assuming it's stored
    const toUser = profile._id;
    const decision = direction === 'right' ? 'accept' : 'reject';
  
    console.log(`${decision === 'accept' ? '💚' : '💔'} ${decision.toUpperCase()}ED ${profile.name}`);
  
    // Save the swipe to backend
    axios.post('http://localhost:5000/api/swipes', {
      fromUser,
      toUser,
      decision
    })
    .then(() => console.log('✅ Swipe saved'))
    .catch((err) => console.error('❌ Failed to save swipe', err));
  };  

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-100 flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-sky-800">Swipe Profiles</h2>

      <div className="w-72 h-[400px] relative">
        {profiles.map((profile) => (
          <TinderCard
            key={profile._id}
            onSwipe={(dir) => swiped(dir, profile)}
            preventSwipe={['up', 'down']}
          >
            <div align="center" className="bg-white shadow-lg rounded-xl p-4 absolute w-full h-full text-center">
              <img
                src={`http://localhost:5000/uploads/${profile.image}`}
                alt={profile.name}
                width="300"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-2"
              />
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p>{profile.email}</p>
              <p className="italic">{profile.role}</p>
              <div className="mt-3 text-2xl">
                💔 ← → 💚
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default ProfileSwipePage;
