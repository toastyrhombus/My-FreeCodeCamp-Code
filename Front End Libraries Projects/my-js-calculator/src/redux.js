import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { buttonTypes } from "./App";

// ### Button redux ###

//Redux
// Button slice of our state
// These actions only exist to provide some constant to reference while still adhering to
// Redux recommendations. These actions do nothing but are instead intercepted by our custom
// middleware to be processed and the correct actions dispatched.
const buttonSlice = createSlice({
  name: "button",
  initialState: null,
  reducers: {
    buttonPress: (state) => {
      return state;
    },
    clearPress: (state) => {
      return state;
    },
  },
});

//Display slice of our state
const displaySlice = createSlice({
  name: "display",
  initialState: { text: "0", error: false, errorTimeoutId: null },
  reducers: {
    updateDisplay: (state, action) => {
      state.text = action.payload.text;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.errorTimeoutId = action.payload.errorTimeoutId;
    },
    showResult: (state, action) => {
      state.text = action.payload.text;
    },
  },
  extraReducers: {
    clearPress: (state) => {
      state.display.text = "";
      state.display.error = false;
    },
  },
});

//Maths operations
const ops = {
  "/": (a, b) => parseFloat(b) / parseFloat(a),
  "*": (a, b) => parseFloat(b) * parseFloat(a),
  "-": (a, b) => parseFloat(b) - parseFloat(a),
  "+": (a, b) => parseFloat(b) + parseFloat(a),
};

// Main calculator slice
// Note we are treating the operands as strings for ease of use
const calcSlice = createSlice({
  name: "calc",
  initialState: {
    operandA: "",
    operandB: "",
    operator: "",
    equalsPressed: false,
  },
  reducers: {
    operatorPress: (state, action) => {
      state.operator = action.payload.operator;
      state.operandA = "";
    },
    pushbackOperands: (state, action) => {
      state.operandB = state.operandA;
    },
    numberPress: (state, action) => {
      state.operandA = state.operandA + action.payload.buttonName;
    },
    setOperandA: (state, action) => {
      state.operandA = action.payload;
    },
    calculate: (state) => {
      state.operandB = ops[state.operator](state.operandA, state.operandB);
    },
    setEqualsPressed: (state, action) => {
      state.equalsPressed = action.payload.equalsPressed;
    },
  },
  extraReducers: {
    [buttonSlice.actions.clearPress]: (state) => {
      state.operandA = "";
      state.operandB = "";
      state.operator = "";
      state.equalsPressed = false;
    },
  },
});

// Export action creator names
export const { buttonPress, clearPress } = buttonSlice.actions;
export const { updateDisplay, setError, showResult } = displaySlice.actions;
export const {
  operatorPress,
  numberPress,
  calculate,
  setEqualsPressed,
  pushbackOperands,
  setOperandA,
} = calcSlice.actions;

// Combine slices into rootReducer
const reducer = {
  display: displaySlice.reducer,
  calc: calcSlice.reducer,
  button: buttonSlice.reducer,
};

//Business logic - custom middleware
//NANA - Next Action Next-Action
// This middleware intercepts any button presses, uses a switch to determine the type and then the name of the button
// to determine what actions are required. Some logic is placed inside certain button types to allow validation on the
// input for particular scenarios.
// I really don't like how this middleware turned out, I've redone it once completely, and refactored this twice and it
// still appears to me very difficult to follow if you haven't been looking at the code for the past few days. I've learned
// alot writing this and hopefully the next one will be more elegant! Maybe a state machine would've simplified things.
const buttonPressMiddleware = (store) => (next) => (action) => {
  // Intentionally made state non-constant so we can refresh when required
  let state = store.getState();
  // Intercept all buttonpress actions
  if (action.type === buttonPress().type) {
    // Get the button type of the specific button we are dealing with
    switch (action.payload.buttonType) {
      case buttonTypes.UTILITY:
        switch (action.payload.buttonName) {
          case "CA":
            store.dispatch(clearPress());
            store.dispatch(updateDisplay());
            return;

          default:
            console.error(
              `${action.payload.buttonName} is not a valid utility name.`
            );
            return;
        }

      case buttonTypes.OPERATOR:
        switch (action.payload.buttonName) {
          case "-":
            //Logic to check if we need to negate the value
            if (state.calc.operandA === "") {
              store.dispatch(
                buttonPress({
                  buttonName: action.payload.buttonName,
                  buttonType: "NUMBER",
                })
              );
              return;
            }
          // If we aren't negating then we fall through to the operator logic
          case "+":
          case "*":
          case "/":
            //If we know equals was pressed, only update the operator, do not push A to B
            if (state.calc.equalsPressed === true) {
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
              store.dispatch(setEqualsPressed({ equalsPressed: false }));
              //If all of our operands and operator exist, we know the user has input more data for
              // another round of calculation so calculate the already set state, set the new operator
              // so the user can do another round.
            } else if (
              state.calc.operandA !== "" &&
              state.calc.operandB !== "" &&
              state.calc.operator !== ""
            ) {
              store.dispatch(calculate());
              store.dispatch(showResult());
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
              //If user has previously entered something, pressed the operator but then does not enter anything AND
              // then presses another operator, just update the operation we are doing
            } else if (
              state.calc.operandA === "" &&
              state.calc.operandB !== ""
            ) {
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
              // Normal operator action, push A to B, set the operator. Also clears A.
            } else {
              store.dispatch(pushbackOperands({}));
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
            }
            return;

          case "=":
            //Checks we have all input required otherwise show an error
            if (
              state.calc.operator !== "" &&
              state.calc.operandA !== "" &&
              state.calc.operandB !== ""
            ) {
              store.dispatch(calculate());
              store.dispatch(setEqualsPressed({ equalsPressed: true }));
              store.dispatch(showResult());
            } else {
              dispatchErrorWithTimeout(store);
            }
            return;

          default:
            console.error(
              `${action.payload.buttonName} is not a valid operator name.`
            );
            return;
        }

      case buttonTypes.NUMBER:
        //If we have already pressed equals, we want to start a new round of calculation when the user
        // enters a brand new number.
        if (state.calc.equalsPressed === true) {
          store.dispatch(clearPress());
          state = store.getState(); //Refresh state as we need fresh state due to our clear action in previous line
        }
        switch (action.payload.buttonName) {
          case "0":
            //Check if we are inserting leading zero's and dispatch an error if found
            if (state.calc.operandA === "0") {
              dispatchErrorWithTimeout(store);
              return;
            }

          //Fall through cases for all other numbers and a non-error zero
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
          case "-": //Added so we can put a negation sign in the text
            //Check for a leading zero and remove if applicable
            if (state.calc.operandA === "0") {
              store.dispatch(setOperandA(""));
            }
            store.dispatch(
              numberPress({ buttonName: action.payload.buttonName })
            );
            store.dispatch(updateDisplay());
            return;

          //Check if we already have a decimal point, if we do, dispatch error
          case ".":
            if (state.calc.operandA.indexOf(".") === -1) {
              //Edge case check to add a zero to the text string if needed
              if (state.calc.operandA === "") {
                store.dispatch(numberPress({ buttonName: "0" }));
              }
              store.dispatch(
                numberPress({ buttonName: action.payload.buttonName })
              );
              store.dispatch(updateDisplay());
            } else {
              dispatchErrorWithTimeout(store);
            }
            return;

          default:
            console.error(
              `${action.payload.buttonName} is not a valid number name.`
            );
            return;
        }

      default:
        console.error(
          `${action.payload.buttonType} is not a valid button type.`
        );
        return;
    }
  } else {
    return next(action);
  }
};

//Function to immediately show an error and then 500ms later, remove that error
function dispatchErrorWithTimeout(store) {
  const timeoutId = setTimeout(() => {
    store.dispatch(setError({ error: false, errorTimeoutId: null }));
  }, 500);
  store.dispatch(
    setError({
      error: true,
      errorTimeoutId: timeoutId,
    })
  );
}

// Display middleware
const displayMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case updateDisplay().type:
      // If we have real state for operandA, then display it, otherwise show 0
      if (state.calc.operandA !== "") {
        action.payload = { text: state.calc.operandA };
      } else {
        action.payload = { text: "0" };
      }
      break;

    case showResult().type:
      // Second display action to show the result of our calculation rather than the live state of A
      if (state.calc.operandB !== "") {
        action.payload = { text: state.calc.operandB };
      } else {
        return;
      }
      break;

    default:
      break;
  }
  return next(action);
};

//Error display middleware
const errorDisplayMiddleware = (store) => (next) => (action) => {
  //Checks if we are in the middle of a timeout and clears it if we have pressed another button
  // Does not intercept error actions to avoid infinite recursion
  const state = store.getState();
  if (state.display.error === true && action.type !== setError().type) {
    clearTimeout(state.display.errorTimeoutId);
    store.dispatch(setError({ error: false, errorTimeoutId: null }));
  }
  next(action);
};

const middleware = [
  ...getDefaultMiddleware(),
  errorDisplayMiddleware,
  buttonPressMiddleware,
  displayMiddleware,
];

export const store = configureStore({ reducer, middleware });
