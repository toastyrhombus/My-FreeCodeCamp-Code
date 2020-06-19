import React from "react";
import "./App.css";
import './SoundButton'
import SoundButton from "./SoundButton";
import Display from './Display';

//Sound URLs - Thanks FCC
const soundURLs = {
  heaterOne: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  heaterTwo: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  heaterThree: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  heaterFour: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  heaterSix: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  dsc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  kickAndHat: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  kick: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  closedHH: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  chordOne: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  chordTwo: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  chordThree: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  lighter: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  openHH: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  snareAndHH: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  punchyKick: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  sideStickSnare: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  snare: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSound: "",
    };
    this.updateCurrentSound = this.updateCurrentSound.bind(this);
  }

  updateCurrentSound(e) {
    this.setState({currentSound: e.target.id});
  }

  render() {
    return (
      <div
        id="app-wrapper"
        className="h-100 row align-content-center justify-content-center"
      >
        <div
          id="drum-machine"
          className="col-12 col-sm-12 col-md-8 col-lg-4 d-flex drum-machine-box"
        >
          <div id="sound-btns" className="d-flex flex-column col-8 py-3">
            <div className="row flex-row flex-nowrap">
            <SoundButton sound={"heater-One"} keyDef="Q" updateParent={this.updateCurrentSound} audio={soundURLs.heaterOne}/>
            <SoundButton sound={"heater-Two"} keyDef="W" updateParent={this.updateCurrentSound} audio={soundURLs.heaterTwo}/>
            <SoundButton sound={"heater-Three"} keyDef="E" updateParent={this.updateCurrentSound} audio={soundURLs.heaterThree}/>
            </div>
            <div className="row flex-row flex-nowrap">
            <SoundButton sound={"kick"} keyDef="A" updateParent={this.updateCurrentSound} audio={soundURLs.kick}/>
            <SoundButton sound={"hihat-open"} keyDef="S" updateParent={this.updateCurrentSound} audio={soundURLs.openHH}/>
            <SoundButton sound={"hihat-closed"} keyDef="D" updateParent={this.updateCurrentSound} audio={soundURLs.closedHH}/>
            </div>
            <div className="row flex-row flex-nowrap">
            <SoundButton sound={"snare"} keyDef="Z" updateParent={this.updateCurrentSound} audio={soundURLs.snare}/>
            <SoundButton sound={"cymbal-one"} keyDef="X" updateParent={this.updateCurrentSound} audio={soundURLs.dsc}/>
            <SoundButton sound={"kick-and-hat"} keyDef="C" updateParent={this.updateCurrentSound} audio={soundURLs.kickAndHat}/>
            </div>
          </div>
          <div
            id="status"
            className="d-flex justify-content-center align-content-center col-4"
          >
            <Display currentSound={this.state.currentSound}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
