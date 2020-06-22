import React from "react";
import { connect } from 'react-redux';
import { numberPressedAction, clearPressedAction, operatorPressedAction, equalsPressedAction } from './Store';

const mapDispatch = (dispatch) => {
    return {
        numberPressedAction: (num) => dispatch(numberPressedAction(num)),
        clearPressedAction: () => dispatch(clearPressedAction()),
        operatorPressedAction: (operator) => dispatch(operatorPressedAction(operator)),
        equalsPressedAction: () => dispatch(equalsPressedAction())
    };
};

//This class expects to be passed an object or a string. If passed an object it will interpret it as a
//FontAwesome icon and create a JSX component with the object faString property being used as the className
//property of the i element
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.name = props.name;
    this.content = props.content;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      console.error(`Handler not implemented: ${this.content}`)
      return undefined;
  }

  render() {
    return (
      <button className={this.classes} onClick={this.handleClick}>
        {this.content}
      </button>
    );
  }
}

class NumberButton extends Button {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.content = props.content
    }

    handleClick() {
        this.props.numberPressedAction({currentNum: this.content});
    }
}

class OperatorButton extends Button {
    constructor(props) {
        super(props);
        typeof this.props.content === "object"
      ? (this.content = React.createElement('i', {className: props.content.faString}))
      : (this.content = this.props.content);
    }

    handleClick() {
        this.props.operatorPressedAction({operator: this.props.name})
    }
}

class EqualsButton extends OperatorButton {

    handleClick() {
        this.props.equalsPressedAction();
    }
}

class UtilityButton extends Button {
    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.clearPressedAction();
    }
}

const ReduxUtilityButton  = connect(null, mapDispatch) (UtilityButton);
const ReduxNumberButton   = connect(null, mapDispatch)  (NumberButton);
const ReduxOperatorButton = connect(null, mapDispatch)(OperatorButton);
const ReduxEqualsButton  = connect(null, mapDispatch)(EqualsButton);

export { ReduxNumberButton, ReduxUtilityButton, ReduxOperatorButton, ReduxEqualsButton };
