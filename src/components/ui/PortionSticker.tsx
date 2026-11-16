import React, { useId } from 'react'

export type PortionCount = 1 | 2 | 3 | 4

export interface PortionStickerProps {
  /** Number of full-body people illustrated on the sticker (1, 2, 3, or 4). */
  count: PortionCount
  /** Width / height in CSS pixels. The original artwork is 1254 x 1254. */
  size?: number | string
  /**
   * "exact" (default) displays the supplied reference art for an exact pixel match.
   * "vector" draws every part in editable SVG / TSX (no image dependencies).
   */
  mode?: 'exact' | 'vector'
  /** Public URL prefix for the PNGs in exact mode. */
  assetsPath?: string
  className?: string
  style?: React.CSSProperties
}

const WHITE = '#fff'

/** Stylized, solid-white, *full-body* person (not a stick figure). */
function Person({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox="0 0 160 380" overflow="visible" aria-hidden="true">
      <circle cx="80" cy="37" r="37" fill={WHITE} />
      {/* Rounded shoulders, neck, torso and separate arms. */}
      <path
        d="M47 81H113C130 81 143 93 143 111V129H17V111C17 93 30 81 47 81Z"
        fill={WHITE}
      />
      <rect x="7" y="108" width="29" height="131" rx="14.5" fill={WHITE} />
      <rect x="124" y="108" width="29" height="131" rx="14.5" fill={WHITE} />
      <rect x="41" y="104" width="78" height="156" rx="8" fill={WHITE} />
      {/* Gap between the legs remains the red from the sticker. */}
      <rect x="41" y="234" width="34" height="143" rx="17" fill={WHITE} />
      <rect x="85" y="234" width="34" height="143" rx="17" fill={WHITE} />
    </svg>
  )
}

function People({ count }: { count: PortionCount }) {
  // The solo illustration is deliberately larger, as in the supplied art.
  const layouts = {
    1: { width: 164, height: 373, gap: 0, y: 706 },
    2: { width: 155, height: 305, gap: 45, y: 747 },
    3: { width: 143, height: 305, gap: 35, y: 747 },
    4: { width: 130, height: 305, gap: 20, y: 747 },
  } as const
  const { width, height, gap, y } = layouts[count]
  const totalWidth = count * width + (count - 1) * gap
  const start = 625 - totalWidth / 2

  return (
    <g aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Person key={i} x={start + i * (width + gap)} y={y} width={width} height={height} />
      ))}
    </g>
  )
}

/**
 * A reusable glossy circular portion sticker with a metallic peeled corner.
 * Pure JSX + SVG; supports exact high-res PNG or lightweight standalone vector mode.
 */
export function PortionSticker({
  count,
  size = 54,
  mode = 'exact',
  assetsPath = '/portion-stickers',
  className,
  style,
}: PortionStickerProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `${uid}-${name}`
  const dimension = typeof size === 'number' ? `${size}px` : size
  const name = `${count} ${count === 1 ? 'person' : 'persons'} portion`

  if (mode === 'exact') {
    return (
      <img
        src={`${assetsPath.replace(/\/$/, '')}/${count}.png`}
        width={1254}
        height={1254}
        alt={name}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={className}
        style={{
          display: 'block',
          width: dimension,
          height: dimension,
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.45))',
          ...style,
        }}
      />
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1254 1254"
      width={dimension}
      height={dimension}
      role="img"
      aria-label={name}
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        <radialGradient id={id('shadow')} cx="47%" cy="40%" r="71%">
          <stop offset="65%" stopColor="#000" stopOpacity=".05" />
          <stop offset="85%" stopColor="#161616" stopOpacity=".27" />
          <stop offset="100%" stopColor="#000" stopOpacity=".03" />
        </radialGradient>
        <linearGradient id={id('metal')} x1="5%" y1="6%" x2="89%" y2="96%">
          <stop offset="0%" stopColor="#777" />
          <stop offset="8%" stopColor="#fdfdfd" />
          <stop offset="27%" stopColor="#f4f4f4" />
          <stop offset="51%" stopColor="#fff" />
          <stop offset="75%" stopColor="#e8e8e8" />
          <stop offset="96%" stopColor="#898989" />
          <stop offset="100%" stopColor="#ddd" />
        </linearGradient>
        <linearGradient id={id('rim')} x1="12%" y1="5%" x2="85%" y2="94%">
          <stop offset="0%" stopColor="#efefef" />
          <stop offset="23%" stopColor="#fff" />
          <stop offset="58%" stopColor="#fff" />
          <stop offset="85%" stopColor="#fff" />
          <stop offset="100%" stopColor="#bdbdbd" />
        </linearGradient>
        <radialGradient id={id('red')} cx="38%" cy="37%" r="83%">
          <stop offset="0%" stopColor="#ed0305" />
          <stop offset="40%" stopColor="#e20000" />
          <stop offset="71%" stopColor="#ca0000" />
          <stop offset="100%" stopColor="#920000" />
        </radialGradient>
        <linearGradient id={id('leftShine')} x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".48" />
          <stop offset="26%" stopColor="#fff" stopOpacity=".27" />
          <stop offset="75%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('lowerShine')} cx="58%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity=".45" />
          <stop offset="75%" stopColor="#ff5656" stopOpacity=".05" />
          <stop offset="100%" stopColor="#ff5656" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('peel')} x1="30%" y1="90%" x2="78%" y2="5%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="15%" stopColor="#e4e4e4" />
          <stop offset="35%" stopColor="#a7a7a7" />
          <stop offset="55%" stopColor="#fefefe" />
          <stop offset="71%" stopColor="#fff" />
          <stop offset="87%" stopColor="#a1a1a1" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={id('peelEdge')} x1="5%" y1="5%" x2="97%" y2="95%">
          <stop offset="0%" stopColor="#555" stopOpacity=".54" />
          <stop offset="30%" stopColor="#fefefe" stopOpacity=".75" />
          <stop offset="65%" stopColor="#878787" stopOpacity=".65" />
          <stop offset="100%" stopColor="#fff" stopOpacity=".6" />
        </linearGradient>
        <clipPath id={id('faceClip')}>
          <circle cx="621" cy="610" r="545" />
        </clipPath>
        <filter id={id('glossBlur')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="29" />
        </filter>
        <filter id={id('softShadow')} x="-10%" y="-10%" width="125%" height="125%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Slightly offset shadow and the metallic underside of the rim. */}
      <circle cx="622" cy="624" r="585" fill={`url(#${id('shadow')})`} />
      <circle cx="620" cy="615" r="594" fill={`url(#${id('metal')})`} />
      <circle cx="621" cy="610" r="573" fill={`url(#${id('rim')})`} />
      <circle cx="621" cy="610" r="545" fill={`url(#${id('red')})`} />

      <g clipPath={`url(#${id('faceClip')})`}>
        {/* Broad curved lacquer highlight, strongest on the upper-left. */}
        <path
          d="M89 521C100 309 222 177 405 115C500 83 588 75 659 77C527 105 420 169 326 280C221 400 149 530 106 701Z"
          fill={`url(#${id('leftShine')})`}
          filter={`url(#${id('glossBlur')})`}
        />
        <ellipse cx="1123" cy="875" rx="148" ry="222" fill={`url(#${id('lowerShine')})`} />
        <ellipse cx="271" cy="241" rx="164" ry="123" fill="#fff" opacity=".045" />
      </g>

      {/* Key typography: number, then one line, then properly spaced figures. */}
      <text
        x="624"
        y={count === 1 ? 542 : 587}
        textAnchor="middle"
        fontFamily="Arial Black, Arial, DejaVu Sans, sans-serif"
        fontWeight="900"
        fontSize={count === 1 ? 445 : 492}
        textLength={count === 1 ? 207 : count === 4 ? 299 : 289}
        lengthAdjust="spacingAndGlyphs"
        fill={WHITE}
      >
        {count}
      </text>
      <text
        x="625"
        y={count === 1 ? 676 : 716}
        textAnchor="middle"
        fontFamily="Arial Black, Arial, DejaVu Sans, sans-serif"
        fontWeight="900"
        fontSize="139"
        textLength={count === 1 ? 555 : 652}
        lengthAdjust="spacingAndGlyphs"
        fill={WHITE}
      >
        {count === 1 ? 'PERSON' : 'PERSONS'}
      </text>
      <People count={count} />

      {/* Subtle dark underside for depth; then the bright metallic folded corner. */}
      <path
        d="M614 25C672 32 735 97 775 158C811 207 851 214 896 198C951 177 988 190 1035 229C1014 187 970 152 921 129C814 74 685 18 614 25Z"
        fill="#490000"
        opacity=".30"
        filter={`url(#${id('softShadow')})`}
      />
      <path
        d="M603 20C664 12 744 46 814 79C890 113 959 140 994 168C1018 185 1031 201 1038 225C1006 192 980 183 948 187C905 191 863 211 824 200C770 185 726 109 667 59C637 33 621 27 603 20Z"
        fill={`url(#${id('peel')})`}
        stroke={`url(#${id('peelEdge')})`}
        strokeWidth="2"
      />
      <path
        d="M603 20C676 22 737 76 775 136C811 191 844 211 896 195"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeOpacity=".62"
      />
    </svg>
  )
}

export default PortionSticker
