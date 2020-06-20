import React from "react";

class SoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.sound = props.sound.soundName;
    this.keyDef = props.sound.keyDef;
    this.updateParent = props.updateParent;
    this.state = {
      pressed: false,
    };
    //Audio for the button - note we preload so use doesn't need to fetch on button click
    this.audioUrl = props.sound.url;
    new Audio(this.audioUrl).preload = true;

    this.handleClick = this.handleClick.bind(this);
    //We bind this objects handleClick event to the sound object passed in via props
    //This is so the parent can call the play sound function - only for key presses
    props.sound.handler = this.handleClick;
  }

  //We generate a new Audio each handleClick call so we can play multiple times concurrently if the user
  //hits the button fast enough
  handleClick(e) {
    new Audio(this.audioUrl).play();
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
