import React, { useState, useEffect, Fragment } from "react";
import logo from "./logo.svg";
import WordCloud from "./componets/cloud";
import { Button } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import UserInfo from "./componets/userInfo";
import axios from "axios";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import "./App.css";
let local = "http://localhost:3000";
let production = "https://shiirtify.web.app/";
let endpoint = `https://accounts.spotify.com/authorize?client_id=4b47f4942dea411b902eecb6dcc28561&redirect_uri=${production}&scope=user-top-read&response_type=token&state=123&show_dialog=true`;

const styles = (theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: 110,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: "#fff",
    },
    secondary: {
      main: purple[500],
    },
  },
});
function saveShirt(fileType) {
  var options = {
    height: 1000,
    width: 1000,
    quality: 1,
  };

  if (fileType === "png") {
    domtoimage
      .toPng(document.getElementById("shirt"), options)
      .then(function (blob) {
        window.saveAs(blob, "myShirt.png");
      });
  } else if (fileType === "svg") {
    domtoimage
      .toSvg(document.getElementById("svg-art"), options)
      .then(function (blob) {
        window.saveAs(blob, "myShirt.svg");
      });
  }
}
function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
function calcGenreStrength(genres) {
  var strengthDic = {};
  var returnedList = [];
  genres.forEach((el) => {
    if (el in strengthDic) {
      strengthDic[el] += 1;
    } else {
      strengthDic[el] = 1;
    }
  });
  Object.keys(strengthDic).forEach((i) => {
    var genre = {};
    genre["text"] = i;
    genre["value"] = strengthDic[i];
    returnedList.push(genre);
  });
  return returnedList;
}
function login() {
  window.location.replace(endpoint);
}
function logout() {
  window.location.replace("/");
  // window.location.reload(true);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: null,
      name: "",
      image: "",
      artists: null,
      words: null,
      range: "long_term",
      fileType: "png",
    };
  }
  componentDidMount() {
    let params = getHashParams();
    if (params.access_token !== undefined) {
      this.setState({ token: params.access_token });
      this.getUserData(params.access_token)
        .then((res) => {
          this.setState({ name: res.data.display_name });
          this.setState({ image: res.data.images[0].url });
          //window.history.replaceState({}, document.title, "/");
        })
        .catch((err) => {
          console.log(err);
          login();
          return;
        });
      this.getUserTop(params.access_token, this.state.range)
        .then((res) => {
          var new_l = [];
          var words = [];
          res.data.items.forEach((el) => {
            new_l.push({ name: el.name, genres: el.genres });
            el.genres.forEach((li) => {
              words.push(li);
            });
          });

          words = calcGenreStrength(words);

          this.setState({ words: words });
          this.setState({ artists: new_l });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      this.setState({ isLoggedIn: true });
    }
  }
  getUserData(access_token) {
    const options = {
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    return axios(options);
  }
  getUserTop(access_token, range) {
    const options = {
      url: `https://api.spotify.com/v1/me/top/artists?time_range=${range}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };
    return axios(options);
  }
  changeRange(e) {
    e.preventDefault();
    var range = e.target.innerHTML.toString();
    if (range === "1 Month") {
      this.setState({ range: "short_term" });
      this.getUserTop(this.state.token, this.state.range)
        .then((res) => {
          var new_l = [];
          var words = [];
          res.data.items.forEach((el) => {
            new_l.push({ name: el.name, genres: el.genres });
            el.genres.forEach((li) => {
              words.push(li);
            });
          });

          words = calcGenreStrength(words);

          this.setState({ words: words });
          this.setState({ artists: new_l });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else if (range === "3 Months") {
      this.setState({ range: "medium_term" });

      this.getUserTop(this.state.token, this.state.range)
        .then((res) => {
          var new_l = [];
          var words = [];
          res.data.items.forEach((el) => {
            new_l.push({ name: el.name, genres: el.genres });
            el.genres.forEach((li) => {
              words.push(li);
            });
          });

          words = calcGenreStrength(words);

          this.setState({ words: words });
          this.setState({ artists: new_l });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else if (range === "6 Months") {
      this.setState({ range: "long_term" });
      this.getUserTop(this.state.token, this.state.range)
        .then((res) => {
          var new_l = [];
          var words = [];
          res.data.items.forEach((el) => {
            new_l.push({ name: el.name, genres: el.genres });
            el.genres.forEach((li) => {
              words.push(li);
            });
          });

          words = calcGenreStrength(words);

          this.setState({ words: words });
          this.setState({ artists: new_l });
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  }
  render() {
    const { classes } = this.props;
    let artistMarkup =
      this.state.artists !== null && this.state.isLoggedIn ? (
        this.state.artists.map((el) => {
          return (
            <li>
              {el.name} : Genres {el.genres.length}
            </li>
          );
        })
      ) : (
        <p>No artists</p>
      );
    return (
      <div className="App">
        <header className="App-header">
          {this.state.isLoggedIn ? (
            <Fragment>
              <h1 className="outside-logo-text">
                <span className="logo-no-anim">Shirtify</span>
              </h1>
              <UserInfo
                name={this.state.name}
                image={this.state.image}
                logout={logout}
              />
              <ThemeProvider theme={theme}>
                <Button
                  style={{ marginBottom: "1rem" }}
                  variant="contained"
                  color="primary"
                  onClick={() => saveShirt("png")}
                >
                  Download shirt
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveShirt("svg")}
                >
                  Download design as svg
                </Button>
              </ThemeProvider>
              <div className="button-container">
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  onClick={(e) => this.changeRange(e)}
                  id="1_Month"
                >
                  1 Month
                </Button>
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  onClick={(e) => this.changeRange(e)}
                >
                  3 Months
                </Button>
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  onClick={(e) => this.changeRange(e)}
                >
                  6 Months
                </Button>
              </div>
              <p>Your top genres : {this.state.range}</p>
            </Fragment>
          ) : (
            <Fragment>
              <h1>
                Welcome to <span className="logo-text">Shirtify</span>
              </h1>
              <h5>Rep your music taste.</h5>
              <p className="description">
                This website takes your top Spotify artists and applies weights
                to the different genres they fall under, it then produces a word
                cloud of the result.
              </p>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" onClick={login}>
                  Sign in to Spotify
                </Button>
              </ThemeProvider>
            </Fragment>
          )}
          {this.state.words !== null ? (
            <WordCloud words={this.state.words} />
          ) : (
            <p></p>
          )}
        </header>
        <footer className="app-footer">
          <Link
            color="inherit"
            href="https://phrank.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made by Frank Lenoci
          </Link>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(App);
