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
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42'),
	() => import('./nodes/43'),
	() => import('./nodes/44'),
	() => import('./nodes/45'),
	() => import('./nodes/46'),
	() => import('./nodes/47'),
	() => import('./nodes/48'),
	() => import('./nodes/49'),
	() => import('./nodes/50'),
	() => import('./nodes/51'),
	() => import('./nodes/52'),
	() => import('./nodes/53'),
	() => import('./nodes/54'),
	() => import('./nodes/55'),
	() => import('./nodes/56'),
	() => import('./nodes/57'),
	() => import('./nodes/58'),
	() => import('./nodes/59'),
	() => import('./nodes/60'),
	() => import('./nodes/61'),
	() => import('./nodes/62'),
	() => import('./nodes/63'),
	() => import('./nodes/64'),
	() => import('./nodes/65'),
	() => import('./nodes/66'),
	() => import('./nodes/67'),
	() => import('./nodes/68'),
	() => import('./nodes/69'),
	() => import('./nodes/70'),
	() => import('./nodes/71'),
	() => import('./nodes/72'),
	() => import('./nodes/73'),
	() => import('./nodes/74'),
	() => import('./nodes/75'),
	() => import('./nodes/76'),
	() => import('./nodes/77'),
	() => import('./nodes/78'),
	() => import('./nodes/79'),
	() => import('./nodes/80'),
	() => import('./nodes/81'),
	() => import('./nodes/82'),
	() => import('./nodes/83'),
	() => import('./nodes/84'),
	() => import('./nodes/85'),
	() => import('./nodes/86'),
	() => import('./nodes/87'),
	() => import('./nodes/88'),
	() => import('./nodes/89'),
	() => import('./nodes/90')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/about": [4],
		"/academic_files": [5],
		"/academic_files/create": [6],
		"/batches": [7],
		"/batches/create": [9],
		"/batches/[slug]": [8],
		"/branch": [10],
		"/branch/create": [12],
		"/branch/[slug]": [11],
		"/chapters": [13],
		"/chapters/create": [15],
		"/chapters/edit/[slug]": [16],
		"/chapters/topics/create/[slug]": [17],
		"/chapters/topics/edit/[slug]": [18],
		"/chapters/topics/subtopics/create/[slug]": [19],
		"/chapters/topics/subtopics/edit/[slug]": [20],
		"/chapters/[slug]": [14],
		"/comprehensions": [21],
		"/comprehensions/create": [23],
		"/comprehensions/edit/[slug]": [24],
		"/comprehensions/[slug]": [22],
		"/create_staff": [25],
		"/dashboard": [26],
		"/exams": [27],
		"/exams/create": [29],
		"/exams/edit/[slug]": [30],
		"/exams/[slug]": [28],
		"/files": [31],
		"/files/[slug]": [32],
		"/forgot_password": [33],
		"/instructions": [34],
		"/instructions/create": [36],
		"/instructions/edit/[slug]": [37],
		"/instructions/[slug]": [35],
		"/lectures": [38],
		"/lectures/create": [40],
		"/lectures/[slug]": [39],
		"/login": [41],
		"/marking_schemes": [42],
		"/marking_schemes/create": [44],
		"/marking_schemes/[slug]": [43],
		"/module_chapters": [45],
		"/module_chapters/create": [47],
		"/module_chapters/edit/[slug]": [48],
		"/module_chapters/[slug]": [46],
		"/modules": [49],
		"/modules/create": [51],
		"/modules/[slug]": [50],
		"/packages": [52],
		"/packages/create": [53],
		"/packages/edit/[slug]": [54],
		"/questions": [55],
		"/questions/create/fib_range": [57],
		"/questions/create/fib": [56],
		"/questions/create/int": [58],
		"/questions/create/mcq": [59],
		"/questions/create/scq": [60],
		"/questions/edit/[slug]": [61],
		"/reset_password": [62],
		"/staff": [63],
		"/staff/edit/[slug]": [64],
		"/stream": [65],
		"/stream/create": [67],
		"/stream/[slug]": [66],
		"/students": [68],
		"/students/bulk_upload": [70],
		"/students/create": [71],
		"/students/student_address/[slug]": [72],
		"/students/student_batches/[slug]": [73],
		"/students/student_delete/[slug]": [74],
		"/students/student_disable/[slug]": [75],
		"/students/student_edit/[slug]": [76],
		"/students/student_fee/[slug]": [77],
		"/students/[slug]": [69],
		"/subjects": [78],
		"/subjects/create": [80],
		"/subjects/[slug]": [79],
		"/sverdle": [~81],
		"/sverdle/how-to-play": [82],
		"/tests": [83],
		"/tests/batches": [84],
		"/tests/batches/[batches_info]": [85],
		"/tests/create": [86],
		"/tests/create/general": [87],
		"/tests/edit": [88],
		"/tests/edit/general/[slug]": [89],
		"/tests/edit/simple/[slug]": [90]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';