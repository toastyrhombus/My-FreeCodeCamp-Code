import React from "react";
import "./App.css";
import "./SoundButton";
import SoundButton from "./SoundButton";
import Display from "./Display";

//Sound URLs - Thanks FCC
//We create an object containing the sound URL's, the name of the sound, the key we want to assign
//and a callback to the button component that we will eventually assign this object to.
const sounds = {
  heaterOne: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    keyDef: "Q",
    soundName: "Heater-One",
    handler: undefined,
  },
  heaterTwo: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDef: "W",
    soundName: "Heater-Two",
    handler: undefined,
  },
  heaterThree: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    keyDef: "E",
    soundName: "Heater-Three",
    handler: undefined,
  },
  heaterFour: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyDef: undefined,
    soundName: "Heater-Four",
    handler: undefined,
  },
  heaterSix: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    keyDef: undefined,
    soundName: "Heater-Six",
    handler: undefined,
  },
  dsc: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyDef: "X",
    soundName: "Cymbal",
    handler: undefined,
  },
  kickAndHat: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyDef: "C",
    soundName: "Kick-And-Hat",
    handler: undefined,
  },
  kick: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    keyDef: "A",
    soundName: "Kick",
    handler: undefined,
  },
  closedHH: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyDef: "D",
    soundName: "HH-Open",
    handler: undefined,
  },
  chordOne: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    keyDef: undefined,
    soundName: "Chord-One",
    handler: undefined,
  },
  chordTwo: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    keyDef: undefined,
    soundName: "Chord-Two",
    handler: undefined,
  },
  chordThree: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    keyDef: undefined,
    soundName: "Chord-Three",
    handler: undefined,
  },
  lighter: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    keyDef: undefined,
    soundName: "Lighter",
    handler: undefined,
  },
  openHH: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    keyDef: "S",
    soundName: "HH-Open",
    handler: undefined,
  },
  snareAndHH: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    keyDef: undefined,
    soundName: "Snare-And-HH",
    handler: undefined,
  },
  punchyKick: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    keyDef: undefined,
    soundName: "Punchy-Kick",
    handler: undefined,
  },
  sideStickSnare: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    keyDef: undefined,
    soundName: "Side-Snare",
    handler: undefined,
  },
  snare: {
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    keyDef: "Z",
    soundName: "Snare",
    handler: undefined,
  },
};
//We iterate through the sound object, checking if we have keys assigned and then
//assigning them to our keys object to make working with them later much easier
var keys = {};
for (const key in sounds) {
  if (sounds.hasOwnProperty(key)) {
    if (sounds[key].keyDef !== undefined) {
      keys[sounds[key].keyDef] = key;
    }
  }
}

//Main app class
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSound: "",
    };
    this.updateCurrentSound = this.updateCurrentSound.bind(this);
    this.attachKeyboard();
  }

  //Updates this component's state with the current sound string. This function is passed to our children buttons
  //to allow the children to update this components state
  updateCurrentSound(e) {
    this.setState({ currentSound: e.target.id });
  }

  //Needs to be called in the constructor to ensure we attach to the keyboard
  attachKeyboard() {
    document.addEventListener('keydown', this.handleKey);
  }

  //Key handler function to be used as a callback for our keydown event listener.
  handleKey(e) {
    //Added the below block due to double events firing, reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
    //Didn't actually help but I'm leaving it in anyway 
    if (e.isComposing || e.keyCode === 229) {
      return;
    }
    //We get the value of the sound name via our keys object by looking up which key was pressed - note the conversion to uppercase
    let sound = keys[String(e.key).toUpperCase()];
    //We need to check if nothing was found and return out of this function to avoid an error
    if (sound === undefined) {
      return;
    }
    //We then call the handler in our object which should be assigned as the onClick handler for the button we are interested in
    if (sounds[sound].hasOwnProperty("handler")) {
      sounds[sound].handler({target: {id: sound}});
    }
  }

  render() {
    return (
        <div
          id="drum-machine"
          className="col-12 col-sm-12 col-md-8 col-lg-4 d-flex drum-machine-box row"
        >
          <div id="sound-btns" className="d-flex flex-column col-12 col-md-8 py-3">
            <div className="row flex-row flex-nowrap">
              <SoundButton
                sound={sounds.heaterOne}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.heaterTwo}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.heaterThree}
                updateParent={this.updateCurrentSound}
              />
            </div>
            <div className="row flex-row flex-nowrap">
              <SoundButton
                sound={sounds.kick}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.openHH}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.closedHH}
                updateParent={this.updateCurrentSound}
              />
            </div>
            <div className="row flex-row flex-nowrap">
              <SoundButton
                sound={sounds.snare}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.dsc}
                updateParent={this.updateCurrentSound}
              />
              <SoundButton
                sound={sounds.kickAndHat}
                updateParent={this.updateCurrentSound}
              />
            </div>
          </div>
          <div
            id="status"
            className="d-flex justify-content-center align-content-center col-12 col-md-4"
          >
            <Display currentSound={this.state.currentSound} />
          </div>
        </div>
    );
  }
}

export default App;
