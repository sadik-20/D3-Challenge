var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 30,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// create an SVG, append an SVG with attribute width and height
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
