import React from 'react'
import './notify.css';
const NotifyCard = ({listing}) => {
  return (
    <div className="card">
    <div className="card-header">
      Listing ID: {listing._id}
    </div>
    <div className="card-body">
      <h5 className="card-title">Owner ID: {listing.owner_id}</h5>
      <p className="card-text">Recipient Email: {listing.recipientEmail}</p>
      <p className="card-text">Timestamp: {listing.timestamp}</p>
    </div>
  </div>
  )
}

export default NotifyCard