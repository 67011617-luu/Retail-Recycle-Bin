import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTrash, IconCheck, IconArrowLeft } from '@tabler/icons-react';

function DisposalVerification() {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isDisposed, setIsDisposed] = useState(false);

  useEffect(() => {
    // Check if barcode was scanned
    const barcode = sessionStorage.getItem('scannedBarcode');
    if (!barcode) {
      navigate('/scan');
      return;
    }

    // Simulate sensor verification (in real app, this would poll the hardware sensor)
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setIsDisposed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    navigate('/verify');
  };

  return (
    <div className="container">
      <div className="card">
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/scan')}
          style={{ marginBottom: '20px' }}
        >
          <IconArrowLeft size={20} />
          Back to Scanner
        </button>

        <div className="text-center">
          {isVerifying ? (
            <>
              <IconTrash size={80} color="#667eea" style={{ margin: '0 auto 20px' }} />
              <h1>Waiting for Disposal</h1>
              <p>Please place your item inside the smart bin</p>
              <div className="loading">
                <div style={{ fontSize: '14px' }}>Sensor detecting item...</div>
              </div>
            </>
          ) : isDisposed ? (
            <>
              <IconCheck size={80} className="success-icon" style={{ margin: '0 auto 20px' }} />
              <h1>Item Detected!</h1>
              <p>Your item has been successfully deposited</p>
              <button 
                className="btn btn-primary" 
                onClick={handleContinue}
                style={{ marginTop: '20px' }}
              >
                Continue to Verification
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="card text-center">
        <h3>Disposal Instructions</h3>
        <ul style={{ textAlign: 'left', marginTop: '15px', lineHeight: '1.8' }}>
          <li>Open the smart bin lid</li>
          <li>Place the item completely inside</li>
          <li>Close the lid gently</li>
          <li>Wait for sensor confirmation</li>
        </ul>
      </div>
    </div>
  );
}

export default DisposalVerification;
