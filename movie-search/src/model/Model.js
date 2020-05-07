import Cards from './Cards';
import Query from './Query';
import eventMixin from '../mixins/eventMixin';
import config from '../config';

class Model {
	constructor(key, url, movieUrl) {
		this.cards = new Cards(key, url, movieUrl);
		this.query = new Query('Star wars', config.translateUrl, config.translateKey);
		this.cards.on('downloaded', (() => { this.emit('downloaded'); }));
	}
}

Object.assign(Model.prototype, eventMixin);

export default Model;
