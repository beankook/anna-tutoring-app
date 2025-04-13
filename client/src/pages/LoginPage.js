// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      console.log("Login fetch response:", res);
      const data = await res.json();
      console.log("Parsed login response data:", data);
  
      if (!res.ok) {
        setError(data.message || 'Login failed');
        setMessage('');
        return;
      }
  
      // ✅ FIXED: use `data`, not `res.data`
      localStorage.setItem('userId', data.user._id); // 👈 this MUST exist in backend response
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("token", data.token); // store JWT or whatever backend sends
  
      setError('');
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/profiles'), 1500);
    } catch (err) {
    console.error("LOGIN ERROR:", err);          
      setError('Something went wrong');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
        />

        <button type="submit" className="bg-purple-600 text-white px-4 py-2 w-full rounded hover:bg-purple-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
