// margin and radius
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 500 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom
    radius = width/2;
  //colours
    var color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

   // Arc Generator
   var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

  var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    
  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.goals, d.assists; });

     // The Pie itself
 var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
     .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


// import player data 

d3.json("playerStats.json", function(error, data) {
  if (error) throw error;
    
  // how do i make this into

   //  Geting the player data
    data.forEach(function(d) {
        d.assists = +d.assists;
      d.goals = d.goals;
  })


  
  // "g element is a container used to group other SVG elements"
  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  // append path 
  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.fruit); })
    // transition 
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenPie);
        
  // append text
  g.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.fruit; });
    

    // "g element is a container used to group other SVG elements"
  var g2 = svg2.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2");

   // append path 
  g2.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return color(d.data.fruit); })
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", tweenDonut);
        
   // append text
  g2.append("text")
    .transition()
      .ease(d3.easeLinear)
      .duration(2000)
    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.fruit; });
    
});


//Search for players

const showMatchingProds = (query) => {
  d3.json( data.filter( prod => prod.playerName.toLowerCase().includes( query.toLowerCase() ) ) );
}

  document.getElementById(`search`).addEventListener(`submit`, (event) => {
  event.preventDefault();
  let q = document.getElementById(`search`).query.value;
   

  
  showMatchingProds(q);

 
});