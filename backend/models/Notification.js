// Notification Schema
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Notification Model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
