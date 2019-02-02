const selCountry = "Select a country";
const selState = "Select a state";
const selCity = "Select a city";

	function selectCountry() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var values = "<option>Select a country</option>";
				var x = xhttp.responseXML.getElementsByTagName("country");
				for (var i = 0; i < x.length; i++) {
					values += "<option>" + x[i].childNodes[0].nodeValue + "</option>";
				}
				document.getElementById("countries").innerHTML = values;
			}
		};
		xhttp.open("GET", "XML/Countries.xml", true);
		xhttp.send();
	}
	
	
	selectCountry();

	function selectState(country) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var values = "<option>Select a state</option>";
				var x = xhttp.responseXML.getElementsByTagName("state");
				for (var i = 0; i < x.length; i++) {
					values += "<option>" + x[i].childNodes[0].nodeValue + "</option>";
				}
				document.getElementById("states").innerHTML = values;
				document.getElementById("cities").innerHTML = " ";
			}
		};
		xhttp.open("GET", "XML/" + country + ".xml", true);
		xhttp.send();
	}
	
	function selectCity(state) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var values = "<option>Select a city</option>";
				var x = xhttp.responseXML.getElementsByTagName("city");
				for (var i = 0; i < x.length; i++) {
					values += "<option>" + x[i].childNodes[0].nodeValue + "</option>";
				}
				document.getElementById("cities").innerHTML = values;
			}
		};
		xhttp.open("GET", "XML/" + state + ".xml", true);
		xhttp.send();
	}
	
	function showSelect(input) {
		var country = document.getElementById("countries").value;
		var state = document.getElementById("states").value;
		
		if (input == selCountry) {
			resetButton();
		} else if (input == selState) {
			document.getElementById("showSelection").value = country;
			document.getElementById("cities").innerHTML = " ";
		} else if (input == selCity) {
			document.getElementById("showSelection").value = country + "/" + state;
		
		} else if (country == input ) {
			document.getElementById("showSelection").value = input;
		} else if (state == input) {
			document.getElementById("showSelection").value = country + "/" + input;
		} else {
			document.getElementById("showSelection").value = country + "/" + state + "/" + input;
		}
	}

	function resetButton() {
		selectCountry();
		document.getElementById("states").innerHTML = " ";
		document.getElementById("cities").innerHTML = " ";
		document.getElementById("showSelection").value = " ";
	}