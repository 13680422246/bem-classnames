import React from 'react';
import generateClassNames from '../dist/lib/jsx';

// Not using anything
const NavWithNothing = (props) => {
	return (
		<nav className='nav'>
			<ul className='nav__container'>
				<li className='nav__item'></li>
				<li className='nav__item'></li>
				<li className='nav__item nav__item--disabled'></li>
				<li className='nav__item nav__item--active'></li>
			</ul>
		</nav>
	);
};

// step1: global options
const bemClassNames = generateClassNames({
	debug: true,
});
// step2: local
const bem = bemClassNames('nav');
const NavWithBem = (props) => {
	return (
		<nav className={bem()}>
			<ul className={bem('container')}>
				<li className={bem('item')}></li>
				<li className={bem('item')}></li>
				<li className={bem('item', 'disabled')}></li>
				<li className={bem('item', 'active')}></li>
			</ul>
		</nav>
	);
};
