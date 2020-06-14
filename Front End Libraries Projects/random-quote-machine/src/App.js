import React from "react";
import "./App.css";
import logo from "./logo.svg";

//Declare global variables
const quoteUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const twitterMaxChars = 280;

//App component - Primary app component wrapper with laoding and quoteMachine components as children
//We request the quotes collection from FCC's github account - while waiting we display a logo until
//the quotes are loaded - we then set the App components state of loading to true which causes the
//quote machine to render instead of Loading
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      backgroundColor: "#02495C",
    };
    this.data = {};
  }

  //Fetch the quotes URL and process it
  componentDidMount() {
    fetch(quoteUrl)
      .then((response) => response.json())
      .then((data) => {
        this.data = data.quotes;
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(`Failed to fetch ${quoteUrl} status: ${err.status}`);
      });
  }

  updateBackgroundColor(color) {
    this.setState({ backgroundColor: color });
  }

  //Note that we pass in a callback to our child to our updateBackgroundColor function. This allows the child to update this components state
  render() {
    return (
      <div
        id="app-wrapper"
        className="row min-vh-100 align-content-center justify-content-center transitionable-bg-color"
        style={{ backgroundColor: this.state.backgroundColor }}
      >
        {this.state.loading ? (
          <Loading />
        ) : (
          <QuoteMachine
            data={this.data}
            updateBackgroundColor={this.updateBackgroundColor.bind(this)}
          />
        )}
      </div>
    );
  }
}

//Quote machine component - handles rendering the card and receives the downloaded props as data
//Also receives a callback to the parents state to set the background color when required
class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {},
      data: props.data,
      color: "#02495C",
    };
    this.colors = [
      "#314D4D",
      "#183562",
      "#3D1A32",
      "#091B2C",
      "#AB2D2F",
      "#4C314D",
      "#621818",
      "#3D1A1A",
      "#092C29",
      "#1E741C",
    ];
    this.generateNewQuote = this.generateNewQuote.bind(this);
    this.updateBackgroundColor = props.updateBackgroundColor;
  }

  //We call generate new Quote in the componentDidMount function to ensure a quote is initially populated immediately after its rendered
  componentDidMount() {
    this.generateNewQuote();
  }

  //We get a random number to retrieve a random quote from our collection as well as update the color of this component and update our
  //parent background color
  generateNewQuote() {
    let idx = getRandomIntInclusive(0, this.state.data.length - 1);
    let color = this.colors[getRandomIntInclusive(0, this.colors.length - 1)];
    this.setState((state) => ({
      quote: state.data[idx],
      color: color,
    }));
    this.updateBackgroundColor(color);
  }

  //We define some variables to simplify the return statement below
  render() {
    let quote = this.state.quote.quote;
    let author = this.state.quote.author;
    const twitterUrl = new URL("https://twitter.com/intent/tweet");
    twitterUrl.searchParams.append(
      "text",
      `${quote} - ${author}`.slice(null, twitterMaxChars)
    );
    return (
      <div id="quote-box" className="card col-lg-4 col-md-6 col-sm-8 col-10 mt-auto mb-auto">
        <div id="card-body" className="card-body">
          <div id="quote-body" className="card-blockquote">
            <p
              id="text"
              className="blockquote transitionable-color"
              style={{ color: this.state.color }}
            >
              <i className="fa fa-quote-left fa-1x" aria-hidden></i> {quote}
            </p>
            <p
              id="author"
              className="blockquote-footer transitionable-color"
              style={{ color: this.state.color }}
            >
              {author}
            </p>
          </div>
          <div id="buttons">
            <div id="share-icons">
              <a className="btn btn-primary btn-sm float-left" id="tweet-quote" href={twitterUrl.href}>
                <i className="fa fa-twitter fa-2x"></i>
              </a>
            </div>
            <div>
              <button
                id="new-quote"
                className="btn btn-outline-dark transitionable-color float-right button-lite-hover"
                style={{ color: this.state.color }}
                onClick={this.generateNewQuote}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Loading component - displays a logo on the page until the state of it's parent indicates we are loaded
class Loading extends React.Component {
  render() {
    return (
      <img className="img-fluid" id="react-logo" src={logo} alt="React Logo" />
    );
  }
}

//Get random integer function - taken from MDN
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export default App;
