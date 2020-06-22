import React from "react";
import "./App.css";
import Display from "./Display";
import { ReduxNumberButton, ReduxUtilityButton, ReduxOperatorButton, ReduxEqualsButton } from "./Button";
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from './Store';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="calculator-wrapper" className="container-fluid h-100 p-0">
        <div id="row-1" className="row single-base-row">
          <Display />
        </div>
        <div id="row-2" className="row single-base-row">
          <ReduxUtilityButton
            classes={"btn btn-block utility-button col-3 calc-button"}
            content="CA"
            name="clear"
          />
          <ReduxOperatorButton
            classes={"btn btn-block operator-button col-3 calc-button"}
            content={{ faString: "fas fa-divide" }}
            name={DIVIDE}
          />
          <ReduxOperatorButton
            classes={"btn btn-block operator-button col-3 calc-button"}
            content={{ faString: "fas fa-times" }}
            name={MULTIPLY}
          />
          <ReduxOperatorButton
            classes={"btn btn-block operator-button col-3 calc-button"}
            content={{ faString: "fas fa-minus" }}
            name={SUBTRACT}
          />
        </div>
        <div id="row-3" className="row double-base-row">
          <div
            id="row-3-1"
            className="col-9 d-flex flex-row flex-wrap p-0 multi-row"
          >
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="7"
              name="7"
            />
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="8"
              name="8"
            />
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="9"
              name="9"
            />
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="4"
              name="4"
            />
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="5"
              name="5"
            />
            <ReduxNumberButton
              classes={"btn btn-block number-button col-4 calc-button"}
              content="6"
              name="6"
            />
          </div>
          <div id="row-3-2" className="col-3 p-0">
            <ReduxOperatorButton
              classes={"btn btn-block operator-button col-12 h-100 calc-button"}
              content={{ faString: "fas fa-plus" }}
              name={ADD}
            />
          </div>
        </div>
        <div id="row-4" className="row double-base-row">
          <div id="row-4-1" className="col-9 p-0">
            <div
              id="row-4-2"
              className="col-12 d-flex flex-row flex-wrap p-0 h-50"
            >
              <ReduxNumberButton
                classes={"btn btn-block number-button col-4 calc-button"}
                content="1"
                name="1"
              />
              <ReduxNumberButton
                classes={"btn btn-block number-button col-4 calc-button"}
                content="2"
                name="2"
              />
              <ReduxNumberButton
                classes={"btn btn-block number-button col-4 calc-button"}
                content="3"
                name="3"
              />
            </div>
            <div
              id="row-4-3"
              className="col-12 d-flex flex-row flex-wrap p-0 h-50"
            >
              <ReduxNumberButton
                classes={"btn btn-block number-button col-8 calc-button"}
                content="0"
                name="0"
              />
              <ReduxNumberButton
                classes={"btn btn-block number-button col-4 calc-button"}
                content="."
                name="decimalPoint"
              />
            </div>
          </div>
          <div id="row-4-4" className="col-3 p-0">
            <ReduxEqualsButton
              classes={"btn btn-block operator-button h-100 col-12 calc-button"}
              content={{ faString: "fas fa-equals" }}
              name="equals"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
