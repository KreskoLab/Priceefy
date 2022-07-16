module.exports = {
	darkMode: 'class',
	content: [],
	theme: {
		extend: {},
	},
	variants: {
		scrollbar: ['dark', 'rounded'],
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('tailwind-scrollbar'),
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
