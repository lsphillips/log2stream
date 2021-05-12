import { terser } from 'rollup-plugin-terser';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default {

	plugins :
	[
		terser()
	],

	input : './src/log2stream.js',

	output :
	{
		file : 'log2stream.cjs',
		format : 'cjs',
		exports : 'named'
	},

	external :
	[
		'stream'
	]
};
