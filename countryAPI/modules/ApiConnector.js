class Connector {

    #headers = new Headers();

    #options = {
        method: "GET",
        headers: this.#headers,
        mode: "no-cors",
        cache: "default"

    };

    static #urlAll = new URL("https://restcountries.com/v3.1/all?fields=name,capital,population,flags");
    static #url = new URL("https://restcountries.com");
    
    // https://restcountries.com/v3.1/name/${request}?fields=name,capital,population,flags

    get options() {
        return this.#options;
    }

    static getCountries() {
        return new Promise((resolve, reject) => {
            
            // let jsonObj = null;
    
            let promise = fetch(this.#urlAll.toString(), this.options);
            promise.then(response => {
                console.log(response.status)
                if(response.ok) {
                    return response.json();
                }else {
                    reject("Erreur : " + response.status);
                }
            })
            .then(json => {
                // jsonObj = JSON.parse(json);
                resolve(json);
                // const format = jsonObj.format;
                // const date = jsonObj.date;
                // const time = jsonObj.time;
            })
        })
    }

    static getACountrie(request) {
        return new Promise((resolve, reject) => {
            this.#url.searchParams.set("fields", "name,capital,population,flags");

            // let jsonObj = null;
            this.#url.pathname = `/v3.1/name/${request}`
            console.log(this.#url.toString())
            let promise = fetch(this.#url.toString(), this.options);
            promise.then(response => {
                console.log(response.status)
                if(response.ok) {
                    return response.json();
                }else {
                    reject("Erreur : " + response.status);
                }
            })
            .then(json => {
                // jsonObj = JSON.parse(json);
                resolve(json);
                // const format = jsonObj.format;
                // const date = jsonObj.date;
                // const time = jsonObj.time;
            })
        })
    }
}

export {Connector};