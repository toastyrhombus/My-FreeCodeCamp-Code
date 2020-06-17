import React from "react";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.test = null;
  }

  render() {
    return (
      <div
        id="App"
        className="container-fluid min-vh-100"
        style={{ backgroundColor: "pink" }}
      >
        <div id="wrapper min-vh-100" className="row">
          <Header />
          <TextArea />
          <PreviewArea />
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div
      id="header-wrapper"
      className="col-lg-12 d-flex justify-content-center"
    >
      <header className="col-lg-8 h-100">
        <ul>
          <li>Entry 1</li>
          <li>Entry 2</li>
        </ul>
      </header>
    </div>
  );
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  }

  render() {
    return (
      <section id="text-area" className="text-area col-lg-6 py-3">
        <textarea
          id="text-area-widget"
          className="no-resize h-100 w-100"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

class PreviewArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  }

  render() {
    return (
      <section id="preview-area" className="preview-area col-lg-6 py-3">
        <textarea
          id="preview-area-widget"
          className="no-resize h-100 w-100"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

export default App;
