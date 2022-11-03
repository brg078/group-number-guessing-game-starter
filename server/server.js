const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let playerOneGuesses = require('./public/modules/oneplayerhistory.js');
let playerTwoGuesses = require('./public/modules/twoplayerhistory.js');

// console.log(playerOneGuesses);

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.get('/guessOne' , (req, res) => {
  console.log('in /guessOne');
  res.send(playerOneGuesses);
});

app.get('/guessTwo' , (req, res) => {
  console.log('in /guessTwo');
  res.send(playerTwoGuesses);
});

app.post('/guessOne' , (req, res) => {
  console.log('posting guess one');
  playerOneGuesses.push(Number(req.body.number));
  res.sendStatus(200);
});

app.post('/guessTwo' , (req, res) => {
  console.log('posting guess two');
  playerTwoGuesses.push(Number(req.body.number));
  res.sendStatus(200);
});

app.delete('/guessOne' , (req, res) => {
  console.log('in guessOne delete');
  playerOneGuesses = [];
  res.sendStatus(200);
});

app.delete('/guessTwo' , (req, res) => {
  console.log('in guessTwo delete');
  playerTwoGuesses = [];
  res.sendStatus(200);
});






app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
