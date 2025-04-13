import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    role: 'student', // or 'teacher'
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('_id', formData._id);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role', formData.role);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
        
      const res = await axios.post('http://localhost:5000/api/users', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      alert('User registered!');
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="_id" placeholder="Your ID" onChange={handleChange} />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
