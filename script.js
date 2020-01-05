const topButton = document.getElementById("topBtn");
const header = document.getElementById("header");
const sticky = header.children[0].getBoundingClientRect().height;

document.addEventListener("DOMContentLoaded", loadPlanets);
window.onscroll = function () {
    scrollFunction();
    navbarSticky();
};

function barsOpen(barIconRef) {
    barIconRef.classList.toggle("change");
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function navbarSticky() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky");
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function loadPlanets() {
    const docApi = document.getElementById("apiPlaceholder");
    for (let j = 1; j < 8; j++) {
        (function (i) {
            const req = new XMLHttpRequest();
            const URLhost = "https://swapi.co/api/planets/?page=" + i;
            req.open("GET", URLhost, true);
            req.addEventListener("load", function () {
                if (req.status >= 200 && req.status < 400) {
                    const response = JSON.parse(req.responseText);
                    const planetHead = document.createElement("div");
                    docApi.appendChild(planetHead);
                    planetHead.textContent = "Planety - SW " + i;
                    const planetList = document.createElement("ol");
                    planetHead.appendChild(planetList);

                    for (let k = 0; k < response.results.length; k++) {
                        (function (y) {
                            const planetIn = document.createElement("li");
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

function saveToNewsletter() {
    const docInput = document.getElementById("email");
    alert(`${docInput.value} zapisano do newslettera!`)
}
