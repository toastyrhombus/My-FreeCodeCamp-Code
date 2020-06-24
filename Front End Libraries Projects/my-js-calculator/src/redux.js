import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

//Redux reducer
const initialState = {
  output: "0",
  currentNum: "0",
  prevNum: null,
  operator: null,
  currentTimeout: null,
};

//Actions
export const buttonPress = createAction(
  "buttons/buttonPress",
  (buttonName, buttonType) => {
    return {
      payload: {
        buttonName,
        buttonType,
      },
    };
  }
);

const buttonReducer = createReducer(null, {
  [buttonPress]: (state, action) => {
    console.log(state);
    console.log(action);
  },
});

const updateDisplay = createAction("display/update", (text) => {
  return {
    text,
  };
});

const toggleError = createAction("display/error");

const displayReducer = createReducer(
  { text: "0", error: false },
  {
    [updateDisplay]: (state, action) => (state.text += action.payload.text),
    [toggleError]: (state) => !state.error,
  }
);

const reducer = {
  display: displayReducer,
};

export const store = configureStore(reducer);

/*
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OUTPUT_DELAYED:
      console.log(action);
      return { ...state, output: action.payload.output, currentTimeout: action.payload.currentTimeout };

    case UPDATE_OUTPUT:
      return { ...state, output: action.payload.output };

    case CLEAR_PRESSED:
      return {
        output: "0",
        currentNum: "0",
        prevNum: null,
        operator: null,
        currentTimeout: null
      };

    case NUMBER_PRESSED:
      return { ...state, currentNum: action.payload.result, output: action.payload.result };

    case OPERATOR_PRESSED:
      return {
        ...state,
        prevNum: state.currentNum,
        currentNum: "0",
        operator: action.payload.operator,
      };
    
    case EQUALS_PRESSED:
      return {...state, currentNum: action.payload.result, prevNum: state.currentNum, output: action.payload.result};

    default:
      return state;
  }
};

//Action types
export const UPDATE_OUTPUT = "UPDATE_OUTPUT";
export const UPDATE_OUTPUT_DELAYED = "UPDATE_OUTPUT_DELAYED";
export const CLEAR_PRESSED = "CLEAR_PRESSED";
export const NUMBER_PRESSED = "NUMBER_PRESSED";
export const OPERATOR_PRESSED = "OPERATOR_PRESSED";
export const EQUALS_PRESSED = "EQUALS_PRESSED";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";
export const MULTIPLY = "MULTIPLY";
export const DIVIDE = "DIVIDE";

//Actions
export const clearPressedAction = () => {
  return { type: CLEAR_PRESSED };
};

export const numberPressedAction = (payload) => {
  return { type: NUMBER_PRESSED, payload };
};

export const operatorPressedAction = (payload) => {
  return { type: OPERATOR_PRESSED, payload };
};

export const equalsPressedAction = () => {
  return { type: EQUALS_PRESSED };
};

export const updateOutput = (payload) => {
  return { type: UPDATE_OUTPUT, payload };
};

export const updateOutputDelayed = (payload) => {
  return { type: UPDATE_OUTPUT_DELAYED, payload };
};

//Custom middleware - Program logic

//Logic for dealing with constrains about what number chars can be entered into the calculator
const numberPressedMiddleware = (store) => (next) => (action) => {
  if (action.type === NUMBER_PRESSED) {
    const state = store.getState();
    const currentNum = state.currentNum;
    const newNum = action.payload.currentNum;
    let result = "";

    //Check if we are entering a decimal point and ensure we only have one max in the string
    //If we are trying to insert more than one decimal point, show an error and then clear it after a timeout
    if (newNum === ".") {
      if (currentNum.indexOf(".") === -1) {
        result = currentNum + newNum;
      } else {
        const origOutput = state.output;
        const timeoutID = setTimeout(
          () => store.dispatch(updateOutputDelayed({ output: origOutput, currentTimeout: null })),
          500
        );
        console.log(timeoutID);
        store.dispatch(updateOutputDelayed({ output: "Multiple decimal points", currentTimeout: timeoutID}));
        return;
      }
    //If the current number is 0 (Start of new number entry) - We don't allow the number string to start
    // with multiple zeros
    } else if (currentNum === "0") {
      if (newNum != "0") {
        result = newNum
      } else {
        return;
      }
    //If everything passes validation, add the number to our string
    } else {
      result = currentNum + newNum;
    }
    //Add a result property to our action and call the next middleware
    action.payload.result = result;
    return next(action);
  }
  else {
    return next(action);
  }
};

//Middleware to handle the timeout for our errors. If we enter another number or operation
// clear the original error timeout, redisplay what our current number is and remove the timeout from our state
const handleTimeoutMiddleware = (store) => (next) => (action) => {
  if (action.type != UPDATE_OUTPUT_DELAYED) {
    const state = store.getState();
    if (state.currentTimeout != null) {
      clearTimeout(state.currentTimeout);
      store.dispatch(updateOutputDelayed({output: store.output, currentTimeout: null}));
    }
  }
  return next(action);
};

//Middleware to handle the logic of the calculation operations
const handleEqualsPressedMiddleware = (store) => (next) => (action) => {
  if (action.type === EQUALS_PRESSED) {
    const state = store.getState();
    let result = '';
    let prevNum = parseFloat(state.prevNum);
    let currentNum = parseFloat(state.currentNum);
    switch(state.operator) {
      case ADD:
        result = prevNum + currentNum;
        break;

      case SUBTRACT:
        result = prevNum - currentNum;
        break;

      case MULTIPLY:
        result = prevNum * currentNum;
        break;

      case DIVIDE:
        result = prevNum / currentNum;
        break;

      //Return from dispatch
      default:
        return;
    }
    action.payload = {result: String(result)}
  }
  return next(action);
};

//Redux store
const store = createStore(
  rootReducer,
  applyMiddleware(handleTimeoutMiddleware, numberPressedMiddleware, handleEqualsPressedMiddleware)
);

//Exports
export { store }; */
