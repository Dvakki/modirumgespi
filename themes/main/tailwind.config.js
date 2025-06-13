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
