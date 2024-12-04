// CompleteService.jsx
import { useState } from 'react';
import axios from 'axios';

const CompleteService = ({ service }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCompleteService = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post('http://localhost:3001/api/transactions', {
        serviceId: service._id,
        toUserId: service.userId,
        credits: service.credits,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Service completed successfully!');
    } catch (error) {
      console.error("Error completing service:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={handleCompleteService} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Complete Service'}
    </button>
  );
};

export default CompleteService;
