import bemClassNames from '../index';
import { IBemOptions } from '..';

const func = (bem: Function) => {
	return (el: HTMLElement, bind: any) => {
		const args = bind.value;
		if (args !== undefined) {
			if (Array.isArray(args)) {
				if (el.className === '') {
					el.className += bem(...args);
				} else {
					el.className += ` ${bem(...args)}`;
				}
			} else {
				console.error('[classNames]: arguments must be a array');
			}
		}
	};
};

function generateBemClassNames(options?: IBemOptions) {
	return function bemClassnames(blockname: string) {
		const { bem } = bemClassNames(blockname, options);
		const directive = {
			bind: func(bem),
			beforeMount: func(bem),
		};
		return directive;
	};
}
export default generateBemClassNames;
