import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import Keyboard from './Keyboard';
import eventMixin from '../mixins/eventMixin';
import config from '../config';

class View {
	constructor() {
		this.searchBox = document.querySelector('.search__input');
		this.searchButton = document.querySelector('.search__button');
		this.slidesContainer = document.querySelector('.glide__slides');
		this.slideList = document.querySelector('.glide__slide');
		this.imageBox = document.querySelector('.movie__box');
		this.keyboard = Keyboard;
		this.keyboard.init();
		document.querySelector('.keyboard-button').addEventListener('click', () => {
			this.searchBox.focus();
			document.querySelector('.keyboard').classList.toggle('keyboard--hidden');
		});
		this.searchButton.addEventListener('click', this.searchHandler.bind(this));
	}


	drawCard(Title, Year, imdbRating, Poster, imdbID) {
		const slideList = document.createElement('li');
		slideList.classList.add('glide__slide');

		const movieBox = document.createElement('div');
		movieBox.classList.add('box');

		const movieLink = document.createElement('a');
		movieLink.classList.add('movie-link');
		movieLink.setAttribute('href', `${config.movieUrl}${imdbID}`);
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
		this.searchBox.focus();
	}

	drawCards(arrayCards) {
		this.slidesContainer.innerHTML = '';

		arrayCards.forEach(({
			Title, Year, imdbRating, Poster, imdbID,
		}) => {
			this.drawCard(Title, Year, imdbRating, Poster, imdbID);
		});
		const confi = {
			// type: 'carousel',
			animationDuration: 600,
			animationTimingFunc: 'linear',
			perView: 4,
			breakpoints: {
				1200: {
					perView: 3,
				},
				780: {
					perView: 2,
				},
				530: {
					perView: 1,
				},
			},
		};

		new Glide('.glide', confi).mount();
	}

	searchHandler() {
		const searchRequest = this.searchBox.value;
		this.emit('requestStart', searchRequest);
	}
}

Object.assign(View.prototype, eventMixin);

export default View;
