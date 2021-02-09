/**
 * Determine if obj is an json object
 * 判断obj是否为JSON对象
 * @param { any } obj
 */
function isJson(obj: any): boolean {
	// 依据
	// 1.类型是Object
	// 2.obj的原型链指向Object
	if (
		typeof obj == 'object' &&
		Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
	) {
		return true;
	}
	return false;
}

export default isJson;
