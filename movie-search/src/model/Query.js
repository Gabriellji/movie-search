import eventMixin from '../mixins/eventMixin';

class Query {
	constructor(query, translateUrl, translateKey) {
		this.data = query;
		this.translateUrl = translateUrl;
		this.translateKey = translateKey;
	}

	set queryString(value) {
		if (value.match(/[а-яё]/gi)) {
			this.translated(value);
		} else {
			this.data = value;
			setTimeout(() => {
				this.emit('translated');
				this.off('show-translated');
			}, 0);
		}
	}

	get queryString() {
		return this.data;
	}

	translated(value) {
		fetch(`${this.translateUrl}?key=${this.translateKey}&text=${value}&lang=ru-en`)
			.then((response) => response.json())
			.then((result) => {
				this.data = result.text;
				this.emit('translated');
				this.emit('show-translated', this.data);
			});
	}
}

Object.assign(Query.prototype, eventMixin);

export default Query;
