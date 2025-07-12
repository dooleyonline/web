import {
  Funnel_Display,
  Geist,
  Geist_Mono,
  MuseoModerno,
} from "next/font/google";

const sans = Geist({
  variable: "--font-sans",
  weight: "variable",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  weight: "variable",
  subsets: ["latin"],
});

const display = Funnel_Display({
  variable: "--font-display",
  weight: "variable",
  subsets: ["latin"],
});

const logo = MuseoModerno({
  variable: "--font-logo",
  weight: "500",
  subsets: ["latin"],
});

export const fonts = {
  sans,
  mono,
  display,
  logo,
};
