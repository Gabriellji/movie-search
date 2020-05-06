
import '@glidejs/glide/dist/css/glide.core.min.css';
import Controller from './Controller';
import View from './view/View';
import Model from './model/Model';
import config from './config';

const model = new Model(config.apikey, config.apiUrl, config.movieUrl);

const view = new View();

new Controller(model, view);
