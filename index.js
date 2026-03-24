/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

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
const SINGLE_TEMPLATE_NAME = "【NAME】";
const SINGLE_TEMPLATE_DESCRIPTION = "【DESCRIPTION】";
const SINGLE_TEMPLATE_PLEDGED = "【PLEDGED】";
const SINGLE_TEMPLATE_GOAL = "【GOAL】";
const SINGLE_TEMPLATE_BACKERS = "【BACKERS】";
const SINGLE_TEMPLATE_IMG = "【IMG】";

const SINGLE_GAME_TEMPLATE = `
<div>
<h2>${SINGLE_TEMPLATE_NAME}</h2>
<p>${SINGLE_TEMPLATE_DESCRIPTION}</p>
<p>Pledged: ${SINGLE_TEMPLATE_PLEDGED}</p>
<p>Goal: ${SINGLE_TEMPLATE_GOAL}</p>
<p>Backers: ${SINGLE_TEMPLATE_BACKERS}</p>
<img class="game-img" src="${SINGLE_TEMPLATE_IMG}" alt="${SINGLE_TEMPLATE_NAME}">
</div>
`;
function addGamesToPage(game) {
    game.forEach(singleGameJson => {
        let divEle = document.createElement("div");
        divEle.classList.add("game-card");
        divEle.innerHTML = SINGLE_GAME_TEMPLATE.replace(SINGLE_TEMPLATE_NAME, singleGameJson.name)
            .replace(SINGLE_TEMPLATE_DESCRIPTION, singleGameJson.description)
            .replace(SINGLE_TEMPLATE_PLEDGED, singleGameJson.pledged)
            .replace(SINGLE_TEMPLATE_GOAL, singleGameJson.goal)
            .replace(SINGLE_TEMPLATE_BACKERS, singleGameJson.backers)
            .replace(SINGLE_TEMPLATE_IMG, singleGameJson.img);
        gamesContainer.appendChild(divEle);
    });
    // while (parent.firstChild) {
    //     parent.removeChild(parent.firstChild);
    // }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


const totalContribution = GAMES_JSON.reduce( (acc, game) => {acc += game.backers; return acc}, 0);
console.log("Total contributions: ", totalContribution);
contributionsCard.innerHTML = `${totalContribution.toLocaleString()}`;
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {acc += game.pledged; return acc}, 0);
console.log("Total raised: ", totalRaised);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
console.log("Total games: ", totalGames);
gamesCard.innerHTML = `${totalGames.toLocaleString()}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    console.log("Unfunded games count:", unfundedGames.length);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    console.log("Funded games count:", fundedGames.length);
    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    console.log("All games count:", GAMES_JSON.length);
    addGamesToPage(GAMES_JSON);
}


// showAllGames();


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded. We need your help to found these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const descriptionParagraph = document.createElement("p");
descriptionParagraph.textContent = descriptionText;
descriptionContainer.appendChild(descriptionParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

showAllGames();

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item