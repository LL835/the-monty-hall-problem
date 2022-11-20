# Coding Challenge: The Monty Hall Problem
## Overview

The Monty Hall problem is a probability puzzle that goes like so:

>Suppose you're on a game show, and you're given the choice of three doors: Behind one door is a car; behind the others, goats. You pick a door, say No. 1, and the host, who knows what's behind the doors, opens another door, say No. 3, which has a goat. He then says to you, "Do you want to pick door No. 2?" Is it to your advantage to switch your choice? - <cite>[Craig F. Whitaker, from a letter in Parade Magazine, 1990][1]</cite>

[1]: https://en.wikipedia.org/wiki/Monty_Hall_problem

The puzzle was famously featured in an American magazine in which columnist Marilyn vos Savant stated that switching doors is the better choice. She explained that the probability of picking the car when switching is 2/3. By contrast, the probability of picking the car when not switching is only 1/3.

This program aims to prove that vos Savant is correct by running sample games and comparing the success rate of the "switch" strategy against the "stick" strategy.

## How it works

This program simulates multiple sample games of the Monty Hall game and presents the result of those games to the user. The user can control the number of sample games to run and also the strategy used by using the drop-downs.

The program then displays the result of the simulations to the user. It gives the user:
- The total winrate across all of the sample games. 
- The number of goats picked.
- The number of cars picked.
- A breakdown of what happened in each game compiled into a table.

By comparing the winrate of the "switch" stategy against the "stick" strategy, it's possible to see that one strategy is the statistically better option.

## Try it out
A demo of this project can be found here.