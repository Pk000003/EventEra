/** @type {import('tailwindcss').Config} */

export default {

    darkMode: "class",

    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {

        extend: {

            colors: {

                gold: "#F5C542"

            },

            boxShadow: {

                premium:
                "0 20px 50px rgba(0,0,0,0.25)"

            }

        },

    },

    plugins: [],

};