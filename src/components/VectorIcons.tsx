import React from 'react';

/**
 * Clean, lightweight, cute vector graphics for Costume, Film, Fox Mascot,
 * and Classroom Props. Loads in 0ms, works 100% offline and in all sandboxes.
 */

export const CostumeVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Magic Sparkles */}
    <path d="M15 25L18 32L25 35L18 38L15 45L12 38L5 35L12 32Z" fill="#FBBF24" />
    <path d="M85 20L87 25L92 27L87 29L85 34L83 29L78 27L83 25Z" fill="#FBBF24" />
    
    {/* Royal Cape (Back) */}
    <path
      d="M26 32 C18 45 16 75 22 88 C32 90 40 85 50 88 C60 85 68 90 78 88 C84 75 82 45 74 32 Z"
      fill="#E11D48"
      stroke="#9F1239"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Cape Gold Trim */}
    <path
      d="M22 88 C32 90 40 85 50 88 C60 85 68 90 78 88"
      stroke="#FDE047"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Theatrical Princess / Hero Dress (Front) */}
    <path
      d="M36 34 L30 52 C30 52 26 78 30 84 C42 86 58 86 70 84 C74 78 70 52 70 52 L64 34 Z"
      fill="#38BDF8"
      stroke="#0284C7"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    {/* Dress Skirt Layers & Gold Stars */}
    <path
      d="M32 62 C40 65 60 65 68 62 C69 72 68 80 66 84 C56 86 44 86 34 84 C32 80 31 72 32 62 Z"
      fill="#F472B6"
    />
    <circle cx="50" cy="72" r="3" fill="#FDE047" />
    <circle cx="42" cy="74" r="2.5" fill="#FDE047" />
    <circle cx="58" cy="74" r="2.5" fill="#FDE047" />

    {/* Golden Royal Collar & Star Brooch */}
    <path
      d="M34 32 C40 38 60 38 66 32 L62 46 C55 50 45 50 38 46 Z"
      fill="#FBBF24"
      stroke="#D97706"
      strokeWidth="2"
    />
    <path
      d="M50 38 L52 42 L56 42 L53 45 L54 49 L50 46 L46 49 L47 45 L44 42 L48 42 Z"
      fill="#FFFFFF"
    />

    {/* Drama Comedy Mask (floating upper corner) */}
    <g transform="translate(62, 8) scale(0.65)">
      <ellipse cx="25" cy="25" rx="16" ry="20" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
      <ellipse cx="20" cy="20" rx="3" ry="4" fill="#854D0E" />
      <ellipse cx="30" cy="20" rx="3" ry="4" fill="#854D0E" />
      <path d="M18 28 Q25 36 32 28" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M12 12 Q25 6 38 12" stroke="#CA8A04" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

export const FilmVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sparkling Stars */}
    <path d="M14 20L16 26L22 28L16 30L14 36L12 30L6 28L12 26Z" fill="#FBBF24" />
    <path d="M84 75L86 80L91 82L86 84L84 89L82 84L77 82L82 80Z" fill="#FBBF24" />

    {/* Rolling Film Strip Ribbon */}
    <path
      d="M32 30 C45 10 75 12 86 24 C95 35 90 55 76 65"
      stroke="#1E293B"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M32 30 C45 10 75 12 86 24 C95 35 90 55 76 65"
      stroke="#38BDF8"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Film Strip Sprocket Holes */}
    <circle cx="50" cy="18" r="1.8" fill="#FFFFFF" />
    <circle cx="65" cy="18" r="1.8" fill="#FFFFFF" />
    <circle cx="78" cy="24" r="1.8" fill="#FFFFFF" />
    <circle cx="86" cy="35" r="1.8" fill="#FFFFFF" />
    <circle cx="86" cy="48" r="1.8" fill="#FFFFFF" />

    {/* Main Cinema Reel Outer Wheel */}
    <circle cx="46" cy="56" r="34" fill="#0284C7" stroke="#0369A1" strokeWidth="3" />
    <circle cx="46" cy="56" r="30" fill="#38BDF8" />

    {/* Film Reel Windows / Spokes (6 circular cutaways) */}
    <circle cx="46" cy="34" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
    <circle cx="46" cy="78" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
    <circle cx="27" cy="45" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
    <circle cx="65" cy="45" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
    <circle cx="27" cy="67" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
    <circle cx="65" cy="67" r="7" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />

    {/* Center Gold Hub with Cute Face */}
    <circle cx="46" cy="56" r="15" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
    {/* Friendly Eyes and Smile */}
    <circle cx="42" cy="53" r="2.2" fill="#78350F" />
    <circle cx="50" cy="53" r="2.2" fill="#78350F" />
    <path d="M42 59 Q46 63 50 59" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="39" cy="56" r="1.5" fill="#F43F5E" opacity="0.6" />
    <circle cx="53" cy="56" r="1.5" fill="#F43F5E" opacity="0.6" />
  </svg>
);

export const DetectiveFoxVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Fox Ears */}
    <polygon points="26,18 36,44 18,36" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
    <polygon points="27,24 33,40 22,34" fill="#FDBA74" />
    <polygon points="74,18 64,44 82,36" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
    <polygon points="73,24 67,40 78,34" fill="#FDBA74" />

    {/* Detective Plaid Hat */}
    <ellipse cx="50" cy="30" rx="30" ry="14" fill="#78350F" />
    <path d="M26 30 C26 12 74 12 74 30 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
    {/* Hat Ribbon */}
    <rect x="26" y="26" width="48" height="5" fill="#F59E0B" />
    {/* Hat Bow */}
    <circle cx="50" cy="20" r="3" fill="#D97706" />

    {/* Fox Face */}
    <circle cx="50" cy="52" rx="26" ry="24" fill="#F97316" />
    {/* White Cheeks */}
    <path d="M28 54 Q36 68 50 68 Q64 68 72 54 Q64 48 50 52 Q36 48 28 54 Z" fill="#FFFFFF" />
    
    {/* Eyes */}
    <circle cx="41" cy="48" r="3.5" fill="#1E293B" />
    <circle cx="59" cy="48" r="3.5" fill="#1E293B" />
    <circle cx="42" cy="46" r="1.2" fill="#FFFFFF" />
    <circle cx="60" cy="46" r="1.2" fill="#FFFFFF" />

    {/* Nose & Mouth */}
    <polygon points="50,56 46,52 54,52" fill="#1E293B" />
    <path d="M47 58 Q50 62 53 58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Rosy Cheeks */}
    <circle cx="34" cy="54" r="3" fill="#FB7185" opacity="0.6" />
    <circle cx="66" cy="54" r="3" fill="#FB7185" opacity="0.6" />

    {/* Magnifying Glass */}
    <g transform="translate(60, 48)">
      <line x1="16" y1="16" x2="28" y2="28" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="10" rx="10" ry="10" fill="#BAE6FD" fillOpacity="0.7" stroke="#0284C7" strokeWidth="3" />
      <path d="M6 7 Q10 4 14 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);
