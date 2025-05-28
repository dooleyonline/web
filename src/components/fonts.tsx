import { Geist, Geist_Mono, MuseoModerno } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const museoModerno = MuseoModerno({
  variable: "--font-museomoderno",
  subsets: ["latin"],
});

export const fonts = {
  sans: geistSans,
  mono: geistMono,
  logo: museoModerno,
};