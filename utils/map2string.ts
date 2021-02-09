import { isJson } from '.';

/**
 * Get the corresponding value from the JSON object
 * 从JSON对象中获取相对应的值
 * @param obj JSON Object
 * @param classnames
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
			// 找到了
			if (!!obj[clsname]) {
				temp.push(obj[clsname]);
			}
			// 找不到
			// debug模式下，打印警告信息到控制台
			else if (debug) {
				console.warn(`[classNames]: className ${clsname} is not found`);
			}
		}
		return temp;
	}
	return classnames;
}
export default map2string;
