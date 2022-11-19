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

/* 
<================== Code to run sample games ==================>
 */
const form = document.querySelector("form");
const noOfGames = document.querySelector("#no-of-games");
const chosenStrategy = document.querySelector("#strategy") 
const doors = [1, 2, 3];
let results = [];

function runSimulation(noOfRounds, strategy){
    for (let i = 0; i < noOfRounds; i++) {
        const prizeDoor = pickRandomDoor(doors);
        const playerDoor = pickRandomDoor(doors);
        const outcome = useStrategy(strategy, playerDoor, prizeDoor);
        results.push(outcome);
    }
    displayResults();
}

function pickRandomDoor(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function useStrategy(stickOrSwitch, guess, actual){
    const outcome = {guess, actual}
    switch(stickOrSwitch){
        case "stick":
            guess === actual ? outcome.result = "win" : outcome.result = "lose"
            break; 
        case "switch":
            guess === actual ? outcome.result = "lose" : outcome.result = "win"

            break;
        default:
            console.error("Oops, something's gone wrong in useStrategy()!")
    }
    return outcome
}

function summariseResults(arr){
    const strategy = chosenStrategy.value
    const noOfCars = arr.filter(element => element.result === "win").length;
    const noOfGoats = arr.filter(element => element.result=== "lose").length;
    const totalNo = noOfCars + noOfGoats
    const percentage = ((noOfCars / arr.length) * 100);
    const winrate = + percentage.toFixed(2) + "%";
    return {strategy, noOfCars, noOfGoats, winrate, totalNo}
}

function displayResults(){
    const output = document.createElement("output");

    output.classList.add("output");
    output.classList.add("v-spacing-md");
    const summary = summariseResults(results);
    const summaryCtn = document.createElement("div");
    const strategy = document.createElement("p");
    let text = ""
    summary.strategy === "stick" ? text = "Stay with the first door" : text = "Switch to the other door"
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
    output.append(summaryCtn)


    const table = document.createElement("table");
    const headingsRow = document.createElement("tr") 
    const columnNames = ["Game no.", "Door picked", "Door with car", "Result"]
    columnNames.forEach(name => {
        const heading = document.createElement("th");
        heading.innerText = name;
        headingsRow.appendChild(heading);
    })
    table.appendChild(headingsRow)
    for (let i = 0; i < results.length; i++){
        const newRow = document.createElement("tr")
        const gameNoCell = document.createElement("td");
        gameNoCell.innerText = i + 1;
        newRow.appendChild(gameNoCell)
        const guessedCell = document.createElement("td");
        guessedCell.innerText = results[i].guess;
        newRow.appendChild(guessedCell)
        const actualCell = document.createElement("td");
        actualCell.innerText = results[i].actual
        newRow.appendChild(actualCell)
        const resultsCell = document.createElement("td");
        resultsCell.innerText = `${results[i].result}`
        newRow.appendChild(resultsCell)
        table.appendChild(newRow)
    }
    output.appendChild(table);

    const main = document.querySelector("main");
    main.appendChild(output)
}

function resetPage(){
    if (document.body.contains(document.querySelector("output"))) {
        document.querySelector("output").remove()
    }
    results = [];
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetPage();
    setTimeout(() => {
        runSimulation(noOfGames.value,  chosenStrategy.value)
    }, 200)
})
