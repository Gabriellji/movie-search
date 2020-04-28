import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const config = {
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

new Glide('.glide', config).mount()



// const textAnimation = (e) => {
//     e.classList.add('tracking-in-expand')
// }

// const text = document.querySelector('.quotes p');

// text.addEventListener('mousedown', () => {
//     console.log('yoo')
//     textAnimation();
// })