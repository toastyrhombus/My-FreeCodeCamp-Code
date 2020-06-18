import React from "react";
import "./app.css";
import logo from "./img/square-2673252_640.png";
import marked from "marked";
import githubMark from "./img/GitHub-Mark-64px.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };

    this.updateParent = this.updateParent.bind(this);
  }

  updateParent(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (
      <div id="App" className="container-fluid min-vh-100">
        <div id="wrapper min-vh-100" className="row">
          <Header />
          <TextArea updateParent={this.updateParent} />
          <PreviewArea html={this.state.input} />
        </div>
      </div>
    );
  }
}

function Header() {
  return (
    <div id="header-wrapper" className="col-lg-12">
      <header className="w-100 h-100 d-flex justify-content-center align-items-center pt-3 pl-2">
        <a href="#">
          <img
            src={logo}
            alt="Rhombus Logo"
            height="64"
            className="img-blend"
          ></img>
        </a>
        <h1 className="m-auto">Markdown Previewer</h1>
        <a href="https://github.com">
          <img
            src={githubMark}
            alt="Github Logo"
            height="64"
            className="ml-auto animation-rotate"
          ></img>
        </a>
      </header>
    </div>
  );
}

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = props.updateParent;
  }

  render() {
    return (
      <section id="text-area" className="text-area col-lg-6 py-3">
        <textarea
          id="text-area-widget"
          className="no-resize h-100 w-100 widget"
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

class PreviewArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="preview-area" className="preview-area col-lg-6 py-3">
        <div
          id="preview-area-widget"
          className="no-resize h-100 w-100 widget p-3 overflow-auto"
          dangerouslySetInnerHTML={{ __html: marked(this.props.html) }}
        />
      </section>
    );
  }
}

export default App;
