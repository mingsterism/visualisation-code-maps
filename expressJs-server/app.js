var express = require('express');

var app = express();

const getGoogleMap = () => { 

}

const getMapData = () => {

}

const postLocation = (locationString) => {
  // post data to mongodb
}

app.get('/googlemap', (req, res) => {
  const userData = getMapData();
  res.send(getGoogleMap(userData));
})

app.post('/sendUserLocation', (req, res) => {
  console.log(req.params);
  const userData;
  postLocation(locationString);
})