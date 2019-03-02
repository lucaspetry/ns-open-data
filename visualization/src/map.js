
		const nCounties = 50;
		const colors = d3.scaleLinear()
			.domain([0, 50])
			.interpolate(d3.interpolateHcl)
			.range(['#D2E5F6', '#147FC4']);

		var mapElements = null;
		d3.json('data/map10.geojson').then(function (geojson) {
			var projection = d3.geoEquirectangular();

			var geoGenerator = d3.geoPath()
				.projection(projection);

			console.log(d3.select('#content g.map')
				.selectAll('path'))

			// Join the FeatureCollection's features array to path elements
			mapElements = d3.select('#content g.map')
				.selectAll('path')
				.data(geojson.features);

			// Create path elements and update the d attribute using the geo generator
			mapElements = mapElements.enter()
				.append('path')
				.attr('d', geoGenerator)
				.attr('fill', function (d, i) { return colors(i) })
			merge(mapElements);
		});

		datasets = {
			test: {}
		};

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

		d3.csv('data/test.csv').then(function (data) {
			datasets.test = transformDataByCounty(data);
		});

		d3.select("#btn-test").on('click', function (e) {
			console.log(datasets);
			console.log(mapElements)
			mapElements.attr('fill', function (d) {
				return colors(datasets.test[countyName(d)].value);
			});
		});

		function countyName(d) {
			return d.properties.county;
		}