
function mapCodeToCounty(code) {
    switch (code) {
        case "LU": return "Lunenburg";
        case "CU": return "Cumberland";
        case "PI": return "Pictou";
        case "KI": return "Kings";
        case "IN": return "Inverness";
        case "CO": return "Colchester";
        case "AP": return "Annapolis";
        case "GU": return "Guysborough";
        case "HN": return "Hants";
        case "CB": return "Cape";
        case "VI": return "Victoria";
        case "AT": return "Antigonish";
        case "YA": return "Yarmouth";
        case "DI": return "Digby";
        case "SH": return "Shelburne";
        case "RI": return "Richmond";
        case "QU": return "Queens";
        case "HX": return "Halifax";
    }
}

function transformElementName(element) {
    if ('CO_DESC' in element) {
        return element['CO_DESC'];
    } else if ('CO_CODE' in element) {
        return mapCodeToCounty(element['CO_CODE']);
    } else {
        console.error("Could not find element name!");
        console.log(element);
    }
}

function transformElementData(data) {
    const NAME_KEYS = ['CO_DESC', 'CO_CODE']
    let keys = Object.keys(data);
    keys = keys.filter(e => NAME_KEYS.indexOf(e) == -1);

    var obj = {};
    keys.forEach(d => {
        obj[d] = data[d];
    });
    return obj;
}

function transformDataByCounty(data) {
    let map = {}
    data.forEach(element => {
        map[transformElementName(element)] = transformElementData(element);
    });
    return map;
}

function countyName(d) {
    return d.properties.county;
}


// ========== MAIN CODE ==========


const datasets = {
    test: {}
};

const theMap = {
    elements: null,
};

const nCounties = 50;
const colors = d3.scaleLinear()
    .domain([0, 50])
    .interpolate(d3.interpolateHcl)
    .range(['#D2E5F6', '#147FC4']);


// Load datasets
d3.csv('data/test.csv').then(function (data) {
    datasets.test = transformDataByCounty(data);
});

// Setup some interaction on screen elements
d3.select("#btn-test").on('click', function (e) {
    console.log(datasets);
    updateMap(datasets.test, 'value');
});

function fetchDatasetValue(d, data, variable) {
    return data[countyName(d)][variable];
}

// Assuming: data { county: value, ... }
function updateMapWithIndex(data) {
    updateMap(data, 'value');
}

// Update map colors using given data and variable
function updateMap(data, variable, tooltipHtml) {
    
    tooltipHtml = tooltipHtml || (d => countyName(d) + " - " + fetchDatasetValue(d, data, variable));

    theMap.elements.attr('fill', function (d) {
        return colors(fetchDatasetValue(d, data, variable));
    }).on("mouseover", function (d) {
        theMap.tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        theMap.tooltip.html(tooltipHtml(d))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        theMap.tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
}

// Generate map
d3.json('data/map10.geojson').then(function (geojson) {
    var projection = d3.geoEquirectangular();

    var geoGenerator = d3.geoPath()
        .projection(projection);

    // Join the FeatureCollection's features array to path elements
    let mapElements = d3.select('#content g.map')
        .selectAll('path')
        .data(geojson.features);
    
    // Tooltip
    theMap.tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Create path elements and update the d attribute using the geo generator
    mapElements = mapElements.enter()
        .append('path')
        .attr('d', geoGenerator)
        .attr('fill', function (d, i) { return colors(i) })
        .merge(mapElements)
        .on("mouseover", function (d) {
            theMap.tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            theMap.tooltip.html(countyName(d))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            theMap.tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });;

    theMap.elements = mapElements;
});


// Pie chart
data = {
    "A": 5,
    "B": 10,
    "C": 20
};

chart = {
    const arcs = pie(data);
  
    const svg = d3.select(DOM.svg(width, height))
        .attr("text-anchor", "middle")
        .style("font", "12px sans-serif");
  
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);
    
    g.selectAll("path")
      .data(arcs)
      .enter().append("path")
        .attr("fill", d => color(d.data.name))
        .attr("stroke", "white")
        .attr("d", arc)
      .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);
  
    const text = g.selectAll("text")
      .data(arcs)
      .enter().append("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .attr("dy", "0.35em");
    
    text.append("tspan")
        .attr("x", 0)
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(d => d.data.name);
    
    text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.value.toLocaleString());
  
    return svg.node();
  }