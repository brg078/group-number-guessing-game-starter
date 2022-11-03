$(document).ready(handleReady);
let playerOne;
let playerOneGuess = [];
let playerTwo;
let playerTwoGuess = [];
let guessCount = 0;
let min = 1;
let max = 25;
let randomNumber

function handleReady() {
  console.log("jquery is loaded!")
  // $('#restartButton').hide();
  $('#restartButton').click(clearData);
  $('#guessSubmitButton').hide();
  $('#guessOne').hide();
  $('#guessTwo').hide();
  $('#nameSubmitButton').click(addPlayers);
  $('#guessSubmitButton').click(guessCounter);
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
    console.log(response);
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
    console.log(response);
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
    console.log('getting guesses: p1 guesses', playerOneGuess);
  }).catch(function(error){
    alert('error getting', error);
  });

  $.ajax({
    method: 'GET',
    url: '/guessTwo'
  }).then(function(response){
    playerTwoGuess = response;
    render();
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
    console.log('guessOne deleted', response)
  }).catch(function(error){
    alert('failed clearData get', error);
  });

  $.ajax({
    type: 'DELETE',
    url: '/guessTwo'
  }).then(function(response){
    console.log('guessTwo deleted', response)
  }).catch(function(error){
    alert('failed clearData get', error);
  });

getGuessData();

}

function randomNumberGenerator(min,max) {



}






function checkGuess() {

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