import { isJson } from '.';

/**
 * 从JSON对象中获取对应的类名，一般用于支持react的css module
 * @param obj JSON对象
 * @param classnames 类名数组
 * eg. obj = { 'bar': 'xxx' } ; classnames = ['bar']
 * return ['xxx']
 */
function map2string(
	obj: {
		[cls: string]: any;
	},
	classnames: string[],
	debug = false
): string[] {
	if (isJson(obj)) {
		const temp: string[] = [];
		for (const clsname of classnames) {
			// 如果clsname找到了
			if (!!obj[clsname]) {
				temp.push(obj[clsname]);
			}
			// 如果没有找到
			// 调试模式下发出警告，classname没有找到
			else if (debug) {
				console.warn(`[classNames]: className ${clsname} is not found`);
			}
		}
		return temp;
	}
	return classnames;
}
export default map2string;
