import getClassNames from '.';

describe('classnames', () => {
  const { classNames } = getClassNames('', {
    debug: true,
  })
  const style = {
    'icon': 'a',
    'icon__arrow': 'b',
    'icon__arrow--up': 'c',
    'icon__arrow--down': 'd',
  }
  const cls = classNames.bind(style);

  test('basic use', () => {
    expect(classNames('one')).toBe('one');
    expect(classNames(['one', 'two'])).toBe('one two');
    expect(classNames({'one': false})).toBe('');
    expect(classNames('one', ['two', 'three'], {
      'four': false,
      'five': true,
    })).toEqual('one two three five');
  });
  
  test('bind a json object with classNames', () => {
    expect(cls(['icon', 'icon__arrow'], {
      'icon__arrow--up': true
    })).toEqual('a b c');
  })

  test('not found is warn when bind a json object with classNames', () => {
    let input = 'xxx';
    let out = '';
    // mock and hook console.warn
    console.warn = jest.fn((content) => {
      out += content;
    });
    cls(input); // exec
    expect(console.warn).toBeCalled();
    expect(out).toBe(`[classNames]: className ${input} is not found`);
  })
})

describe('bem', () => {
  test('basic use', () => {
    const { bem } = getClassNames();
    console.error = jest.fn();
    bem();
    expect(console.error).toBeCalled();
    expect(bem('icon')).toBe('icon');
    expect(bem('icon','up')).toBe('icon icon--up');
    expect(bem('icon',{
      'up': true
    })).toBe('icon icon--up');
  });
  test('block-name', () => {
    const { bem } = getClassNames('icon');
    expect(bem()).toBe('icon');
    expect(bem('arrow')).toBe('icon__arrow');
    expect(bem('arrow', { 'up':true, 'down': false })).toBe('icon__arrow icon__arrow--up');
  });
  test('elementSep', () => {
    const { bem } = getClassNames('icon',{
      elementSep: '_',
    });
    expect(bem()).toBe('icon');
    expect(bem('arrow')).toBe('icon_arrow');
    expect(bem('arrow', { 'up':true, 'down': false })).toBe('icon_arrow icon_arrow--up');
  });
  test('modifierSep', () => {
    const { bem } = getClassNames('icon',{
      modifierSep: '---'
    });
    expect(bem()).toBe('icon');
    expect(bem('arrow')).toBe('icon__arrow');
    expect(bem('arrow', { 'up':true, 'down': false })).toBe('icon__arrow icon__arrow---up');
  });
})
