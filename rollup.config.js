import { terser } from 'rollup-plugin-terser';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function bundle (output)
{
	return {

		input : './src/log2stream.js',

		plugins :
		[
			terser()
		],

		external :
		[
			'stream'
		],

		output
	};
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default
[
	bundle({
		file : 'log2stream.js',
		format : 'esm'
	}),

	bundle({
		file : 'log2stream.cjs',
		format : 'cjs',
		exports : 'named'
	})
];
