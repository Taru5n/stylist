// ─── Design Tokens ──────────────────────────────────────────────
export const COLORS = {
  background: '#F8F6F2',
  surface: '#E9E5DF',
  card: '#FFFFFF',
  text: '#111111',
  textMuted: '#6B6B6B',
  accent: '#C7A96B',
  accentLight: '#D4BC8A',
  secondary: '#4C6B58',
  secondaryLight: '#6B8F7A',
  border: '#DADADA',
  borderLight: '#EFEFEF',
  shadow: 'rgba(0, 0, 0, 0.04)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(17, 17, 17, 0.6)',
  glass: 'rgba(255, 255, 255, 0.12)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
} as const;

// ─── Animation Presets ──────────────────────────────────────────
export const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  elastic: [0.68, -0.55, 0.27, 1.55] as const,
  luxury: [0.76, 0, 0.24, 1] as const,
  out: [0, 0, 0.2, 1] as const,
};

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  glacial: 1.4,
  cinematic: 2.0,
};

// ─── Questionnaire Questions ────────────────────────────────────
export const CLIMATES = [
  { value: 'tropical', label: 'Tropical', icon: '🌴' },
  { value: 'dry', label: 'Dry / Arid', icon: '🏜️' },
  { value: 'temperate', label: 'Temperate', icon: '🍂' },
  { value: 'continental', label: 'Continental', icon: '❄️' },
  { value: 'mediterranean', label: 'Mediterranean', icon: '☀️' },
  { value: 'polar', label: 'Polar / Cold', icon: '🧊' },
];

export const LIFESTYLES = [
  { value: 'corporate', label: 'Corporate Professional', icon: '💼' },
  { value: 'creative', label: 'Creative / Artist', icon: '🎨' },
  { value: 'academic', label: 'Academic / Student', icon: '📚' },
  { value: 'active', label: 'Active / Sports', icon: '🏃' },
  { value: 'social', label: 'Social / Nightlife', icon: '🎭' },
  { value: 'casual', label: 'Casual / Relaxed', icon: '🌿' },
  { value: 'travel', label: 'Travel / Nomad', icon: '✈️' },
  { value: 'luxury', label: 'Luxury / High-End', icon: '💎' },
];

export const BUDGETS = [
  { value: 'budget', label: 'Budget-Friendly', description: 'Under ₹5,000/month' },
  { value: 'moderate', label: 'Moderate', description: '₹5,000 – ₹15,000/month' },
  { value: 'premium', label: 'Premium', description: '₹15,000 – ₹50,000/month' },
  { value: 'luxury', label: 'Luxury', description: '₹50,000+/month' },
];

export const AESTHETICS = [
  { value: 'minimalist', label: 'Minimalist', image: '/images/aesthetic-minimalist.jpg' },
  { value: 'classic', label: 'Classic', image: '/images/aesthetic-classic.jpg' },
  { value: 'streetwear', label: 'Streetwear', image: '/images/aesthetic-streetwear.jpg' },
  { value: 'bohemian', label: 'Bohemian', image: '/images/aesthetic-bohemian.jpg' },
  { value: 'avant-garde', label: 'Avant-Garde', image: '/images/aesthetic-avantgarde.jpg' },
  { value: 'preppy', label: 'Preppy', image: '/images/aesthetic-preppy.jpg' },
  { value: 'scandinavian', label: 'Scandinavian', image: '/images/aesthetic-scandinavian.jpg' },
  { value: 'old-money', label: 'Old Money', image: '/images/aesthetic-oldmoney.jpg' },
  { value: 'techwear', label: 'Techwear', image: '/images/aesthetic-techwear.jpg' },
  { value: 'romantic', label: 'Romantic', image: '/images/aesthetic-romantic.jpg' },
  { value: 'athletic', label: 'Athletic / Athleisure', image: '/images/aesthetic-athletic.jpg' },
  { value: 'vintage', label: 'Vintage / Retro', image: '/images/aesthetic-vintage.jpg' },
];

export const CLOTHING_ITEMS = [
  { value: 'tshirts', label: 'T-Shirts', icon: '👕' },
  { value: 'shirts', label: 'Shirts', icon: '👔' },
  { value: 'polos', label: 'Polos', icon: '🎽' },
  { value: 'hoodies', label: 'Hoodies', icon: '🧥' },
  { value: 'jackets', label: 'Jackets', icon: '🧥' },
  { value: 'blazers', label: 'Blazers', icon: '🤵' },
  { value: 'suits', label: 'Suits', icon: '👔' },
  { value: 'jeans', label: 'Jeans', icon: '👖' },
  { value: 'chinos', label: 'Chinos', icon: '👖' },
  { value: 'shorts', label: 'Shorts', icon: '🩳' },
  { value: 'joggers', label: 'Joggers', icon: '🏃' },
  { value: 'sneakers', label: 'Sneakers', icon: '👟' },
  { value: 'boots', label: 'Boots', icon: '🥾' },
  { value: 'loafers', label: 'Loafers', icon: '👞' },
  { value: 'sandals', label: 'Sandals', icon: '🩴' },
  { value: 'watches', label: 'Watches', icon: '⌚' },
  { value: 'sunglasses', label: 'Sunglasses', icon: '🕶️' },
  { value: 'bags', label: 'Bags', icon: '👜' },
  { value: 'hats', label: 'Hats', icon: '🧢' },
  { value: 'scarves', label: 'Scarves', icon: '🧣' },
];

export const EVENTS = [
  { value: 'office', label: 'Office / Work', icon: '💼' },
  { value: 'casual', label: 'Casual Outings', icon: '☕' },
  { value: 'parties', label: 'Parties', icon: '🎉' },
  { value: 'weddings', label: 'Weddings', icon: '💒' },
  { value: 'dates', label: 'Dates', icon: '💝' },
  { value: 'gym', label: 'Gym / Sports', icon: '🏋️' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'interviews', label: 'Interviews', icon: '🎤' },
  { value: 'festivals', label: 'Festivals', icon: '🎪' },
  { value: 'religious', label: 'Religious Events', icon: '🕌' },
  { value: 'beach', label: 'Beach', icon: '🏖️' },
  { value: 'concerts', label: 'Concerts', icon: '🎵' },
];

export const PERSONALITIES = [
  { value: 'confident', label: 'Confident' },
  { value: 'introverted', label: 'Introverted' },
  { value: 'creative', label: 'Creative' },
  { value: 'bold', label: 'Bold' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'playful', label: 'Playful' },
  { value: 'sophisticated', label: 'Sophisticated' },
  { value: 'adventurous', label: 'Adventurous' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'practical', label: 'Practical' },
  { value: 'rebellious', label: 'Rebellious' },
  { value: 'classic', label: 'Classic' },
];

export const COLOR_SWATCHES = [
  { hex: '#111111', name: 'Black' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#1C1C1C', name: 'Charcoal' },
  { hex: '#4A4A4A', name: 'Dark Gray' },
  { hex: '#8B8B8B', name: 'Gray' },
  { hex: '#F5F5DC', name: 'Beige' },
  { hex: '#D2B48C', name: 'Tan' },
  { hex: '#8B4513', name: 'Saddle Brown' },
  { hex: '#2F4F4F', name: 'Dark Slate' },
  { hex: '#191970', name: 'Midnight Blue' },
  { hex: '#000080', name: 'Navy' },
  { hex: '#4169E1', name: 'Royal Blue' },
  { hex: '#87CEEB', name: 'Sky Blue' },
  { hex: '#006400', name: 'Dark Green' },
  { hex: '#2E8B57', name: 'Sea Green' },
  { hex: '#98FB98', name: 'Pale Green' },
  { hex: '#808000', name: 'Olive' },
  { hex: '#800020', name: 'Burgundy' },
  { hex: '#DC143C', name: 'Crimson' },
  { hex: '#FF6B6B', name: 'Coral Red' },
  { hex: '#FFB6C1', name: 'Light Pink' },
  { hex: '#FF69B4', name: 'Hot Pink' },
  { hex: '#FF8C00', name: 'Dark Orange' },
  { hex: '#FFD700', name: 'Gold' },
  { hex: '#FFFACD', name: 'Lemon' },
  { hex: '#E6E6FA', name: 'Lavender' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#DDA0DD', name: 'Plum' },
  { hex: '#40E0D0', name: 'Turquoise' },
  { hex: '#008080', name: 'Teal' },
  { hex: '#B8860B', name: 'Dark Goldenrod' },
  { hex: '#C0C0C0', name: 'Silver' },
];

// ─── Gemini Prompts ─────────────────────────────────────────────
export const GEMINI_ANALYSIS_PROMPT = `You are an expert fashion stylist and image analyst. Analyze the provided photo(s) of a person and return a detailed JSON analysis.

Analyze the following attributes:
1. Face shape (oval, round, square, heart, oblong, diamond, triangle)
2. Skin tone (provide hex color code and descriptive name like "fair", "light", "medium", "olive", "tan", "dark", "deep")
3. Undertone (warm, cool, neutral)
4. Eye color (descriptive name)
5. Hair color (descriptive name)  
6. Estimated body type (ectomorph, mesomorph, endomorph, or combination)
7. Body proportions (shoulder width relative, torso length, leg length, overall silhouette)
8. Color season based on 12-season color analysis (e.g., "Warm Autumn", "Cool Winter", "Light Spring")
9. Sub-season for more specificity
10. A palette of 12 recommended colors with hex codes, names, categories (best/good/accent/neutral), and reasons
11. Style personality assessment
12. Style archetype (e.g., "The Modern Classicist", "The Urban Explorer")

Return ONLY valid JSON matching this exact structure:
{
  "face_shape": "string",
  "skin_tone": "string",
  "skin_tone_hex": "#hex",
  "undertone": "warm|cool|neutral",
  "eye_color": "string",
  "hair_color": "string",
  "body_type": "string",
  "body_proportions": {
    "shoulder_width": "narrow|medium|broad",
    "torso_length": "short|proportional|long",
    "leg_length": "short|proportional|long",
    "overall": "description"
  },
  "color_season": "string",
  "color_sub_season": "string",
  "recommended_colors": [
    { "hex": "#hex", "name": "string", "category": "best|good|accent|neutral", "reason": "string" }
  ],
  "style_personality": "string",
  "style_archetype": "string"
}`;

export const GEMINI_RECOMMENDATION_PROMPT = `You are an elite personal fashion stylist. Based on the client's physical features (skin tone, color season, body type, face shape) and basic details, you must autonomously choose their perfect styling recommendations.
DO NOT rely on preferences. Be the expert. 

CRITICAL REQUIREMENT: Focus primarily on EFFORTLESS DAILY WEAR (normal daily wear, casual outings, work/office daily wear, weekend trips, travel, loungewear, and simple evening wear). 
Avoid heavy, overly formal, flashy, or dramatic clothing. Everything should be comfortable, stylish, practical, and normal daily wear.

Return ONLY valid JSON matching this structure:
{
  "style_identity": {
    "archetype": "string",
    "description": "2-3 sentences",
    "keywords": ["string"],
    "mood": "string",
    "era_inspiration": "string"
  },
  "clothing_fits": [
    { "type": "string", "recommendation": "string", "reason": "string", "avoid": "string" }
  ],
  "color_guide": {
    "best_shirt_colors": [{ "hex": "#hex", "name": "string", "reason": "string" }],
    "best_pant_colors": [{ "hex": "#hex", "name": "string", "reason": "string" }],
    "best_shoe_colors": [{ "hex": "#hex", "name": "string", "reason": "string" }],
    "accent_colors": [{ "hex": "#hex", "name": "string", "reason": "string" }],
    "colors_to_avoid": [{ "hex": "#hex", "name": "string", "reason": "string" }]
  },
  "tops": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "bottoms": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "shoes": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "accessories": [{ "name": "string", "description": "string", "category": "string", "occasion": "string", "reason": "string" }],
  "watches": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "glasses": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "bags": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "occasion": "string", "reason": "string", "budget_tier": "budget|mid|luxury" }],
  "hairstyles": [{ "name": "string", "description": "string", "face_shape_reason": "string", "maintenance": "string" }],
  "beard_suggestions": [{ "name": "string", "description": "string", "face_shape_reason": "string" }],
  "fragrances": [{ "name": "string", "family": "string", "notes": ["string"], "season": "string", "occasion": "string", "reason": "string" }],
  "fabrics": [{ "name": "string", "properties": "string", "best_for": "string", "season": "string" }],
  "seasonal_wardrobe": {
    "spring": [{ "name": "string", "description": "string", "reason": "string" }], 
    "summer": [{ "name": "string", "description": "string", "reason": "string" }], 
    "fall": [{ "name": "string", "description": "string", "reason": "string" }], 
    "winter": [{ "name": "string", "description": "string", "reason": "string" }]
  },
  "capsule_wardrobe": {
    "essentials": [{ "name": "string", "description": "string", "color": "string", "color_hex": "#hex", "reason": "string" }], 
    "total_pieces": 10, 
    "philosophy": "string"
  },
  "occasion_outfits": {
    "daily": [{ "name": "string", "description": "string", "reason": "string" }],
    "office": [{ "name": "string", "description": "string", "reason": "string" }],
    "party": [{ "name": "string", "description": "string", "reason": "string" }],
    "wedding": [{ "name": "string", "description": "string", "reason": "string" }],
    "travel": [{ "name": "string", "description": "string", "reason": "string" }],
    "gym": [{ "name": "string", "description": "string", "reason": "string" }],
    "traditional": [{ "name": "string", "description": "string", "reason": "string" }],
    "streetwear": [{ "name": "string", "description": "string", "reason": "string" }],
    "luxury": [{ "name": "string", "description": "string", "reason": "string" }]
  },
  "budget_guide": {
    "tier": "string", "monthly_budget": "string", "priority_items": ["string"],
    "save_on": ["string"], "splurge_on": ["string"], "recommended_stores": ["string"]
  },
  "mistakes_to_avoid": [{ "mistake": "string", "why": "string", "instead": "string" }],
  "why_these_work": ["string"],
  "celebrity_matches": [{ "name": "string", "similarity": "string", "key_pieces": ["string"], "how_to_achieve": "string" }]
}`;

export const DEMO_ANALYSIS_RESULT = {
  id: "demo-id",
  face_shape: "Oval",
  skin_tone: "Medium Olive",
  skin_tone_hex: "#B59E7C",
  undertone: "neutral",
  eye_color: "Dark Brown",
  hair_color: "Black",
  body_type: "Mesomorph",
  body_proportions: {
    shoulder_width: "broad",
    torso_length: "proportional",
    leg_length: "proportional",
    overall: "Well-balanced frame with slightly broader shoulders and symmetric proportions."
  },
  color_season: "Warm Autumn",
  color_sub_season: "True Autumn",
  recommended_colors: [
    { hex: "#4E5D42", name: "Olive Green", category: "best", reason: "Complements warm undertones beautifully and brings out natural warmth." },
    { hex: "#8A5A36", name: "Warm Terracotta", category: "best", reason: "Adds a rich contrast against medium olive skin." },
    { hex: "#C2A649", name: "Mustard Gold", category: "accent", reason: "Perfect for accents to highlight your features." },
    { hex: "#2B3E50", name: "Navy Blue", category: "neutral", reason: "Grounds the palette with a softer-than-black neutral option." }
  ],
  style_personality: "Effortless Smart-Casual",
  style_archetype: "The Modern Minimalist"
};

export const DEMO_RECOMMENDATIONS = {
  style_identity: {
    archetype: "The Modern Minimalist",
    description: "An effortless approach to styling featuring clean silhouettes, rich natural tones, and versatile pieces built for everyday comfort and clean-cut elegance.",
    keywords: ["Clean-cut", "Effortless", "Natural-Tones", "Versatile"],
    mood: "Sophisticated yet deeply relaxed",
    era_inspiration: "Modern Nordic Design"
  },
  clothing_fits: [
    { type: "Tees & Shirts", recommendation: "Relaxed fit with structured shoulders", reason: "Highlights your broad shoulders while keeping the torso comfortable.", avoid: "Super tight skin-clingy t-shirts" },
    { type: "Pants & Chinos", recommendation: "Straight cut or slim-tapered pants", reason: "Maintains a clean line from hip to ankle for balanced leg proportions.", avoid: "Skinny jeans or baggy cargos" }
  ],
  color_guide: {
    best_shirt_colors: [
      { hex: "#F5F5DC", name: "Warm Off-White", reason: "Brighter and warmer than pure white, perfect for your olive undertone." },
      { hex: "#4E5D42", name: "Olive Green", reason: "Harmonizes perfectly with True Autumn coloring." }
    ],
    best_pant_colors: [
      { hex: "#1C1C1C", name: "Charcoal", reason: "A softer, premium alternative to stark black for everyday pants." },
      { hex: "#D2B48C", name: "Warm Tan", reason: "A classic neutral that contrasts nicely with olive or green tops." }
    ],
    best_shoe_colors: [
      { hex: "#8B4513", name: "Rich Brown", reason: "Adds warmth to your daily outfits compared to cold black shoes." },
      { hex: "#FFFFFF", name: "Clean White", reason: "Keeps casual outfits looking fresh and modern." }
    ],
    accent_colors: [
      { hex: "#C2A649", name: "Mustard Gold", reason: "Brings a pop of warm energy into smart casual wear." }
    ],
    colors_to_avoid: [
      { hex: "#FFB6C1", name: "Stark Baby Pink", reason: "Washes out the rich warm olive undertones of your skin." }
    ]
  },
  tops: [
    { name: "Heavyweight Cotton Tee", description: "Structured crew neck in warm beige.", color: "Beige", color_hex: "#F5F5DC", occasion: "Daily Casual", reason: "Thicker fabric hangs perfectly and holds shape for daily wear.", budget_tier: "budget" },
    { name: "Relaxed Linen Blend Shirt", description: "Lightweight long sleeve button-up in Olive.", color: "Olive", color_hex: "#4E5D42", occasion: "Outings", reason: "Extremely breathable daily wear that stays smart even when rumpled.", budget_tier: "mid" },
    { name: "Fine Knit Crewneck Sweater", description: "Premium merino wool sweater in Charcoal.", color: "Charcoal", color_hex: "#4A4A4A", occasion: "Office Smart", reason: "Thin layering piece that adds instant structure over tees.", budget_tier: "mid" }
  ],
  bottoms: [
    { name: "Straight-Leg Smart Chinos", description: "Minimalist flat-front pants in Sand.", color: "Sand", color_hex: "#D2B48C", occasion: "Daily Smart-Casual", reason: "Neutral tone goes with almost any top in your palette.", budget_tier: "mid" },
    { name: "Sleek Dark Wash Denim", description: "Classic mid-rise straight jeans with minimal distressing.", color: "Indigo", color_hex: "#191970", occasion: "Daily Wear", reason: "A foundational piece that transitions easily from afternoon to evening.", budget_tier: "budget" }
  ],
  shoes: [
    { name: "Minimalist Leather Sneakers", description: "Clean white low-top sneakers in full-grain leather.", color: "White", color_hex: "#FFFFFF", occasion: "Everyday Casual", reason: "Pairs perfectly with both jeans and chinos for an instant lift.", budget_tier: "mid" },
    { name: "Suede Chelsea Boots", description: "Snuff brown suede boots with flexible crepe sole.", color: "Snuff Brown", color_hex: "#8B4513", occasion: "Outings / Evening", reason: "Gives a touch of casual refinement without being overly formal.", budget_tier: "luxury" }
  ],
  accessories: [
    { name: "Canvas Everyday Tote", description: "Minimalist cotton canvas bag with leather details.", category: "Bags", occasion: "Daily Travel", reason: "Spacious and durable for everyday essentials." }
  ],
  watches: [
    { name: "Minimalist Quartz Watch", description: "Brown leather strap watch with cream dial.", color: "Brown / Cream", color_hex: "#F5F5DC", occasion: "Daily Wear", reason: "Simple, timeless design that is highly functional.", budget_tier: "mid" }
  ],
  glasses: [
    { name: "Lightweight Tortoise Frames", description: "D-frame round glasses in warm acetate.", color: "Tortoise", color_hex: "#8B4513", occasion: "Daily Wear", reason: "Complements oval face shapes beautifully.", budget_tier: "mid" }
  ],
  bags: [
    { name: "Sleek Daypack", description: "Waterproof matte nylon backpack in olive.", color: "Olive", color_hex: "#4E5D42", occasion: "Travel / Work", reason: "Organized storage in a modern silhouette.", budget_tier: "mid" }
  ],
  hairstyles: [
    { name: "Textured Crop", description: "Short sides with scissor-cut texture on top.", face_shape_reason: "Draws eye upwards and balances oval symmetry.", maintenance: "Low" }
  ],
  beard_suggestions: [
    { name: "Short Stubble", description: "Cleanly trimmed stubble outlining the jaw.", face_shape_reason: "Adds subtle definition without hiding structure." }
  ],
  fragrances: [
    { name: "Santal 33", family: "Woody", notes: ["Sandalwood", "Cedar", "Cardamom"], season: "All-season", occasion: "Daily Signature", reason: "An understated, memorable signature scent perfect for the minimalist." }
  ],
  fabrics: [
    { name: "Organic Cotton", properties: "Breathable, soft, durable", best_for: "T-shirts and daily underwear", season: "All-season" }
  ],
  seasonal_wardrobe: {
    spring: [{ name: "Cotton Harrington Jacket", description: "Light weight, clean lines.", reason: "Perfect outer layer for transitional weather." }],
    summer: [{ name: "Linen-Cotton Shorts", description: "Breathable and structured.", reason: "Keeps you cool while looking put together." }],
    fall: [{ name: "Merino Wool Cardigan", description: "Soft, warm knit layer.", reason: "Add depth to outfits via texture layering." }],
    winter: [{ name: "Overcoat in Wool-Cashmere", description: "Structured mid-length coat.", reason: "Elegant protection against cold days." }]
  },
  capsule_wardrobe: {
    essentials: [
      { name: "Off-White Structured Tee", description: "Heavyweight clean cotton.", color: "Off-White", color_hex: "#F5F5DC", reason: "The absolute base of 80% of daily looks." },
      { name: "Olive Linen Longsleeve", description: "Casual summer button-up.", color: "Olive", color_hex: "#4E5D42", reason: "Smart yet relaxed styling choice." },
      { name: "Straight Indigo Denim", description: "Unwashed durable jeans.", color: "Indigo", color_hex: "#191970", reason: "Tough, high-use daily pant." },
      { name: "White Leather Sneakers", description: "Clean low-top profile.", color: "White", color_hex: "#FFFFFF", reason: "Footwear that goes with literally everything." }
    ],
    total_pieces: 12,
    philosophy: "Own fewer, better things that mix and match seamlessly."
  },
  occasion_outfits: {
    daily: [
      { name: "The Standard Casual", description: "Heavyweight cream t-shirt, straight dark denim, and white sneakers.", reason: "Comfortable, clean, and classic." },
      { name: "Smart Daily Jog", description: "Sleek grey joggers, breathable tech tee, and grey running trainers.", reason: "Perfect for active errands and running." }
    ],
    office: [
      { name: "Smart Casual Office", description: "Charcoal merino knit sweater over olive chino pants with clean brown leather loafers.", reason: "Professional yet approachable and comfortable." }
    ],
    party: [
      { name: "Weekend Evening Out", description: "Olive linen shirt (sleeves rolled), black slim-fit denim, and Chelsea boots.", reason: "Casual charm that stands out in ambient light." }
    ],
    wedding: [
      { name: "Relaxed Blazer Outfit", description: "Unstructured sand-colored blazer, off-white linen tee, dark wash jeans, and clean suede boots.", reason: "Perfect dressy look without being stiff." }
    ],
    travel: [
      { name: "Transit Outfit", description: "Lightweight knit hoodie, relaxed drawstring trousers, and easy slip-on sneakers.", reason: "Ideal for long flights and train journeys." }
    ],
    gym: [
      { name: "Athleisure Fit", description: "Lightweight charcoal tech tee, forest green athletic shorts, and training shoes.", reason: "Designed for high performance and breathability." }
    ],
    traditional: [
      { name: "Clean Kurta Look", description: "Unadorned off-white cotton kurta with dark brown trousers and leather sandals.", reason: "Keeps traditional wear comfortable and minimal." }
    ],
    streetwear: [
      { name: "Urban Comfort", description: "Oversized beige tee, loose-fit black pants, and chunky white sneakers.", reason: "Modern silhouette with focus on shape." }
    ],
    luxury: [
      { name: "Premium Loungewear", description: "Superfine pima cotton matching tee and shorts set in charcoal.", reason: "Indulgent comfort for luxury relaxation at home." }
    ]
  },
  budget_guide: {
    tier: "Mid-Range Comfort",
    monthly_budget: "₹10,000",
    priority_items: ["Quality Shoes", "Perfect Fit Jeans"],
    save_on: ["Basic T-Shirts", "Socks"],
    splurge_on: ["Outerwear", "Footwear"],
    recommended_stores: ["Uniqlo", "Zara", "H&M Premium", "Westside"]
  },
  mistakes_to_avoid: [
    { mistake: "Wearing saturated neon colors", why: "True Autumn skin tones are muted and warm; neons clash heavily with this.", instead: "Choose earthy, warm tones like rust or mustard." }
  ],
  why_these_work: [
    "Warm tones match the golden undertones in your skin.",
    "Straight cuts balance your mesomorphic frame without clinging."
  ],
  celebrity_matches: [
    { name: "Ryan Gosling", similarity: "88%", key_pieces: ["Harrington Jackets", "Clean crewneck knits"], how_to_achieve: "Focus on simple, well-fitted classics in warm, earthy colors." }
  ]
};

