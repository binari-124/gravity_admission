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
	() => import('./nodes/90'),
	() => import('./nodes/91'),
	() => import('./nodes/92'),
	() => import('./nodes/93'),
	() => import('./nodes/94'),
	() => import('./nodes/95'),
	() => import('./nodes/96'),
	() => import('./nodes/97'),
	() => import('./nodes/98'),
	() => import('./nodes/99'),
	() => import('./nodes/100'),
	() => import('./nodes/101'),
	() => import('./nodes/102'),
	() => import('./nodes/103'),
	() => import('./nodes/104'),
	() => import('./nodes/105'),
	() => import('./nodes/106'),
	() => import('./nodes/107')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/about": [4],
		"/academic_files": [5],
		"/academic_files/create": [6],
		"/batches": [7],
		"/batches/create": [9],
		"/batches/edit/[slug]": [10],
		"/batches/results/[slug]": [11],
		"/batches/[slug]": [8],
		"/branch": [12],
		"/branch/create": [14],
		"/branch/edit/[slug]": [15],
		"/branch/[slug]": [13],
		"/chapters": [16],
		"/chapters/create": [18],
		"/chapters/edit/[slug]": [19],
		"/chapters/topics/create/[slug]": [20],
		"/chapters/topics/edit/[slug]": [21],
		"/chapters/topics/subtopics/create/[slug]": [22],
		"/chapters/topics/subtopics/edit/[slug]": [23],
		"/chapters/[slug]": [17],
		"/comprehensions": [24],
		"/comprehensions/create": [26],
		"/comprehensions/edit/[slug]": [27],
		"/comprehensions/[slug]": [25],
		"/create_staff": [28],
		"/dashboard": [29],
		"/exams": [30],
		"/exams/create": [32],
		"/exams/edit/[slug]": [33],
		"/exams/[slug]": [31],
		"/faculties": [34],
		"/faculties/create": [36],
		"/faculties/edit/[slug]": [37],
		"/faculties/[slug]": [35],
		"/files": [38],
		"/files/[slug]": [39],
		"/forgot_password": [40],
		"/instructions": [41],
		"/instructions/create": [43],
		"/instructions/edit/[slug]": [44],
		"/instructions/[slug]": [42],
		"/lectures": [45],
		"/lectures/create": [47],
		"/lectures/edit/[slug]": [48],
		"/lectures/[slug]": [46],
		"/login": [49],
		"/marking_schemes": [50],
		"/marking_schemes/create": [52],
		"/marking_schemes/edit/[slug]": [53],
		"/marking_schemes/[slug]": [51],
		"/module_chapters": [54],
		"/module_chapters/create": [56],
		"/module_chapters/edit/[slug]": [57],
		"/module_chapters/[slug]": [55],
		"/modules": [58],
		"/modules/create": [60],
		"/modules/edit/[slug]": [61],
		"/modules/[slug]": [59],
		"/packages": [62],
		"/packages/create": [63],
		"/packages/edit/[slug]": [64],
		"/questions": [65],
		"/questions/create/comprehension": [66],
		"/questions/create/fib_range": [68],
		"/questions/create/fib": [67],
		"/questions/create/int": [69],
		"/questions/create/matrix": [70],
		"/questions/create/mcq": [71],
		"/questions/create/scq": [72],
		"/questions/edit/[slug]": [73],
		"/reset_password": [74],
		"/results": [75],
		"/results/result/[slug]": [76],
		"/staff": [77],
		"/staff/edit/[slug]": [78],
		"/stream": [79],
		"/stream/create": [81],
		"/stream/edit/[slug]": [82],
		"/stream/[slug]": [80],
		"/students": [83],
		"/students/bulk_upload": [85],
		"/students/create": [86],
		"/students/student_address/[slug]": [87],
		"/students/student_batches/[slug]": [88],
		"/students/student_delete/[slug]": [89],
		"/students/student_disable/[slug]": [90],
		"/students/student_edit/[slug]": [91],
		"/students/student_fee/[slug]": [92],
		"/students/[slug]": [84],
		"/subjects": [93],
		"/subjects/create": [95],
		"/subjects/edit/[slug]": [96],
		"/subjects/[slug]": [94],
		"/sverdle": [~97],
		"/sverdle/how-to-play": [98],
		"/tests": [99],
		"/tests/batches": [100],
		"/tests/batches/[batches_info]": [101],
		"/tests/create": [102],
		"/tests/create/general": [103],
		"/tests/edit": [104],
		"/tests/edit/general/[slug]": [105],
		"/tests/edit/simple/[slug]": [106],
		"/tests/result/[slug]": [107]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';