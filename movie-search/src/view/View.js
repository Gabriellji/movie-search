import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

class View {
    constructor() {
        this.searchBox = document.querySelector('.search__input')
        this.slidesContainer = document.querySelector('.glide__slides');
        this.slideList = document.querySelector('.glide__slide');
        this.imageBox = document.querySelector('.movie__box');
    }

    drawCard(Title, Year, imdbID, Poster) {
        const slideList = document.createElement('li');
        slideList.classList.add('glide__slide');

        const movieBox = document.createElement('div');
        movieBox.classList.add('box');

        const movieLink = document.createElement('a');
        movieLink.classList.add('movie-link');
        movieLink.setAttribute('href', Title);
        movieLink.textContent = Title;

        const imageBox = document.createElement('div');
        imageBox.classList.add('movie__box');
        imageBox.style.backgroundImage = "url('"+Poster+"')";

        const movieYear = document.createElement('p');
        movieYear.classList.add('movie-year');
        movieYear.textContent = Year;

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie-rating');
        movieRating.textContent = imdbID

        movieBox.appendChild(movieLink);
        movieBox.appendChild(imageBox);
        movieBox.appendChild(movieYear);
        movieBox.appendChild(movieRating);

        slideList.appendChild(movieBox);

        this.slidesContainer.appendChild(slideList);

        // this.searchBox.focus();
    }

    drawCards(arrayCards) {
        arrayCards.forEach(({Title, Year, imdbID, Poster}) => {
            this.drawCard(Title, Year, imdbID, Poster);
          });
          const config = {
            type: 'carousel',
            animationDuration: 600,
            animationTimingFunc: 'linear',
            perView: 4,
            breakpoints: {
                1200: {
                  perView: 3
                },
                780: {
                  perView: 2
                },
                530: {
                    perView: 1
                  }
              }
        }
        
        new Glide('.glide', config).mount();
    }

    
}

export default View;