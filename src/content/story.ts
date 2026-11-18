/**
 * Brand story — paraphrased from the documented brand narrative in
 * docs/01-research-and-content.md (peri-peri roots in Southern Africa,
 * African Bird's Eye chilli, Portuguese influence, flame grilling, fresh
 * chicken, choose-your-heat). No invented dates, founders, recipes, or
 * preparation claims.
 */
export const storyContent = {
  eyebrow: 'Notre histoire',
  titleLines: [
    { text: 'Tout commence' },
    { text: 'par la flamme.', accent: true },
  ] as { text: string; accent?: boolean }[],
  beats: [
    {
      id: 'roots',
      title: 'Des racines qui ont du caractère.',
      body: 'Notre inspiration vient d’Afrique australe, berceau du péri-péri. Au cœur de cette histoire : le petit piment African Bird’s Eye et sa chaleur singulière.',
    },
    {
      id: 'fire',
      title: 'Le feu, notre signature.',
      body: 'Du poulet frais, une flamme vive et ce goût de braisé qui fait toute la différence. Ici, le grill donne le ton à chaque bouchée.',
    },
    {
      id: 'heat',
      title: 'Votre envie. Votre intensité.',
      body: 'Tout en douceur ou franchement pimenté : choisissez votre chaleur. Le caractère péri-péri, lui, est toujours au rendez-vous.',
    },
  ],
  statement: 'Du feu. Du goût. Du partage.',
} as const
