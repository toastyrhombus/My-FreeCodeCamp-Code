# PsuedoCode, Goal and Structure

Document to catalog application structure and flow.

## Type

Type of calculator will be an immediate operations calculator to simplify the application.

## Redux

Redux will be used as main application state store

### Reducers

- Numbers reducer
- Operations reducer
- Compute reducer

### Actions

- 0-9 Action to handle number concatenation to our current working number
- +-_/_ Operator action
- . decimal point action
- equals action
- clear action

### Action Generators

- 0-9 action generator for the numbers
- Operator action generator
- decimal point action generator
- utility action general - equals, clear

## React

### Components

- App
  - Display
  - Number 1
  - Number 2
  - Number 3
  - Number 4
  - Number 5
  - Number 6
  - Number 7
  - Number 8
  - Number 9
  - Number 0
  - Equals
  - Minus Operator
  - Multiplaction Operator
  - Addition Operator
  - Division Operator
  - Decimal Point
  - Clear

### State

State will be emplaced and taken from the redux store

## Psuedocode

Number pressed then
If zero pressed and currentNumber not zero then
Add number to currentNumber
Decimal point pressed then
Add decimal point to currentNumber
Operator pressed then
Add operator to currentOperator
Add currentNumber to PreviousNumber
Equals key pressed then
Perform operation using previousNumber and currentNumber - Assign value to result
round result to 4 decimal points if appropriate
Display result
If clear pressed then
Set currentNumber, previousNumber and Result to zero

## Layout

Bootstrap to be used to create a responsive layout.

Layout should be as follows:-

```
-------------------------------
|           Display           |
-------------------------------
|   C   |   /   |   *   |  -  |
-------------------------------
|   7   |   8   |   9   |     |
-------------------------  +  |
|   4   |   5   |   6   |     |
------------------------------|
|   1   |   2   |   3   |     |
-------------------------  =  |
|      0        |   .   |     |
-------------------------------
```

Row
4 items - col 3 each
4 items - col 3 each


## TODO List

- Equals keeps taking the previous value to use in subsequent operations
- Need to set a maximum # of decimal places
- After an operation is complete, it should clear the input/current number again if we press another number button