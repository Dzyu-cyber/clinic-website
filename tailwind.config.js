/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                medical: '#2563eb',
                medicalDark: '#1d4ed8',
                lightGray: '#f3f4f6',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Open Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
