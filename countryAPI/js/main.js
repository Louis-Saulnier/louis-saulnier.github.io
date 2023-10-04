import { Connector } from "./modules/ApiConnector.js"

const debounce = (callback, wait) => {
    let timeoutId = null
    return (...args) => {
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => {
        callback.apply(null, args)
        }, wait)
    }
}

const form = document.querySelector("#frm");

const handleMouseMove = debounce((ev) => {
    // Do stuff with the event!
    const formData = new FormData(form)
    // Check in the localstorage
    const searchItem = formData.get("search");
    
    if(localStorage.getItem(searchItem) === null && searchItem.trim() !== "" && searchItem.trim() !== null) {
        Connector.getACountrie(searchItem)
        .then((jsonList) => {
            saveInCache(searchItem, jsonList)
            showCountries(jsonList)
        })
        .catch(() => {
            showError()
        })
    }else if(searchItem.trim() !== "" && searchItem.trim() !== null) {
        showCountries(JSON.parse(localStorage.getItem(searchItem)))
    }
    else {
        let promise = Connector.getCountries();
        promise.then(jsonList => {
            showCountries(jsonList);
        }).catch(() => {
            showError()
        })
    }

    }, 1);

handleMouseMove();
window.addEventListener('keydown', handleMouseMove);

function saveInCache(searchItem, jsonObj) {
    localStorage.setItem(searchItem, JSON.stringify(jsonObj));
}

function showCountries(jsonList) {
    const ul = document.querySelector("#responseList");
    ul.innerHTML = "";
    jsonList.forEach(json => {

        let liOutSide = document.createElement("li");
        liOutSide.className = "w3-center w3-mobile w3-rest w3-indigo w3-round-large w3-bar";

        let ulInside = document.createElement("ul");
        ulInside.className = "w3-center";

        let liName = document.createElement("li");
        liName.className = "w3-center";

        let liCapital = document.createElement("li");
        liCapital.className = "w3-center";

        let liPop = document.createElement("li");
        liPop.className = "w3-center";


        liName.innerHTML = json["name"]["common"];
        liCapital.innerHTML = json["capital"];
        liPop.innerHTML = json["population"];

        let img = document.createElement("img");
        img.src = json["flags"]["svg"];

        ulInside.appendChild(liName);
        ulInside.appendChild(liCapital);
        ulInside.appendChild(liPop);

        liOutSide.appendChild(ulInside);
        liOutSide.appendChild(img);

        ul.appendChild(liOutSide);

        // liInside.innerHTML = `${json["name"]["common"]}`;
        // ulInside.innerHTML = `${json["name"]["common"]}`

        // ulInside = `<ul>${json["name"]["common"]}</ul>`
        // ul.innerHTML += `<li>${json}</li>`
        
        // 
    });
}

function showError() {
    const ul = document.querySelector("#responseList");
    ul.innerHTML = `<li>Aucun pays ne correspond a ça.</li>`;
}