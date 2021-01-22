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
 //console.log(stateData)

 //create a scale functions
const xScale = d3.scaleLinear()
.domain([0,d3.max(stateData, d => d.poverty)])
.range([0, width]);

const yScale = d3.scaleLinear()
.domain([0, d3.max(stateData, d => d.healthcare)])
.range([height, 0]);

//axis funtions
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);
//Append axis to the chart
chartGroup.append("g")
.attr("transform",`translate(0,${height})`)
.call(xAxis);

chartGroup.append("g")
.call(yAxis);

// creating circle on the chart
var circlesGroup = chartGroup.selectAll("cricle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.healthcare))
.attr("r", "28")
.attr("fill", "blue")
.attr("opacity", ".5");

// intializing tool tip

var toolTip = d3.tip()
.attr("class", "tooltip")
.offset([80, -60])
.html(function (d){
    return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
});
//creating tooltip in the chart by calling tooltip on chartGroup
chartGroup.call(toolTip);

//creating event listeners to display and hide the tooltip by on/out mouse click

circlesGroup.on("click",function(data){
    toolTip.show(data, this);
})
// clicking on_mouse and out events for hide data
.on("mouseout", function (data, index) {
    toolTip.hide(data);
  });

  chartGroup.append("g")
  .selectAll('text')
  .data(stateData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.poverty))
  .attr("y",d=>yScale(d.healthcare))
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");


// creating a label for the axis

chartGroup.append("text")
.attr("transform","rotate(-90)")
.attr("y",0 - margin.left + 40)
.attr("x",0 -(height/2))
.attr("dy","1em")
.attr("class","axisText")
.style("fill", "black")
.style("font", "20px sans-serif")
.style("font-weight", "bold")
.text("People with out Healthcare (%)");
chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .style("font", "20px sans-serif")
  .style("font-weight", "bold")
  .text("Poverty (%)");



})
.catch(function (error) {
    console.log(error);
});