# classNames

`classNames`支持三种参数形式，string | Object | Array

```js
const { classNames } = bemClassNames();

// string
classNames('foo', 'bar'); // => 'foo bar'
// Object
classNames('foo', { bar: true }));; // => 'foo bar'
// Array
classNames('foo', ['bar', {}]);; // => 'foo bar'
// total
classNames('one', ['two', { 'three': true, 'four': false }], 'five'); // => 'one two three five'
```



## classNames and CSSModule

```jsx
const { classNames } = bemClassNames();
const style = {
    'icon': 'abc',
    'icon--up': 'def',
    'icon--down': 'xyz',
};

const cls = classNames.bind(style);

cls('icon', 'icon--up'); // => 'abc def'
```



# bem

`bem`可以让你更加灵活的编写BEM风格的CSS

第一个参数是接受的是字符串，它表示的是element-name

此后的参数表示的是modifier-name，它可以接受string | Object | Array

```jsx
import React from "react";

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

// bem style
const { bem } = bemClassNames('nav');
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
```





# bem and CSSModule

```jsx
const { bem } = bemClassNames();
const style = {
    'icon': 'abc',
    'icon--up': 'def',
    'icon--down': 'xyz',
};

bem.call(style,'icon',['up']); // => abc def
```



# API

bemClassNames

* block-name
* options

classNames

* string | Array | Object

bem

* element-name
* string | Array | Object



# options

## debug

调试模式下，如果从style中找不到对应的选项，则提示警告，默认关闭

```js
const { classNames } = bemClassNames('', { debug: true });
const style = {
    'icon': 'abc',
    'icon--up': 'def',
    'icon--down': 'xyz',
};

const cls = classNames.bind(style);

cls('xxx'); // warn to console
```

## modifierSep

修饰符分割线，默认为`--`

```js
const { bem } = bemClassNames('', { modifierSep: '-' });
bem('icon', 'up'); // => icon icon-up

const { bem } = bemClassNames('', { modifierSep: '---' });
bem('icon', 'up'); // => icon icon---up
```

