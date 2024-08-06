/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
let num = 0;
function addGamesToPage(games) {
    
    console.log("addGamestoPage", games.length);

    // loop over each item in the data
    for (const game of games) {
        num++;
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        //set maxwidth and height for game-img at css
       gameCard.innerHTML = `<span><strong>${game['name']}</strong></span> 
       <p>${game['description']}</p>
       <div>
       <span> Pledged: <strong><span>${game['pledged']}</span></strong> / Goal: <strong><span>${game['goal']}</span></strong> </div>
       <span> # Backers: <strong><span>${game['backers']}</span></strong> </span>
       </div>
    <img class = "game-img" src = "${game['img']}"></img>`;

        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
        gamesContainer.append(gameCard);
    }     

}

// call the function we just defined using the correct variable

//console.log("keyword1", num);
// later, we'll call this function using a different list of games



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const backerSum = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;}, 0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<span>${backerSum.toLocaleString(('en-US'))}</span>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;}, 0)
raisedCard.innerHTML = `<span>$${totalRaised.toLocaleString(('en-US'))}</span>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
console.log("gamesCard", GAMES_JSON.length);
let numGames = GAMES_JSON.length;
gamesCard.innerHTML = `<span>${numGames.toLocaleString(('en-US'))}</span>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
/*
let listOfIncreasedSongs = songs.filter ( (song) => {
  return song.playsIn2022 > song.playsIn2021;
});

pledged < goal
*/
    let listOfUnfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    addGamesToPage(listOfUnfundedGames);
    console.log(listOfUnfundedGames.length, "unfunded games")
    // use the function we previously created to add the unfunded games to the DOM
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let listOfFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    addGamesToPage(listOfFundedGames);
    console.log(listOfFundedGames.length, "funded games")
    // use the function we previously created to add the unfunded games to the DOM
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames)



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal; }).length;

const numFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal; }).length;

// create a string that explains the number of unfunded games using the ternary operator
// let artistStr = `The artist is: ${song.hasArtist() ? song.artist : "Unknown artist"}`;
const explain = `A total of $${totalRaised.toLocaleString()} has been raised for ${numFundedGames} games. ${numUnfundedGames > 1 ? numUnfundedGames + " games " : " game " }remain unfunded.`

// create a new DOM element containing the template string and append it to the description container
const fundingInfo = document.createElement('p')
fundingInfo.innerHTML = explain;
descriptionContainer.append(fundingInfo);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames[0], sortedGames[1]);

// use destructuring and the spread operator to grab the first and second games
let [game1, game2, ...rest] = sortedGames

console.log(game1.name, game2.name)
// create a new element to hold the name of the top pledge game, then append it to the correct element

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
const firstGame = document.createElement("span")
firstGame.innerHTML = `<strong>${game1.name}</strong>`;
firstGameContainer.append(firstGame);
const secondGame = document.createElement("span")
secondGame.innerHTML = `<strong>${game2.name}</strong>`;
secondGameContainer.append(secondGame);


// do the same for the runner up item