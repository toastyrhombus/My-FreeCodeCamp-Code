import React from "react";

class Display extends React.Component {
  render() {
    return (
      <div
        id="display"
        className="align-self-center w-100"
      >
        <p className="display p-1 w-100 text-center">
          {this.props.currentSound === "" ? "Display" : this.props.currentSound}
        </p>
      </div>
    );
  }
}

export default Display;
