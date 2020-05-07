import eventMixin from '../mixins/eventMixin';

class Query {
	constructor(query, translateUrl, translateKey) {
		this.data = query;
		this.translateUrl = translateUrl;
		this.translateKey = translateKey;
	}

	set queryString(value) {
		if (value.match(/(^[А-я0-9\s]+)(?!.*[A-z])$/)) {
			this.translated(value);
		} else {
			this.data = value;
			this.emit('translated');
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
			});
	}
}

Object.assign(Query.prototype, eventMixin);

export default Query;
