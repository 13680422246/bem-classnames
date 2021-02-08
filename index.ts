import defaultOptions from './config';
import { handleArgs, map2string } from './utils';
export type IClassname =
	| string
	| {
			[classname: string]: boolean;
	  };

export type IArgs = (IClassname | IClassname[])[];
export type IBemOptions = Partial<typeof defaultOptions>;

function bemClassNames(this: any, blockName?: string, options?: IBemOptions) {
	// 提供默认选项
	options = {
		...defaultOptions,
		...options,
	};
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
		return map2string(this, res, options?.debug).join(' ');
	}

	/**
	 * 使用BEM风格的classname
	 * @param this 绑定的this对象
	 * @param elementName BEM中的block-name__element-name
	 * @param args BEM中的modifier类名，支持classNames的写法
	 */
	function bem(this: any, elementName?: string, ...args: IArgs): string {
		// 提供默认选项
		elementName = elementName ?? '';
		// 处理前缀
		let prefixName: string = '';
		if (blockName !== undefined && blockName !== '' && elementName === '') {
			prefixName = blockName;
		} else if (blockName === '' && elementName !== '') {
			prefixName = elementName;
		} else if (blockName !== '' && elementName !== '') {
			prefixName = `${blockName}${options?.elementSep}${elementName}`;
		} else if (blockName === '' && elementName === '') {
			console.error('please input block-name or element-name');
		}
		let res: string[] = [prefixName];
		// 对参数的处理
		for (const mod of handleArgs(...args)) {
			res.push(`${prefixName}${options?.modifierSep}${mod}`);
		}
		// 对this的处理
		return map2string(this, res, options?.debug).join(' ');
	}

	return {
		classNames,
		bem,
	} as const;
}

export default bemClassNames;
