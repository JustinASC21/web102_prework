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
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i ++) {
        let game = games[i]
        let newDiv = document.createElement('div');
        newDiv.classList.add("game-card");
        newDiv.innerHTML = `<img src="${game.img}" class = "game-img" ><p>${game.name}</p><p>${game.description}</p>`
        
        gamesContainer.appendChild(newDiv)
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalCont = GAMES_JSON.reduce((contri,currGame) => {
    return contri + currGame.backers;

},0)
contributionsCard.innerHTML = totalCont.toLocaleString('en-US')

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let moneyRaised = GAMES_JSON.reduce((mon,currGame)=>{return mon + currGame.pledged},0)

// set inner HTML using template literal
raisedCard.innerHTML = `$${moneyRaised.toLocaleString("en-US")}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let filtered = GAMES_JSON.filter((game) => {return game.pledged < game.goal})
    // use the function we previously created to add the unfunded games to the DOM

    addGamesToPage(filtered)

}
// filterUnfundedOnly()

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let filtered = GAMES_JSON.filter((game) => {return game.pledged > game.goal})
    // use the function we previously created to add the unfunded games to the DOM

    addGamesToPage(filtered)

    // use the function we previously created to add unfunded games to the DOM

}
// filterFundedOnly()

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}
// showAllGames()

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',(e) => {
    e.preventDefault();
    deleteChildElements(gamesContainer);
    filterUnfundedOnly();
})
fundedBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    deleteChildElements(gamesContainer);
    filterFundedOnly();
})
allBtn.addEventListener('click',(e) => {
    e.preventDefault();
    deleteChildElements(gamesContainer);
    showAllGames();
})

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unFundedElem = GAMES_JSON.filter((game) => {return game.pledged < game.goal}).length

const displayStr = `A total of $${moneyRaised.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. Currently, ${unFundedElem == 1 ? "1 game remains" : `${unFundedElem} games remain`} unfunded. We need your help to fund these amazing games!`

// create a string that explains the number of unfunded games using the ternary operator

let newP = document.createElement('p');
newP.innerHTML = displayStr;

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.appendChild(newP)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstPlayed,secondPlayed,...ext] = sortedGames;
console.log(firstPlayed.name)
console.log(secondPlayed.name)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let newElem = document.createElement('p');
newElem.innerHTML = firstPlayed.name;
firstGameContainer.appendChild(newElem)
// do the same for the runner up item
let secondNewElem = document.createElement('p');
secondNewElem.innerHTML = secondPlayed.name;
secondGameContainer.appendChild(secondNewElem)