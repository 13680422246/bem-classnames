import React from "react";
import getClassNames from '../classNames';

// Not using anything
const NavWithNothing = (props) => {
  return (
    <nav className="nav">
        <ul className="nav__container">
            <li className="nav__item"></li>
            <li className="nav__item"></li>
            <li className="nav__item nav__item--disabled"></li>
            <li className="nav__item nav__item--active"></li>
        </ul>
    </nav>
  );
}

const { bem } = getClassNames('nav');
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
}