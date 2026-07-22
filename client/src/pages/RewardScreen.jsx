import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCoins, IconCircleCheck, IconHome, IconHistory } from '@tabler/icons-react';
import { rewardUser, getHistory } from '../services/api';

function RewardScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reward, setReward] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const processReward = async () => {
      const phone = sessionStorage.getItem('userPhone');
      const barcode = sessionStorage.getItem('scannedBarcode');

      if (!phone || !barcode) {
        navigate('/scan');
        return;
      }

      try {
        // Award points
        const rewardResponse = await rewardUser(phone, barcode);
        setReward(rewardResponse);

        // Get transaction history
        try {
          const historyResponse = await getHistory(phone);
          setHistory(historyResponse.data.slice(0, 5)); // Show last 5 transactions
        } catch (err) {
          console.error('Failed to load history:', err);
        }

        // Clear session data
        sessionStorage.removeItem('scannedBarcode');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to process reward. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    processReward();
  }, [navigate]);

  const handleNewScan = () => {
    navigate('/scan');
  };

  const handleGoHome = () => {
    sessionStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card text-center">
          <div className="loading">Processing your reward...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card text-center">
          <div className="error">{error}</div>
          <button className="btn btn-primary" onClick={handleGoHome} style={{ marginTop: '20px' }}>
            <IconHome size={20} />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card text-center">
        <IconCircleCheck size={80} className="success-icon" style={{ margin: '0 auto 20px' }} />
        <h1>Congratulations!</h1>
        <p>You've earned reward points</p>

        <div className="points-display">
          +{reward?.earnedPoints || 0} Points
        </div>

        <div style={{ 
          background: '#f3f4f6', 
          padding: '20px', 
          borderRadius: '12px',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>
            Current Balance
          </div>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#667eea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <IconCoins size={32} />
            {reward?.totalPoints || 0} Points
          </div>
        </div>
      </div>

      {history && history.length > 0 && (
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <IconHistory size={24} color="#667eea" />
            Recent Activity
          </h3>
          <div style={{ marginTop: '15px' }}>
            {history.map((transaction, index) => (
              <div key={transaction._id || index} className="info-row">
                <div>
                  <div className="info-value" style={{ fontSize: '14px' }}>
                    {transaction.product}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ fontWeight: '600', color: '#10b981' }}>
                  +{transaction.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <button className="btn btn-primary" onClick={handleNewScan}>
          Scan Another Item
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleGoHome}
          style={{ marginTop: '10px' }}
        >
          <IconHome size={20} />
          Back to Home
        </button>
      </div>

      <div className="card text-center">
        <h3>Thank You for Recycling! 🌱</h3>
        <p style={{ fontSize: '14px' }}>
          Every item you recycle helps create a cleaner, greener planet.
        </p>
      </div>
    </div>
  );
}

export default RewardScreen;
