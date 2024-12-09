import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/exchangeService.css";

const ExchangeService = () => {
  const { id } = useParams(); // Extract the id of the service to be exchanged
  const navigate = useNavigate();
  const [service, setService] = useState(null); // Current service details
  const [allServices, setAllServices] = useState([]); // List of available services for exchange
  const [selectedService, setSelectedService] = useState(""); // Selected service for exchange
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token")); // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Fetching service with id:", id); // Log the service ID
        // Fetch the current service
        const response = await axios.get(`https://localtimebankingplatform-m2jh.onrender.com:3001/api/services/${id}`);
        console.log("Current Service:", response.data); // Log response to verify service data
        setService(response.data);

        // Fetch all available services for exchange
        const allServicesResponse = await axios.get("https://localtimebankingplatform-m2jh.onrender.com:3001/api/services");
        console.log("All Services:", allServicesResponse.data); // Log to verify list of services
        const services = allServicesResponse.data;

        // Append the current service to the list for the dropdown
        const updatedServices = [
          response.data,
          ...services.filter((s) => s._id !== id), // Exclude duplicate of current service
        ];
        setAllServices(updatedServices);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  // Handle exchange submit
  const handleExchangeSubmit = async () => {
    if (!selectedService) {
      alert("Please select a service to exchange with.");
      return;
    }

    if (!token) {
      alert("You must be logged in to exchange services.");
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    try {
      // Call the API to process the exchange with token authentication
      await axios.post(
        "https://localtimebankingplatform-m2jh.onrender.com:3001/api/exchange",
        {
            serviceId: id,
            targetServiceId: selectedService,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included
          },
        }
      );

      setSuccessMessage("Exchange request submitted successfully!");
      setError(null); // Clear previous error if exchange is successful
    } catch (err) {
      console.error("Error submitting exchange request:", err);
      setError("Failed to submit exchange request. Please try again.");
      setSuccessMessage(""); // Clear success message if exchange failed
    }
  };

  if (loading) return <div className="exchange-service-loading">Loading...</div>;
  if (error) return <div className="exchange-service-error">{error}</div>;

  return (
    <div className="exchange-service-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Service Details
      </button>
      <h1 className="exchange-title">Exchange Service</h1>
      {service && (
        <div className="current-service-card">
          <h2>Current Service</h2>
          <p><strong>Title:</strong> {service.title || "No title available"}</p>
          <p><strong>Description:</strong> {service.description || "No description available"}</p>
        </div>
      )}

      <div className="exchange-selection">
        <h2>Select a Service to Exchange With</h2>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="exchange-select"
        >
          <option value="">-- Select a Service --</option>
          {allServices.map((s) => (
            <option key={s._id} value={s._id}>
              {s._id === id ? `${s.title}` : s.title}
            </option>
          ))}
        </select>
        <button className="submit-exchange-button" onClick={handleExchangeSubmit}>
          Submit Exchange Request
        </button>
      </div>

      {successMessage && <div className="exchange-success-message">{successMessage}</div>}
    </div>
  );
};

export default ExchangeService;
