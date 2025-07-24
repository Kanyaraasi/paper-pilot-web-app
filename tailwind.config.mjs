/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        extraLightBlue: "#E3F2FD",
        DarkBlue: "#1965C9",
        lightBlue: "#E6F1FF",
        pageWrapperBg: "#F7F7F7",
        selected: "#1965C9",
        selectedShade: "#D5E7FF",
        borderGray: "#E5E5E5",
        backGround: "#ffffff",
        offWhite: "#eff3f6",
        extraLightGray: "#dee2e6",
        lightGray: "#ced4da",
        gray: "#767676",
        subHeading: "#343a40",
        heading: "#212529",
        primary: "#1C1D1F",
        secondary: "#d2cfcf",
        tertiary: "#fc3737",
        error: "#FF2C2C",
        success: "#1FA961",
        info: "#1965C9",
        warning: "#ffcc00",
      },
    },
  },
  plugins: [],
};
export default config;
