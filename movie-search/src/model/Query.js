class Query {
	constructor(query) {
		this.data = query;
	}

	set queryString(value) {
		this.data = value;
	}

	get queryString() {
		return this.data;
	}
}

export default Query;
