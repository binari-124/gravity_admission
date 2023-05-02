export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/about": [4],
		"/admission": [5],
		"/admission/bulk_upload": [7],
		"/admission/create": [8],
		"/admission/edit": [9],
		"/admission/[slug]": [6],
		"/login": [10],
		"/students": [11],
		"/students/batches": [12],
		"/students/batches/[batches_info]": [13],
		"/sverdle": [~14],
		"/sverdle/how-to-play": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';