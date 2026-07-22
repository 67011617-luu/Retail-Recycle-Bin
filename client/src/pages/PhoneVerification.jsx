import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconDeviceMobile, IconArrowLeft, IconUserPlus } from '@tabler/icons-react';
import { verifyUser, registerUser } from '../services/api';

function PhoneVerification() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    // Check if barcode was scanned
    const barcode = sessionStorage.getItem('scannedBarcode');
    if (!barcode) {
      navigate('/scan');
    }
  }, [navigate]);

  const handleVerify = async () => {
    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyUser(phone);
      // Store user phone in sessionStorage
      sessionStorage.setItem('userPhone', phone);
      navigate('/reward');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('User not found. Please register first.');
        setShowRegister(true);
      } else {
        setError(err.response?.data?.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !phone.trim()) {
      setError('Please provide both name and phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser({ name, phone });
      sessionStorage.setItem('userPhone', phone);
      navigate('/reward');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/disposal')}
          style={{ marginBottom: '20px' }}
        >
          <IconArrowLeft size={20} />
          Back
        </button>

        <div className="text-center">
          <IconDeviceMobile size={80} color="#667eea" style={{ margin: '0 auto 20px' }} />
          <h1>{showRegister ? 'Register Account' : 'Phone Verification'}</h1>
          <p>{showRegister ? 'Create an account to earn rewards' : 'Enter your phone number to receive points'}</p>
        </div>

        {showRegister && (
          <input
            type="text"
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="tel"
          className="input"
          placeholder="Phone number (e.g., 0812345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (showRegister ? handleRegister() : handleVerify())}
        />

        {error && (
          <div className="error">{error}</div>
        )}

        <button 
          className="btn btn-primary" 
          onClick={showRegister ? handleRegister : handleVerify}
          disabled={loading}
        >
          {loading ? 'Processing...' : showRegister ? (
            <>
              <IconUserPlus size={20} />
              Register & Continue
            </>
          ) : 'Verify & Continue'}
        </button>

        {!showRegister && (
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowRegister(true)}
            style={{ marginTop: '10px' }}
          >
            New User? Register Here
          </button>
        )}

        {showRegister && (
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setShowRegister(false);
              setError('');
              setName('');
            }}
            style={{ marginTop: '10px' }}
          >
            Already have an account? Sign In
          </button>
        )}
      </div>

      <div className="card">
        <h3>Privacy Notice</h3>
        <p style={{ fontSize: '14px' }}>
          Your phone number is used only to track your reward points. 
          We respect your privacy and will never share your information.
        </p>
      </div>
    </div>
  );
}

export default PhoneVerification;
