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