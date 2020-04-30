import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import RequestHandler from './model/RequestHandler';
import Keyboard from './view/Keyboard';
import store from './model/store';
import View from './view/View';

// const config = {
//     perView: 4,
//     breakpoints: {
//         1200: {
//           perView: 3
//         },
//         780: {
//           perView: 2
//         },
//         530: {
//             perView: 1
//           }
//       }
// }

// new Glide('.glide', config).mount();

console.log(store);

Keyboard.init();

document.querySelector('.keyboard-button').addEventListener('click', () => {
  document.querySelector('.keyboard').classList.toggle('keyboard--hidden');
});

const view = new View();
view.drawCards(store.cards);








const textAnimation = () => {
  document.querySelector('.quotes').classList.add('tracking-in-expand')
}

const text = document.querySelector('.quotes');

text.addEventListener('mouseleave', () => {
    textAnimation();
})