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
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/about": [4],
		"/admission": [5],
		"/admission/bulk_upload": [6],
		"/admission/create": [7],
		"/admission/create/student_onboarding": [8],
		"/admission/create/student_onboarding/edit_student": [9],
		"/admission/create/student_onboarding/fee_management": [10],
		"/admission/edit": [11],
		"/login": [12],
		"/students": [13],
		"/students/batches": [14],
		"/students/batches/[batches_info]": [15],
		"/sverdle": [~16],
		"/sverdle/how-to-play": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';