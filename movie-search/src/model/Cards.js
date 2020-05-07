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
		fetch(`${this.url}?apikey=${this.key}&s=${str}&page=${this.currentPage}`)
			.then((response) => {
				if (!response.ok) {
					this.isError = true;
				}
				return response.json();
			})
			.then((result) => {
				if (result.Error === 'Movie not found!') {
					this.emit('undefined', result);
				}
				if (this.isError) {
					this.isError = false;
					this.emit('errors', result);
				} else {
					if (update) {
						this.list = [];
					}
					this.downloadCount = 0;
					this.pageCount = Math.floor(result.totalResults / 10);
					for (let i = 0; i < result.Search.length; i += 1) {
						fetch(`${this.url}?apikey=${this.key}&i=${result.Search[i].imdbID}`)
							.then((response) => response.json())
							.then((res) => {
								this.list.push(res);
								this.downloadCount += 1;
								if (this.downloadCount >= result.Search.length) {
									this.emit('downloaded');
								}
							});
					}
				}
			});
	}

	nextPage(str) {
		if (this.currentPage <= this.pageCount) {
			this.currentPage += 1;
			this.search(str);
		}
	}
}
Object.assign(Cards.prototype, eventMixin);

export default Cards;
