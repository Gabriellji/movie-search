import Cards from './Cards';
import Query from './Query';
import eventMixin from '../mixins/eventMixin';

class Model {
	constructor(key, url, movieUrl) {
		this.cards = new Cards(key, url, movieUrl);
		this.query = new Query('Star wars');

		this.cards.on('downloaded', (() => { this.emit('downloaded'); }));
	}
}

Object.assign(Model.prototype, eventMixin);

export default Model;
