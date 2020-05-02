import eventMixin from '../mixins/eventMixin';

class Cards {
	constructor(key, url, movieUrl) {
		this.key = key;
		this.url = url;
		this.movieUrl = movieUrl;
		this.list = [];
		this.search('Matrix');
		this.downloadCount = 0;
	}


	search(str) {
		fetch(`${this.url}?apikey=${this.key}&s=${str}`)
			.then((response) => response.json())
			.then((result) => {
				this.list = [];
				this.downloadCount = 0;
				for (let i = 0; i < result.Search.length; i += 1) {
					fetch(`${this.url}?apikey=${this.key}&i=${result.Search[i].imdbID}`)
						.then((response) => response.json())
						.then((res) => {
							this.list[i] = res;
							this.downloaded(result.Search.length);
							// this.getRating(result.Search[i].imdbID);
							// this.getLink(result.Search[i].imdbID);
						});
				}
			});
	}

	downloaded(length) {
		this.downloadCount += 1;
		if (this.downloadCount >= length) {
			this.emit('downloaded');
		}
	}

	// getRating(imdbID) {
	// 	const url = `${this.url}?i=${imdbID}&apikey=${this.key}`;
	// 	return fetch(url)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			const movie = data;

	// 			// const imdb = Number(imdbID);
	// 			return movie.imdbRating;
	// 		});
	// }

	// getLink(title, imdbID) {
	// 	const url = `${this.movieUrl}?s=${title}?i=${imdbID}`;
	// 	return fetch(url)
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			const movie = data;

	// 			// const imdb = Number(imdbID);
	// 			console.log(movie);
	// 			return movie.movieUrl;
	// 		});
	// }
}
Object.assign(Cards.prototype, eventMixin);

export default Cards;
