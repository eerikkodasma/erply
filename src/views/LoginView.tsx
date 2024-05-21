import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/AuthReducer';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && token) {
      dispatch(login({ email, token }));
      navigate('/news');
    } else {
      setError('Please enter both email and API token');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="token">API Token:</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Get your API token from <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    </div>
  );
};

export default Login;
