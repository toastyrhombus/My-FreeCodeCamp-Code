import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { buttonTypes } from "./App";

// ### Button redux ###

//Redux createSlice
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

function round(value, decimals) {
  return Number(
    Math.round(parseFloat(value) + "e" + decimals) + "e-" + decimals
  );
}

const displaySlice = createSlice({
  name: "display",
  initialState: { text: "0", error: false, errorTimeoutId: null },
  reducers: {
    updateDisplay: (state, action) => {
      state.text = round(action.payload.text, 7) | "Overflow";
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.errorTimeoutId = action.payload.errorTimeoutId;
    },
    showResult: (state, action) => {
      state.text = round(action.payload.text, 7) | "Overflow";
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
const buttonPressMiddleware = (store) => (next) => (action) => {
  // Intentionally made state non-constant so we can refresh when required
  let state = store.getState();
  if (action.type === buttonPress().type) {
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

          case "+":
          case "*":
          case "/":
            if (state.calc.equalsPressed === true) {
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
              store.dispatch(setEqualsPressed({ equalsPressed: false }));
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
            } else {
              store.dispatch(pushbackOperands({}));
              store.dispatch(
                operatorPress({ operator: action.payload.buttonName })
              );
            }
            return;

          case "=":
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
        if (state.calc.equalsPressed === true) {
          store.dispatch(clearPress());
          state = store.getState();
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

const displayMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  switch (action.type) {
    case updateDisplay().type:
      if (state.calc.operandA !== "") {
        action.payload = { text: state.calc.operandA };
      } else {
        action.payload = { text: "0" };
      }
      break;

    case showResult().type:
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

const errorDisplayMiddleware = (store) => (next) => (action) => {
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
