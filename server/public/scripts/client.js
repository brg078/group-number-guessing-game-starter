$(document).ready(handleReady);
let playerOne = 'Player 1';
let playerOneGuess = [];
let playerTwo = 'Player 2';
let playerTwoGuess = [];
let guessCount = 0;
let min = 1;
let max = 25;
let randomNumber = 0;

function handleReady() {
  console.log("jquery is loaded!")
  // $('#restartButton').hide();
  $('#restartButton').click(clearData);
  $('#guessSubmitButton').hide();
  $('#guessOne').hide();
  $('#guessTwo').hide();
  $('#nameSubmitButton').click(addPlayers);
  $('#guessSubmitButton').click(guessCounter);
  clearData();
}

function addPlayers () {
  console.log('in addPlayers');
  playerOne = $('#nameOne').val();
  playerTwo = $('#nameTwo').val();
  console.log('player one:', playerOne, 'playerTwo:' , playerTwo);
  $('#nameOne').hide();
  $('#nameTwo').hide();
  $('#nameSubmitButton').hide();
  $('#guessSubmitButton').show();
  $('#guessOne').show();
  $('#guessTwo').show();
  randomNumberGenerator(1,25);
  console.log(randomNumber);
  render();
}

function guessCounter () {
  guessCount ++;
  updateGuessData();
}

function updateGuessData () {
  $.ajax({
    method: 'POST',
    url: '/guessOne',
    data: {
      number: $('#guessOne').val()
    }
  }).then(function(response){
    // console.log('hello');
  }).catch(function(error){
    alert('request failed', error)
  });

  $.ajax({
    method: 'POST',
    url: '/guessTwo',
    data: {
      number: $('#guessTwo').val()
    }
  }).then(function(response){
    // console.log(response);
  }).catch(function(error){
    alert('request failed', error)
  });
  $('.guessInput').val('');
  getGuessData();
}

function getGuessData () { //these are get calls to receive updated guess data from server
  console.log('getting guesses: p1 guesses', playerOneGuess);
  $.ajax({
    method: 'GET',
    url: '/guessOne'
  }).then(function(response){
    playerOneGuess = response;
    // console.log('getting guesses: p1 guesses', playerOneGuess);
  }).catch(function(error){
    alert('error getting', error);
  });

  $.ajax({
    method: 'GET',
    url: '/guessTwo'
  }).then(function(response){
    playerTwoGuess = response;
    checkGuess();
  }).catch(function(error){
    alert('error getting', error);
  });

  console.log('getting guesses: ',playerOneGuess, playerTwoGuess);
  // render();
}

function clearData (){
  $.ajax({
    type: 'DELETE',
    url: '/guessOne'
  }).then(function(response){
    // console.log('guessOne deleted', response)
  }).catch(function(error){
    alert('failed clearData get', error);
  });

  $.ajax({
    type: 'DELETE',
    url: '/guessTwo'
  }).then(function(response){
    // console.log('guessTwo deleted', response)
  }).catch(function(error){
    alert('failed clearData get', error);
  });
  randomNumberGenerator(1,25);
  // console.log(randomNumber);
  getGuessData();
  guessCount = 0;
}

function randomNumberGenerator(min,max) {
  randomNumber = parseInt(Math.random() * (max - min)+min);
}

function checkGuess() {
  if (guessCount !=0 ) {
    $('#guessWinner').empty();
    console.log('in checkGuess', playerOneGuess, playerTwoGuess);
    if (playerOneGuess.includes(randomNumber)){
      console.log('player 1 wins');
      $('#guessWinner').append('Player one wins!!!!');
    } else if (playerTwoGuess.includes(randomNumber)) {
      console.log('player 2 wins');
      $('#guessWinner').append('Player two wins!!!!');
    } else {
      if (playerOneGuess[playerOneGuess.length -1] > randomNumber) {
        $('#guessWinner').append('Player one guess too high!<br>');
      } else {
        $('#guessWinner').append('Player one guess too low!<br>');
      }
      if (playerTwoGuess[playerTwoGuess.length -1] > randomNumber) {
        $('#guessWinner').append('Player two guess too high!<br>');
      } else {
        $('#guessWinner').append('Player two guess too low!<br>');
      }
    } 
  }
  render();
}

function render() {
  $('#tableHeadOne').empty();
  $('#tableHeadOne').append(`<tr><th>${playerOne} Guess History</th></tr>`);
  // console.log('rendering player one guesses', playerOneGuess);
  $('#tableBodyOne').empty();
  for (let guess of playerOneGuess) {
    $('#tableBodyOne').append(`<tr><td>${guess}</td></tr>`);
  }

  $('#tableHeadTwo').empty();
  $('#tableHeadTwo').append(`<tr><th>${playerTwo} Guess History</th></tr>`);
  $('#tableBodyTwo').empty();
  for (let guess of playerTwoGuess) {
    $('#tableBodyTwo').append(`<tr><td>${guess}</td></tr>`);
  }  
  $('#totalGuesses').empty();
  $('#totalGuesses').append(`Total Guesses = ${guessCount}`); 
  // TODO build function to count total guess and update variable
}