module.exports = {
	darkMode: 'class',
	content: [],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('tailwindcss-animatecss')({
			classes: [
				'animate__animated',
				'animate__faster',
				'animate__slideOutDown',
				'animate__slideInUp',
			],
		}),
	],
}
