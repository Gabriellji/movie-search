
import '@glidejs/glide/dist/css/glide.core.min.css';
import Controller from './Controller';
import View from './view/View';
import Cards from './model/Cards';
import config from './config';

const cards = new Cards(config.apikey, config.apiUrl, config.movieUrl);

const view = new View();

new Controller(cards, view);


