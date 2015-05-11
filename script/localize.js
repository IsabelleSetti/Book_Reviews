


function localizePage(locale) {
	var locale = getParameterByName("l") || "en";

	var localizedLinks = document.getElementsByClassName("localized-link");
	for (var i =0; i < localizedLinks.length; i++) {
		localizedLinks[i].href += "?l=" + encodeURIComponent(locale);
	}

	// Copied from: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
	var req = new XMLHttpRequest();	

	req.onload = function () {
		var strings = JSON.parse(this.responseText);
		for (var key in strings) {
			var e = document.getElementById(key);
			if (e) {
				var value = strings[key];
				if (e.nodeName == "IMG") {
					e.setAttribute("src", value);
				} else {
					e.innerHTML = value;
				}
			}
    	}
	};

	req.open("GET", "config/locales/" + locale + ".json", true);
	req.send();
}

// Copied from: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
