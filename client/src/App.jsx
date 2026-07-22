import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BarcodeScanner from './pages/BarcodeScanner';
import DisposalVerification from './pages/DisposalVerification';
import PhoneVerification from './pages/PhoneVerification';
import RewardScreen from './pages/RewardScreen';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/disposal" element={<DisposalVerification />} />
        <Route path="/verify" element={<PhoneVerification />} />
        <Route path="/reward" element={<RewardScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
