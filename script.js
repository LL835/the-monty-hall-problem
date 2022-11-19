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

const doors = [1, 2, 3];
const results = [];

function runSimulation(noOfRounds, strategy){
    for (let i = 0; i < noOfRounds; i++) {
        const prizeDoor = pickRandomDoor(doors);
        const playerDoor = pickRandomDoor(doors);
        const outcome = useStrategy(strategy, playerDoor, prizeDoor);
        results.push(outcome);
    }
    summariseResults(results)
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
    const noOfCars = arr.filter(element => element.result === "win").length;
    const noOfGoats = arr.filter(element => element.result=== "lose").length;
    const percentage = ((noOfCars / arr.length) * 100);
    const winrate = + percentage.toFixed(2) + "%";
    console.log({noOfCars, noOfGoats, winrate})
}

function displayResults(){
    const table = document.createElement("table");
    const headingsRow = document.createElement("tr") 
    const columnNames = ["Game No", "Guessed Door No", "Winning Door No.", "Result"]
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
        resultsCell.innerText = results[i].result
        newRow.appendChild(resultsCell)

        table.appendChild(newRow)
    }
    document.body.appendChild(table)
}

runSimulation(30, "switch")
displayResults()