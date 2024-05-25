import React,{useEffect, useState} from 'react';
import './listcard.css';
import './MyProper.css'
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const ListCard = ({ listing, edit,fetchListings}) => {
    const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    imgUrl:"",
    numberBedrooms: 0,
    numberBaths: 0,
    nearbyCollege: 0,
    nearbyHospital: 0,
    hasSwimmingPool: false, // Example boolean field
    hasGarden: false // Example boolean field
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await axios.put(`http://localhost:3000/properties/${listing._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Close the modal after successfully adding property
      setShowModal(false);
      fetchListings();
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
  const handleDel=async()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try{
        const res=await axios.delete(`http://localhost:3000/properties/${listing._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(res);
fetchListings();
    }catch(error){
        console.log(error);
    }
  }
  const handleEdit=()=>{
    setFormData({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        numberBedrooms: listing.numberBedrooms,
        numberBaths: listing.numberBaths,
        nearbyCollege: listing.nearbyCollege,
        imgUrl:listing.imgUrl || "",
        nearbyHospital: listing.nearbyHospital,
        hasSwimmingPool: listing.hasSwimmingPool?"true":"false", // Example boolean field
        hasGarden: listing.hasGarden ?"true":"false"
    });
    setShowModal(true);
  }
  const sendNot=async()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try{
        const res=await axios.post(`http://localhost:3000/sendNotification/${listing._id}`, {},{
            headers: { Authorization: `Bearer ${token}` }
          });
    }catch(error){
        console.log(error);
    }
  }
  useEffect(()=>{
    console.log(listing);
  },[])
  return (
    <>
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
              <label>Image URL:</label>
              <input type="text" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required />
            
              <label>Number of Bedrooms:</label>
              <input type="number" name="numberBedrooms" value={formData.numberBedrooms} onChange={handleChange} required />
              <label>Number of Baths:</label>
              <input type="number" name="numberBaths" value={formData.numberBaths} onChange={handleChange} required />
              <label>Nearby College:</label>
              <input type="text" name="nearbyCollege" value={formData.nearbyCollege} onChange={handleChange} required />
              <label>Nearby Hospital:</label>
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
</div>        <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    <div className="listing-card">

      <div className="card-buttons"  style={{width:"full",textAlign:"right"}}>
      {edit &&  <span style={{cursor:"pointer",paddingLeft:"5px"}} onClick={() => {handleEdit()}}><CiEdit /></span>}
       {edit && <span style={{cursor:"pointer",paddingLeft:"5px",color:"red"}} onClick={() => {handleDel()}}><MdDelete /></span>}
      </div>
     {!edit && <div className="card-btn">
          <button onClick={sendNot}>I'm Interested</button>
        </div>}
      <div className='img'>
        {listing.imgUrl && <img src={listing.imgUrl} alt='house img' />}
      </div>
      <h2>{listing.title}</h2>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Price:</strong> {listing.price}</p>
      <p><strong>Number of Bedrooms:</strong> {listing.numberBedrooms}</p>
      <p><strong>Number of Baths:</strong> {listing.numberBaths}</p>
      <p><strong>Nearby College:</strong> {listing.nearbyCollege}</p>
      <p><strong>Nearby Hospital:</strong> {listing.nearbyHospital}</p>
      <p><strong>Has Swimming Pool:</strong> {listing.hasSwimmingPool ? 'Yes' : 'No'}</p>
      <p><strong>Has Garden:</strong> {listing.hasGarden ? 'Yes' : 'No'}</p>
    </div>
    </>
  );
};

export default ListCard;
