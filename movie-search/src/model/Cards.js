import eventMixin from '../mixins/eventMixin';

class Cards {
	constructor(key, url, movieUrl) {
		this.key = key;
		this.url = url;
		this.movieUrl = movieUrl;

		this.currentPage = 1;
		this.pageCount = 1;
		this.list = [];
		this.downloadCount = 0;

		this.isError = false;
	}


	search(str, update = false) {
		if (str.length === undefined) {
			this.emit('undefined');
		}
		fetch(`${this.url}?apikey=${this.key}&s=${String(str).trim()}&page=${this.currentPage}`)
			.then((response) => {
				if (!response.ok) {
					this.isError = true;
				}
				return response.json();
			})
			.then((result) => {
				if (result.Error === 'Something went wrong.') {
					this.emit('errors', result);
					return;
				}
				if (result.Error === 'Movie not found!') {
					this.emit('undefined', result);
					return;
				}
				if (result.Error === 'Too many results.') {
					this.emit('errors', result);
					return;
				}
				if (this.isError) {
					this.isError = false;
					this.emit('errors', result);
				} else {
					if (update) {
						this.list = [];
					}
					this.downloadCount = 0;
					this.pageCount = Math.ceil(result.totalResults / 10); // Math.floor
					for (let i = 0; i < result.Search.length; i += 1) {
						fetch(`${this.url}?apikey=${this.key}&i=${result.Search[i].imdbID}`)
							.then((response) => response.json())
							.then((res) => {
								this.list.push(res);
								this.downloadCount += 1;
								if (this.downloadCount >= result.Search.length) {
									this.emit('downloaded', update);
								}
							});
					}
				}
			});
	}

	nextPage(str) {
		if (this.currentPage < this.pageCount) {
			this.currentPage += 1;
			this.search(str);
			this.pageCount = Math.ceil(str.totalResults / 10);
		} else if (this.currentPage >= this.pageCount) {
			this.emit('errors', { Error: 'There is no more results :(' });
		}
	}
}
Object.assign(Cards.prototype, eventMixin);

export default Cards;
