import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log('Error:', err));
  }, []);

  return (
    <div className="App">
      <h1>Anna Tutoring Users</h1>
      {users.map(user => (
        <div key={user._id}>
          <p><strong>{user.name}</strong> ({user.role})</p>
        </div>
      ))}
    </div>
  );
}

export default Users;
