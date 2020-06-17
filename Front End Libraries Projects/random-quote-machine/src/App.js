import React from "react";
import "./App.css";
import logo from "./img/logo.svg";

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
        id="app-container"
        className="container-fluid d-flex flex-column min-vh-100 transitionable-bg-color"
        style={{ backgroundColor: this.state.backgroundColor }}
      >
        {this.state.loading ? (
          <Loading />
        ) : (
          <div
            id="app-wrapper"
            className="row justify-content-center align-content-center mt-auto mb-auto"
          >
            <div
              id="App"
              className="col-lg-4 col-md-6 col-sm-8 col-10 mt-auto mb-auto"
            >
              <QuoteMachine
                data={this.data}
                updateBackgroundColor={this.updateBackgroundColor.bind(this)}
              />
            </div>
          </div>
        )}
        {this.state.loading ? (
          <div></div>
        ) : (
          <div
            id="social-icons-wrapper"
            className="row justify-content-center mt-auto mb-3"
          >
            <div id="social-icons" className="">
              <a href="https://github.com/toastyrhombus">
                <img
                  id="github-social"
                  alt="Mathew Haynes Github Profile Link"
                  src={`data:image/png;base64, ${githubMark}`}
                  //src={`data:image/png;base64, ${githubMark}`}
                ></img>
              </a>
            </div>
          </div>
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
      <div id="quote-box" className="card">
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
              <a
                className="btn btn-primary btn-sm float-left"
                id="tweet-quote"
                href={twitterUrl.href}
              >
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

const githubMark =
  "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzlFQkFERkU4NkJCMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzlFQkFERkQ4NkJCMTFFM0FBNTJFRTMzNTJEMUJDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJFOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJGOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Kk5lQwAABYxJREFUeNrkm29oVXUYx3+7bM3V1FnbqlltrtXWtYRa1nqxooY5E7EhKWGuaTDBagol9SIMDCKICASj+cISw/DPi16ZBakrUBnoC7nNoTMWy6I1c+LmVq6t78N9jpyu555znt855+536IHPi939/jzP95zznN+/kzc1NaUitirwJJgPasF94DZQDG7hMqNgBFwEZ5kU+AH0R+lcXgQCJMBT4EXwLKgM2N7P4FvwJegCk6YKUA5eB23grogu2C/gc7AN/GGKABTsZtAOZqjc2DjYAT5kUfSNBNCkAGwGo1PTZ6PsQ4FuHLp3QD3YDR5QZtgZsAac1ElYokcGbATHDApesS/kUwf7GEkOKAK7wAvKbNsPXgZjYQowG3wNnlDxsONgCbgchgAU/GHwiIqXUT5o8hLBKwfcDA7FMHgrUR/iGLQEoGTyBWhQ8bUGjiFPR4A3QIuKv7VwLKIcQMnue5Dv0fjT/IwtAM3g+RyMBmkU+BXf3qc5Rx3xqDPBE7LjfkaCheCcj1HYKYe6JeBt8GcEo75L3HaJQ7+nfNQ/x7H9p67TFX4L1Pi4EocdfhsGH4BPwVbwqu0xGwI/8vT2N/77Gv+vAJSCO3n6PJ//Vjz72w62cPtORnfAwx7+1nBsW93ugGow7vOKtPkYa9eDl0Clxji9kuvW+yjb5tPncY7xet3MhjoFt2RzgIlU2DQL/O6017W/Be4BawXJqMCgTH+ToOxajvWG1+AmYVBlBglQKrxwmzIFoB9XCzt91CABpL6sti62JcBiXtKS2GMGCSD1pZxjvi7AKmED9PraYJAAG2yvVL+2yi7AImHl90C3QQJ03/B+97ZF1lCYVlN6BBV/BffykNQkoyF4H5grqJOkO6BR2NF2A4O35gifCOs0JjTW9vYaPPPbJ11LJAFqBRVoDf68wQLQI3BBUL424XPiY1lvDOb/ZwRla0iAOYIKv8dAgEFB2VtJgJmCChMxEEAyHigmAQoFFWbFQIDZgrKF0p2hmTEQQOQjCTAmKD8vBgJUCcqOkQBXBBXosEORwcEXKdmBjCskwICgQr5h0+BMW6i8V7LtNkAC9As7WWqwAM8Jy/cnhBMhspVKvq2eC0uwbxLrSWhMa+dpdJQLW6mRpLtpOlyuMcL7CTwErhoSPG2ApjQEuD3BQ0fp0ZJqlT6pZYpt0wieYh60nuWDGp2+At4xIPgt7IvU0jHzBkFdgD27HWDGNGyGFHHfulaXuTN0IkBjZ8EykJeDwKmPFtAXwN8TTltjrVkKfwcawXJW3G3v8DTYCKoiCLwGvAl6QthpbnU6J5jP2f1uh1Wgxbbxwv0qvT/vtZRGA6wuzs50+Pkb8JdgQtPMq1VJld7bnxtSzhjgJD5hzwEW611OZK6xlSvzeYbAsl3Cx4PK7ozodOl6t93hfJByqbzOVnYh+MdHhxfBLI1bnuoMhRx8imPMKgDR5LG/nrSVfddHpx8HeO4/ClmApsw+snXsdk7gYMat+r5Hp0sDCLAkxOA7nfrI1nGxx2tmQUb5x8FuzgvD4Dw4wNm2MIAA1SEF38cx+RaAeBCMZGlwb44GOyUhBD/CsTj24TatpddXq3L+RIVmXnE4QzjJMaSylvBxFdqzKHsVrDD8Dmj36sOvIx0unewHDRENg4MI0BH2FyP0RcZOlzW3Ib7VLvPqDK0z1PEq7bDmLVwCLgnr0AhvnUp/0eJp0k9m6HO4fUp2nGZODgUY5PzUJVlHkxg1TEfnjxqY8I6yb12SSjqLm7T9/Ax4TaW/+JxuIx862KcL4toBk1QFT1omXZLRHQHaL3Npl/r8jH3QjiGsbJ3kGd/fDo6WBWi31KG9a9xXMgzfw35tVfCR9l52dk8Ibe7htnq57YowfY7i4+lYWUL9z+1fAQYACqstE4NCc18AAAAASUVORK5CYII=";
export default App;
