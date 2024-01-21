/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        extend: {
            colors: {
                'pocket-track': {
                    '50': '#edf0ff',
                    '100': '#dfe3ff',
                    '200': '#c5ccff',
                    '300': '#a1a9ff',
                    '400': '#7c7cfd',
                    '500': '#695ef7',
                    '600': '#593fec',
                    '700': '#4d32d0',
                    '800': '#3f2ba8',
                    '900': '#362b84',
                    '950': '#21194d',
                },
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}

