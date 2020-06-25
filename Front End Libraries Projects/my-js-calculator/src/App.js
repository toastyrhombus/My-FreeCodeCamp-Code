import React from "react";
import { connect } from "react-redux";
import { buttonPress } from "./redux";
import "./App.css";
import { Textfit} from 'react-textfit';

//React components for our app

export const buttonTypes = {
  UTILITY: "UTILITY",
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
};

export default class App extends React.Component {
  render() {
    return (
      <div id="calculator-wrapper" className="container-fluid h-100 p-0">
        <div id="row-1" className="row single-base-row">
          <Display />
        </div>
        <div id="row-2" className="row single-base-row">
          <Button
            id="clear"
            classes={"btn btn-block utility-button col-3 calc-button"}
            name="CA"
            type={buttonTypes.UTILITY}
          />
          <Button
            id="divide"
            classes={"btn btn-block operator-button col-3 calc-button"}
            jsxElem={<i className="fas fa-divide"></i>}
            name="/"
            type={buttonTypes.OPERATOR}
          />
          <Button
            id="multiply"
            classes={"btn btn-block operator-button col-3 calc-button"}
            jsxElem={<i className="fas fa-times"></i>}
            name="*"
            type={buttonTypes.OPERATOR}
          />
          <Button
            id="subtract"
            classes={"btn btn-block operator-button col-3 calc-button"}
            jsxElem={<i className="fas fa-minus"></i>}
            name="-"
            type={buttonTypes.OPERATOR}
          />
        </div>
        <div id="row-3" className="row double-base-row">
          <div
            id="row-3-1"
            className="col-9 d-flex flex-row flex-wrap p-0 multi-row"
          >
            <Button
              id="seven"
              classes={"btn btn-block number-button col-4 calc-button"}
              name="7"
              type={buttonTypes.NUMBER}
            />
            <Button
              classes={"btn btn-block number-button col-4 calc-button"}
              id="eight"
              name="8"
              type={buttonTypes.NUMBER}
            />
            <Button
              classes={"btn btn-block number-button col-4 calc-button"}
              id="nine"
              name="9"
              type={buttonTypes.NUMBER}
            />
            <Button
              classes={"btn btn-block number-button col-4 calc-button"}
              id="four"
              name="4"
              type={buttonTypes.NUMBER}
            />
            <Button
              classes={"btn btn-block number-button col-4 calc-button"}
              id="five"
              name="5"
              type={buttonTypes.NUMBER}
            />
            <Button
              id="six"
              classes={"btn btn-block number-button col-4 calc-button"}
              name="6"
              type={buttonTypes.NUMBER}
            />
          </div>
          <div id="row-3-2" className="col-3 p-0">
            <Button
              id="add"
              classes={"btn btn-block operator-button col-12 h-100 calc-button"}
              jsxElem={<i className="fas fa-plus"></i>}
              name="+"
              type={buttonTypes.OPERATOR}
            />
          </div>
        </div>
        <div id="row-4" className="row double-base-row">
          <div id="row-4-1" className="col-9 p-0">
            <div
              id="row-4-2"
              className="col-12 d-flex flex-row flex-wrap p-0 h-50"
            >
              <Button
                id="one"
                classes={"btn btn-block number-button col-4 calc-button"}
                name="1"
                type={buttonTypes.NUMBER}
              />
              <Button
                id="two"
                classes={"btn btn-block number-button col-4 calc-button"}
                name="2"
                type={buttonTypes.NUMBER}
              />
              <Button
                id="three"
                classes={"btn btn-block number-button col-4 calc-button"}
                name="3"
                type={buttonTypes.NUMBER}
              />
            </div>
            <div
              id="row-4-3"
              className="col-12 d-flex flex-row flex-wrap p-0 h-50"
            >
              <Button
                id="zero"
                classes={"btn btn-block number-button col-8 calc-button"}
                name="0"
                type={buttonTypes.NUMBER}
              />
              <Button
                id="decimal"
                classes={"btn btn-block number-button col-4 calc-button"}
                name="."
                type={buttonTypes.NUMBER}
              />
            </div>
          </div>
          <div id="row-4-4" className="col-3 p-0">
            <Button
              id="equals"
              classes={"btn btn-block operator-button h-100 col-12 calc-button"}
              jsxElem={<i className="fas fa-equals"></i>}
              name="="
              type={buttonTypes.OPERATOR}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapButtonDispatch = (dispatch) => {
  return {
    buttonPress: (buttonType, buttonName) =>
      dispatch(buttonPress(buttonType, buttonName)),
  };
};

class button extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.name = props.name;
    this.content = props.jsxElem || props.name;
    this.type = props.type;
    this.id = props.id;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.buttonPress({ buttonType: this.type, buttonName: this.name });
  }

  render() {
    return (
      <button id={this.id} className={this.classes} onClick={this.handleClick}>
        {this.content}
      </button>
    );
  }
}

const Button = connect(null, mapButtonDispatch)(button);

const select = (state) => {
  if (state.display.error) {
    return { text: "ERR" };
  } else {
    return { text: state.display.text };
  }
};

class display extends React.Component {
  render() {
    return (
      <div id="display" className="col-12 card justify-content-center">
        <Textfit mode='single' className="text-right display-text">
        {this.props.text}
        </Textfit>
      </div>
    );
  }
}

const Display = connect(select)(display);
