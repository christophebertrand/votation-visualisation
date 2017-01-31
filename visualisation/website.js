/* Set the width of the side navigation to 250px */
function openNavRight() {
    document.getElementById("sideNavRight").style.width = "300px";
    document.getElementById(('button-right')).style.visibility = 'hidden';

}

/* Set the width of the side navigation to 0 */
function closeNavRight() {
    document.getElementById("sideNavRight").style.width = "0";
    document.getElementById(('button-right')).style.visibility = 'visible';


}
/* Set the width of the side navigation to 250px */
function openNavLeft() {
    document.getElementById("sideNavLeft").style.width = "250px";
    document.getElementById(('button-left')).style.visibility = 'hidden';
}

/* Set the width of the side navigation to 0 */
function closeNavLeft() {
    document.getElementById("sideNavLeft").style.width = "0";
    document.getElementById(('button-left')).style.visibility = 'visible';
}


var votations2013 = d3.map()
var votations2014 = d3.map()
var votations2015 = d3.map()
var votations2016 = d3.map()



function loadInfoVotation() {
  queue()
    .defer(d3.csv, "../data/votations/2013/resultVotation.csv", function(d) {votations2013.set(d.idVotation,d)})
    .defer(d3.csv, "../data/votations/2014/resultVotation.csv", function(d) {votations2014.set(d.idVotation,d)})
    .defer(d3.csv, "../data/votations/2015/resultVotation.csv", function(d) {votations2015.set(d.idVotation,d)})
    .defer(d3.csv, "../data/votations/2016/resultVotation.csv", function(d) {votations2016.set(d.idVotation,d)})
    .await(displayDiv);
}

function displayDiv(error) {

  //Create the 4 year
  var years = [2013,2014,2015,2016]
  var maps = [votations2013, votations2014, votations2015, votations2016]
  for(var i in years){
    var y = years[i]
    var outerDiv = document.getElementById('panel_master')

    var innerDiv = document.createElement('div');
    innerDiv.className = 'panel-heading';

    var h4 = document.createElement('h4')
    h4.className= 'panel-title'

    var a = document.createElement('a')
    a.setAttribute('data-toggle', 'collapse')
    a.setAttribute('href', '#collapse'+y)
    a.innerHTML = y

    h4.appendChild(a)
    innerDiv.appendChild(h4)
    outerDiv.appendChild(innerDiv)

    var map = maps[i]
    votationsYearDiv = document.createElement('div')
    votationsYearDiv.setAttribute('id', 'collapse'+y)
    votationsYearDiv.className = 'panel-collapse collapse'


    map.forEach(function(k,v) {
      votationDiv = document.createElement('div')
      votationDiv.className = 'panel-body'
      votationDiv.innerHTML = v.votation + ' ('+ v.date+', '+ v.percentage_oui + ' %)'
      votationDiv.onclick = (function(){
        document.getElementById('button-right').style.visibility='visible'
        closeNavLeft();
        test(v.date,k, v)

      })
      votationsYearDiv.appendChild(votationDiv)
    })

    outerDiv.appendChild(votationsYearDiv)
  }
}

function test(year, idVotation, votationInfo) {
  //get year. format y: yyyy-mm-dd
  document.getElementById('sliders').innerHTML =""
  year = year.split('-')[0]
  loadData(year, idVotation, votationInfo)
}

loadInfoVotation()


function createTemplateParameters(categories){
  var outerDiv = document.getElementById('panel_master_right')
  outerDiv.innerHTML = ""
  for(var c in categories) {


    category = categories[c]

    var innerDiv = document.createElement('div');
    innerDiv.className = 'panel-heading';
    innerDiv.setAttribute('id', 'panel-heading-'+category)

    var h4 = document.createElement('h4')
    h4.className= 'panel-title'

    var a = document.createElement('a')
    a.setAttribute('data-toggle', 'collapse')
    a.setAttribute('href', '#collapse'+category)
    a.innerHTML = category

    h4.appendChild(a)
    innerDiv.appendChild(h4)


    categoryDiv = document.createElement('div')
    categoryDiv.setAttribute('id', 'collapse'+category)
    categoryDiv.className = 'panel-collapse collapse'
    innerDiv.appendChild(categoryDiv)

    outerDiv.appendChild(innerDiv)
  }
}
