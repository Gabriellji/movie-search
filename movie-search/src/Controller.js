import eventMixin from './mixins/eventMixin';

class Controller {
	constructor(cards, view) {
		this.search = '';
		this.currentPage = 1;
		this.cards = cards;
		this.view = view;
		this.cards.on('downloaded', (() => { this.view.drawCards(this.cards.list); }));
		this.view.on('requestStart', ((str) => { this.cards.search(str); }));
	}
}

Object.assign(Controller.prototype, eventMixin);

export default Controller;
