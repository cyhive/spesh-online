import overcoatImg from '../assets/images/lookbook_tailored_overcoat_1791273056050.jpg';
import silkBlouseImg from '../assets/images/lookbook_silk_blouse_1791273069451.jpg';
import knitwearImg from '../assets/images/lookbook_knitwear_merino_1791273080746.jpg';
import trousersImg from '../assets/images/lookbook_relaxed_trousers_1791273095916.jpg';
import heroImg from '../assets/images/hero_campaign_editorial_1791273042747.jpg';
import { Product } from '../types/store';

export { heroImg };

export const PRODUCTS: Product[] = [
  {
    id: 'mv-01',
    name: 'Atelier Double-Breasted Overcoat',
    tagline: 'Sculpted shoulder line in Biella virgin wool & cashmere blend',
    category: 'Outerwear',
    price: 1280,
    origin: 'Biella, Italy',
    fabric: '90% Virgin Wool, 10% Cashmere',
    colors: [
      { name: 'Charcoal', hex: '#262628', label: 'Deep Charcoal' },
      { name: 'Camel', hex: '#B89B77', label: 'Raw Camel' },
      { name: 'Noir', hex: '#141416', label: 'Pitch Noir' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: overcoatImg,
    description: 'An architectural outerwear pillar cut from dense 620gsm virgin wool-cashmere blend sourced from historic Lanificio mills in Biella. Features relaxed dropped lapels, hand-stitched horn buttons, and an unstructured interior lined with Japanese cupro for fluid movement.',
    details: [
      'Unstructured relaxed silhouette with soft canvas chest piece',
      'Hand-stitched genuine buffalo horn buttons',
      'Dual rear storm vent and deep jet pockets',
      'Japanese breathable cupro interior sleeve lining',
      'Fabric weight: 620 gsm winter-weight cloth'
    ],
    care: [
      'Specialist dry clean only',
      'Store on wide-shoulder cedar hanger',
      'Do not machine wash or tumble dry'
    ],
    fit: 'Designed for an oversized relaxed drape. Size down if you prefer a sharper tailored fit.',
    isNewArrival: true,
    isLimited: true
  },
  {
    id: 'mv-02',
    name: 'Architectural Draped Silk Blouse',
    tagline: 'Fluid asymmetric collar in 22mm Mulberry silk crepe de chine',
    category: 'Silk & Shirts',
    price: 540,
    origin: 'Lyon, France',
    fabric: '100% Organic Mulberry Silk (22mm)',
    colors: [
      { name: 'Ivory', hex: '#F4F2EC', label: 'Chalk Ivory' },
      { name: 'Champagne', hex: '#E2D8C3', label: 'Pale Champagne' },
      { name: 'Obsidian', hex: '#18181A', label: 'Obsidian' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: silkBlouseImg,
    description: 'Constructed from heavy 22 momme sandwashed silk crepe sourced from Lyon. The collar extends into an asymmetrical bias-cut drape that cascades organically along the clavicle. French seams and concealed mother-of-pearl plackets throughout.',
    details: [
      '22 momme sandwashed crepe de chine with soft matte luster',
      'Clean asymmetric drape neck with discreet anchor button',
      'Australian mother-of-pearl button cuffs',
      'Seamless French inner seam finishing',
      'Zero synthetic blend components'
    ],
    care: [
      'Hand wash cold with pH-neutral silk detergent',
      'Lay flat to dry away from direct heat',
      'Steam gently on low setting'
    ],
    fit: 'Relaxed fluid cut with graceful arm drape. Fits true to size.',
    isNewArrival: true
  },
  {
    id: 'mv-03',
    name: 'Ribbed Merino Sculptural Knit',
    tagline: '7-gauge seamless knit in extrafine Zegna Baruffa merino',
    category: 'Knitwear',
    price: 490,
    origin: 'Umbria, Italy',
    fabric: '100% Extrafine Merino Wool (19.5 Micron)',
    colors: [
      { name: 'Oatmeal', hex: '#DDD6C7', label: 'Raw Oatmeal' },
      { name: 'Stone', hex: '#BFB9AE', label: 'Mineral Stone' },
      { name: 'Espresso', hex: '#342923', label: 'Dark Espresso' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: knitwearImg,
    description: 'Knitted on Japanese whole-garment 3D knitting machines in Umbria to eliminate all seams. Crafted from 19.5-micron extrafine merino wool that provides substantial tactile warmth without scratchiness or weight.',
    details: [
      'Seamless 3D whole-garment construction for frictionless wear',
      'Substantial 7-gauge architectural fisherman rib',
      'Subtle folded funnel mock neck with relaxed elasticity',
      'Pre-washed with alpine spring water for softness',
      'Mulesing-free certified ethical wool'
    ],
    care: [
      'Hand wash cold or wool cycle with eco-detergent',
      'Dry flat on towel, never hang',
      'Store folded with cedar blocks'
    ],
    fit: 'True to size with gentle room through torso and arms.',
    isLimited: true
  },
  {
    id: 'mv-04',
    name: 'Pleat-Front Wide Trousers',
    tagline: 'High-waisted architectural cut in tropical virgin wool',
    category: 'Trousers',
    price: 520,
    origin: 'Porto, Portugal',
    fabric: '98% Virgin Wool, 2% Elastane',
    colors: [
      { name: 'Camel', hex: '#A88D6F', label: 'Atelier Camel' },
      { name: 'Charcoal', hex: '#2A2A2E', label: 'Flannel Slate' },
      { name: 'Chalk', hex: '#EBE7DE', label: 'Warm Chalk' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: trousersImg,
    description: 'A structural tailoring essential featuring deep forward double pleats, an extended waistband tab with side adjusters, and a generous wide leg that breaks cleanly over loafers or boots. Tailored in Porto by third-generation trouser makers.',
    details: [
      'Extended waistband tab with concealed hook-and-bar closure',
      'Internal side cinch buckles (belt-free silhouette)',
      'Double forward pleats for ease of movement',
      'Full curtain waistband with shirt-grip rubberized strip',
      'Unhemmed length for bespoke tailoring alteration'
    ],
    care: [
      'Dry clean only',
      'Cool iron with pressing cloth',
      'Hang vertically using trouser clamp'
    ],
    fit: 'High-rise with voluminous drape through leg. Hem length tailored to preference.'
  },
  {
    id: 'mv-05',
    name: 'Minimalist Single-Breasted Blazer',
    tagline: 'Deconstructed modern tailoring in hopsack wool',
    category: 'Tailoring',
    price: 940,
    origin: 'Naples, Italy',
    fabric: '100% Super 130s Wool Hopsack',
    colors: [
      { name: 'Noir', hex: '#161617', label: 'Nocturne Noir' },
      { name: 'Taupe', hex: '#8F8578', label: 'Raw Taupe' },
      { name: 'Navy', hex: '#1E2430', label: 'Deep Marine' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: overcoatImg,
    description: 'Neapolitan-inspired soft shoulder construction stripped of heavy shoulder pads and stiff chest fusing. The hopsack weave breathes naturally while resisting creases, rendering it ideal for transitions from day studio to evening affairs.',
    details: [
      'Spalla camicia (shirt shoulder) tailored hand-set sleeve',
      'Three-roll-two single-breasted horn button configuration',
      'Quarter-lined in lightweight Bemberg cupro',
      'Double welt barchetta chest pocket'
    ],
    care: [
      'Dry clean only',
      'Steam to refresh between wears'
    ],
    fit: 'Modern tailored fit with relaxed waist suppression.',
    isNewArrival: true
  },
  {
    id: 'mv-06',
    name: 'Raw Silk Minimalist Tunic Shirt',
    tagline: 'Clean band collar shirt in unbleached tussah silk',
    category: 'Silk & Shirts',
    price: 420,
    origin: 'Kyoto, Japan',
    fabric: '100% Wild Tussah Raw Silk',
    colors: [
      { name: 'Ecru', hex: '#EFECE6', label: 'Unbleached Ecru' },
      { name: 'Indigo', hex: '#263445', label: 'Natural Indigo' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: silkBlouseImg,
    description: 'Spun from raw wild tussah silk with a distinctive textured slub. Breathable, hypoallergenic, and naturally thermoregulating. Features a clean mandarin collar, clean concealed front closure, and curved drop hem.',
    details: [
      'Textured organic tussah silk with natural slub variations',
      'Covered front placket with hand-sewn bar tacks',
      'Subtle side gussets with reinforcement stitching',
      'Mother-of-pearl buttons'
    ],
    care: [
      'Gentle cold wash with mild detergent',
      'Hang dry in shade'
    ],
    fit: 'Relaxed architectural fit.'
  },
  {
    id: 'mv-07',
    name: 'Pure Cashmere Cocoon Cardigan',
    tagline: 'Relaxed shawl wrap in 4-ply Grade-A Mongolian cashmere',
    category: 'Knitwear',
    price: 760,
    origin: 'Inner Mongolia',
    fabric: '100% Grade-A Mongolian Cashmere',
    colors: [
      { name: 'Oatmeal', hex: '#DED7C8', label: 'Pure Oatmeal' },
      { name: 'Charcoal', hex: '#2F3135', label: 'Smoked Charcoal' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: knitwearImg,
    description: 'Substantial 4-ply cashmere spun from long-staple fibers (>38mm length) that resist pilling. Features a generous shawl collar, horn button closure, and dropped shoulders creating an enveloping cocoon silhouette.',
    details: [
      'Spun from certified Grade-A long-staple Mongolian fibers',
      'Heavyweight 4-ply gauge knit for plush warmth',
      'Subtle deep patch pockets integrated into ribbed rib hem',
      'Includes cashmere comb for heirloom maintenance'
    ],
    care: [
      'Hand wash in tepid water with cashmere shampoo',
      'Press dry between towels, dry flat'
    ],
    fit: 'Relaxed cocoon silhouette. Size down for a closer fit.',
    isLimited: true
  },
  {
    id: 'mv-08',
    name: 'Pleated Flannel Tapered Trouser',
    tagline: 'Refined single-pleat tailoring in Vitale Barberis flannel',
    category: 'Trousers',
    price: 480,
    origin: 'Biella, Italy',
    fabric: '100% Wool Flannel (340gsm)',
    colors: [
      { name: 'Charcoal', hex: '#28282B', label: 'Dark Flannel' },
      { name: 'Camel', hex: '#A38B72', label: 'Desert Camel' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: trousersImg,
    description: 'Milled by Vitale Barberis Canonico with a gently brushed face for tactile softness. Clean single pleats create a flattering silhouette that gently tapers from mid-thigh down to a crisp ankle opening.',
    details: [
      'Vitale Barberis 340gsm wool flannel',
      'Internal cotton knee lining for smooth contact',
      'Split rear waistband for easy tailor adjustment',
      'Slanted side trouser pockets'
    ],
    care: [
      'Dry clean only',
      'Steam with care'
    ],
    fit: 'Mid-rise with gentle taper from knee to ankle.'
  }
];

export const LOOKBOOK_LOOKS = [
  {
    id: 'look-01',
    season: 'Autumn / Winter 2026',
    title: 'Look 01: The Overcoat & Silk Layer',
    image: overcoatImg,
    description: 'Volume and structure juxtaposed against fluid silk. The Atelier Double-Breasted Overcoat worn over the Draped Silk Blouse and Wide Trousers.',
    productId: 'mv-01',
    productName: 'Atelier Double-Breasted Overcoat',
    price: 1280
  },
  {
    id: 'look-02',
    season: 'Autumn / Winter 2026',
    title: 'Look 02: Architectural Silk Crepe',
    image: silkBlouseImg,
    description: 'Purity of line. The Ivory Draped Blouse highlights asymmetric collar geometry with clean French seams.',
    productId: 'mv-02',
    productName: 'Architectural Draped Silk Blouse',
    price: 540
  },
  {
    id: 'look-03',
    season: 'Autumn / Winter 2026',
    title: 'Look 03: Tactile Merino Rib',
    image: knitwearImg,
    description: 'Whole-garment 3D knitting technology eliminating seams. Raw oatmeal tones grounded against mineral stone accents.',
    productId: 'mv-03',
    productName: 'Ribbed Merino Sculptural Knit',
    price: 490
  },
  {
    id: 'look-04',
    season: 'Autumn / Winter 2026',
    title: 'Look 04: The Pleated Architecture',
    image: trousersImg,
    description: 'High-waisted proportion with forward double pleats, draped cleanly in Portuguese virgin wool.',
    productId: 'mv-04',
    productName: 'Pleat-Front Wide Trousers',
    price: 520
  }
];
