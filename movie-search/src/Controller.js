import eventMixin from './mixins/eventMixin';

class Controller {
	constructor(model, view) {
		this.search = '';
		this.currentPage = 1;
		this.model = model;
		this.view = view;
		this.model.cards.search('Ghost in the Shell');

		this.model.on('downloaded', ((update) => {
			this.view.drawCards(this.model.cards.list, update);
		}));
		this.view.on('requestStart', ((str) => {
			this.model.query.queryString = str;
			this.model.query.off('translated');
			this.model.query.on('translated', () => {
				const searchStr = this.model.query.queryString;
				this.model.cards.search(searchStr, true);
				this.model.query.on('show-translated', (st) => {
					this.view.showTranslate(st);
				});
			});
		}));
		this.view.on('page-end', () => {
			const searchStr = this.model.query.queryString;
			this.model.cards.nextPage(searchStr);
		});
		this.model.cards.on('errors', (str) => {
			this.view.showApiErrors(str.Error);
		});
		this.model.cards.on('undefined', (str) => {
			this.view.noResultsFound(str.value);
		});
		this.model.query.on('show-translated', (str) => {
			this.view.showTranslate(str);
		});
	}
}

Object.assign(Controller.prototype, eventMixin);

export default Controller;
