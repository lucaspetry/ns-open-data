
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


    const values = Object.keys(data).map(k => data[k].value)
    max = d3.max(values);
    min = d3.min(values);
    verticalLegend("#map-legend", ['#D2E5F6', '#147FC4'], min, max);
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

    verticalLegend("#map-legend", ['#D2E5F6', '#147FC4'], 0, 1);
});

function linspace(start, end, n) {
    var out = [];
    var delta = (end - start) / (n - 1);

    var i = 0;
    while (i < (n - 1)) {
        out.push(start + (i * delta));
        i++;
    }

    out.push(end);
    return out;
}


function verticalLegend(selector, colors, min, max) {
    var legendFullHeight = 200;
    var legendFullWidth = 40;

    var legendMargin = { top: 20, bottom: 20, left: 5, right: 20 };

    // use same margins as main plot
    var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;
    var legendHeight = legendFullHeight - legendMargin.top - legendMargin.bottom;

    // clear current legend
    let legendSvg = d3.select(selector);

    legendSvg.select("defs").remove();
    legendSvg.select("g").remove();

    // append gradient bar
    var gradient = legendSvg.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%') // bottom
        .attr('y1', '100%')
        .attr('x2', '0%') // to top
        .attr('y2', '0%')
        .attr('spreadMethod', 'pad');

    // Generate gradient points
    var pct = linspace(0, 100, colors.length).map(function (d) {
        return Math.round(d) + '%';
    });

    var colourPct = d3.zip(pct, colors);

    colourPct.forEach(function (d) {
        gradient.append('stop')
            .attr('offset', d[0])
            .attr('stop-color', d[1])
            .attr('stop-opacity', 1);
    });

    legendSvg.append('rect')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#gradient)');

    // create a scale and axis for the legend
    var legendScale = d3.scaleLinear()
        .domain([min, max])
        .range([legendHeight, 0]);

    var legendAxis = d3.axisRight()
        .scale(legendScale)
        .tickFormat(d3.format("d"));

    legendSvg.append("g")
        .attr("class", "legend axis")
        .attr("transform", "translate(" + legendWidth + ", 0)")
        .call(legendAxis);
};


function pieChart(selector, data) {

    var radius = 60;

    var paramColors = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value; });

    var svg = d3.select(selector)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) { return paramColors(d.value); });

    g.append("text")
        .attr("transform", function (d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function (d) { return d.value; });

    const lx = -50, ly = radius, siz = 15;
    let legend = g.append("g")
        .attr("class", "legend");

    rects = legend.selectAll("rect").data(data);

    rects.enter().append("rect")
        .attr("x", lx)
        .attr("y", (d, i) => ly + i * 15)
        .merge(rects)
        .attr("width", siz)
        .attr("height", siz)
        .attr("fill", d => paramColors(d.value));


    texts = legend.selectAll("text").data(data);

    texts.enter().append("text")
        .attr("x", lx + siz + 10)
        .attr("y", (d, i) => ly + i * 15 + siz * 0.6)
        .merge(texts)
        .text(d => `${d.name} (${d.value})`);


    return svg.node();
}

data = [
    { name: "p0", value: 10 },
    { name: "p1", value: 30 },
    { name: "p2", value: 50 },
]
pieChart("#pie0", data);
pieChart("#pie1", data);
pieChart("#pie2", data);