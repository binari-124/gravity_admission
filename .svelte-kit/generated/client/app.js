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
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/about": [4],
		"/admission": [5],
		"/admission/bulk_upload": [7],
		"/admission/create": [8],
		"/admission/student_address/[slug]": [9],
		"/admission/student_batches/[slug]": [10],
		"/admission/student_delete/[slug]": [11],
		"/admission/student_disable/[slug]": [12],
		"/admission/student_edit/[slug]": [13],
		"/admission/student_fee/[slug]": [14],
		"/admission/[slug]": [6],
		"/dashboard": [15],
		"/forgot_password": [16],
		"/login": [17],
		"/reset_password": [18],
		"/students": [19],
		"/students/batches": [20],
		"/students/batches/[batches_info]": [21],
		"/sverdle": [~22],
		"/sverdle/how-to-play": [23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';