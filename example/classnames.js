const bemClassNames = require('../dist/bem-style-classnames').default;

const { classNames } = bemClassNames();

console.info(classNames('nav')); // nav
console.info(classNames('nav__item')); // nav__tiem
console.info(
	classNames('nav__item', {
		'nav__item--disabled': true,
	})
); // nav__item nav__item--disabled
