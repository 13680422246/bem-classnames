import bemClassNames from '../index';
import { IBemOptions } from '..';

function generateBemClassNames(options: IBemOptions) {
	return function classnames(blockname: string) {
		return bemClassNames(blockname, options);
	};
}

export default generateBemClassNames;
