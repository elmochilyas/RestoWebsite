import type { FlavorItem } from '../types/content';

export const flavorShowcaseSection = {
  eyebrow: 'Nos 5 Saveurs',
  title: ['Choisissez', 'Votre Feu.'],
} as const;

export const flavorItems: FlavorItem[] = [
  {
    id: 'very-spicy',
    name: 'Very Spicy',
    tagline: 'Intense & Ardent',
    theme: {
      accent: '#EF4444',
      bgGradient: 'from-[#991B1B] via-[#7F1D1D] to-[#450A0A]',
      borderColor: 'border-red-400/30',
      borderHoverColor: 'hover:border-red-300/60',
      glowColor: 'rgba(239, 68, 68, 0.45)',
      shadowClass: 'hover:shadow-[0_16px_36px_rgba(185,28,28,0.4)]',
      taglineColor: 'text-red-100',
    },
    image: '/flavors/very-spicy.png',
    imageAlt: 'Piment très piquant aux flammes ardentes',
  },
  {
    id: 'medium-spicy',
    name: 'Medium Spicy',
    tagline: 'Épicé & Équilibré',
    theme: {
      accent: '#F97316',
      bgGradient: 'from-[#C2410C] via-[#9A3412] to-[#602008]',
      borderColor: 'border-orange-400/30',
      borderHoverColor: 'hover:border-orange-300/60',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      shadowClass: 'hover:shadow-[0_16px_36px_rgba(217,79,4,0.4)]',
      taglineColor: 'text-orange-100',
    },
    image: '/flavors/medium-spicy.png',
    imageAlt: 'Piment moyennement épicé et flammes douces',
  },
  {
    id: 'mango',
    name: 'Mango',
    tagline: 'Doux & Fruité',
    theme: {
      accent: '#F59E0B',
      bgGradient: 'from-[#D97706] via-[#B45309] to-[#713F12]',
      borderColor: 'border-amber-300/35',
      borderHoverColor: 'hover:border-amber-200/70',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      shadowClass: 'hover:shadow-[0_16px_36px_rgba(217,119,6,0.4)]',
      taglineColor: 'text-amber-100',
    },
    image: '/flavors/mango.png',
    imageAlt: 'Mangue tropicale mûre et dés de mangue juteux',
  },
  {
    id: 'barbecue',
    name: 'Barbecue',
    tagline: 'Fumé & Gourmand',
    theme: {
      accent: '#EAB308',
      bgGradient: 'from-[#B8860B] via-[#946200] to-[#593902]',
      borderColor: 'border-yellow-400/35',
      borderHoverColor: 'hover:border-yellow-200/70',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      shadowClass: 'hover:shadow-[0_16px_36px_rgba(184,134,11,0.4)]',
      taglineColor: 'text-yellow-100',
    },
    image: '/flavors/barbecue.png',
    imageAlt: 'Poulet grillé à la sauce barbecue fumée',
  },
  {
    id: 'lemon-lime',
    name: 'Lemon & Lime',
    tagline: 'Frais & Acidulé',
    theme: {
      accent: '#84CC16',
      bgGradient: 'from-[#4D7C0F] via-[#3F6212] to-[#1E300B]',
      borderColor: 'border-lime-400/35',
      borderHoverColor: 'hover:border-lime-200/70',
      glowColor: 'rgba(132, 204, 22, 0.45)',
      shadowClass: 'hover:shadow-[0_16px_36px_rgba(77,124,15,0.4)]',
      taglineColor: 'text-lime-100',
    },
    image: '/flavors/lemon-lime.png',
    imageAlt: 'Citrons jaunes et verts frais avec éclats de jus',
  },
];
