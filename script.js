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

// const doors = [1, 2, 3];
// const results = 
// {
//     strategy: "",
//     rounds: "",
//     cars: 0,
//     goats: 0,
//     winRate: "",
// }

// function runSampleGame(strategy, rounds){
//     for (let i = 0; i < rounds; i++){
//         const winningDoor = getRandomItemFromArr(doors);
//         const contestantChoice = getRandomItemFromArr(doors);
//         getResults(strategy, contestantChoice, winningDoor);
//         calculateWinRate(rounds, results.cars);
//     }
//     results.strategy = strategy;
//     results.rounds = rounds;
//     // console.log(results);
//     presentResults();
//     resetResults();
// }

// function getRandomItemFromArr(array){
//     const randomIndex = Math.floor(Math.random() * array.length);
//     return array[randomIndex];
// }

// function getResults(strategy, guess, actual){
//     if (strategy === "stick"){
//         stickWithChoice(guess, actual)
//     }
//     else if (strategy === "switch"){
//         switchChoice(guess, actual)
//     }
// }

// function stickWithChoice(guess, actual){
//     if (guess === 1 && actual === 1){
//         results.cars += 1;
//     }
//     else if (guess === 1 && actual === 2){
//         results.goats += 1;
//     }
//     else if (guess === 1 && actual === 3){
//         results.goats += 1;
//     }

//     else if (guess === 2 && actual === 1){
//         results.goats += 1;
//     }
//     else if (guess === 2 && actual === 2){
//         results.cars += 1;
//     }
//     else if (guess === 2 && actual === 3){
//         results.goats += 1;
//     }

//     else if (guess === 3 && actual === 1){
//         results.goats += 1;
//     }
//     else if (guess === 3 && actual === 2){
//         results.goats += 1;
//     }
//     else if (guess === 3 && actual === 3){
//         results.cars += 1;
//     }
// }

// function switchChoice(guess, actual){
//     if (guess === 1 && actual === 1){
//         results.goats += 1;
//     }
//     else if (guess === 1 && actual === 2){
//         results.cars += 1;
//     }
//     else if (guess === 1 && actual === 3){
//         results.cars += 1;
//     }

//     else if (guess === 2 && actual === 1){
//         results.cars += 1;
//     }
//     else if (guess === 2 && actual === 2){
//         results.goats += 1;
//     }
//     else if (guess === 2 && actual === 3){
//         results.cars += 1;
//     }

//     else if (guess === 3 && actual === 1){
//         results.cars += 1;
//     }
//     else if (guess === 3 && actual === 2){
//         results.cars += 1;
//     }
//     else if (guess === 3 && actual === 3){
//         results.goats += 1;
//     }
// }

// function calculateWinRate(total, wins){
//     let percentage = (parseFloat(wins) / parseFloat(total) * 100);
//     percentage = +percentage.toFixed(2);
//     results.winRate = `${percentage}%`
// }

// function resetResults(){
//     results.strategy = "";
//     results.rounds =  "";
//     results.cars =  0;
//     results.goats =  0;
//     results.winRate =  "";
// }

// function presentResults(){
//     console.group(`Strategy employed: ${results.strategy}`)
//         console.log(`In ${results.rounds} games, the contestant won ${results.winRate} of the time`);
//         console.log(`The contestant picked the door with the car ${results.cars} times`);
//         console.log(`The contestant picked a door with a goat ${results.goats} times`)
//     console.groupEnd();
// }
// runSampleGame("stick", 100);
// runSampleGame("switch", 100);
// runSampleGame("stick", 300);
// runSampleGame("switch", 300);
// runSampleGame("stick", 1234);
// runSampleGame("switch", 1234);

const doors = [1, 2, 3];
const results = [];

function runSimulation(noOfRounds, strategy){
    for (let i = 0; i < noOfRounds; i++) {
        const prizeDoor = pickRandomDoor(doors);
        const playerDoor = pickRandomDoor(doors);
        const outcome = useStrategy(strategy, playerDoor, prizeDoor);
        results.push(outcome);
    }
    console.log(processResults(results));
}

function pickRandomDoor(arr){
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function useStrategy(stickOrSwitch, guess, actual){
    switch(stickOrSwitch){
        case "stick":
            return stickWithSameDoor(guess, actual);
            break; 
        case "switch":
            return switchToDiffDoor(guess, actual);
            break;
        default:
            console.error("Oops, something's gone wrong in useStrategy()!")
    }
}

function stickWithSameDoor(guess, actual){
    if (guess === actual){
        return "win";
        }
    else {
        return "lose";
    }
}

function switchToDiffDoor(guess, actual){
    if (guess === actual){
        return "lose";
    }
    else {
        return "win";
    }
}

function processResults(arr){
    const noOfCars = arr.filter(element => element === "win").length;
    const noOfGoats = arr.filter(element => element === "lose").length;
    let percentage = ((noOfCars / arr.length) * 100);
    percentage = + percentage.toFixed(2);
    return {noOfCars, noOfGoats, percentage}
}

runSimulation(100, "stick")
