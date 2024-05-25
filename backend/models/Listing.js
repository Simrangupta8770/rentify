const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  numberBedrooms: { type: Number,required:true },
  numberBaths: { type: Number,required:true},
  nearbyCollege: { type: Number},
  nearbyHospital: { type: Number},
  hasSwimmingPool: { type: Boolean},
  hasGarden: { type: Boolean},
  imgUrl:{type:String},
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
