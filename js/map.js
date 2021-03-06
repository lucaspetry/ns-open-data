
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


function randParam() {
    return Math.floor(Math.random() * 100) / 100;
}
function randValue() {
    return Math.random();
}

const datasets = {
    test: {}
};

const theMap = {
    elements: null,
    colors: ['#D2E5F6', '#147FC4'],
    selected: "Halifax",
    selectedYear: 2010,

    indexData: [
        {
            name: "Index 0",
            params: ["X", "Y", "Z"],
            data: [
                { name: "Lunenburg", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cumberland", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Pictou", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Kings", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Inverness", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Colchester", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Annapolis", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Guysborough", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Hants", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cape Breton", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Victoria", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Antigonish", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Yarmouth", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Digby", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Shelburne", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Richmond", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Queens", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Halifax", value: randValue(), params: [randParam(), randParam(), randParam()] }]
        },
        {
            name: "Healthcare (Mock-up)",
            params: ["Circulatory System Diseases", "Digestive System Diseases", "Respiratory System Diseases"],
            data: [
                { name: "Lunenburg", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cumberland", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Pictou", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Kings", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Inverness", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Colchester", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Annapolis", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Guysborough", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Hants", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cape Breton", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Victoria", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Antigonish", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Yarmouth", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Digby", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Shelburne", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Richmond", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Queens", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Halifax", value: randValue(), params: [randParam(), randParam(), randParam()] }]
        },
        {
            name: "Index 2",
            params: ["X", "Y", "Z"],
            data: [
                { name: "Lunenburg", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cumberland", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Pictou", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Kings", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Inverness", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Colchester", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Annapolis", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Guysborough", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Hants", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Cape Breton", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Victoria", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Antigonish", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Yarmouth", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Digby", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Shelburne", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Richmond", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Queens", value: randValue(), params: [randParam(), randParam(), randParam()] },
                { name: "Halifax", value: randValue(), params: [randParam(), randParam(), randParam()] }]
        },
    ],

    getIndexParamsForCounty: function (index, name) {
        const line = this.indexData[index].data.findIndex(d => d.name == name);
        return this.indexData[index].data[line].params;
    },
    getIndexParamNames: function (index) {
        return this.indexData[index].params;
    }
};

function registerPieChart(selector) {
    d3.select(selector).on("click", function (d) {
        const self = d3.select(this);
        let index = self.attr("index");
        d3.select("#map-index-name").text(theMap.indexData[index].name);
        updateMap(theMap.indexData[index].data);
        d3.selectAll(".pie").classed("unfocus", true)
        self.classed("unfocus", false);
    });
}

registerPieChart("#pie0");
registerPieChart("#pie1");
registerPieChart("#pie2");

function fetchDatasetValue(data, name) {
    idx = data.findIndex(d => d.name === name);
    if (idx == -1) {
        return 0;
    }
    return data[idx].value;
}

function mapClick(d) {

    const name = countyName(d)
    d3.select("#map-county-name").text(name);
    d3.select('#county-label').style('visibility', 'visible');
    theMap.selected = name;
    pieChart("#pie0", theMap.getIndexParamsForCounty(0, name), theMap.getIndexParamNames(0));
    pieChart("#pie1", theMap.getIndexParamsForCounty(1, name), theMap.getIndexParamNames(1));
    pieChart("#pie2", theMap.getIndexParamsForCounty(2, name), theMap.getIndexParamNames(2));
    d3.selectAll(".selectFocus").classed("focus", d => theMap.selected == d.name);
    d3.selectAll(".selectFocusMap").classed("focus", d => theMap.selected == countyName(d));
    d3.selectAll("#timelapse-div").attr("hidden", null);

    var values = [];
    Object.keys(criminality_idx).forEach(d => {
        const idx = criminality_idx[d].data.findIndex(x => x.name === theMap.selected);
        values.push({ x: d, y: criminality_idx[d].data[idx].value });
    });
    lineGraph(values);
}

// Update map colors using given data and variable
function updateMap(data, tooltipHtml) {
    tooltipHtml = tooltipHtml || (d => { let name = countyName(d); return `${name} - ${fetchDatasetValue(data, name).toFixed(2)}`; });
    var max = d3.max(data, d => d.value);
    const mapColorScale = d3.scaleLinear()
        .domain([0, max])
        .interpolate(d3.interpolateHcl)
        .range(theMap.colors);

    theMap.elements.transition().duration(800)
        .attr('fill', function (d) {
            return mapColorScale(fetchDatasetValue(data, countyName(d)));
        });

    theMap.elements.on("mouseover", function (d) {
        theMap.tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        theMap.tooltip.html(tooltipHtml(d))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

        d3.select(this).classed("focus", true);
    }).on("mouseout", function (d) {
        theMap.tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        d3.select(this).classed("focus", d => countyName(d) == theMap.selected);
    }).on("click", mapClick);

    verticalLegend("#map-legend", theMap.colors, max);

    // Do the ranking
    data.sort((a, b) => b.value - a.value);

    const rankingG = d3.select("#county-ranking");
    let rects = rankingG.selectAll("rect").data(data, d => d.name);

    const rankScale = d3.scaleLinear().domain([0, 1]).range([0, 100]);
    const rankYScale = d3.scaleBand()
        .domain(data.map(function (d) { return d.name }))
        .range([0, 350])
        .padding(0.1);

    rects.exit().remove();
    rects = rects.enter().append("rect")
        .classed("selectFocus", true)
        .attr("y", (d, i) => rankYScale(d.name))
        .merge(rects);

    rects.transition().duration(800).delay((d, i) => i * 60)
        .attr("x", 120)
        .attr("y", (d, i) => rankYScale(d.name))
        .attr("width", d => rankScale(d.value))
        .attr("height", rankYScale.bandwidth());

    let rankTexts = rankingG.selectAll("text.name").data(data, d => d.name);
    rankTexts.exit().remove();
    rankTexts = rankTexts.enter().append("text")
        .attr("class", "name")
        .attr("y", (d, i) => rankYScale(d.name) + rankYScale.bandwidth() * 0.5)
        .classed("selectFocus", true).merge(rankTexts);
    rankTexts.transition().duration(800).delay((d, i) => i * 60)
        .text((d, i) => (i + 1) + '. ' + d.name)
        .attr("x", 0)
        .attr("y", (d, i) => rankYScale(d.name) + rankYScale.bandwidth() * 0.5);

    rankTexts = rankingG.selectAll("text.v").data(data, (d, i) => d.name);
    rankTexts.exit().remove();
    rankTexts = rankTexts.enter().append("text")
        .attr("class", "v")
        .attr("x", d => rankScale(d.value) + 10 + 120)
        .attr("y", (d, i) => rankYScale(d.name) + rankYScale.bandwidth() * 0.5)
        .classed("selectFocus", true).merge(rankTexts);
    rankTexts.transition().duration(800).delay((d, i) => i * 60)
        .text(d => d.value.toFixed(2))
        .attr("x", d => rankScale(d.value) + 10 + 120)
        .attr("y", (d, i) => rankYScale(d.name) + rankYScale.bandwidth() * 0.5);
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
        .attr('fill', 'gray')
        .attr("class", "selectFocusMap")
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
        }).on("click", mapClick);

    theMap.elements = mapElements;

    verticalLegend("#map-legend", ['gray'], 1.0);

    //updateMap(theMap.indexData[0].data);

    d3.csv('data/proc/crime_stats_by_offence_category.csv')
        .then((data) => {
            data.forEach((row) => {
                if (!(row.YEAR in criminality_idx)) {
                    criminality_idx[row.YEAR] = {
                        name: 'Criminality',
                        params: ['Rate Other Criminal Code',
                            'Rate Property Crime',
                            'Rate Violent Criminal Code'],
                        data: []
                    }
                }
                var d = {
                    name: row.CO_DESC,
                    params: [row[criminality_idx[row.YEAR].params[0]],
                    row[criminality_idx[row.YEAR].params[1]],
                    row[criminality_idx[row.YEAR].params[2]]]
                };
                d.value = d.params[0] * 0.2 + d.params[1] * 0.3 + d.params[2] * 0.5;
                criminality_idx[row.YEAR].data.push(d);
            });
            theMap.indexData[0] = criminality_idx['2010'];

        })
        .catch((err) => {
            console.log(err);
        });

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


function verticalLegend(selector, colors, max) {
    var legendFullHeight = 40;
    var legendFullWidth = 200;

    var legendMargin = { top: 5, bottom: 20, left: 5, right: 20 };

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
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
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

    rect = legendSvg.select('rect');
    if (rect.empty()) {
        rect = legendSvg.append("rect");
        text = legendSvg.append("text")
            .attr("class", "map-legend-text")
            .attr("x", 52)
            .attr("y", 40)
            .text("Index Intensity");
    }

    rect.attr('x1', 0)
        .attr('y1', 0)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#gradient)');

    // create a scale and axis for the legend
    var legendScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, legendWidth]);

    var legendAxis = d3.axisBottom()
        .scale(legendScale)
        .tickValues([0, max])
        .tickFormat(d3.format(".2f"));

    legendSvg.append("g")
        .attr("class", "legend axis")
        .attr("transform", "translate(0, " + legendHeight + ")")
        .call(legendAxis);
};


function pieChart(selector, data, names) {
    var radius = 60;

    var paramColors = d3.scaleOrdinal()
        .range(["#5ccda0", "#5cc7cd", "#9b9cce"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d; });

    var svg = d3.select(selector + " g");
    if (svg.empty()) {
        svg = d3.select(selector).append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");
    }

    var arcs = svg.selectAll(".arc")
        .data(pie(data));

    newGs = arcs.enter().append("g")
        .attr("class", "arc");
    newGs.append("path");
    newGs.append("g").attr("class", "legend");

    arcs.exit().remove();

    arcs = newGs.merge(arcs);

    arcs.select("path");

    let paths = arcs.selectAll("path");
    paths.transition()
        .duration(900)
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate(this._current, d);
            var _this = this;
            return function (t) {
                _this._current = interpolate(t);
                return arc(_this._current);
            };
        })
        .style("fill", function (d, i) { return paramColors(d.index); });

    const lx = -radius, ly = radius, siz = 15;
    let legend = arcs.selectAll(".legend");

    let rects = legend.selectAll("rect").data(data);
    rects.exit().remove();

    rects.enter().append("rect")
        .merge(rects)
        .attr("x", lx)
        .attr("y", (d, i) => ly + i * 17)
        .attr("width", siz)
        .attr("height", siz)
        .attr("fill", (d, i) => paramColors(i));


    let legTexts = legend.selectAll("text.leg").data(data);
    legTexts.exit().remove();

    legTexts.enter().append("text")
        .attr("class", "leg")
        .merge(legTexts)
        .attr("x", lx + siz + 10)
        .attr("y", (d, i) => ly + i * 18 + siz * 0.7)
        .text((d, i) => `${names[i]} : ${(+d).toFixed(2)}`);

    return svg.node();
}


function lineGraph(data) {
    var margin = { top: 0, right: 10, bottom: 20, left: 30 }
        , width = 240 - margin.left - margin.right // Use the window's width 
        , height = 150 - margin.top - margin.bottom; // Use the window's height

    var xScale = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([0, 1]) // input 
        .range([height, 0]); // output 

    // 7. d3's line generator
    var line = d3.line()
        .x(function (d, i) { return xScale(d.x); }) // set the x values for the line generator
        .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("#county-timelapse");

    if (svg.select("g").empty()) {
        svg = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (d, i) { return !(i % 2); })));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        svg.append("path").attr("class", "line");
    } else {
        svg = svg.select("g");
        svg.select("g.x.axis")
            .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(function (d, i) { return !(i % 2); })));
        svg.select("g.y.axis")
            .call(d3.axisLeft(yScale))
    }

    svg.select("path.line")
        .datum(data)
        .style("opacity", 0.5)
        .transition().duration(900)
        .attr("d", line) // 11. Calls the line generator 
        .style("opacity", 1);

    // 12. Appends a circle for each datapoint 
    let dots = svg.selectAll(".dot")
        .data(data);
    dots = dots.enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot")
        .attr("cx", function (d, i) { return xScale(d.x) })
        .merge(dots); // Assign a class for styling

    dots.transition().duration(900)
        .attr("cx", function (d, i) { return xScale(d.x) })
        .attr("cy", function (d, i) { return yScale(d.y) })
        .attr("r", 5);
}

var crime_data;
var criminality_idx = {}
