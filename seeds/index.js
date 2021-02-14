const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i=0; i<300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID FROM DB
      author: '6021fb08d2838930179d5371',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos assumenda perspiciatis, repellat, aut, quis eos odio neque iure eum sequi dignissimos qui vel officia aspernatur! Eos magnam voluptatum quibusdam error!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/kingroot/image/upload/v1613120147/YelpCamp/bnn044v8y4igde4hf3zg.jpg',
          filename: 'YelpCamp/bnn044v8y4igde4hf3zg'
        },
        {
          url: 'https://res.cloudinary.com/kingroot/image/upload/v1613000385/YelpCamp/wy76kudmluwjkqtzfmhm.jpg',
          filename: 'YelpCamp/wy76kudmluwjkqtzfmhm'
        }
      ]
    })
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
