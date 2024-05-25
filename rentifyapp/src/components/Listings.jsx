import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ListCard from './ListCard';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchListings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('https://rentify-kumt.onrender.com/listings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch listings:', error);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
   
    // Filter listings based on filter options
    const filtered = listings.filter(listing => {
      if (minPrice && listing.price < minPrice) {
        
        return false;
      }
      if (maxPrice && listing.price > maxPrice) {
        return false;
      }
      if (minBedrooms && listing.numberBedrooms < minBedrooms) {
        return false;
      }
      if (maxBedrooms && listing.numberBedrooms > maxBedrooms) {
        return false;
      }
      return true;
    });
    setFilteredListings(filtered);
  }, [listings, minPrice, maxPrice, minBedrooms, maxBedrooms]);

  return (
    <div>
      <h2>Listings</h2>
     <div  style={{ width: "100%", display: "flex", flexDirection:"column",justifyContent: "center", alignItems: "center",flexWrap:"wrap" }}>
      <div style={{display:"flex", marginBottom: '10px' ,textAlign:"left"}}>
        <label htmlFor="minPrice">Minimum Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        <label htmlFor="maxPrice" style={{paddingLeft:"5px"}}>Maximum Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
      <div style={{display:"flex", marginBottom: '10px',textAlign:"left" }}>
        <label htmlFor="minBedrooms">Minimum Bedrooms:</label>
        <input type="number" id="minBedrooms" value={minBedrooms} onChange={e => setMinBedrooms(e.target.value)} />
        <label htmlFor="maxBedrooms"  style={{paddingLeft:"5px"}}>Maximum Bedrooms:</label>
        <input type="number" id="maxBedrooms" value={maxBedrooms} onChange={e => setMaxBedrooms(e.target.value)} />
      </div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" ,flexWrap:"wrap"}}>
        {loading? <>
        Loading...
        </>:<>{filteredListings.map(listing => (
          <ListCard key={listing._id} listing={listing} edit={false} />
        
        ))}
        </>}
      </div>
    </div>
  );
};

export default Listings;
