/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0.05em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
    screens: {
      sm: "640px", // was 640px
      md: "1000px", //was 768px
      lg: "1024px",
      xl: "1280px",
      xs: "400px",
    },
    // fontFamily: {
    //   display: ["Maven Pro", "sans-serif"],
    //   body: ["Maven Pro", "sans-serif"],
    // },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      4: "4px",
      6: "6px",
      8: "8px",
      10: "10px",
    },
    colors: {
      white: "#ffffff",
      greyBorder: "#D9D9D9",
      backgrd: "#F5F5F5",
      gradient: "rgb(134, 133, 133)",
      lightText: "A1A1A1",
      inputcolor: "#ECF0F3",
      grey: {
        default: "A1A1A1",
        light: "#909090",
        dark: "#868585",
        gradient: "rgba(134, 133, 133, 0.2)",
        darkblue: "rgba(29, 53, 72, 0.2)",
        darkBlueText: "rgba(29, 53, 72, 0.6)",
        faint: "rgba(134, 133, 133, 0.1)",
      },

      primary: {
        DEFAULT: "#D1643A",
        hover: "#25594F",
        pressed: "#073B31",
        disabled: "#75A99F",
      },

      secondary: {
        DEFAULT: "#1D3548",
        hover: "#FE625F",
        pressed: "#EA4E4B",
        disabled: "#FFB2AF",
      },

      tertiary: {
        DEFAULT: "#D9EBCD",
        hover: "#ddedd2",
        pressed: "#bfcfb4",
        disabled: "#ddedd2",
      },

      info: {
        DEFAULT: "#2F80ED",
        hover: "#448def",
        pressed: "#2971d1",
        disabled: "#90bbf2",
      },

      success: {
        // DEFAULT: "#219653",
        DEFAULT: "#61D13A",
        hover: "#169200",
        pressed: "#188006",
        disabled: "#D5FFCD",
      },

      warning: {
        DEFAULT: "#F39C36",
        hover: "#E69700",
        pressed: "#E67C00",
        disabled: "#FDD485",
      },

      error: {
        // DEFAULT: "#D32F2F",
        DEFAULT: "#C6121C",
        hover: "#D10606",
        pressed: "#C40606",
        disabled: "#FFD0D0",
        table: "#C92F02",
      },

      dark: {
        40: "#353535",
        50: "#E2E7EA",
        100: "#D9DDDF",
        200: "#CAD1D6",
        300: "#BEC4C8",
        400: "#ACADAD",
        500: "#A0A1A2",
        600: "#7A7C7C",
        700: "#666869",
        800: "#444444",
        900: "#231F1F",
      },
    },
    extend: {
      width: {
        "w-30": "30%",
        "w-9": "9%",
        "w-2": "2%",
        "w-5": "5%",
      },

      spacing: {
        90: "20rem",
        96: "24rem",
        98: "28rem",
        100: "30rem",
        128: "32rem",
        easispace: "11rem",
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["responsive", "last", "hover", "focus"],
    backgroundColor: [
      "responsive",
      "odd",
      "even",
      "hover",
      "focus",
      "group-hover",
    ],
    backgroundOpacity: ["responsive", "odd", "even", "hover", "focus"],
    padding: ["responsive"],
    textAlign: ["responsive", "first", "last"],
  },
  plugins: [],
};
