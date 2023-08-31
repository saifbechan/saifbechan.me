import { Bungee_Outline, Inconsolata, Jura } from 'next/font/google';

export const jura = Jura({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jura',
});

export const bungeeOutline = Bungee_Outline({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bungee-outline',
  weight: '400',
});

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});
