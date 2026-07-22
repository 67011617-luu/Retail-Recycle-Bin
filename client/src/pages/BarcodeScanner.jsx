import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBarcode, IconArrowLeft, IconCamera, IconX } from '@tabler/icons-react';
import { scanProduct } from '../services/api';
import { Html5QrcodeScanner } from 'html5-qrcode';

function BarcodeScanner() {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (showCamera && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setBarcode(decodedText);
          setShowCamera(false);
          scanner.clear();
          scannerRef.current = null;
          handleScanWithBarcode(decodedText);
        },
        (error) => {
          // Ignore scan errors (happens continuously while scanning)
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [showCamera]);

  const handleScanWithBarcode = async (barcodeValue) => {
    if (!barcodeValue.trim()) {
      setError('Please enter a barcode');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await scanProduct(barcodeValue);
      setProduct(response.data);
      sessionStorage.setItem('scannedBarcode', barcodeValue);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found. Please try another barcode.');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = () => handleScanWithBarcode(barcode);

  const handleContinue = () => {
    navigate('/disposal');
  };

  const toggleCamera = () => {
    if (showCamera && scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setShowCamera(!showCamera);
    setError('');
  };

  const getMaterialBadgeClass = (material) => {
    const materialMap = {
      'Plastic': 'badge-plastic',
      'Glass': 'badge-glass',
      'Metal': 'badge-metal',
      'Paper': 'badge-paper',
      'Cardboard': 'badge-paper'
    };
    return materialMap[material] || 'badge-plastic';
  };

  return (
    <div className="container">
      <div className="card">
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          <IconArrowLeft size={20} />
          Back to Home
        </button>

        <div className="text-center">
          <IconBarcode size={80} color="#667eea" style={{ margin: '0 auto 20px' }} />
          <h1>Scan Barcode</h1>
          <p>Enter barcode manually or use camera to scan</p>
        </div>

        {!showCamera ? (
          <>
            <input
              type="text"
              className="input"
              placeholder="Enter barcode (e.g., 885012300001)"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            />

            <button 
              className="btn btn-primary" 
              onClick={handleScan}
              disabled={loading}
            >
              {loading ? 'Scanning...' : 'Scan Product'}
            </button>

            <button 
              className="btn btn-secondary" 
              onClick={toggleCamera}
              style={{ marginTop: '10px' }}
            >
              <IconCamera size={20} />
              Use Camera Scanner
            </button>
          </>
        ) : (
          <>
            <div 
              id="reader" 
              style={{ 
                width: '100%', 
                marginBottom: '20px',
                border: '2px solid #667eea',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            ></div>
            <button 
              className="btn btn-secondary" 
              onClick={toggleCamera}
            >
              <IconX size={20} />
              Close Camera
            </button>
          </>
        )}

        {error && (
          <div className="error">{error}</div>
        )}
      </div>

      {product && (
        <div className="card">
          <div className="text-center">
            <h2>{product.name}</h2>
            
            <div style={{ margin: '20px 0' }}>
              <div className="info-row">
                <span className="info-label">Material</span>
                <span className={`badge ${getMaterialBadgeClass(product.material)}`}>
                  {product.material}
                </span>
              </div>
              
              <div className="info-row">
                <span className="info-label">Reward Points</span>
                <span className="info-value" style={{ color: '#667eea', fontSize: '24px', fontWeight: '700' }}>
                  +{product.points} Points
                </span>
              </div>

              {product.category && (
                <div className="info-row">
                  <span className="info-label">Category</span>
                  <span className="info-value">{product.category}</span>
                </div>
              )}
            </div>

            <button className="btn btn-primary" onClick={handleContinue}>
              Continue to Disposal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarcodeScanner;
