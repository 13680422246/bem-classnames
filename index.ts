export type IClassname =
	| string
	| {
			[classname: string]: boolean;
    };

export type IArgs = (IClassname | IClassname[])[];

/**
 * 判断一个对象是否为JSON对象
 * @param obj 对象
 */
function isJson(data: any): boolean {
  // 1.Object类型
  // 2.原型链指向Object
  if (
    typeof data == 'object' &&
    Object.prototype.toString.call(data).toLowerCase() === '[object object]'
  ) {
    return true;
  }
  return false;
}

/**
 * 处理参数
 * @param args css类名，支持string,数组,对象三种形式
 */
function handleArgs(...args: IArgs): string[]{
  let res: string[] = [];
  for (const arg of args) {
    // type is string
    if (typeof arg === 'string') {
      res.push(arg);
    }
    // type is Array
    else if (Array.isArray(arg)) {
      const temp = handleArgs(...arg);
      res.push(...temp);
    }
    // type is Object
    else if (isJson(arg)) {
      Object.keys(arg).reduce<string>((total, key)=>{
        arg[key] === true && res.push(key);
        return total;
      },'');
    }
  }
  return res;
}

/**
 * 从JSON对象中获取对应的类名，一般用于支持react的css module
 * @param obj JSON对象
 * @param classnames 类名数组
 * eg. obj = { 'bar': 'xxx' } ; classnames = ['bar']
 * return ['xxx'] 
 */
function map2string(obj: Object, classnames: string[], debug = false): string[]{
  if(isJson(obj)){
    const temp: string[] = [];
    for (const clsname of classnames) {
      // 如果clsname找到了
      if(!!obj[clsname]){
        temp.push(obj[clsname]);
      }
      // 如果没有找到
      // 调试模式下发出警告，classname没有找到
      else if(debug) {
        console.warn(`[classNames]: className ${clsname} is not found`);
      }
    }
    return temp;
  }
  return classnames;
}

// 默认提供的选项
let defaultOptions = {
  debug: false, // 调试模式，如果从JSON对象中找部到对应的classname，就会发起警报
  elementSep: '__', // bem中b与e之间的分割线
  modifierSep: '--', // bem中e与m之间的分割线
}

function bemClassNames(this: any, blockName?: string, options?: Partial<typeof defaultOptions>){
  // 提供默认选项
  options = {
    ...defaultOptions,
    ...options
  }
  blockName = blockName ?? '';

  /**
   * 生成react支持的类名形式
   * @param args css类名，支持string,数组,对象三种形式
   * @return {string} classname
   */
  function classNames(this: any, ...args: IArgs): string {
    let res: string[] = [];
    // 对参数的处理
    res.push(...handleArgs(...args));
    // 对this的处理
    return map2string(this, res, options.debug).join(' ');
  }

  /**
   * 使用BEM风格的classname
   * @param this 绑定的this对象
   * @param elementName BEM中的block-name__element-name
   * @param args BEM中的modifier类名，支持classNames的写法
   */
  function bem(this: any, elementName?: string, ...args: IArgs): string{
    // 提供默认选项
    elementName = elementName ?? '';
    // 处理前缀
    let prefixName:string = '';
    if(blockName !== '' && elementName === ''){
      prefixName = blockName;
    }else if(blockName === '' && elementName !== ''){
      prefixName = elementName;
    }else if(blockName !== '' && elementName !== ''){
      prefixName = `${blockName}${options.elementSep}${elementName}`;
    }else if(blockName === '' && elementName === ''){
      console.error('please input block-name or element-name');
    }
    let res: string[] = [ prefixName ];
    // 对参数的处理
    for (const mod of handleArgs(...args)) {
      res.push(`${prefixName}${options.modifierSep}${mod}`);
    }
    // 对this的处理
    return map2string(this, res, options.debug).join(' ');
  }

  return {
    classNames,
    bem
  } as const;
}

export default bemClassNames;

