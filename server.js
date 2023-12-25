const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let restaurants = [];

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(r => r.id === id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body;
  newRestaurant.id = generateUniqueId();
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
  console.log("Calling post method");
});

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  const updatedRestaurant = req.body;
  const index = restaurants.findIndex(r => r.id === id);
  if (index !== -1) {
    restaurants[index] = updatedRestaurant;
    res.json(updatedRestaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  restaurants = restaurants.filter(r => r.id !== id);
  res.json({ message: 'Restaurant deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateUniqueId() {
  return Math.random().toString(36).substring(7);
}
