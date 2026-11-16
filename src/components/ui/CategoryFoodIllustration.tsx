import type { MenuCategoryId } from '../../types/content'

interface CategoryFoodIllustrationProps {
  categoryId: MenuCategoryId
  className?: string
  size?: number
}

export function CategoryFoodIllustration({
  categoryId,
  className = 'size-12',
  size = 48,
}: CategoryFoodIllustrationProps) {
  switch (categoryId) {
    case 'plateaux':
      /* Sizzling Feast Platter: wooden board, roast chicken, fries, red peri sauce & herb */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wooden Platter Board */}
          <ellipse cx="32" cy="46" rx="28" ry="11" fill="#C88846" stroke="#2B180B" strokeWidth="2.2" />
          <ellipse cx="32" cy="43" rx="25.5" ry="8.5" fill="#DE9E62" />
          {/* Golden Fries on left */}
          <rect x="13" y="30" width="4.5" height="15" rx="1.5" transform="rotate(-15 13 30)" fill="#F5C443" stroke="#2B180B" strokeWidth="1.6" />
          <rect x="17" y="27" width="4.5" height="17" rx="1.5" transform="rotate(4 17 27)" fill="#F9D468" stroke="#2B180B" strokeWidth="1.6" />
          <rect x="22" y="31" width="4.5" height="14" rx="1.5" transform="rotate(18 22 31)" fill="#F5C443" stroke="#2B180B" strokeWidth="1.6" />
          {/* Succulent Roast Chicken in center */}
          <ellipse cx="37" cy="35" rx="14" ry="10.5" fill="#C0392B" stroke="#2B180B" strokeWidth="2.2" />
          <ellipse cx="36" cy="33" rx="11.5" ry="7.5" fill="#D35400" />
          {/* Chicken Bone with White Knobs */}
          <path d="M44 31C47 28 51 30 54 33" stroke="#2B180B" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="54" cy="31.5" r="2.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.6" />
          <circle cx="55.5" cy="35" r="2.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.6" />
          {/* Grill Marks on Chicken */}
          <path d="M30 30L36 36M37 28L42 34" stroke="#7A1D05" strokeWidth="2" strokeLinecap="round" />
          {/* Dipping Sauce Ramekin */}
          <ellipse cx="23" cy="45" rx="5.5" ry="3.5" fill="#E74C3C" stroke="#2B180B" strokeWidth="1.8" />
          <ellipse cx="23" cy="44" rx="4" ry="2.2" fill="#922B21" />
          {/* Fresh Parsley Garnish */}
          <circle cx="36" cy="24" r="2.8" fill="#2ECC71" stroke="#2B180B" strokeWidth="1.2" />
          <circle cx="39" cy="26" r="2.2" fill="#27AE60" stroke="#2B180B" strokeWidth="1.2" />
        </svg>
      )

    case 'poulet-grille':
      /* Flame Grilled Chicken Drumstick with char marks and flames */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Flame Embers in background */}
          <path d="M16 42C12 34 15 24 22 19C21 24 25 25 27 22C30 17 33 11 42 10C42 18 48 20 49 26C50 33 46 41 40 45C44 38 41 33 38 35C35 37 34 41 31 45C25 46 19 45 16 42Z" fill="#FFA502" opacity="0.35" />
          {/* Bone */}
          <rect x="18" y="42" width="6.5" height="13" rx="3" transform="rotate(35 18 42)" fill="#FFF8F0" stroke="#2B180B" strokeWidth="2.2" />
          <circle cx="15" cy="51.5" r="3.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="2" />
          <circle cx="19" cy="55" r="3.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="2" />
          {/* Plump Drumstick Meat */}
          <path
            d="M24 38C19 32 21 23 28 17C35 11 46 13 49 22C52 30 47 41 38 43C31 45 27 42 24 38Z"
            fill="#C0392B"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          <path
            d="M27 34C23 29 25 23 30 19C36 15 44 16 46 23C48 29 44 37 37 38C32 40 29 38 27 34Z"
            fill="#E67E22"
          />
          {/* Dark Charcoal Grill Marks */}
          <path d="M30 21L41 31M35 17L45 26M26 27L35 36" stroke="#641E16" strokeWidth="2.2" strokeLinecap="round" />
          {/* Little Flame Sparks */}
          <path d="M48 15C50 13 52 15 51 18C49 19 47 17 48 15Z" fill="#E74C3C" />
          <circle cx="21" cy="18" r="1.5" fill="#F39C12" />
        </svg>
      )

    case 'burgers':
      /* Gourmet Stacked Burger matching reference cartoon art style */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Top Bun */}
          <path
            d="M13 26C13 15 21 10 32 10C43 10 51 15 51 26C51 27.5 50 28.5 48 28.5H16C14 28.5 13 27.5 13 26Z"
            fill="#E59828"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          <path
            d="M16 25C16 17 23 12 32 12C41 12 48 17 48 25"
            stroke="#FAD7A0"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* White Sesame Seeds */}
          <circle cx="23" cy="17" r="1.2" fill="#FFF9ED" />
          <circle cx="32" cy="14" r="1.2" fill="#FFF9ED" />
          <circle cx="41" cy="17" r="1.2" fill="#FFF9ED" />
          <circle cx="28" cy="21" r="1.2" fill="#FFF9ED" />
          <circle cx="37" cy="22" r="1.2" fill="#FFF9ED" />
          {/* Fresh Wavy Lettuce */}
          <path
            d="M12 29.5C14 27.5 16 30.5 18 29.5C20 28.5 22 30.5 24 29.5C26 28.5 28 30.5 30 29.5C32 28.5 34 30.5 36 29.5C38 28.5 40 30.5 42 29.5C44 28.5 46 30.5 48 29.5C50 28.5 52 30.5 53 29.5"
            stroke="#27AE60"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Ripe Red Tomato Slice */}
          <rect x="15" y="32" width="34" height="4.5" rx="2.2" fill="#E74C3C" stroke="#2B180B" strokeWidth="1.8" />
          {/* Melted Cheddar Cheese with Drooping Corners */}
          <path
            d="M14 36.5H50L46 43L40 40L34 45L28 40L22 44L17 39L14 36.5Z"
            fill="#F1C40F"
            stroke="#2B180B"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Thick Grilled Patty */}
          <rect x="13" y="41" width="38" height="7.5" rx="3.75" fill="#6E2C00" stroke="#2B180B" strokeWidth="2.2" />
          {/* Bottom Bun */}
          <path
            d="M15 49H49C50.5 49 51.5 50.2 50.5 52.2C48.5 55.5 41.5 57.5 32 57.5C22.5 57.5 15.5 55.5 13.5 52.2C12.5 50.2 13.5 49 15 49Z"
            fill="#E59828"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
        </svg>
      )

    case 'wraps-pitas':
      /* Rolled Tortilla Wrap with grill marks & fresh fillings */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wrap Body */}
          <path
            d="M18 45L40 18C43.5 13.5 50 14 53 17.5C56 21 55.5 27 51 30.5L29 56C25.5 59.5 19 59 16 55.5C13 52 13.5 47.5 18 45Z"
            fill="#F5C443"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          {/* Delicious Fresh Fillings at open top */}
          <ellipse cx="46" cy="23" rx="7.5" ry="5.5" transform="rotate(-40 46 23)" fill="#E74C3C" stroke="#2B180B" strokeWidth="1.8" />
          <circle cx="43.5" cy="20.5" r="3.2" fill="#2ECC71" />
          <circle cx="48" cy="24" r="2.8" fill="#D35400" />
          <circle cx="45" cy="24.5" r="2" fill="#FFF8F0" />
          {/* Crispy Grill Marks on Tortilla */}
          <path d="M26 44L33 39M32 36L39 31M38 29L45 24" stroke="#BA7910" strokeWidth="2.2" strokeLinecap="round" />
          {/* Red Branded Paper Sleeve */}
          <path
            d="M15 51L32 34L37 40L20 56C17 57 15 54 15 51Z"
            fill="#E7371F"
            stroke="#2B180B"
            strokeWidth="1.8"
          />
        </svg>
      )

    case 'tacos':
      /* Folded French Taco with grill press grid lines & melted cheese */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Taco Folded Body */}
          <rect
            x="12"
            y="19"
            width="40"
            height="27"
            rx="5.5"
            transform="rotate(-5 12 19)"
            fill="#F5C443"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          {/* Panini Press Ribbed Char Marks */}
          <path d="M17 23.5L48 20.5M18 28.5L49 25.5M19 33.5L50 30.5M20 38.5L51 35.5" stroke="#B06F0B" strokeWidth="2" strokeLinecap="round" />
          {/* Cross hatch lines */}
          <path d="M24 19L22 44M33 18L31 43M42 17L40 42" stroke="#B06F0B" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          {/* Open end with filling & fries */}
          <ellipse cx="14" cy="32" rx="4.5" ry="11" transform="rotate(-5 14 32)" fill="#562506" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="12" y="26" width="6.5" height="3.5" rx="1" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.2" />
          <rect x="13" y="31" width="7" height="3.5" rx="1" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.2" />
          {/* Melted Cheese Drip */}
          <path d="M16 38C16 41.5 18.5 43.5 21 42.5C23 41.5 22 38 22 38" fill="#F39C12" stroke="#2B180B" strokeWidth="1.2" />
        </svg>
      )

    case 'specialites':
      /* Saffron Rice Bowl with grilled peri chicken cubes, herbs & steam */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ceramic Bowl */}
          <ellipse cx="32" cy="32" rx="23" ry="6.5" fill="#E67E22" stroke="#2B180B" strokeWidth="2.4" />
          <path
            d="M9 32C9 47 19 55 32 55C45 55 55 47 55 32"
            fill="#E7371F"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          {/* Bowl Foot */}
          <path d="M23 54H41V57H23V54Z" fill="#962D00" stroke="#2B180B" strokeWidth="1.8" />
          {/* Mountain of Spicy Yellow Rice */}
          <ellipse cx="32" cy="30" rx="21" ry="7.5" fill="#F1C40F" />
          {/* Grilled Chicken Cubes */}
          <rect x="21" y="21" width="8.5" height="7.5" rx="2" fill="#D35400" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="33" y="20" width="9.5" height="7.5" rx="2" fill="#E67E22" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="27" y="25" width="9.5" height="6.5" rx="2" fill="#BA4A00" stroke="#2B180B" strokeWidth="1.8" />
          {/* Fresh Parsley Garnish */}
          <circle cx="32" cy="17" r="2.8" fill="#2ECC71" stroke="#2B180B" strokeWidth="1.2" />
          <circle cx="35" cy="18" r="2.2" fill="#27AE60" stroke="#2B180B" strokeWidth="1.2" />
          {/* Aroma Steam Swirls */}
          <path d="M25 13C24 9.5 27 7.5 26 4.5M36 12C35 8.5 38 6.5 37 3.5" stroke="#997050" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        </svg>
      )

    case 'wings-bouchees':
      /* Glazed Peri-Peri Chicken Wings with sesame seeds and dipping sauce */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Second Wing in background */}
          <path
            d="M32 33C35 25 43 22 49 25C55 28 56 36 52 42C48 47 40 47 35 43"
            fill="#BA4A00"
            stroke="#2B180B"
            strokeWidth="2.2"
          />
          {/* First Wing in foreground */}
          <path
            d="M16 38C13 29 17 19 26 18C33 17 39 22 42 27C41 33 36 39 30 41C22 43 17 42 16 38Z"
            fill="#D35400"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          <path
            d="M19 34C17 27 20 21 27 20C33 19 37 23 39 27C38 31 34 36 28 38C23 39 20 38 19 34Z"
            fill="#E67E22"
          />
          {/* Wing Bones */}
          <path d="M16 38L10 44M19 41L14 47" stroke="#2B180B" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="10" cy="44" r="2.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.2" />
          <circle cx="14" cy="47" r="2.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.2" />
          {/* Fiery Glaze Highlight */}
          <path d="M25 22C29 22 35 26 36 29" stroke="#FFA502" strokeWidth="1.8" strokeLinecap="round" />
          {/* Dipping Sauce Pot */}
          <ellipse cx="46" cy="47" rx="7.5" ry="4.5" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.8" />
          <ellipse cx="46" cy="46" rx="5.5" ry="3" fill="#E74C3C" />
        </svg>
      )

    case 'accompagnements-sauces':
      /* French Fries in Red Box with peri flame and sauce pot */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Crispy Golden French Fries Sticks */}
          <rect x="22" y="13" width="5" height="25" rx="2" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="27" y="9" width="5" height="29" rx="2" fill="#F39C12" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="32" y="11" width="5" height="27" rx="2" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="37" y="14" width="5" height="24" rx="2" fill="#F39C12" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="17" y="17" width="4.5" height="21" rx="2" transform="rotate(-12 17 17)" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.8" />
          <rect x="42" y="17" width="4.5" height="21" rx="2" transform="rotate(12 42 17)" fill="#F39C12" stroke="#2B180B" strokeWidth="1.8" />
          {/* Red Fries Box */}
          <path
            d="M16 29C21 32 43 32 48 29L45 54C45 56.5 43 57.5 41 57.5H23C21 57.5 19 56.5 19 54L16 29Z"
            fill="#E74C3C"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          {/* Peri Flame on carton */}
          <path d="M32 37C30 41 34 43 32 48C35 45 36 42 35 39C35 37 33 36 32 37Z" fill="#F1C40F" />
          {/* Peri Dip Ramekin */}
          <ellipse cx="49" cy="48" rx="6.5" ry="4.2" fill="#FFF8F0" stroke="#2B180B" strokeWidth="1.8" />
          <ellipse cx="49" cy="47" rx="5" ry="2.8" fill="#E67E22" />
        </svg>
      )

    case 'menus-enfants':
      /* Happy Kids Meal: mini happy burger, juice box with straw & stars */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Blue Juice Box with Striped Straw */}
          <rect x="38" y="23" width="14" height="23" rx="3.5" fill="#3498DB" stroke="#2B180B" strokeWidth="1.8" />
          <path d="M44 23L46 11H50" stroke="#E74C3C" strokeWidth="2.8" strokeLinecap="round" />
          {/* Mini Cute Burger */}
          <path d="M11 35C11 26 17 22 26 22C35 22 41 26 41 35H11Z" fill="#F39C12" stroke="#2B180B" strokeWidth="2.2" />
          {/* Happy Face on Bun */}
          <circle cx="21" cy="28.5" r="1.6" fill="#2B180B" />
          <circle cx="31" cy="28.5" r="1.6" fill="#2B180B" />
          <path d="M24 31.5C25 33.5 27 33.5 28 31.5" stroke="#2B180B" strokeWidth="1.6" strokeLinecap="round" />
          {/* Wavy Lettuce & Cheese */}
          <rect x="10" y="36" width="32" height="3.5" rx="1.75" fill="#2ECC71" stroke="#2B180B" strokeWidth="1.2" />
          <path d="M13 40H39L35 44L31 41L27 45L23 40L19 43L13 40Z" fill="#F1C40F" />
          {/* Mini Patty & Bottom Bun */}
          <rect x="12" y="43" width="28" height="4.5" rx="2.2" fill="#6E2C00" stroke="#2B180B" strokeWidth="1.6" />
          <path d="M13 48H39C40.5 48 41.5 49 40.5 51C38.5 53.5 33 54.5 26 54.5C19 54.5 13.5 53.5 11.5 51C10.5 49 11.5 48 13 48Z" fill="#F39C12" stroke="#2B180B" strokeWidth="1.8" />
          {/* Sparkle Star */}
          <path d="M16 16L17 19L20 19L17.5 20.5L18.5 23L16 21.5L13.5 23L14.5 20.5L12 19L15 19L16 16Z" fill="#F1C40F" />
        </svg>
      )

    case 'boissons-milkshakes':
      /* Refreshing Cold Drink matching reference style: glass, orange wheel slice & straw */
      return (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Fresh Lemon/Orange Wheel Garnish perched on rim */}
          <circle cx="21" cy="18" r="9" fill="#F1C40F" stroke="#2B180B" strokeWidth="1.8" />
          <circle cx="21" cy="18" r="6.8" fill="#F39C12" />
          <path d="M21 11.5V24.5M14.5 18H27.5M16.5 13.5L25.5 22.5M16.5 22.5L25.5 13.5" stroke="#FFF9ED" strokeWidth="1.2" />
          {/* Straw */}
          <path d="M39 7L37 19L33 50" stroke="#E74C3C" strokeWidth="3.4" strokeLinecap="round" />
          {/* Glass Cup */}
          <path
            d="M23 21H47L42 54C41 56 39.5 57 37 57H28C25.5 57 24 56 23 54L18 21H23Z"
            fill="#FFA502"
            stroke="#2B180B"
            strokeWidth="2.4"
          />
          {/* Ice Cubes */}
          <rect x="25" y="27" width="7" height="7" rx="1.8" fill="#FFFFFF" opacity="0.65" stroke="#2B180B" strokeWidth="1.2" />
          <rect x="33" y="34" width="7" height="7" rx="1.8" fill="#FFFFFF" opacity="0.65" stroke="#2B180B" strokeWidth="1.2" />
          {/* Liquid Wave */}
          <ellipse cx="33" cy="21" rx="12" ry="3.5" fill="#FF7F50" stroke="#2B180B" strokeWidth="1.8" />
          {/* Bubbles */}
          <circle cx="27" cy="44" r="1.6" fill="#FFFFFF" opacity="0.85" />
          <circle cx="35" cy="46" r="1.6" fill="#FFFFFF" opacity="0.85" />
          <circle cx="31" cy="40" r="1.2" fill="#FFFFFF" opacity="0.85" />
        </svg>
      )

    default:
      return null
  }
}
