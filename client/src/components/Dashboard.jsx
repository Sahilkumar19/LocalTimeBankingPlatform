import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    category: '',
    credits: 0,
  });
  const [error, setError] = useState('');

  // Fetch user, transactions, and services data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

        const userResponse = await axios.get('http://localhost:3001/api/users/me', { headers });
        setUser(userResponse.data);

        // const transactionResponse = await axios.get('http://localhost:3001/api/transactions', { headers });
        // setTransactions(transactionResponse.data);

        // const servicesResponse = await axios.get('http://localhost:3001/api/services/my-services', { headers });
        // setServices(servicesResponse.data);
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
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.post('http://localhost:3001/api/services/add', newService, { headers });

      setServices([...services, response.data]);
      setNewService({ title: '', description: '', category: '', credits: 0 }); // Reset the form fields
    } catch (error) {
      setError('Failed to add the service.');
    }
  };

  // Handle input changes for new service form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: name === 'credits' ? parseInt(value, 10) || 0 : value, // Parse credits as a number
    }));
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
            <li key={service._id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Category: {service.category}</p>
              <p>Credits: {service.credits}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleAddService} className="add-service-form">
          <input
            type="text"
            name="title"
            value={newService.title}
            onChange={handleInputChange}
            placeholder="Service Title"
            required
          />
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            placeholder="Service Description"
            required
          />
          <input
            type="text"
            name="category"
            value={newService.category}
            onChange={handleInputChange}
            placeholder="Service Category"
            required
          />
          <input
            type="number"
            name="credits"
            value={newService.credits}
            onChange={handleInputChange}
            placeholder="Credits"
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
