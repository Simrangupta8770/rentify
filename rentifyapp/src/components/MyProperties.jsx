import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyProper.css'
import ListCard from './ListCard';
const MyProperties = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    numberBedrooms: 0,
    numberBaths: 0,
    nearbyCollege: 0,
    nearbyHospital: 0,
    hasSwimmingPool: false, 
    hasGarden: false,
    imgUrl:""
  });
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  
  const fetchListings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('http://localhost:3000/listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      setListings(response.data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };
  useEffect(() => {
   
    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
        console.log(formData);
      await axios.post('http://localhost:3000/listings', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Close the modal after successfully adding property
      setShowModal(false);
      // Redirect or perform any action after adding property
      // navigate('/listings');
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (value=="true" ? true :false) : value;
    console.log({ ...formData, [name]: newValue });
    setFormData({ ...formData, [name]: newValue });
  };
  

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between"}}>

        <h4>My Properties</h4>
        <button style={{width:'auto'}} onClick={() => setShowModal(true)}>Add Property</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Property</h2>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
              <label>Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required />
              <label>Price:</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              <label>Number of Bedrooms:</label>
              <input type="number" name="numberBedrooms" value={formData.numberBedrooms} onChange={handleChange} required />
              <label>Number of Baths:</label>
              <input type="number" name="numberBaths" value={formData.numberBaths} onChange={handleChange} required />
              <label>Nearby College:</label>
              <input type="text" name="nearbyCollege" value={formData.nearbyCollege} onChange={handleChange} required />
              <label>Image URL:</label>
              <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required />
              <label>Nearby College:</label>
              <input type="text" name="nearbyHospital" value={formData.nearbyHospital} onChange={handleChange} required />
              <label>Has Swimming Pool:</label>
<div className="radio-container">
<span>Yes</span>
  <input type="radio" name="hasSwimmingPool" value={"true"} checked={formData.hasSwimmingPool === "true"} onChange={handleChange} />
</div>
<div className="radio-container">
<span>No</span>
  <input type="radio" name="hasSwimmingPool" value={"false"} checked={formData.hasSwimmingPool === "false"} onChange={handleChange} />
</div>
<label>Has Garden:</label>
<div className="radio-container">
<span>Yes</span>
  <input type="radio" name="hasGarden" value={"true"} checked={formData.hasGarden==="true"} onChange={handleChange} />
</div>
<div className="radio-container">
<span>No</span>

  <input type="radio" name="hasGarden" value={"false"} checked={formData.hasGarden==='false'} onChange={handleChange} />
</div>        <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

<div>

<div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        {listings.map((listing) => (
         <ListCard listing={listing} edit={true} fetchListings={fetchListings}/>
        ))}
      </div>
</div>
      
    </div>
  );
};

export default MyProperties;
