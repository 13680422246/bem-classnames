const bemClassNames = require('../dist/index').default;

const { bem } = bemClassNames('nav');

console.info(bem()); // nav
console.info(bem('item')); // nav__item
console.info(bem('item', {
  'disabled': true
})); // nav__item nav__item--disabled