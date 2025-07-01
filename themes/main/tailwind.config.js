/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.htm",
        "./partials/**/*.htm",
        "./layouts/*.htm",
        "./assets/**/*.vue",
        "./assets/components/*.vue",
    ],
    theme: {
        screens: {
            'xs': '420px',
            // => @media (min-width: 320px) { ... }

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }

            '3xl': '1750px',
            // => @media (min-width: 1750px) { ... }
        },
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1rem',
                    lg: '2rem',
                }
            },
        },

    },
    extend: {},
    plugins: [],
};
