const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
//mdLApMvWgg41FJum
const User = require('./models/User');
const Listing = require('./models/Listing');
const sendEmail = require('./sendMail');
const Notification = require('./models/Notification');
// const Booking = require('./models/Booking');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://simran:mdLApMvWgg41FJum@cluster0.7akbl0k.mongodb.net/');

// Register route
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber });
    await user.save();
    const token = jwt.sign({ id: user._id}, 'secretkey', { expiresIn: '1h' });
    // res.send({ token });
    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
    
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// Protected route for fetching listings
app.get('/listings', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secretkey');
    const listings = await Listing.find();
    res.status(200).send(listings);
  } catch (error) {
    console.log(error);
    res.status(401).send('Unauthorized');
  }
});

// Create listing route
app.post('/listings', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { title, description, price, imgUrl, numberBedrooms,
    numberBaths,
    nearbyCollege,
    nearbyHospital,
    hasSwimmingPool,
    hasGarden } = req.body;
    console.log(numberBaths,numberBedrooms);
  try {
  
    const decoded = jwt.verify(token, 'secretkey');
       const listing = new Listing({
      title,
      description,
      price,
      imgUrl,
      numberBedrooms,
      numberBaths,
      nearbyCollege,
      nearbyHospital,
      hasSwimmingPool,
      hasGarden,
      owner_id: decoded.id
    });
    await listing.save();
    res.status(201).send(listing);
  } catch (error) {
    
    res.status(400).send(error);
  }
});



  
  app.get('/ownerposting', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const properties = await Listing.find({ owner_id: decoded.id });
    res.send(properties);
  });
  
  app.put('/properties/:id', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const { id } = req.params;
    try {
      const property = await Listing.findOneAndUpdate(
        { _id: id, owner_id: decoded.id },
        req.body,
        { new: true }
      );
      res.send(property);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  app.delete('/properties/:id', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const { id } = req.params;
    try {
      await Listing.findOneAndDelete({ _id: id, owner_id: decoded.id });
      res.send({ message: 'Property deleted' });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  app.post('/sendNotification/:id',async (req, res) => {
    const listing = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
  try {
    // Retrieve the listing details from the database
   const user=await User.findById(decoded.id);
    const listingOwn=await Listing.findById(listing);

    const notification = new Notification({
        listing,
        recipientEmail:user.email,
        owner_id:listingOwn.owner_id
      });
  
      await notification.save();
      res.status(201).json(notification);
  } catch (error) {
    console.error('Error fetching listing details:', error);
    res.status(500).json({ message: 'Internal server error' });
  };
  });
  app.get('/notification',async (req, res) => {
 
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
  try {
    // Retrieve the listing details from the database
   const user=await Notification.find({owner_id:decoded.id});
    console.log(user);
   
  
     
      res.status(201).json(user);
  } catch (error) {
    console.error('Error fetching listing details:', error);
    res.status(500).json({ message: 'Internal server error' });
  };
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
