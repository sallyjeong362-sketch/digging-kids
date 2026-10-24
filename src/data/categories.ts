import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'animals', name: '동물', emoji: '🐾', tint: '#ffeac2', tintDark: '#3a2e18' },
  { id: 'dinosaurs', name: '공룡', emoji: '🦕', tint: '#d8f5da', tintDark: '#1d3321' },
  { id: 'space', name: '우주', emoji: '🚀', tint: '#e3dffb', tintDark: '#241f3d' },
  { id: 'ocean', name: '바다', emoji: '🌊', tint: '#d7f0fa', tintDark: '#15303a' },
  { id: 'food', name: '음식', emoji: '🍎', tint: '#ffe0d6', tintDark: '#3a2219' },
  { id: 'vehicles', name: '탈것', emoji: '🚗', tint: '#dcebff', tintDark: '#192a3d' },
  { id: 'art', name: '미술·색깔', emoji: '🎨', tint: '#fbdcee', tintDark: '#371f2e' },
  { id: 'weather', name: '날씨·자연', emoji: '🌦️', tint: '#dff3e3', tintDark: '#1c2e21' },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
