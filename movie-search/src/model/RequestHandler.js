class RequestHandler {
    constructor(key, url) {
        this.key = key;
        this.url = url;
    } 
}

    async function search(str) {
        const response = await fetch(`${this.url}?apikey=${this.key}&s=${str}`);
        if(response.ok) {
           const res = response.json().search;
           res.map( async el => {
               return await fetch(`${this.url}?apikey=${this.key}&i=${el.imdbID}`);
           });
           return res;
        }
    };

     
