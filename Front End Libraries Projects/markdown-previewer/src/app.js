import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.test = null;
  }

  render() {
    return (
      <div id="App">
        <p>Some text</p>
      </div>
    );
  }
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }
}

class PreviewArea extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default App;
