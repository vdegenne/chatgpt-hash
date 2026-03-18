import {config, nodeResolve, terser, typescript} from '@vdegenne/rollup'

export default config([
	{
		input: './src/content.ts',
		output: {file: './content.js', format: 'es'},
		plugins: [nodeResolve(), typescript(), terser({format: {comments: false}})],
	},
	{
		input: './src/background.ts',
		output: {file: './background.js', format: 'es'},
		plugins: [nodeResolve(), typescript(), terser({format: {comments: false}})],
	},
])
