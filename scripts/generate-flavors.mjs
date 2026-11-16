import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const outputDir = path.resolve('public/flavors');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const SVGS = {
  'very-spicy': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="vsGlow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#ff3b20" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#d91e0a" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#800a00" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="chiliGrad1" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#ff442b"/>
      <stop offset="45%" stop-color="#e01a08"/>
      <stop offset="85%" stop-color="#990b00"/>
      <stop offset="100%" stop-color="#5a0500"/>
    </linearGradient>
    <linearGradient id="chiliGrad2" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#ff5938"/>
      <stop offset="50%" stop-color="#eb2a16"/>
      <stop offset="90%" stop-color="#aa0f00"/>
      <stop offset="100%" stop-color="#6e0800"/>
    </linearGradient>
    <linearGradient id="chiliGloss" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#84cc16"/>
      <stop offset="40%" stop-color="#4d7c0f"/>
      <stop offset="100%" stop-color="#1e3a05"/>
    </linearGradient>
    <linearGradient id="flameGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ff2200" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#ff8800" stop-opacity="0.95"/>
      <stop offset="85%" stop-color="#ffdd00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <circle cx="256" cy="270" r="210" fill="url(#vsGlow)" />

  <!-- Background Flames Dancing -->
  <g opacity="0.88">
    <path d="M210 320 C180 260 210 200 240 140 C250 180 270 190 280 150 C310 210 330 260 300 320 Z" fill="url(#flameGrad1)" filter="blur(3px)" />
    <path d="M260 300 C275 250 300 220 315 170 C325 210 340 220 350 190 C365 240 370 280 340 320 Z" fill="url(#flameGrad1)" opacity="0.7" filter="blur(2px)" />
  </g>

  <!-- Primary Chili -->
  <g filter="url(#shadowFilter)">
    <path d="M195 185 C185 140 170 115 140 100 C155 125 168 150 178 185 Z" fill="url(#stemGrad)" />
    <path d="M178 178 C185 168 200 170 205 185 C200 195 185 198 175 190 Z" fill="#365314" />
    <path d="M192 186 C240 200 270 260 270 330 C270 380 240 420 220 440 C215 445 208 435 210 425 C225 385 220 330 180 260 C155 215 165 190 192 186 Z" fill="url(#chiliGrad1)" />
    <path d="M188 198 C220 215 245 265 246 325 C246 360 230 395 218 415 C222 390 228 355 224 320 C220 270 198 225 178 205 Z" fill="url(#chiliGloss)" />
  </g>

  <!-- Secondary Chili -->
  <g filter="url(#shadowFilter)">
    <path d="M295 165 C320 130 345 110 375 95 C355 120 335 145 315 170 Z" fill="url(#stemGrad)" />
    <path d="M305 165 C315 158 328 165 325 178 C315 185 302 180 300 170 Z" fill="#365314" />
    <path d="M312 172 C330 220 330 280 295 350 C265 410 210 455 180 470 C175 472 178 460 185 450 C225 410 260 355 265 295 C270 245 250 200 230 180 C270 160 300 160 312 172 Z" fill="url(#chiliGrad2)" />
    <path d="M302 184 C315 225 315 275 288 335 C265 385 228 425 200 448 C220 420 250 375 260 330 C272 275 265 225 245 195 Z" fill="url(#chiliGloss)" opacity="0.85" />
  </g>

  <!-- Fiery Sparks & Seeds -->
  <g fill="#ffc107" opacity="0.95">
    <ellipse cx="280" cy="180" rx="4" ry="7" transform="rotate(25 280 180)" fill="#ffd54f" />
    <ellipse cx="160" cy="240" rx="3.5" ry="6" transform="rotate(-35 160 240)" fill="#ffe082" />
    <ellipse cx="260" cy="410" rx="4" ry="7" transform="rotate(45 260 410)" fill="#ffb300" />
    <circle cx="330" cy="220" r="3.5" fill="#ffffff" />
    <circle cx="170" cy="170" r="2.5" fill="#ffeb3b" />
    <circle cx="290" cy="130" r="3" fill="#ff9800" />
    <circle cx="210" cy="130" r="2" fill="#ff5722" />
  </g>
</svg>`,

  'medium-spicy': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="msGlow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#ff7a1a" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#d95000" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#732500" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="medChili" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#ff8820"/>
      <stop offset="35%" stop-color="#f0500a"/>
      <stop offset="75%" stop-color="#c43000"/>
      <stop offset="100%" stop-color="#801c00"/>
    </linearGradient>
    <linearGradient id="chiliInside" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffa040"/>
      <stop offset="50%" stop-color="#e04000"/>
      <stop offset="100%" stop-color="#991e00"/>
    </linearGradient>
    <linearGradient id="garlicGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#fdf4dc"/>
      <stop offset="80%" stop-color="#e2c892"/>
      <stop offset="100%" stop-color="#b89358"/>
    </linearGradient>
    <linearGradient id="herbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#84cc16"/>
      <stop offset="50%" stop-color="#4d7c0f"/>
      <stop offset="100%" stop-color="#14532d"/>
    </linearGradient>
    <filter id="medShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <circle cx="256" cy="270" r="210" fill="url(#msGlow)" />

  <g filter="url(#medShadow)">
    <!-- Roasted Garlic Bulb at bottom-left -->
    <g transform="translate(140, 290)">
      <path d="M40 90 C15 85 0 65 0 45 C0 20 25 5 45 0 C65 5 90 20 90 45 C90 65 75 85 50 90 Z" fill="url(#garlicGrad)" />
      <path d="M45 0 C30 25 25 55 35 88" stroke="#cca368" stroke-width="2.5" fill="none" opacity="0.6"/>
      <path d="M45 0 C60 25 65 55 55 88" stroke="#cca368" stroke-width="2.5" fill="none" opacity="0.6"/>
      <path d="M45 0 C47 -15 42 -25 38 -32" stroke="#8c6a38" stroke-width="4" stroke-linecap="round" fill="none"/>
    </g>

    <!-- Main Sliced Chili -->
    <path d="M305 130 C330 95 365 75 400 65 C380 90 355 115 330 140 Z" fill="#4d7c0f" />
    <path d="M315 132 C325 125 338 132 334 144 C325 150 312 146 310 137 Z" fill="#1e3a05" />

    <path d="M320 140 C360 200 365 280 320 360 C280 430 215 465 175 480 C170 482 172 470 178 460 C220 420 260 360 265 290 C270 230 240 180 220 160 C265 135 305 130 320 140 Z" fill="url(#medChili)" />
    <path d="M305 180 C325 230 325 295 285 365 C255 418 205 450 180 462 C205 435 245 385 255 325 C265 265 245 210 225 180 C255 165 288 165 305 180 Z" fill="url(#chiliInside)" />

    <!-- White Ribs & Seeds Inside -->
    <path d="M260 230 C270 270 260 320 230 380" stroke="#ffebc2" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.8" />
    <g fill="#ffe082">
      <ellipse cx="265" cy="250" rx="4.5" ry="7" transform="rotate(20 265 250)" />
      <ellipse cx="270" cy="285" rx="4.5" ry="7" transform="rotate(-15 270 285)" />
      <ellipse cx="255" cy="325" rx="4" ry="6.5" transform="rotate(35 255 325)" />
      <ellipse cx="240" cy="360" rx="4" ry="6.5" transform="rotate(-25 240 360)" />
      <ellipse cx="215" cy="400" rx="3.5" ry="6" transform="rotate(40 215 400)" />
    </g>

    <path d="M310 155 C335 200 340 265 305 330 C285 370 250 405 225 430 C250 395 280 345 288 290 C295 235 280 185 260 160 Z" fill="#ffffff" opacity="0.4" />
  </g>

  <!-- Green Aromatic Herb Leaf -->
  <g transform="translate(290, 360) rotate(25)" filter="url(#medShadow)">
    <path d="M0 0 C25 -20 60 -15 75 10 C60 25 25 30 0 0 Z" fill="url(#herbGrad)" />
    <path d="M0 0 Q40 -2 75 10" stroke="#84cc16" stroke-width="2" fill="none" opacity="0.7"/>
  </g>

  <!-- Warm Floating Embers -->
  <g fill="#ffb74d">
    <circle cx="160" cy="210" r="3" opacity="0.8" />
    <circle cx="340" cy="190" r="3.5" opacity="0.9" />
    <circle cx="380" cy="280" r="2.5" opacity="0.7" />
    <circle cx="210" cy="150" r="2" opacity="0.85" />
  </g>
</svg>`,

  'mango': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="mgGlow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#d97706" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#78350f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mangoSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="35%" stop-color="#f97316"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#84cc16"/>
    </linearGradient>
    <linearGradient id="mangoFleshGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="35%" stop-color="#fde047"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="sliceSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="50%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="mgShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <circle cx="256" cy="270" r="210" fill="url(#mgGlow)" />

  <g filter="url(#mgShadow)">
    <!-- Back Mango Cheek (Whole Fruit Silhouette) -->
    <path d="M150 250 C130 160 200 90 290 85 C370 80 430 140 435 220 C440 310 370 380 290 390 C200 400 160 330 150 250 Z" fill="url(#mangoSkinGrad)" />
    <!-- Glossy Highlight on whole fruit -->
    <path d="M190 140 C240 105 310 100 360 125 C320 115 250 120 200 155 Z" fill="#ffffff" opacity="0.4"/>

    <!-- Front Cut Mango Slice (Plump, Juicy Curved Wedge) -->
    <g transform="translate(110, 190) rotate(-10)">
      <!-- Skin Edge -->
      <path d="M30 170 C10 110 35 40 110 10 C180 -15 245 10 270 60 C250 110 200 170 120 190 C60 200 35 185 30 170 Z" fill="url(#sliceSkin)" />
      <!-- Juicy Cut Flesh -->
      <path d="M45 160 C30 110 50 48 115 22 C175 0 230 20 255 65 C230 105 185 160 115 178 C65 185 48 172 45 160 Z" fill="url(#mangoFleshGrad)" />

      <!-- Natural Mango Flesh Fiber & Juicy Segments -->
      <path d="M115 22 C150 70 170 115 175 160" stroke="#fef08a" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.65"/>
      <path d="M80 50 C110 95 130 135 135 170" stroke="#fef08a" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.55"/>
      <path d="M170 30 C190 75 205 110 215 145" stroke="#fef08a" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.55"/>

      <!-- Glossy Juicy Reflection -->
      <path d="M65 120 C55 80 75 45 115 30 C100 45 80 80 85 125 Z" fill="#ffffff" opacity="0.55"/>
    </g>

    <!-- Red Chili Horn Accent (Sweet Heat Fusion!) -->
    <g transform="translate(320, 240) rotate(28)">
      <path d="M0 0 C30 10 55 40 50 75 C45 95 30 115 15 130 C20 110 28 90 22 70 C15 45 5 20 0 0 Z" fill="#dc2626" />
      <path d="M0 0 C-6 -15 2 -25 12 -30 C10 -18 8 -10 0 0 Z" fill="#4d7c0f" />
      <path d="M6 30 C18 45 22 75 18 100" stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.6"/>
    </g>

    <!-- Lush Tropical Leaf -->
    <g transform="translate(260, 65) rotate(45)">
      <path d="M0 0 C35 -50 95 -45 120 5 C95 40 35 45 0 0 Z" fill="#365314" />
      <path d="M0 0 C30 -40 85 -35 105 5 C85 30 30 35 0 0 Z" fill="#4d7c0f" />
      <path d="M0 0 Q60 -10 105 5" stroke="#84cc16" stroke-width="2.5" fill="none"/>
    </g>
  </g>

  <!-- Sweet Golden Drops -->
  <g fill="#fde047" opacity="0.9">
    <ellipse cx="140" cy="380" rx="4.5" ry="7" transform="rotate(-30 140 380)" fill="#fef08a"/>
    <ellipse cx="280" cy="410" rx="5" ry="8" transform="rotate(20 280 410)" fill="#f59e0b"/>
    <circle cx="390" cy="200" r="3.5" fill="#ffffff"/>
  </g>
</svg>`,

  'barbecue': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bbqGlow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#b45309" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#78350f" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#451a03" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ramekinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#382014"/>
      <stop offset="40%" stop-color="#24140b"/>
      <stop offset="100%" stop-color="#140a05"/>
    </linearGradient>
    <linearGradient id="sauceGlossy" x1="15%" y1="0%" x2="85%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="25%" stop-color="#b45309"/>
      <stop offset="60%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#3c1303"/>
    </linearGradient>
    <linearGradient id="sauceHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="brushWood" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#d7a15c"/>
      <stop offset="50%" stop-color="#9a652c"/>
      <stop offset="100%" stop-color="#54320e"/>
    </linearGradient>
    <filter id="bbqShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#000000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <circle cx="256" cy="270" r="210" fill="url(#bbqGlow)" />

  <!-- Woodsmoke Wisps -->
  <g stroke="#ffffff" stroke-linecap="round" fill="none" opacity="0.3">
    <path d="M210 170 C190 120 225 90 205 50" stroke-width="5"/>
    <path d="M265 155 C290 110 260 80 280 40" stroke-width="6"/>
    <path d="M315 175 C335 130 315 95 335 60" stroke-width="4.5"/>
  </g>

  <g filter="url(#bbqShadow)">
    <!-- Rustic Ceramic Ramekin / Glaze Dish -->
    <ellipse cx="256" cy="330" rx="145" ry="90" fill="url(#ramekinGrad)" stroke="#522b17" stroke-width="3"/>
    <!-- Inner Sauce Well -->
    <ellipse cx="256" cy="325" rx="130" ry="75" fill="url(#sauceGlossy)" />

    <!-- Rich Viscous BBQ Sauce Swirls -->
    <path d="M160 320 C180 270 270 265 330 295 C370 315 365 350 320 370 C260 395 180 375 160 320 Z" fill="#2d0c02" opacity="0.6"/>
    <path d="M185 315 C215 280 285 280 335 305 C365 320 360 345 325 360 C275 380 200 360 185 315 Z" fill="url(#sauceGlossy)" />

    <!-- Mirror-Gloss Reflection on Sauce Surface -->
    <path d="M180 290 C220 265 295 265 345 285 C320 275 250 275 195 298 Z" fill="url(#sauceHighlight)" />
    <ellipse cx="295" cy="335" rx="28" ry="12" fill="#ffffff" opacity="0.25" transform="rotate(-10 295 335)"/>

    <!-- Thick Sauce Drip on Rim -->
    <path d="M340 370 C345 395 352 415 358 415 C365 415 362 390 358 370 Z" fill="#541b05" />

    <!-- Wooden Baste Grill Brush Poised Angled Dipping -->
    <g transform="translate(245, 120) rotate(35)">
      <!-- Wood Handle -->
      <path d="M-14 0 C-14 -70 -10 -110 -12 -135 C-12 -140 12 -140 12 -135 C10 -110 14 -70 14 0 Z" fill="url(#brushWood)" />
      <!-- Metal Band -->
      <rect x="-20" y="0" width="40" height="28" rx="2" fill="#9ca3af" stroke="#4b5563" stroke-width="2"/>
      <!-- Bristles Loaded with Dark BBQ Glaze -->
      <path d="M-20 28 L-24 85 C-8 100 8 100 24 85 L20 28 Z" fill="#451a03" />
      <path d="M-15 45 L-18 88 C-6 98 6 98 18 88 L15 45 Z" fill="#b45309" opacity="0.6"/>
      <!-- Drip on brush tip -->
      <path d="M-10 88 C0 115 6 115 10 88 Z" fill="#78350f" />
    </g>

    <!-- Cracked Black Peppercorns -->
    <g fill="#171717" stroke="#451a03" stroke-width="1.5">
      <polygon points="190,360 197,356 201,363 195,368 188,365" />
      <polygon points="325,365 333,362 337,370 330,375 323,371" />
      <polygon points="260,380 266,377 270,383 264,388 258,385" />
    </g>
  </g>
</svg>`,

  'lemon-lime': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="llGlow" cx="50%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#84cc16" stop-opacity="0.45"/>
      <stop offset="65%" stop-color="#4d7c0f" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#1e3a05" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="limeRind" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bef264"/>
      <stop offset="40%" stop-color="#65a30d"/>
      <stop offset="100%" stop-color="#365314"/>
    </linearGradient>
    <linearGradient id="limePulp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d9f99d"/>
      <stop offset="50%" stop-color="#a3e635"/>
      <stop offset="100%" stop-color="#4d7c0f"/>
    </linearGradient>
    <linearGradient id="lemonRind" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <linearGradient id="lemonPulp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <filter id="llShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <circle cx="256" cy="270" r="210" fill="url(#llGlow)" />

  <g filter="url(#llShadow)">
    <!-- Yellow Lemon Half in Background -->
    <g transform="translate(290, 240) rotate(25)">
      <ellipse cx="0" cy="0" rx="95" ry="90" fill="url(#lemonRind)" />
      <ellipse cx="0" cy="0" rx="84" ry="79" fill="#fef9c3" />
      <ellipse cx="0" cy="0" rx="78" ry="73" fill="url(#lemonPulp)" />
      <g stroke="#fef9c3" stroke-width="3" fill="none">
        <line x1="0" y1="-73" x2="0" y2="73"/>
        <line x1="-78" y1="0" x2="78" y2="0"/>
        <line x1="-55" y1="-51" x2="55" y2="51"/>
        <line x1="-55" y1="51" x2="55" y2="-51"/>
      </g>
      <circle cx="0" cy="0" r="10" fill="#fef9c3" />
    </g>

    <!-- Vibrant Green Lime Wheel in Foreground -->
    <g transform="translate(200, 300) rotate(-15)">
      <circle cx="0" cy="0" r="110" fill="url(#limeRind)" />
      <circle cx="0" cy="0" r="98" fill="#ecfccb" />
      <circle cx="0" cy="0" r="90" fill="url(#limePulp)" />

      <g stroke="#ecfccb" stroke-width="4" fill="none">
        <line x1="0" y1="-90" x2="0" y2="90"/>
        <line x1="-90" y1="0" x2="90" y2="0"/>
        <line x1="-63" y1="-63" x2="63" y2="63"/>
        <line x1="-63" y1="63" x2="63" y2="-63"/>
      </g>
      <circle cx="0" cy="0" r="12" fill="#ecfccb" />
      <circle cx="35" cy="35" r="3.5" fill="#ffffff" opacity="0.8"/>
      <circle cx="-40" cy="25" r="3" fill="#ffffff" opacity="0.8"/>
      <circle cx="20" cy="-50" r="4" fill="#ffffff" opacity="0.8"/>
      <path d="M-80 -40 C-30 -85 40 -85 80 -40 C50 -70 -20 -70 -80 -40 Z" fill="#ffffff" opacity="0.6"/>
    </g>

    <!-- Fresh Citrus Leaves on Top -->
    <g transform="translate(210, 150) rotate(-35)">
      <path d="M0 0 C30 -40 85 -35 110 5 C85 35 30 40 0 0 Z" fill="#365314" />
      <path d="M0 0 C25 -30 75 -25 95 5 C75 25 25 30 0 0 Z" fill="#4d7c0f" />
      <path d="M0 0 Q55 -10 95 5" stroke="#84cc16" stroke-width="2.5" fill="none"/>
      <path d="M30 -5 Q40 -18 55 -20" stroke="#84cc16" stroke-width="1.5" fill="none"/>
      <path d="M50 -2 Q65 -15 80 -15" stroke="#84cc16" stroke-width="1.5" fill="none"/>
      <path d="M35 5 Q50 18 65 18" stroke="#84cc16" stroke-width="1.5" fill="none"/>
    </g>
  </g>

  <!-- Clear Fresh Splashing Juice Droplets -->
  <g fill="#a3e635" opacity="0.9">
    <ellipse cx="370" cy="180" rx="5" ry="8" transform="rotate(35 370 180)" fill="#bef264"/>
    <ellipse cx="110" cy="280" rx="4.5" ry="7" transform="rotate(-40 110 280)" fill="#d9f99d"/>
    <circle cx="340" cy="380" r="5" fill="#facc15" />
    <circle cx="150" cy="420" r="4" fill="#bef264" />
    <circle cx="300" cy="130" r="3" fill="#ffffff" />
  </g>
</svg>`
};

async function generateAll() {
  for (const [id, svg] of Object.entries(SVGS)) {
    const svgPath = path.join(outputDir, `${id}.svg`);
    fs.writeFileSync(svgPath, svg, 'utf-8');

    const pngPath = path.join(outputDir, `${id}.png`);
    await sharp(Buffer.from(svg))
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(pngPath);

    console.log(`✓ Re-generated ${id}.svg and ${id}.png (512x512 transparent)`);
  }
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
