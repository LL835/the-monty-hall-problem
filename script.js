/* 
<================== Plan ==================>

1. Create three doors.
2. Randomly pick a door as the winning door i.e. the door with the car behind it.
3. Randomly pick a door for the contestant i.e. the contestant's initial choice.
4. Run X amount of games with the stick strategy and calculate win rate. 
5. Run X amount of games with the switch strategy and calculate win rate.
6. Log the win rate for both strategies as an object, for example: {noOfGames: 100 , strategy: "switch", noOfCars: 67, noOfGoats = 34, winRate = 0.67 }.
7. Repeat for reliability.


<================== All possible outcomes ==================>

| Contestant's pick | Winning door | Switch | Stick |
|-------------------|--------------|--------|-------|
| 1                 | 1            | GOAT   | CAR   |
| 1                 | 2            | CAR    | GOAT  |
| 1                 | 3            | CAR    | GOAT  |
| 2                 | 1            | CAR    | GOAT  |
| 2                 | 2            | GOAT   | CAR   |
| 2                 | 3            | CAR    | GOAT  |
| 3                 | 1            | CAR    | GOAT  |
| 3                 | 2            | CAR    | GOAT  |
| 3                 | 3            | GOAT   | CAR   |

*/

// <================== Global variables ==================>
const form = document.querySelector("form");
const noOfGames = document.querySelector("#no-of-games");
const chosenStrategy = document.querySelector("#strategy"); 
const doors = [1, 2, 3];
let results = [];

// <================== Function that simulates the Monty Hall game ==================>
function runSimulation(noOfRounds, strategy){
    // use a loop to run the simulation multiple times
    for (let i = 0; i < noOfRounds; i++) {
        // use pickRandomDoor() to pick a door for the player and determine which door has a car behind it
        const prizeDoor = pickRandomDoor(doors);
        const playerDoor = pickRandomDoor(doors);
        // use useStrategy() to get the results of a single game in an object
        const outcome = useStrategy(strategy, playerDoor, prizeDoor);
        // push the results of that game into the results array
        results.push(outcome);
    }
    displayResults();
}

// <================== Function that returns a random item in an array ==================>
function pickRandomDoor(arr){
    // get a random integer between 0 and max no. of items in an array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // return a random item in array
    return arr[randomIndex];
}

// <======= Function that determines the outcome of the game and returns the result in an object ======>
function useStrategy(stickOrSwitch, guess, actual){
    // create an object to record results
    const outcome = {guess, actual};
    // switch statement to do different things depending on if the user wants to test switching doors or keeping the same door
    switch(stickOrSwitch){
        // what happens when choice doesn't change
        case "stick":
            guess === actual ? outcome.result = "win" : outcome.result = "lose";
            break; 
        // what happens when doors are switched
        case "switch":
            guess === actual ? outcome.result = "lose" : outcome.result = "win";
            break;
        // error message just in case something goes wrong
        default:
            console.error("Oops, something's gone wrong in useStrategy()!");
    }
    return outcome;
}

// <================== Function that calculates the winrate and other info ==================>
function summariseResults(arr){
    // creates an object that contains the key info about the results 
    const strategy = chosenStrategy.value;
    const noOfCars = arr.filter(element => element.result === "win").length;
    const noOfGoats = arr.filter(element => element.result=== "lose").length;
    const totalNo = arr.length;
    const percentage = ((noOfCars / arr.length) * 100);
    const winrate = + percentage.toFixed(2) + "%";
    return {strategy, noOfCars, noOfGoats, winrate, totalNo};
}

// <================== Function that shows results on the DOM ==================>
function displayResults(){
    // create an output element to store the other new elements
    const output = document.createElement("output");
    output.classList.add("output");
    output.classList.add("v-spacing-md");

    // call the summariseResults() function to get an object with the key info about the results
    const summary = summariseResults(results);
    // create the div element which contains the summary
    const summaryCtn = document.createElement("div");
    // add the summary info to the summary container
    const strategy = document.createElement("p");
    let text = "";
    summary.strategy === "stick" ? text = "Stay with the first door" : text = "Switch to the other door";
    strategy.textContent = `Strategy: ${text}`;
    const winrate = document.createElement("p");
    winrate.textContent = `Winrate: ${summary.winrate}`;
    const totalNo = document.createElement("p");
    totalNo.textContent = `Games played: ${summary.totalNo}`;
    const goats = document.createElement("p");
    goats.textContent = `Goats found: ${summary.noOfGoats}`;
    const cars = document.createElement("p");
    cars.textContent = `Cars found: ${summary.noOfCars}`;
    summaryCtn.appendChild(strategy);
    summaryCtn.appendChild(winrate);
    summaryCtn.appendChild(totalNo);
    summaryCtn.appendChild(goats);
    summaryCtn.appendChild(cars);
    // add the summary container to the output element
    output.append(summaryCtn);

    // create a table to show a breakdown of the results. Each row shows the result of a single game.
    const table = document.createElement("table");
    const headingsRow = document.createElement("tr"); 
    // column heading names are stored in this array
    const columnNames = ["Game no.", "Door picked", "Door with car", "Result"];
    // loop through the column heading names array and create a column heading each of the names in the array
    columnNames.forEach(name => {
        const heading = document.createElement("th");
        heading.innerText = name;
        headingsRow.appendChild(heading);
    })
    // add the headings to the table
    table.appendChild(headingsRow)
    // loop through the results array and add each game's info as a new row
    for (let i = 0; i < results.length; i++){
        // creates a new row
        const newRow = document.createElement("tr");
        // sets the Game no. column. It's i + 1 because the count starts at 0.
        const gameNoCell = document.createElement("td");
        gameNoCell.innerText = i + 1;
        newRow.appendChild(gameNoCell);
        // sets the Door picked column
        const guessedCell = document.createElement("td");
        guessedCell.innerText = results[i].guess;
        newRow.appendChild(guessedCell);
        // sets the Door with car column
        const actualCell = document.createElement("td");
        actualCell.innerText = results[i].actual;
        newRow.appendChild(actualCell);
        // sets the Results column
        const resultsCell = document.createElement("td");
        resultsCell.innerText = `${results[i].result}`;
        newRow.appendChild(resultsCell);
        // add the new row to the table
        table.appendChild(newRow);
    }
    // add the table to the output element
    output.appendChild(table);
    // add the output element to the main element
    const main = document.querySelector("main");
    main.appendChild(output);
}

// <================== Function that gets rid of the previous results ==================>
function resetPage(){
    // checks if there is already and output element in the page and removes it if there is (only needed first time the form is submitted)
    if (document.body.contains(document.querySelector("output"))) {
        document.querySelector("output").remove();
    }
    results = [];
}

// <================== Event listeners ==================>
form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetPage();
    runSimulation(noOfGames.value,  chosenStrategy.value);
})
