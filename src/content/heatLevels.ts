import type { HeatLevel } from '../types/content'

/**
 * Neutral temporary heat-level labels — NOT official Peri Peri Grill sauce
 * names. The restaurant's real heat-level naming is not documented yet.
 * Replace these labels freely; the HeatSelector component does not depend on
 * the wording.
 */
export const heatLevels: HeatLevel[] = [
  { id: 'douce', label: 'Douce' },
  { id: 'moyenne', label: 'Moyenne' },
  { id: 'forte', label: 'Forte' },
  { id: 'tres-forte', label: 'Très forte' },
]

export const heatSection = {
  eyebrow: 'Choose your fire',
  title: ['How hot', 'Do you go?'],
} as const
