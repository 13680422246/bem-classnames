const generateClassNames = require('../dist/lib/jsx').default;

// step1: global options
const bemClassNames = generateClassNames({
	debug: true,
});

// step2: local
const { bem } = bemClassNames('nav');

console.info(bem()); // nav
console.info(bem('item')); // nav__item
console.info(
	bem('item', {
		disabled: true,
	})
); // nav__item nav__item--disabled
