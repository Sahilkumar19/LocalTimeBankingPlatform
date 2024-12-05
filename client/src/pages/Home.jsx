import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Home.css'

const Home = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [newService, setNewService] = useState({ title: '', credits: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/services');
        setServices(response.data);
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
      const response = await axios.post('http://localhost:3001/api/services', newService);
      setServices([...services, response.data]); // Update services list
      setNewService({ title: '', credits: '' }); // Reset form
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

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
      />
      
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
          {filteredServices.map(service => (
            <li key={service._id} className="service-item">
              <Link to={`/services/${service._id}`} className="service-link">
                {service.title} - {service.credits} credits
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Add Service Section */}
      <div className="add-service-section">
        <button className="add-service-btn" onClick={addService}>Add Service</button>
      </div>
    </div>
  );
};

export default Home;
