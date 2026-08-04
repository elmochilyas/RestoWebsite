/**
 * media:optimize — one-off dev tool.
 *
 * Converts the temporary AI-generated PNG assets into production-friendly
 * WebP at editorial sizes. Safe to re-run (idempotent) and never upscales.
 *
 * The originals are intentionally kept: they are design stand-ins until the
 * owner supplies approved restaurant photography, at which point these outputs
 * should be regenerated from the real photos.
 *
 * Run with: npm run media:optimize
 */
import sharp from 'sharp'

const jobs = [
  {
    input: 'src/assets/restaurant/hero/hero-grilled-chicken.png',
    output: 'src/assets/restaurant/hero/hero-grilled-chicken.webp',
    width: 1600,
  },
  {
    input: 'src/assets/restaurant/atmosphere/grill-flames.png',
    output: 'src/assets/restaurant/atmosphere/grill-flames.webp',
    width: 1400,
  },
  {
    input: 'src/assets/dishes/chicken-rice.png',
    output: 'src/assets/dishes/chicken-rice.webp',
    width: 1200,
  },
  {
    input: 'src/assets/dishes/chicken-wrap.png',
    output: 'src/assets/dishes/chicken-wrap.webp',
    width: 1200,
  },
  {
    input: 'src/assets/dishes/peri-peri-wings.png',
    output: 'src/assets/dishes/peri-peri-wings.webp',
    width: 1200,
  },
  {
    input: 'src/assets/dishes/feast-platter.png',
    output: 'src/assets/dishes/feast-platter.webp',
    width: 1200,
  },
  {
    input: 'src/assets/restaurant/heat-levels/douce.png',
    output: 'src/assets/restaurant/heat-levels/douce.webp',
    width: 1200,
  },
  {
    input: 'src/assets/restaurant/heat-levels/moyenne.png',
    output: 'src/assets/restaurant/heat-levels/moyenne.webp',
    width: 1200,
  },
  {
    input: 'src/assets/restaurant/heat-levels/forte.png',
    output: 'src/assets/restaurant/heat-levels/forte.webp',
    width: 1200,
  },
  {
    input: 'src/assets/restaurant/heat-levels/tres-forte.png',
    output: 'src/assets/restaurant/heat-levels/tres-forte.webp',
    width: 1200,
  },
  {
    input: 'src/assets/restaurant/gallery/grill-flames-chicken.png',
    output: 'src/assets/restaurant/gallery/grill-flames-chicken.webp',
    width: 1400,
  },
  {
    input: 'src/assets/restaurant/gallery/shared-table.png',
    output: 'src/assets/restaurant/gallery/shared-table.webp',
    width: 1400,
  },
  {
    input: 'src/assets/restaurant/gallery/charred-chicken-closeup.png',
    output: 'src/assets/restaurant/gallery/charred-chicken-closeup.webp',
    width: 1150,
  },
  {
    input: 'src/assets/restaurant/gallery/peri-peri-sauces.png',
    output: 'src/assets/restaurant/gallery/peri-peri-sauces.webp',
    width: 1150,
  },
  {
    input: 'src/assets/restaurant/gallery/chef-grilling-chicken.png',
    output: 'src/assets/restaurant/gallery/chef-grilling-chicken.webp',
    width: 1050,
  },
  {
    input: 'src/assets/restaurant/gallery/restaurant-atmosphere.png',
    output: 'src/assets/restaurant/gallery/restaurant-atmosphere.webp',
    width: 1050,
  },
]

for (const job of jobs) {
  await sharp(job.input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(job.output)
  console.log('optimized:', job.output)
}
