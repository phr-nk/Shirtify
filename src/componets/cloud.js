import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import ReactWordCloud from "react-wordcloud";
import "./shirt.css";
let shirt = require("../assets/blank_white_tshirt.png");
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false, //enable if want to keep same pattern
  fontFamily: "impact",
  fontSizes: [12, 55], //lower size to fix count problem, see console
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 4,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};
var xPos = 0;
var yPos = 0;
function moveLeft() {
  var svg = document.getElementById("svg-art").childNodes[0];

  xPos -= 3;
  console.log(xPos);
  console.log(yPos);
  svg.style.transform += `translateX(${xPos}px)`;
}
function moveRight() {
  var svg = document.getElementById("svg-art").childNodes[0];
  xPos = 0;
  xPos += 3;
  console.log(svg.style);
  svg.style.transform += `translateX(${xPos}px)`;
}
function moveUp() {
  var svg = document.getElementById("svg-art").childNodes[0];
  yPos = 0;
  yPos -= 3;
  console.log(svg.style);
  svg.style.transform += `translateY(${yPos}px)`;
}
function moveDown() {
  var svg = document.getElementById("svg-art").childNodes[0];
  yPos = 0;
  yPos += 3;

  console.log(svg.style);
  svg.style.transform += `translateY(${yPos}px)`;
}
function WordCloud(props) {
  return (
    <div id="shirt" className="shirt">
      <img
        src={shirt}
        style={{ width: 1000, transform: "translate(0.3vw)" }}
      ></img>
      <div
        style={{
          height: 600,
          width: 450,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        <ReactWordCloud id="svg-art" words={props.words} options={options} />
      </div>
      <Button
        color="primary"
        variant="contained"
        className="adjustButton"
        onClick={moveLeft}
      >
        {" "}
        {"<"}{" "}
      </Button>
      <span> </span>
      <Button
        color="primary"
        variant="contained"
        className="adjustButton"
        onClick={moveRight}
      >
        {" "}
        {">"}{" "}
      </Button>
      <div className="verticalAdjust">
        <Button
          color="primary"
          variant="contained"
          className="adjustButton"
          onClick={moveUp}
        >
          {" "}
          {"<"}{" "}
        </Button>
        <span> </span>
        <Button
          color="primary"
          variant="contained"
          className="adjustButton"
          onClick={moveDown}
        >
          {" "}
          {">"}{" "}
        </Button>
      </div>
    </div>
  );
}

export default WordCloud;
