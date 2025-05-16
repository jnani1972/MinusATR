import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api/api';

const Callback = () => {
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const getAccessToken = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (!code) {
      console.error('No authorization code found in URL');
      alert('Authorization failed: No code received. Please try again.');
      navigate('/login');
      return;
    }

    sessionStorage.setItem("authCode", code);
    const username = sessionStorage.getItem("user");

    try {
      const response = await api.post('/api/upstox/generateAccessToken', { code, username });
      console.log('Access token response:', response.status, response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating access token:', {
        message: error.message,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      });
      alert('Failed to generate access token. Please try again.');
      navigate('/login');
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Processing authorization... Please wait.</p>
    </div>
  );
};

export default Callback;