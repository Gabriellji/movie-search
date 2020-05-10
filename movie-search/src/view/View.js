import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Keyboard from './Keyboard';
import eventMixin from '../mixins/eventMixin';
import config from '../config';

class View {
	constructor() {
		this.currentCard = 0;
		this.searchBox = document.querySelector('.search__input');
		this.searchButton = document.querySelector('.search__button');
		this.slidesContainer = document.querySelector('.glide__slides');
		this.slideList = document.querySelector('.glide__slide');
		this.imageBox = document.querySelector('.movie__box');
		this.keyboard = Keyboard;

		this.errorsContainer = document.querySelector('.api-errors');
		this.apiResult = document.querySelector('.api-result');

		this.noResultsBox = document.querySelector('.not-found_title');
		this.notFoundResults = document.querySelector('.no-result');

		this.spinner = document.querySelector('.spinner-main');

		this.translatedWordsContainer = document.querySelector('.translated_result');
		this.translated = document.querySelector('.translated-result');

		this.sliderConfi = {
			animationDuration: 300,
			animationTimingFunc: 'linear',
			perView: 4,
			rewind: false,
			bound: true,
			breakpoints: {
				1280: {
					perView: 3,
				},
				900: {
					perView: 2,
				},
				630: {
					perView: 1,
				},
			},
		};


		this.slider = new Glide('.glide', this.sliderConfi).mount();
		// this.slider.on('run.end', (() => this.nextSlide()));

		this.keyboard.init();
		document.querySelector('.keyboard-button').addEventListener('click', () => {
			this.searchBox.focus();
			document.querySelector('.keyboard').classList.toggle('keyboard--hidden');
		});

		this.searchButton.addEventListener('click', this.searchHandler.bind(this));

		document.querySelector('.clear').addEventListener('click', () => {
			this.searchBox.value = '';
			this.searchBox.focus();
		});

		document.addEventListener('keypress', ((event) => {
			if (event.code === 'Enter') {
				this.searchHandler();
			}
		}));

		document.querySelector('[data-code="Enter"]').addEventListener('click', () => {
			this.searchHandler();
		});

		this.keyboard.on('requestStart', this.searchHandler.bind(this));

		this.searchBox.focus();
	}

	nextSlide() {
		this.currentCard += 1;
		if (this.slider._c.Run.isEnd()) {
			this.emit('page-end');
		}
	}

	drawCard(Title, Year, imdbRating, Poster, imdbID) {
		this.activeCard += 1;
		const slideList = document.createElement('li');
		slideList.classList.add('glide__slide');

		const movieBox = document.createElement('div');
		movieBox.classList.add('box');

		const movieLink = document.createElement('a');
		movieLink.classList.add('movie-link');
		movieLink.setAttribute('href', `${config.movieUrl}${imdbID}/videogallery`);
		movieLink.setAttribute('target', '_blank');
		movieLink.textContent = Title;

		const imageBox = document.createElement('div');
		imageBox.classList.add('movie__box');
		imageBox.style.backgroundImage = `url('${Poster}')`;

		const movieYear = document.createElement('p');
		movieYear.classList.add('movie-year');
		movieYear.textContent = Year;

		const ratingBox = document.createElement('div');
		ratingBox.classList.add('rating__box');

		const ratingImg = document.createElement('img');
		ratingImg.classList.add('rating-star', 'jello-horizontal');
		ratingImg.setAttribute('src', '/assets/shapes-and-symbols.svg');

		const movieRating = document.createElement('span');
		movieRating.classList.add('movie-rating');
		movieRating.textContent = imdbRating;

		ratingBox.appendChild(ratingImg);
		ratingBox.appendChild(movieRating);

		movieBox.appendChild(movieLink);
		movieBox.appendChild(imageBox);
		movieBox.appendChild(movieYear);
		movieBox.appendChild(ratingBox);

		slideList.appendChild(movieBox);

		this.slidesContainer.appendChild(slideList);

		if (Poster === 'N/A') {
			imageBox.style.backgroundImage = "url('./assets/keep.jpg')";
		}
		// this.searchBox.focus();
	}

	drawCards(arrayCards, img = false) {
		if (img) {
			this.currentCard = 0;
		}
		this.slidesContainer.innerHTML = '';

		this.spinner.style.display = 'none';

		arrayCards.forEach(({
			Title, Year, imdbRating, Poster, imdbID,
		}) => {
			this.drawCard(Title, Year, imdbRating, Poster, imdbID);
		});
		this.slider.destroy();
		this.slider = new Glide('.glide', { ...this.sliderConfi, startAt: this.slider.index }).mount();
		this.slider.on('run.end', (() => this.nextSlide()));
	}


	searchHandler() {
		const searchRequest = this.searchBox.value;
		this.emit('requestStart', searchRequest);
		this.spinner.style.display = 'block';
		this.slider.destroy();
		this.slider = new Glide('.glide', { ...this.sliderConfi, startAt: this.currentCard = 0 }).mount();
	}

	showApiErrors(str) {
		this.spinner.style.display = 'none';
		this.errorsContainer.style.display = 'unset';
		this.apiResult.textContent = str;
		setTimeout(() => {
			this.errorsContainer.style.display = 'none';
			this.apiResult.textContent = '';
		}, 7000);
	}

	noResultsFound() {
		this.spinner.style.display = 'none';
		this.noResultsBox.style.display = 'unset';
		this.notFoundResults.textContent = this.searchBox.value;
		setTimeout(() => {
			this.noResultsBox.style.display = 'none';
			this.notFoundResults.textContent = '';
		}, 5000);
	}

	showTranslate(val) {
		this.spinner.style.display = 'none';
		this.translatedWordsContainer.style.display = 'unset';
		this.translated.textContent = val;
		setTimeout(() => {
			this.translatedWordsContainer.style.display = 'none';
			this.translated.textContent = '';
		}, 7000);
	}
}

Object.assign(View.prototype, eventMixin);

export default View;
