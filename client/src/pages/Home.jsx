import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [newService, setNewService] = useState({ title: '', credits: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [limitedServices, setLimitedServices] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://localtimebankingplatform-m2jh.onrender.com/api/services');
        setServices(response.data);
        setLimitedServices(response.data.slice(0, 5)); // Show only the first 5 services
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Add a new service
  const addService = async () => {
    if (!isAuthenticated) {
      alert('You need to log in to add a service.');
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post('https://localtimebankingplatform-m2jh.onrender.com/api/services', newService);
      setServices([...services, response.data]); // Update services list
      setLimitedServices([...services, response.data].slice(0, 5)); // Update limited list
      setNewService({ title: '', credits: '' }); // Reset form
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (search.trim() === '') {
      setIsSearching(false);
      setLimitedServices(services.slice(0, 5)); // Reset to limited services
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`https://localtimebankingplatform-m2jh.onrender.com/api/services?search=${search}`);
      setLimitedServices(response.data); // Show search results
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Available Services</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
      
      {/* Service List */}
      {services.length === 0 ? (
        <div className="empty-state">
          <p>No services found. Add the first service below:</p>
          <input
            type="text"
            className="input-field"
            placeholder="Service title"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Credits"
            value={newService.credits}
            onChange={(e) => setNewService({ ...newService, credits: e.target.value })}
          />
          <button className="add-service-btn" onClick={addService}>Add Service</button>
        </div>
      ) : (
        <ul className="service-list">
          {limitedServices.map(service => (
            <li key={service._id} className="service-item">
              <Link to={`/services/${service._id}`} className="service-link">
                {service.title} - {service.credits} credits
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Add Service Section */}
      {!isSearching && (
        <div className="add-service-section">
          <button className="add-service-btn" onClick={addService}>Add Service</button>
        </div>
      )}
    </div>
  );
};
export default Home;
