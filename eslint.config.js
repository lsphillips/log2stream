import protectMeFromMyStupidity             from 'eslint-config-protect-me-from-my-stupidity';
import andFromWritingStupidNodeApplications from 'eslint-config-protect-me-from-my-stupidity/and/from-writing-stupid-node-applications';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default [
	{
		ignores : ['log2stream.js', 'log2stream.cjs']
	},
	...protectMeFromMyStupidity(),
	...andFromWritingStupidNodeApplications()
];
