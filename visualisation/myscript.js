

var width = 960,
    height = 500,
    centered;

var path = d3.geo.path()
    .projection(null);

var svg = d3.select("#contents").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("margin-left",'500px')

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)

  //  .on("click", clicked);

var tooltip = d3.select('#contents').append('div')
    .attr('class', 'hidden tooltip');

var g = svg.append("g");

var resultsVotation = d3.map();
var dataCantonMap = d3.map();
var population = d3.map();

var min = 0
var max = 50
var colorYes =d3.scale.linear().domain([50,100]).range(["#ebfaeb","#33cc33"]);
var colorNo =d3.scale.linear().domain([50,0]).range(["#ffe6e6","#ff0000"]);

var topo = ""

var sliders=[]
var dataList = []


/*
init()

function init() {
  loadData()
}
*/

function loadData(year, idVotation) {
  queue()
    .defer(d3.json, '../data/maps/'+ year + '/ch.json')
    .defer(d3.csv, '../data/votations/'+ year + '/'+idVotation+'.csv', function(d) { resultsVotation.set(d.id.replace(/^0+/, ''), d);})
    //.defer(d3.csv, '../data/votationsCanton/nucleaireCanton.csv', function(d) { dataCantonMap.set(d.id, d.data); })
    .defer(d3.csv, '../data/municipalities/'+ year + '/data_commune.csv', function(d) { population.set(parseInt(d.id), d); })
    .await(displayDiv);
}

function displayDiv(error, ch) {
  if(error) throw error;
  topo = ch
  createSlider()
  displayVisualisation(ch, resultsVotation)

}

function createSlider(){
  document.getElementById('panel_master_right').innerHTML = ""
  var categories = ['Population', 'Politique', 'Others']
  //create the tempplate with the titles
  createTemplateParameters(categories)
  // in the map population get only id, data




  var foreigner = createMapData(population,'percentage_swiss', inverse = true, integer=false, percentage=true)
  dataList.push(foreigner)
  var title = 'Number of foreigner (%)'
  setSlider('foreigner', foreigner, categories[0], title)

  var percentage_18 = createMapData(population,'percentage_18', inverse = false, integer=false, percentage=true)
  dataList.push(percentage_18)
  title = 'Number of young (<18years old in %)'
  setSlider('yougth', percentage_18, categories[0], title)

  var percentage_40 = createMapData(population,'percentage_40', inverse = false, integer=false, percentage=true)
  dataList.push(percentage_40)
  title = 'Number of people under 40 (in %)'
  setSlider('yougMen', percentage_40, categories[0], title)

  var percentage_65 = createMapData(population,'percentage_65', inverse = false, integer=false, percentage=true)
  dataList.push(percentage_65)
  title = 'Number of under 65 (in %)'
  setSlider('men', percentage_65, categories[0], title)

  var percentage_100 = createMapData(population,'percentage_100', inverse = false, integer=false, percentage=true)
  dataList.push(percentage_100)
  title = 'Number of elderly  (< 65years old in %)'
  setSlider('erlderly', percentage_18, categories[0], title)




}


/*
From a map with id -> many information about one municipalities,
return a map id, column where column is one columns among all information
if inverse = True return id -> 1-column otherwise id->column
integer =True => parseInt otherwiser float
percentage = True => data * 100
*/
function createMapData(pop, column, inverse, integer, percentage) {
  var data =d3.map();
  pop.forEach(function(k, v) {
    x = v[column]
    if(integer) {
      v = parseInt(x)
    } else {
      v = parseFloat(x)
    }

    if(percentage) {
      v *= 100
    }

    if (inverse){
      v = 100-v
    }
    data.set(parseInt(k), v)
  })
  return data
}




function displayVisualisation(ch, dataColor) {
  var cantons = topojson.feature(ch, ch.objects.cantons);

  g.selectAll("g").remove()
  g.selectAll("path").remove()
  g.selectAll("text").remove()
  setMunicipalities(ch, dataColor)
  computeResultVotation(resultsVotation)
  //setCantons(ch)
  setTextInCanton(cantons)
  setLake(ch)


}


function setLake(ch) {

  g.append("g")
      .attr("class", "feature lake")
    .selectAll("path")
      .data(topojson.feature(ch, ch.objects.lakes).features)
    .enter().append("path")
      .attr("d", path)

  g.append("path")
    .datum(topojson.mesh(ch, ch.objects.lakes, function(a, b) { return a !== b; }))
    .attr("class", "lake-boundaries")
    .attr("d", path);

}

function setMunicipalities(ch, dataColor) {
  //municipalities
  g.append("g")
      .attr("class", "municipality")
    .selectAll("path")
      .data(topojson.feature(ch, ch.objects.municipalities).features)
    .enter().append("path")
      .attr("fill", function(d) {
          return getColor(d, dataColor)
        })
      .attr("d", path)
      .on('mousemove', function(d) {
          console.log(d.id)
          var municipalitiyInfo = population.get(d.id)
          var resultVotation = resultsVotation.get(d.id)
          var mouse = d3.mouse(svg.node()).map(function(d) {
              return parseInt(d);
          });
          tooltip.classed('hidden', false)
              .attr('style', 'left:' + (mouse[0] + 240) +
                      'px; top:' + (mouse[1] - 85) + 'px')
              .html(
                '<h4>' + municipalitiyInfo.commune + '</h4>' +
                '<ul>' +
                  '<li> id' + d.id+ '</li>' +
                  '<li> Popuation total: ' + municipalitiyInfo['total_inhabitants']+ '</li>' +
                  '<li> % <18 years olf: ' + (municipalitiyInfo['percentage_18'] *100).toFixed(2)+ '%</li>' +
                  '<li> % <40 years olf: ' + (municipalitiyInfo['percentage_40']*100).toFixed(2) + '%</li>' +
                  '<li> % <65 years olf: ' + (municipalitiyInfo['percentage_65'] *100).toFixed(2)+ '%</li>' +
                  '<li> % <100 years olf: ' + (municipalitiyInfo['percentage_100'] *100).toFixed(2)+ '%</li>' +
                  '<li> % foreigner: ' + ((1-municipalitiyInfo['percentage_swiss'])*100).toFixed(2) + '%</li>' +
                  '<li> ------ Results ------</li>' +
                  '<li> Yes : ' + ((resultVotation['percentage_yes'])*100).toFixed(2) + '%</li>' +
                  '<li> Particiaption : ' + ((1-resultVotation['percentage_swiss'])*100).toFixed(2) + '%</li>' +






                '</ul>'

              );
      })
      .on('mouseout', function() {
          tooltip.classed('hidden', true);
      })



  g.append("path")
    .datum(topojson.mesh(ch, ch.objects.municipalities, function(a, b) { return a !== b; }))
    .attr("class", "municipality-boundaries")
    .attr("d", path);

  g.append("path")
    .datum(topojson.mesh(ch, ch.objects.cantons, function(a, b) { return a !== b; }))
    .attr("class", "feature canton-boundaries")
    .attr("d", path)
}

function setCantons(ch) {
  //TODO if setMunicipalities => comment this block
  g.append("g")
      .attr("class", "feature canton")
    .selectAll("path")
      .data(topojson.feature(ch, ch.objects.cantons).features)
    .enter().append("path")
      .attr("fill", none)
    /*
      .attr("fill", function(d) {
          return getColor(d, dataCantonMap)
        })
        *7
      .attr("d", path)
      .on("click", clicked)


/*
  g.append("path")
    .datum(topojson.mesh(ch, ch.objects.cantons, function(a, b) { return a !== b; }))
    .attr("class", "feature canton-boundaries")
    .attr("d", path)
*/
}

function getColor(d, map) {
  var data = map.get(d.id)
  if(typeof data != "undefined") {
    if (data.percentage_oui >=50)
      return colorYes(data.percentage_oui)
    else {
      return colorNo(data.percentage_oui)
    }
  }

}


// Print the abbreviation of each canton
function setTextInCanton(cantons){
  g.selectAll("text")
      .data(cantons.features)
      .enter().append("text")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });
}





function setSlider(id, data, category, title) {

  categoryDiv = document.getElementById('collapse'+category)

  titleDiv = document.createElement('div')
  titleDiv.className = 'panel-body title'
  titleDiv.innerHTML = title
  categoryDiv.appendChild(titleDiv)

  sliderDiv = document.createElement('div')
  sliderDiv.className = 'panel-body'
  categoryDiv.appendChild(sliderDiv)

  //var slider = document.getElementById(id);
  var max = d3.max(data.values())
  var min = d3.min(data.values())
  noUiSlider.create(sliderDiv, {
  	start: [min, max],
    tooltips: [ true, true ],
    connect:true,
  	range: {
  		'min': [min ],
  		'max': [ max ]
  	}
  })
  sliderDiv.noUiSlider.on('slide', function(values, handle) {
    onSlide(values, handle, data)
  })
  sliders.push(sliderDiv)


}

function onSlide(values, handle) {
  var resultsVotationFiltered = d3.map()
  var bool = true
  resultsVotation.forEach(function(k,v){
    bool = true
    for(var i in sliders){
      var values = sliders[i].noUiSlider.get()
      if( dataList[i].get(k)< values[0] || dataList[i].get(k)> values[1] ) {
        bool = bool && false
      }
    }
    if(bool) {
      resultsVotationFiltered.set(k,v)
    }
  })
  console.log(resultsVotationFiltered)
  d3.selectAll("path").attr("fill", function (d) { return getColor(d,resultsVotationFiltered) });
  computeResultVotation(resultsVotationFiltered)
}

function computeResultVotation(municipalities) {
  //municipalities contains all the municipalities that respect the criterias (sliders)
  //go through the whole set compute counter ne number of people that said 'yes'
  //not the percentage of yes * all communities.
  var yes = 0
  var total = 0
  municipalities.forEach(function(k,v) {
    yes += parseInt(v.oui)
    total += parseInt(v.valables)
  })
  var resultDiv = document.getElementById('citizens')
  result = yes/total * 100
  resultDiv.innerHTML=""
  resultDiv.innerHTML= 'Result of the citizens: ' + (result).toFixed(2) + ' %'


}





function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  g.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  g.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}
