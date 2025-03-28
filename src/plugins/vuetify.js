// Styles
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";

const nitraTheme = {
  dark: false,
  colors: {
    // gray
    "gray-0": "#F4F5F6",
    "gray-50": "#EBEEEF",
    "gray-100": "#E3E6E8",
    "gray-200": "#D5DADC",
    "gray-300": "#C6CDD0",
    "gray-400": "#ABB5BA",
    "gray-500": "#8F9CA3",
    "gray-600": "#73838C",
    "gray-700": "#5C6970",
    "gray-800": "#454F54",
    "gray-900": "#2E3538",
    // teal
    "teal-0": "#EEF6F7",
    "teal-50": "#CBE5E6",
    "teal-100": "#A9D4D6",
    "teal-200": "#86C2C5",
    "teal-300": "#64B1B5",
    "teal-400": "#4A979B",
    "teal-500": "#3A7679",
    "teal-600": "#2E5E60",
    "teal-700": "#264D4F",
    "teal-800": "#1E3C3E",
    "teal-900": "#162B2D",
    //green
    "green-0": "#EAFBF4",
    "green-50": "#CCF5E4",
    "green-100": "#A1EDCD",
    "green-200": "#76E5B6",
    "green-300": "#4DDDA0",
    "green-400": "#1CD084",
    "green-500": "#15B471",
    "green-600": "#11925C",
    "green-700": "#0D7248",
    "green-800": "#095234",
    "green-900": "#063723",
    // yellow
    "yellow-0": "#FFFEF5",
    "yellow-50": "#FFFCE5",
    "yellow-100": "#FFF9CC",
    "yellow-200": "#FFF6B3",
    "yellow-300": "#FFF18A",
    "yellow-400": "#FFE624",
    "yellow-500": "#FADD00",
    "yellow-600": "#DEC60C",
    "yellow-700": "#B8A40A",
    "yellow-800": "#918108",
    "yellow-900": "#6A5F06",
    //amber
    "amber-0": "#FDF7ED",
    "amber-50": "#FBEEDA",
    "amber-100": "#F9E5C7",
    "amber-200": "#F6D4A2",
    "amber-300": "#F1BF74",
    "amber-400": "#ECAA46",
    "amber-500": "#E89519",
    "amber-600": "#C27D14",
    "amber-700": "#9D6510",
    "amber-800": "#7D500D",
    "amber-900": "#583809",
    //orange
    "orange-0": "#FFF2EB",
    "orange-50": "#FEE5D7",
    "orange-100": "#FED5BE",
    "orange-200": "#FDB48C",
    "orange-300": "#FC945A",
    "orange-400": "#FB7429",
    "orange-500": "#EB5704",
    "orange-600": "#C94A03",
    "orange-700": "#A13B02",
    "orange-800": "#792C02",
    "orange-900": "#501D01",
    // red
    "red-0": "#FDF1F1",
    "red-50": "#FCE4E4",
    "red-100": "#F6B7B7",
    "red-200": "#F08A8A",
    "red-300": "#EA5D5D",
    "red-400": "#E43030",
    "red-500": "#C71A1A",
    "red-600": "#991414",
    "red-700": "#831111",
    "red-800": "#6C0E0E",
    "red-900": "#480909",
  },
  variables: {
    "font-size-xss": "10px",
    "font-size-xs": "12px",
    "font-size-sm": "14px",
    "font-size-md": "16px",
    "font-size-lg": "18px",
    "font-size-xl": "20px",
    "font-size-2xl": "24px",
    "font-size-3xl": "32px",
    "font-size-4xl": "36px",
    "font-size-5xl": "48px",
    "font-size-6xl": "60px",
    "font-size-7xl": "72px",
    "font-size-8xl": "96px",
    "font-size-9xl": "128px",
    "container-max-width-xs": "480px",
    "container-max-width-sm": "768px",
    "container-max-width-md": "1024px",
    "container-max-width-lg": "1280px",
    "container-max-width-xl": "1440px",
  },
};

//100, 300, 400, 500, 700, 900
// thin, light, regular, medium, bold, black
export default createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: "nitraTheme",
    themes: {
      nitraTheme,
    },
  },
});
