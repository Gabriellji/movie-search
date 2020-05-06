import eventMixin from './mixins/eventMixin';

class Controller {
	constructor(model, view) {
		this.search = '';
		this.currentPage = 1;
		this.model = model;
		this.view = view;
		this.model.cards.search('Star wars');

		this.model.on('downloaded', (() => {
			this.view.drawCards(this.model.cards.list);
		}));
		this.view.on('requestStart', ((str) => {
			this.model.query.queryString = str;
			const searchStr = this.model.query.queryString;
			this.model.cards.search(searchStr);
		}));
		this.view.on('page-end', () => {
			const searchStr = this.model.query.queryString;
			this.model.cards.nextPage(searchStr);
		});
	}
}

Object.assign(Controller.prototype, eventMixin);

export default Controller;
