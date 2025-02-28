import {nodeResolve} from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

/** @type {import('rollup').RollupOptions} */
export default {
	input: './src/content.ts',
	output: {file: './content.js', format: 'es'},
	plugins: [
		nodeResolve(),
		ts(),
		terser({
			format: {comments: false},
		}),
	],
};
