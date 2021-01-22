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

// Append an Svg group
var chartGroup =svg.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("D3_data_journalism/data/data.csv").then(function (stateData){
    //console.log(stateData);
//Parse data and cast as numbers
stateData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
 });
 console.log(stateData)
//create a scale functions
var xLinearScale = d3.scaleLinear()
.domain([0,d3.max(stateData, d => d.poverty)])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(stateData, d => d.healthcare)])
.range([height, 0]);

//axis funtions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);
//Append axis to the chart
chartGroup.append("g")
.attr("transform",`translate(0,${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

})