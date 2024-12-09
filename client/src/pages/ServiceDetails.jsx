import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/serviceDetails.css";

const ServiceDetails = () => {
  const { id } = useParams(); // Extract the id from the URL
  const navigate = useNavigate();
  const [service, setService] = useState(null); // State to hold the specific service
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    // Fetch service details
    const fetchService = async () => {
      try {
        const response = await axios.get("https://localtimebankingplatform-m2jh.onrender.com/api/services");
        const selectedService = response.data.find(service => service._id === id);

        if (!selectedService) {
          throw new Error("Service not found");
        }

        setService(selectedService);
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Check authentication status by verifying the token with the backend
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        // Validate the token with the backend
        const authResponse = await axios.get("https://localtimebankingplatform-m2jh.onrender.com/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(authResponse.data.isAuthenticated); // Backend should return true/false
      } catch (err) {
        console.error("Error checking authentication status:", err);
        setIsAuthenticated(false);
      }
    };

    fetchService();
    checkAuthStatus();
  }, [id]);

  const handleExchange = () => {
    if (!isAuthenticated) {
      // Pass the intended redirect URL as a query parameter
      navigate(`/login?redirectTo=/exchange/${id}`);
    } else {
      navigate(`/exchange/${id}`); // Redirect to exchange page
    }
  };
  

  if (loading) return <div className="service-details-loading">Loading...</div>;
  if (error) return <div className="service-details-error">{error}</div>;

  return (
    <div className="service-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Services
      </button>
      {service ? (
        <div className="service-details-card">
          <h1 className="service-title">{service.title}</h1>
          <p className="service-description">{service.description || "No description available"}</p>
          <div className="service-details-meta">
            <p><strong>Category:</strong> {service.category || "N/A"}</p>
            <p><strong>Credits:</strong> {service.credits || "N/A"}</p>
            <p><strong>Provided by:</strong> {service.userId || "N/A"}</p>
          </div>
          <button onClick={handleExchange}>
            Exchange Service
          </button>
        </div>
      ) : (
        <div className="service-details-error">Service details not found.</div>
      )}
    </div>
  );
};

export default ServiceDetails;
