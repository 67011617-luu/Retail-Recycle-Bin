import { useNavigate } from 'react-router-dom';
import { IconRecycle, IconBarcode, IconInfoCircle } from '@tabler/icons-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card text-center">
        <IconRecycle size={80} color="#667eea" style={{ margin: '0 auto 20px' }} />
        <h1>Smart Waste Management</h1>
        <p>Recycle and earn rewards for a cleaner planet</p>
      </div>

      <div className="card">
        <button className="btn btn-primary" onClick={() => navigate('/scan')}>
          <IconBarcode size={24} />
          Start Scanning
        </button>
      </div>

      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconInfoCircle size={24} color="#667eea" />
          How It Works
        </h3>
        <div style={{ marginTop: '15px' }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>1. Scan Barcode</div>
            <p style={{ margin: 0 }}>Scan the product barcode to check if it's recyclable</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>2. Dispose Item</div>
            <p style={{ margin: 0 }}>Place your item into the smart bin</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>3. Enter Phone Number</div>
            <p style={{ margin: 0 }}>Verify your identity to receive points</p>
          </div>
          <div>
            <div style={{ fontWeight: '600', marginBottom: '5px' }}>4. Earn Rewards</div>
            <p style={{ margin: 0 }}>Get points for every recyclable item</p>
          </div>
        </div>
      </div>

      <div className="card text-center">
        <p style={{ color: '#10b981', fontWeight: '600' }}>System Status: Online</p>
      </div>
    </div>
  );
}

export default Home;
