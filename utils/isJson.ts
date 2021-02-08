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

export default isJson;
