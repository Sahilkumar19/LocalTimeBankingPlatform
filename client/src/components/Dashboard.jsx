import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css'; // Add a CSS file for better styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [error, setError] = useState('');

  // Fetch user, transactions, and services data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

        const userResponse = await axios.get('http://localhost:3001/api/users/me', { headers });
        setUser(userResponse.data);

        const transactionResponse = await axios.get('http://localhost:3001/api/transactions', { headers });
        setTransactions(transactionResponse.data);

        const servicesResponse = await axios.get('http://localhost:3001/api/services/my-services', { headers });
        setServices(servicesResponse.data);
      } catch (error) {
        setError('Failed to load data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Handle adding new services
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/api/services/add',
        { title: newService },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setServices([...services, response.data]);
      setNewService(''); // Clear the input field
    } catch (error) {
      setError('Failed to add the service.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Credits: {user?.credits}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="services-section">
        <h2>Your Services</h2>
        <ul>
          {services.map((service) => (
            <li key={service._id}>{service.title}</li>
          ))}
        </ul>
        <form onSubmit={handleAddService} className="add-service-form">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Add a new service"
            required
          />
          <button type="submit">Add Service</button>
        </form>
      </div>

      <div className="transactions-section">
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              Service ID: {transaction.serviceId}, Credits: {transaction.credits}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
