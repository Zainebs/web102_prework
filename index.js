/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
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
     for (let i = 0; i < games.length; i++)
{
       const game = games[i];
        // create a new div element, which will become the game card
        // add the class game-card to the list
            const  div = document.createElement('div');
            div.classList.add('game-card');
            div.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h1>${game.name}</h1>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
          `;
         gamesContainer.appendChild(div);

        
   }     

} 

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, games) => {
  return total + games.backers;
}, 0);

contributionsCard.textContent = "$" + totalContributions.toLocaleString('en-US');

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((total, games) => {
    return total + games.pledged;
  }, 0);

// set inner HTML using template literal
raisedCard.textContent = `$${totalPledged}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.textContent = totalGames;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
     const unfundedGames= GAMES_JSON.filter((games) =>  games.pledged < games.goal);
     console.log(unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
addGamesToPage(unfundedGames);
}
filterUnfundedOnly();


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames= GAMES_JSON.filter((games) =>  games.pledged > games.goal);
    console.log(fundedGames.length);
    addGamesToPage(fundedGames);
}
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    const allGames = GAMES_JSON.filter((game) => true);
    addGamesToPage(allGames); 
    console.log(allGames);
}
showAllGames();
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
function sumUnfundedGames() {
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const totalUnfundedGames = unfundedGames.reduce((sum, game) => sum + 1, 0);
    return totalUnfundedGames;

}
const unfundedGames = sumUnfundedGames();
sumUnfundedGames();
console.log(sumUnfundedGames());


// create a string that explains the number of unfunded games using the ternary operator
// Create a new paragraph element
const paragraph = document.createElement('p');

// Set the content of the paragraph element using the template string
const unfundedStr = `Currently, we have raised $${totalPledged.toLocaleString()} across ${totalGames.toLocaleString()} games. However, ${unfundedGames.toLocaleString()} ${unfundedGames === 1 ? 'game remains' : 'games remain'} unfunded.`;
paragraph.textContent = unfundedStr;

// Add the paragraph element to the descriptionContainer
descriptionContainer.appendChild(paragraph);
console.log(descriptionContainer);
//const unfundedstr = `Currently we have raised $${totalContributions} across ${allGames}, however${unfundedGames > 0 ? ` there ${numUnfundedGames === 1 ? 'is 1 game' : `are ${numUnfundedGames} games`} remaining unfunded.` : ' all games are funded.'}`;

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    if (item2.pledged < item1.pledged){
        return -1;
    }
    else return 1;
});
console.log(sortedGames);
// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restGames] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameNameElement = document.createElement("p");
topGameNameElement.textContent = `Top Funded Game: ${firstGame.name}`;
firstGameContainer.appendChild(topGameNameElement);

// do the same for the runner-up game
const runnerGameNameElement = document.createElement("p");
runnerGameNameElement.textContent = `Runner-up Game: ${secondGame.name}`;
secondGameContainer.appendChild(runnerGameNameElement);
