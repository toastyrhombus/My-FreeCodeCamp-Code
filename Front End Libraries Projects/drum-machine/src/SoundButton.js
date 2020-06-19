import React from "react";

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.sound = props.sound;
    this.keyDef = props.keyDef;
    this.updateParent = props.updateParent;
    this.state = {
      pressed: false,
    };
    this.audio = new Audio(props.audio);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.audio.play();
    this.updateParent(e);
  }

  render() {
    return (
      <button
        id={`snd-${this.sound}`}
        className="btn btn-primary col m-2"
        onClick={this.handleClick}
      >
        {this.keyDef}
      </button>
    );
  }
}

export default SoundButton;
