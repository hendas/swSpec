function barsOpen() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

var mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener("DOMContentLoaded", loadPlanets);

function loadPlanets() {
    var docApi = document.getElementById("apiPlaceholder");
    for (var j = 1; j < 8; j++) {
        (function (i) {
            var req = new XMLHttpRequest();
            var URLhost = "https://swapi.co/api/planets/?page=" + i;
            req.open("GET", URLhost, true);
            req.addEventListener("load", function () {
                if (req.status >= 200 && req.status < 400) {
                    var response = JSON.parse(req.responseText);
                    console.log(response);
                    var planetHead = document.createElement("div");
                    docApi.appendChild(planetHead);
                    planetHead.textContent = "Planety - SW " + i;
                    var planetList = document.createElement("ol");
                    planetHead.appendChild(planetList);

                    for (var k = 0; k < response.results.length; k++) {
                        (function (y) {
                            var planetIn = document.createElement("li");
                            planetIn.textContent = response.results[y].name;
                            planetList.appendChild(planetIn);
                        })(k);
                    }
                } else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send(null);
            event.preventDefault();
        })(j);
    }
}
