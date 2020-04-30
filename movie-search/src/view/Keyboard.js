

if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
  }
  
  const Keyboard = {
  
    elements: {
      textareaContainer: null,
      main: null,
      keysContainer: null,
      textarea: null,
      keys: [],
  
    },
  
    eventHandlers: {
      oninput: null,
      onclose: null,
    },
  
    properties: {
      value: '',
      capsLock: false,
    },
  
  
    init() {
      // Create main elements
      this.elements.main = document.createElement('div');
      this.elements.keysContainer = document.createElement('div');
  
      // Setup main elements
      this.elements.main.classList.add('keyboard', 'keyboard--hidden');
      this.elements.keysContainer.classList.add('keyboard__keys');
      this.elements.keysContainer.appendChild(this.createKeys());
      this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
  
      // Add to DOM
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);
  
      // Automatically use keyboard for elements with .use-keyboard-input
    //   document.querySelectorAll(".keyboard-button").forEach(element => {
    //     element.addEventListener("click", () => {
    //         this.open(element.value, currentValue => {
    //             element.value = currentValue;
    //         });
    //     });
    // });
},
  
    createKeys() {
      const fragment = document.createDocumentFragment();
  
      const keyLayout = [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '`', 'ENTER',
        'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', '←', '↓', '→',
      ];
  
      const keyLayoutRus = [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER',
        'Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ь', 'ю', '.', '↑', 'Shift',
        'Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', '←', '↓', '→',
      ];
  
      const keys = {
        en: keyLayout,
        ru: keyLayoutRus,
      };
  
      const dataCode = [
        'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
      ];
  
      const enShift = {
        Backquote: '~',
        Digit1: '!',
        Digit2: '@',
        Digit3: '#',
        Digit4: '$',
        Digit5: '%',
        Digit6: '^',
        Digit7: '&',
        Digit8: '*',
        Digit9: '(',
        Digit0: ')',
        Minus: '_',
        Equal: '+',
        BracketLeft: '{',
        BracketRight: '}',
        Backslash: '|',
        Semicolon: ':',
        Quote: '"',
        Comma: '<',
        Period: '>',
        Slash: '?',
      };
  
      const ruShift = {
        Digit1: '!',
        Digit2: '"',
        Digit3: '№',
        Digit4: ';',
        Digit5: '%',
        Digit6: ':',
        Digit7: '?',
        Digit8: '*',
        Digit9: '(',
        Digit0: ')',
        Minus: '_',
        Equal: '+',
        Backslash: '/',
        Slash: ',',
      };
  
      const enUnShift = {
        Backquote: '`',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        Digit0: '0',
        Minus: '-',
        Equal: '=',
        BracketLeft: '[',
        BracketRight: ']',
        Backslash: '/',
        Semicolon: ';',
        Quote: '`',
        Comma: ',',
        Period: '.',
        Slash: '/',
      };
  
      const ruUnShift = {
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        Digit0: '0',
        Minus: '-',
        Equal: '=',
        Backslash: '/',
        Slash: '.',
      };
  
      // Creates HTML for an icon
      const createIconHTML = (iconName) => `<i class='material-icons'>${iconName}</i>`;
  
      // Set keyboard
      const setKeyboard = () => {
        const lang = localStorage.getItem('lang');
        keys[lang].forEach((key, index) => {
          const keyElement = document.createElement('button');
          const insertLineBreak = ['Backspase', 'DEL', 'ENTER'].indexOf(key) !== -1;
  
          // Add attributes/classes
          keyElement.setAttribute('data-code', dataCode[index]);
          keyElement.innerText = keyLayout[index];
  
          keyElement.setAttribute('type', 'button');
          keyElement.classList.add('keyboard__key');
  
          switch (key) {
            case 'Backspace':
              keyElement.classList.add('keyboard__key--wide');
              keyElement.innerHTML = createIconHTML('backspace');
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                // eslint-disable-next-line max-len
                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this.triggerEvent('oninput');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
  
            case 'Caps Lock':
              keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
              keyElement.innerHTML = createIconHTML('keyboard_capslock');
  
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                this.toggleCapsLock();
                keyElement.classList.toggle('keyboard__key--active', this.properties.capsLock);
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
  
            case 'ENTER':
              keyElement.classList.add('keyboard__key--wide');
              keyElement.innerHTML = createIconHTML('keyboard_return');
  
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                this.properties.value += '\n';
                this.triggerEvent('oninput');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
            case 'space':
              keyElement.classList.add('keyboard__key--extra-wide');
              keyElement.innerHTML = createIconHTML('space_bar');
  
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                this.properties.value += ' ';
                this.triggerEvent('oninput');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
  
              break;
            case 'Tab':
              keyElement.innerHTML = createIconHTML('keyboard_tab');
  
              keyElement.addEventListener('mousedown', (event) => {
                keyElement.classList.add('keyboard__key--dark');
                this.properties.value += '    ';
                event.preventDefault();
                this.triggerEvent('oninput');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
            case 'Shift':
              keyElement.classList.add('keyboard__key--tight');
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                this.lettersUp();
                const useShift = () => {
                  // eslint-disable-next-line no-restricted-syntax
                  for (const [key, value] of Object.entries(enShift)) {
                    document.querySelector(`button[data-code="${key}"]`).textContent = value;
                  }
                };
                useShift();
                
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
                this.lettersDown();
                const useShift = () => {
                  // eslint-disable-next-line no-restricted-syntax
                  for (const [key, value] of Object.entries(enUnShift)) {
                    document.querySelector(`button[data-code="${key}"]`).textContent = value;
                  }
                  this.lettersDown();
                };
                useShift();
              });
  
  
              break;
            case 'Ctrl':
            case 'Alt':
            case 'Win':
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
  
            case '↑':
            case '←':
            case '↓':
            case '→':
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
              break;
            default:
              keyElement.textContent = key.toLowerCase();
  
              keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('keyboard__key--dark');
                this.properties.value += this.properties.capsLock
                  ? key.toUpperCase() : key.toLowerCase();
                this.triggerEvent('oninput');
              });
  
              keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('keyboard__key--dark');
              });
  
  
              break;
          }
  
          fragment.appendChild(keyElement);
  
          if (insertLineBreak) {
            fragment.appendChild(document.createElement('br'));
          }
        });
      };
  
      document.addEventListener('keydown', (event) => {
        const pressedKey = document.querySelector(`button[data-code = ${event.code}]`);
        pressedKey.classList.add('keyboard__key--dark');
        if (event.shiftKey && event.altKey) {
          this.changeLang();
          // document.location.reload(true);
          this.renderNewKeyboard();
        }
        if (event.shiftKey && localStorage.getItem('lang') === 'en') {
          const useShift = () => {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(enShift)) {
              document.querySelector(`button[data-code="${key}"]`).textContent = value;
            }
            this.lettersUp();
          };
          useShift();
        } else if (event.shiftKey && localStorage.getItem('lang') === 'ru') {
          const useShift = () => {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(ruShift)) {
              document.querySelector(`button[data-code="${key}"]`).textContent = value;
            }
            this.lettersUp();
          };
          useShift();
        }
  
        if (event.code === 'Tab') {
          this.textarea = document.querySelector('textarea');
          const indexСarriage = this.elements.textarea.selectionStart;
          const text = this.textarea.value;
          this.textarea.value = [...text.slice(0, indexСarriage), '    ', ...text.slice(indexСarriage)].join('');
          this.textarea.selectionEnd = indexСarriage + 4;
          event.preventDefault();
        }
  
        if (event.code === 'Backspace') {
          // eslint-disable-next-line max-len
          this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        } else if (event.code === 'CapsLock') {
          this.toggleCapsLock();
          pressedKey.classList.toggle('keyboard__key--active');
        } else if (event.code === 'Enter') {
          this.properties.value += '\n';
        } else if (event.code === 'Space') {
          this.properties.value += ' ';
        }
      });
  
      document.addEventListener('keyup', (event) => {
        const unPressedKey = document.querySelector(`button[data-code = ${event.code}]`);
        unPressedKey.classList.remove('keyboard__key--dark');
        if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && localStorage.getItem('lang') === 'en') {
          const useShift = () => {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(enUnShift)) {
              document.querySelector(`button[data-code="${key}"]`).textContent = value;
            }
            this.lettersDown();
          };
          useShift();
        } else if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && localStorage.getItem('lang') === 'ru') {
          const useShift = () => {
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of Object.entries(ruUnShift)) {
              document.querySelector(`button[data-code="${key}"]`).textContent = value;
            }
            this.lettersDown();
          };
          useShift();
        }
      });
  
      setKeyboard();
      return fragment;
    },
  
    lettersUp() {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) key.textContent = key.textContent.toUpperCase();
      }
    },
  
    lettersDown() {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) key.textContent = key.textContent.toLowerCase();
      }
    },
  
    changeLang() {
      const lang = localStorage.getItem('lang');
      localStorage.setItem('lang', lang === 'en' ? 'ru' : 'en');
      this.renderNewKeyboard(lang);
    },
  
  
    triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] === 'function') {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },
  
    toggleCapsLock() {
      this.properties.capsLock = !this.properties.capsLock;
      // eslint-disable-next-line no-restricted-syntax
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock
            ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    },

    renderNewKeyboard(lang) {
      this.elements.newKeysWrapper = document.createElement('div');
      this.elements.newKeysWrapper.classList.add('keyboard__keys');
      this.elements.newKeysWrapper.appendChild(this.createKeys(lang));
      this.elements.oldKeyboard = document.querySelector('.keyboard__keys');
      this.elements.oldKeyboard.replaceWith(this.elements.newKeysWrapper);

    },
  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || '';
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      this.properties.value = '';
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
    },
  
  };
  
  
 
  
export default Keyboard