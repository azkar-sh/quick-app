/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'main-background': '#333333',
				'primary-blue': '#2f80ed',
				'primary-dark-grey': '#4f4f4f',
				'primary-light-grey': '#828282',
				'primary-cream': '#e0e0e0',
				'indicator-light-yellow': '#f8b76b',
				'indicator-purple': '#8785ff',
				'indicator-red': '#eb5757',
				'indicator-yellow': '#f2c94c',
				'chat-yellow': '#fceed3',
				'chat-yellow-hover': '#e5a443',
				'chat-purple': '#eedcff',
				'chat-purple-hover': '#9b51e0',
				'chat-green': '#d2f2ea',
				'chat-green-hover': '#43B78D',
				'sticker-grey': '#e9f3ff',
				'sticker-orange': '#FDCFA4',
				'sticker-light-orange': '#F9E9C3',
				'sticker-blue': '#AFEBDB',
				'sticker-green': '#CBF1C2',
				'sticker-purple': '#CFCEF9',
				'sticker-light-purple': '#F9E0FD'
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2f80ed'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
