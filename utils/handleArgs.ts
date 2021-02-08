import { isJson } from '.';
import { IArgs } from '..';

/**
 * 处理参数
 * @param args css类名，支持string,数组,对象三种形式
 */
function handleArgs(...args: IArgs): string[] {
	const res: string[] = [];
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
			Object.keys(arg).reduce<string>((total, key) => {
				arg[key] === true && res.push(key);
				return total;
			}, '');
		}
	}
	return res;
}

export default handleArgs;
