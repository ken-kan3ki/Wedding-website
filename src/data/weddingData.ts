import heroLahoreMarquee from '../assets/images/hero_lahore_marquee_1794130651543.jpg';
import bridalCoutureRed from '../assets/images/bridal_couture_red_1794130652402.jpg';
import walimaStageDecor from '../assets/images/walima_stage_decor_1794130652967.jpg';
import mehndiHennaArtisan from '../assets/images/mehndi_henna_artisan_1794130653455.jpg';

export const ASSETS = {
  heroLahoreMarquee,
  bridalCoutureRed,
  walimaStageDecor,
  mehndiHennaArtisan,
};

export interface Venue {
  id: string;
  name: string;
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Multan';
  area: string;
  address: string;
  capacityMin: number;
  capacityMax: number;
  pricePerHeadMin: number;
  pricePerHeadMax: number;
  hallRent: number;
  images: string[];
  isVerified: boolean;
  segregatedHalls: boolean;
  oneDishCompliant: boolean;
  generatorBackup: boolean;
  valetParking: boolean;
  bridalSuite: boolean;
  outsideCateringAllowed: boolean;
  curfewTime: string;
  curfewNote: string;
  featured: boolean;
  description: string;
  specifications: {
    totalAreaSqFt: string;
    ceilingHeightFt: number;
    parkingCapacity: number;
    bridalSuitesCount: number;
    acBrand: string;
  };
  menus: {
    name: string;
    price: number;
    description: string;
    items: string[];
  }[];
}

export interface Vendor {
  id: string;
  name: string;
  discipline: 'Bridal Couture' | 'Fine Art Photography' | 'Stage Décor' | 'Desi Catering' | 'Makeup Artists' | 'Henna Artisans' | 'Luxury Vintage Rentals' | 'Live Music & Qawwali';
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Multan';
  area: string;
  ceremonies: ('Mayun / Dholak' | 'Mehndi' | 'Baraat / Nikkah' | 'Walima')[];
  startingPricePkr: number;
  priceUnit: string;
  turnaroundTime: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  leadTimeWeeks: number;
  image: string;
  portfolio: string[];
  tagline: string;
  inclusions: string[];
  featured: boolean;
}

export interface RealWedding {
  id: string;
  couple: string;
  ceremony: 'Mehndi' | 'Baraat / Nikkah' | 'Walima';
  city: string;
  venueName: string;
  venueId?: string;
  date: string;
  coverImage: string;
  story: string;
  palette: string[];
  guestCount: number;
  vendors: {
    role: string;
    name: string;
  }[];
}

export const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Multan'] as const;

export const CATEGORIES = [
  { id: 'marquees', name: 'Marquees & Banquets', count: '48 Palaces', icon: 'Building2', desc: 'Mughal arched halls, crystal ballrooms & climate-controlled lawns' },
  { id: 'bridal-couture', name: 'Bridal Couture Ateliers', count: '32 Designers', icon: 'Sparkles', desc: 'Bespoke crimson zardozi, dabka craftsmanship & heirloom lehengas' },
  { id: 'photography', name: 'Fine Art Photographers', count: '41 Masters', icon: 'Camera', desc: 'Cinematic wedding teasers, editorial portraits & candid documentary' },
  { id: 'decor', name: 'Stage & Floral Décor', count: '36 Curators', icon: 'Flower2', desc: 'Imperial jaali screens, imported Ecuadorian roses & chandeliers' },
  { id: 'catering', name: 'Desi Catering Masters', count: '29 Chefs', icon: 'Utensils', desc: 'Dum pukht mutton biryani, royal haleem, live jalebi & rabri' },
  { id: 'makeup', name: 'Haute Bridal Makeup', count: '24 Salons', icon: 'Smile', desc: 'Dewy royal bridal signatures, traditional Nikkah glow & airbrush' },
  { id: 'henna', name: 'Bespoke Henna Artisans', count: '18 Artists', icon: 'Feather', desc: 'Pure organic Rajasthani henna, architectural jaali & portrait mehendi' },
  { id: 'rentals', name: 'Vintage Car & Doli Fleet', count: '15 Fleets', icon: 'Car', desc: 'Classic Rolls-Royce, vintage Mercedes & hand-carved floral doli' },
];

export const VENUES_DATA: Venue[] = [
  {
    id: 'nishat-banquets-lahore',
    name: 'The Nishat Royal Marquee & Banquets',
    city: 'Lahore',
    area: 'Gulberg & Emporium',
    address: 'Abdul Haque Rd, Phase 2, Johar Town / Gulberg III, Lahore',
    capacityMin: 300,
    capacityMax: 1800,
    pricePerHeadMin: 3200,
    pricePerHeadMax: 6500,
    hallRent: 450000,
    images: [
      heroLahoreMarquee,
      walimaStageDecor,
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: true,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: false,
    curfewTime: '10:00 PM',
    curfewNote: 'Punjab Marriage Ordinance strictly enforced. Sharp 10:00 PM lights-out.',
    featured: true,
    description: 'Lahore’s definitive address for grand society weddings. Featuring 32-foot towering ceilings, Swarovski crystal chandeliers, separate soundproof segregated halls, and high-security VIP executive gates.',
    specifications: {
      totalAreaSqFt: '38,000 sq ft',
      ceilingHeightFt: 32,
      parkingCapacity: 650,
      bridalSuitesCount: 3,
      acBrand: 'Daikin Central Inverter 120 Ton',
    },
    menus: [
      {
        name: 'Punjab Statutory One-Dish Menu',
        price: 3200,
        description: 'Compliant with Punjab Government Marriage Act: 1 Main Dish + Rice + Roti + 1 Sweet + Salad Bar.',
        items: ['Mutton Qorma or Mutton Kunna', 'Shahi Zafrani Mutton Biryani', 'Roghni Naan & Taftan', 'Warm Gulab Jamun with Rabri', 'Fresh Seasonal Mint & Kachumber Salad', 'Assorted Mineral Waters & Soft Drinks']
      },
      {
        name: 'The Shahi Dawat Walima Buffet',
        price: 4800,
        description: 'Our signature royal feast designed for high-profile receptions and Walima dockets.',
        items: ['Shahi Dum Pukht Mutton Qorma', 'Special Dumpukht Shinwari Lamb Karahi', 'Sindhi Mutton Biryani with Potatoes', 'Chicken Malai Boti Skewers', 'Live Tandoor Roghni & Garlic Naan', 'Zafrani Kheer in Clay Pots', 'Live Jalebi Station with Malai', 'Kashmiri Chai with Pistachios']
      },
      {
        name: 'Imperial Presidential Banquet',
        price: 6500,
        description: 'Multi-course gastronomic luxury including live carving stations, imported desserts, and signature mocktails.',
        items: ['Whole Roasted Stuffed Lamb with Fragrant Rice', 'Royal Mughlai Mutton Champ Masala', 'Charcoal Grilled Jumbo Prawns', 'White Chicken Karahi', 'Sheermal & Taftan', 'Belgian Chocolate Warm Fondant', 'Shahi Tukray with Saffron Silver Leaf', 'Signature Fresh Sugarcane & Mint Coolers']
      }
    ]
  },
  {
    id: 'mughal-heritage-marquee-dha',
    name: 'Mughal Heritage Palace Marquee',
    city: 'Lahore',
    area: 'DHA Phase 5 & 6',
    address: 'Bedian Road, Near DHA Phase 5 Ext, Lahore',
    capacityMin: 200,
    capacityMax: 1200,
    pricePerHeadMin: 2800,
    pricePerHeadMax: 5200,
    hallRent: 380000,
    images: [
      walimaStageDecor,
      heroLahoreMarquee
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: true,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: true,
    curfewTime: '10:00 PM',
    curfewNote: 'Punjab curfew 10:00 PM strictly monitored by district administration.',
    featured: true,
    description: 'Inspired by Lahore Fort’s Sheesh Mahal architecture with hand-carved stone pillars, fountains, private bridal lounges, and complete dual-hall segregation.',
    specifications: {
      totalAreaSqFt: '28,000 sq ft',
      ceilingHeightFt: 26,
      parkingCapacity: 400,
      bridalSuitesCount: 2,
      acBrand: 'York Heavy Commercial HVAC',
    },
    menus: [
      {
        name: 'Classical One-Dish Special',
        price: 2800,
        description: 'Traditional taste cooked by generational Shahi chefs.',
        items: ['Mutton Mughlai Qorma', 'Dum Pukht Basmati Rice', 'Roghni Naan', 'Gajar ka Halwa (seasonal) or Shahi Kheer', 'Raita & Chutney Assortment']
      },
      {
        name: 'Heirloom Walima Spread',
        price: 4400,
        description: 'Exquisite mutton specialties with live tandoor and dry fruit halwa.',
        items: ['Lahori Mutton Karahi (Desi Ghee)', 'Mutton Pulao with Shami Kebabs', 'Chicken Reshmi Handi', 'Kandahari Naan', 'Zafrani Kheer & Kulfa', 'Peshawari Green Tea with Cardamom']
      }
    ]
  },
  {
    id: 'creek-lawns-karachi',
    name: 'Creek Marina Grand Lawns & Marquee',
    city: 'Karachi',
    area: 'DHA Phase 8 & Creek',
    address: 'Creek Avenue, Phase 8, Defence Housing Authority, Karachi',
    capacityMin: 400,
    capacityMax: 2500,
    pricePerHeadMin: 3400,
    pricePerHeadMax: 7000,
    hallRent: 600000,
    images: [
      heroLahoreMarquee,
      walimaStageDecor
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: false,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: true,
    curfewTime: '11:30 PM',
    curfewNote: 'Sindh regulations allow events up to 11:30 PM.',
    featured: true,
    description: 'Karachi’s most scenic coastal wedding venue overlooking the Arabian Sea creek. Features lush velvet lawn expanses, soundproof marquee interiors, and helipad accessibility.',
    specifications: {
      totalAreaSqFt: '55,000 sq ft',
      ceilingHeightFt: 30,
      parkingCapacity: 900,
      bridalSuitesCount: 4,
      acBrand: 'Mitsubishi Heavy Multi-Split',
    },
    menus: [
      {
        name: 'Karachi Coastal Royal Dawat',
        price: 3800,
        description: 'Signature spiced Karachi mutton biryani and fresh seafood barbecue.',
        items: ['Authentic Memoni Mutton Biryani', 'Mutton Karahi in Desi Makhan', 'Fish Tikka Charcoal Grilled', 'Chicken Boti & Bihari Boti', 'Puri Paratha & Taftan', 'Rabri Jalebi & Matka Kulfi']
      },
      {
        name: 'Executive Creek Grand Feast',
        price: 5500,
        description: 'Expansive multi-cuisine buffet tailored for large cosmopolitan gatherings.',
        items: ['Mutton White Handi', 'Nalli Biryani with Saffron', 'Grilled Red Snapper Fillets', 'Reshmi Kabab & Seekh Kabab', 'Assorted Naan & Kulcha', 'Live Chocolate Fountain & Kheer', 'Doodh Patti Chai']
      }
    ]
  },
  {
    id: 'serena-sheesh-mahal-islamabad',
    name: 'Serena Sheesh Mahal & Mughal Lawns',
    city: 'Islamabad',
    area: 'Sector G-5 & Diplomatic Enclave',
    address: 'Khayaban-e-Suhrawardy, Sector G-5/1, Islamabad',
    capacityMin: 250,
    capacityMax: 1500,
    pricePerHeadMin: 4500,
    pricePerHeadMax: 8500,
    hallRent: 750000,
    images: [
      walimaStageDecor,
      heroLahoreMarquee
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: true,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: false,
    curfewTime: '10:30 PM',
    curfewNote: 'Federal capital security curfew 10:30 PM.',
    featured: true,
    description: 'The epitome of diplomatic prestige and royal hospitality in Islamabad. Impeccable white glove service, exquisite five-star gourmet dining, and Margalla Hills view backdrop.',
    specifications: {
      totalAreaSqFt: '32,000 sq ft',
      ceilingHeightFt: 28,
      parkingCapacity: 500,
      bridalSuitesCount: 3,
      acBrand: 'Carrier Integrated 150 Ton Chiller',
    },
    menus: [
      {
        name: 'Diplomatic One-Dish Standard',
        price: 4500,
        description: 'Refined single-entree menu crafted by Serena master chefs.',
        items: ['Margalla Mutton Shank Qorma', 'Zafrani Pulao with Almonds & Raisins', 'Taftan & Garlic Naan', 'Saffron Shahi Tukray with Gold Leaf', 'Serena Signature Salads & Mint Chutney']
      },
      {
        name: 'Presidential Royal Dawat',
        price: 6800,
        description: 'Elite royal spread with generational Pakistani recipes and Western confectionery.',
        items: ['Slow-Cooked Dum Mutton Qorma', 'Mutton Chilman Biryani in Pastry Dome', 'Kastoori Boti & Tandoori Chops', 'Taftan & Roghni Naan', 'Zafrani Kheer & Pistachio Baklava', 'Live Green Tea & Kahwa']
      }
    ]
  },
  {
    id: 'ramada-royal-multan',
    name: 'Ramada Royal Ballroom & Lawn',
    city: 'Multan',
    area: 'Multan Cantt & Abdali Road',
    address: '76 Abdali Road, Multan Cantt, Multan',
    capacityMin: 150,
    capacityMax: 900,
    pricePerHeadMin: 2200,
    pricePerHeadMax: 4200,
    hallRent: 300000,
    images: [
      heroLahoreMarquee,
      walimaStageDecor
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: true,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: false,
    curfewTime: '10:00 PM',
    curfewNote: 'South Punjab marriage regulations strictly observed.',
    featured: false,
    description: 'Multan’s premier international standard ballroom with authentic Sohan Halwa dessert services, segregated dining partitions, and 100% backup power systems.',
    specifications: {
      totalAreaSqFt: '22,000 sq ft',
      ceilingHeightFt: 24,
      parkingCapacity: 350,
      bridalSuitesCount: 2,
      acBrand: 'Gree Commercial VRF',
    },
    menus: [
      {
        name: 'Multani One-Dish Tradition',
        price: 2200,
        description: 'Authentic Saraiki and Punjabi wedding flavors.',
        items: ['Desi Ghee Mutton Karahi', 'Basmati Zeera Rice', 'Roghni Naan', 'Original Multani Hafiz Ka Sohan Halwa', 'Raita & Salad']
      },
      {
        name: 'The Royal Cantt Banquet',
        price: 3600,
        description: 'Lavish traditional feast for wedding receptions.',
        items: ['Mutton Qorma Special', 'Multani Mutton Pulao', 'Chicken Seekh Kebabs', 'Live Naan Tandoor', 'Shahi Firni in Kasoorian & Sohan Halwa', 'Kashmiri Chai']
      }
    ]
  },
  {
    id: 'clifton-marriott-marquee',
    name: 'The Pavilion Marquee & Clifton Ballrooms',
    city: 'Karachi',
    area: 'Clifton Block 4',
    address: 'Abdullah Haroon Road, Civil Lines & Clifton, Karachi',
    capacityMin: 300,
    capacityMax: 1600,
    pricePerHeadMin: 3600,
    pricePerHeadMax: 6800,
    hallRent: 500000,
    images: [
      walimaStageDecor,
      heroLahoreMarquee
    ],
    isVerified: true,
    segregatedHalls: true,
    oneDishCompliant: false,
    generatorBackup: true,
    valetParking: true,
    bridalSuite: true,
    outsideCateringAllowed: false,
    curfewTime: '11:30 PM',
    curfewNote: 'Extended weekend timing permissible in Clifton district.',
    featured: false,
    description: 'Centrally located luxury marquee with ambient crystal ceiling lighting, VIP protocol lounge, and world-class culinary brigades.',
    specifications: {
      totalAreaSqFt: '35,000 sq ft',
      ceilingHeightFt: 27,
      parkingCapacity: 600,
      bridalSuitesCount: 3,
      acBrand: 'Trane Heavy HVAC',
    },
    menus: [
      {
        name: 'Clifton Imperial Reception',
        price: 4200,
        description: 'Lavish Karachi wedding menu with slow cooked meats and BBQ.',
        items: ['Mutton Shinwari Karahi', 'Sindhi Mutton Biryani', 'Chicken Malai Tikka', 'Tandoori Parathas & Taftan', 'Warm Shahi Halwa & Matka Kulfi', 'Peshawari Kahwa']
      }
    ]
  }
];

export const VENDORS_DATA: Vendor[] = [
  {
    id: 'ali-xeeshan-atelier',
    name: 'Ali Xeeshan Theater Studio',
    discipline: 'Bridal Couture',
    city: 'Lahore',
    area: 'Gulberg II',
    ceremonies: ['Mehndi', 'Baraat / Nikkah'],
    startingPricePkr: 850000,
    priceUnit: 'per bridal ensemble',
    turnaroundTime: '12–16 Weeks Handcraft',
    rating: 4.9,
    reviewsCount: 128,
    isVerified: true,
    leadTimeWeeks: 14,
    image: bridalCoutureRed,
    portfolio: [
      bridalCoutureRed,
      mehndiHennaArtisan
    ],
    tagline: 'Mughal theatrical grandeur with bespoke dabka, antique tilla, and handwoven raw silk.',
    inclusions: [
      'Personal design consultation with master atelier',
      '3 custom measurement fittings in bridal salon',
      'Matching groom pocket square & shawl accents',
      'Archival keepsake bridal packaging box'
    ],
    featured: true
  },
  {
    id: 'mahas-photography-films',
    name: "Maha's Photography & Films",
    discipline: 'Fine Art Photography',
    city: 'Lahore',
    area: 'DHA Phase 3',
    ceremonies: ['Mayun / Dholak', 'Mehndi', 'Baraat / Nikkah', 'Walima'],
    startingPricePkr: 350000,
    priceUnit: 'per 2-day wedding package',
    turnaroundTime: 'Cinematic Teaser in 7 Days',
    rating: 4.95,
    reviewsCount: 240,
    isVerified: true,
    leadTimeWeeks: 6,
    image: mehndiHennaArtisan,
    portfolio: [
      bridalCoutureRed,
      walimaStageDecor
    ],
    tagline: 'Pakistan’s foremost documentary wedding visualists, capturing soulful emotion and regal poise.',
    inclusions: [
      '3 Lead photographers + 2 Cinematic 4K videographers',
      'Raw footage hard drive delivered within 48 hours',
      '3–5 minute 4K cinematic highlight reel in 7 days',
      'Hand-bound Italian leather fine art photobook (80 pages)'
    ],
    featured: true
  },
  {
    id: 'qyt-events-lahore',
    name: 'Qasim Yar Tiwana (QYT) Royal Décor',
    discipline: 'Stage Décor',
    city: 'Lahore',
    area: 'Gulberg III & Cantt',
    ceremonies: ['Mehndi', 'Baraat / Nikkah', 'Walima'],
    startingPricePkr: 750000,
    priceUnit: 'per bespoke stage concept',
    turnaroundTime: 'Concept 3D Render in 4 Days',
    rating: 4.9,
    reviewsCount: 165,
    isVerified: true,
    leadTimeWeeks: 8,
    image: walimaStageDecor,
    portfolio: [
      walimaStageDecor,
      heroLahoreMarquee
    ],
    tagline: 'Monumental architectural stage arches, imported Dutch flora, and opulent crystal walkways.',
    inclusions: [
      'Complete stage archway with hand-carved jaali screens',
      'Fresh floral installation: 2,500 stems of roses & hydrangeas',
      'Ambient stage intelligent pin-spot lighting',
      'Custom chaise lounge, royal high-back thrones & footrests'
    ],
    featured: true
  },
  {
    id: 'bunto-kazmi-karachi',
    name: 'Bunto Kazmi Heirloom Atelier',
    discipline: 'Bridal Couture',
    city: 'Karachi',
    area: 'Clifton',
    ceremonies: ['Baraat / Nikkah', 'Walima'],
    startingPricePkr: 1200000,
    priceUnit: 'per heirloom bridal',
    turnaroundTime: '20–24 Weeks Master Craftsmen',
    rating: 5.0,
    reviewsCount: 89,
    isVerified: true,
    leadTimeWeeks: 20,
    image: bridalCoutureRed,
    portfolio: [
      bridalCoutureRed
    ],
    tagline: 'Museum-grade craftsmanship preserving centuries of Kashmiri kani and Persian miniature motifs.',
    inclusions: [
      'Direct bespoke sketches with master designer',
      'Pure real silver and gold tilla threads',
      'Heirloom certificate of authenticity and provenance',
      'Private salon trial appointments'
    ],
    featured: true
  },
  {
    id: 'royal-chef-muhammad-din',
    name: 'Haji Muhammad Din Shahi Catering',
    discipline: 'Desi Catering',
    city: 'Lahore',
    area: 'Anarkali & Model Town',
    ceremonies: ['Mehndi', 'Baraat / Nikkah', 'Walima'],
    startingPricePkr: 2400,
    priceUnit: 'per guest banquet setup',
    turnaroundTime: 'Tasting Session within 48h',
    rating: 4.85,
    reviewsCount: 310,
    isVerified: true,
    leadTimeWeeks: 3,
    image: heroLahoreMarquee,
    portfolio: [
      heroLahoreMarquee
    ],
    tagline: 'Third-generation Mughal Bawarchikhana masters revered for slow-cooked Dum Pukht mutton and saffron biryani.',
    inclusions: [
      'Live clay tandoors with 8 dedicated naan bakers',
      'Copper handis and brass presentation chafing dishes',
      'Strict quality check: organic livestock and pure butter ghee',
      'Live dessert counter: piping hot jalebi & rabri kulfi'
    ],
    featured: true
  },
  {
    id: 'kashees-henna-lounge',
    name: 'Kashee’s Royal Henna & Bridal Lounge',
    discipline: 'Henna Artisans',
    city: 'Karachi',
    area: 'Tariq Road & Clifton',
    ceremonies: ['Mayun / Dholak', 'Mehndi'],
    startingPricePkr: 45000,
    priceUnit: 'per full bridal henna',
    turnaroundTime: 'Organic Dark Stain Guaranteed',
    rating: 4.8,
    reviewsCount: 420,
    isVerified: true,
    leadTimeWeeks: 4,
    image: mehndiHennaArtisan,
    portfolio: [
      mehndiHennaArtisan
    ],
    tagline: 'Intricate heirloom jaali patterns, Mughal couple portraits, and pure triple-filtered Rajasthani sojat henna.',
    inclusions: [
      'Both hands (elbow length) + feet (calf length)',
      'Customized hidden groom initials and miniature motifs',
      'Natural clove & eucalyptus aftercare stain seal oil',
      '4 complimentary family palms application on Mehndi night'
    ],
    featured: true
  },
  {
    id: 'natasha-salon-makeup',
    name: 'Natasha Salon Haute Bridal Makeup',
    discipline: 'Makeup Artists',
    city: 'Karachi',
    area: 'DHA Phase 6',
    ceremonies: ['Mehndi', 'Baraat / Nikkah', 'Walima'],
    startingPricePkr: 180000,
    priceUnit: 'per bridal signature look',
    turnaroundTime: '3 Prep Skin Consultations',
    rating: 4.9,
    reviewsCount: 195,
    isVerified: true,
    leadTimeWeeks: 5,
    image: bridalCoutureRed,
    portfolio: [
      bridalCoutureRed
    ],
    tagline: 'Globally celebrated for luminous, dewy skin, sculpted Mughal eyes, and bespoke dupatta draping.',
    inclusions: [
      'Airbrush HD base suited for heavy 4K wedding video lights',
      'Luxury eyelash styling & jewelry placement',
      'Dupatta setting & veil security with needlework',
      'Touch-up emergency kit for ceremony evening'
    ],
    featured: true
  },
  {
    id: 'rolls-royce-vintage-fleet',
    name: 'Imperial Vintage & Heritage Doli Fleet',
    discipline: 'Luxury Vintage Rentals',
    city: 'Islamabad',
    area: 'F-7 & Blue Area',
    ceremonies: ['Baraat / Nikkah', 'Walima'],
    startingPricePkr: 95000,
    priceUnit: 'per event chauffeur hire',
    turnaroundTime: 'Chauffeur in White Uniform',
    rating: 4.88,
    reviewsCount: 75,
    isVerified: true,
    leadTimeWeeks: 2,
    image: heroLahoreMarquee,
    portfolio: [
      heroLahoreMarquee
    ],
    tagline: 'Arrive like royalty in 1962 Rolls-Royce Silver Cloud, 1954 Jaguar Mark VII, or custom floral palanquin.',
    inclusions: [
      '6 hours dedicated service with licensed private chauffeur',
      'Fresh floral bonnet and door handle styling (custom palette)',
      'Backup chase vehicle included for zero downtime',
      'Complimentary champagne flutes & sparkling apple cider'
    ],
    featured: false
  }
];

export const REAL_WEDDINGS: RealWedding[] = [
  {
    id: 'zara-hamza-walima',
    couple: 'Zara & Hamza',
    ceremony: 'Walima',
    city: 'Lahore',
    venueName: 'The Nishat Royal Marquee',
    venueId: 'nishat-banquets-lahore',
    date: 'February 2026',
    coverImage: heroLahoreMarquee,
    story: 'An architectural Walima reception hosting 1,200 guests with emerald foliage, Mughal ivory arches, and a timeless bespoke ivory ensemble.',
    palette: ['#0F382C', '#C5A880', '#FAF8F5'],
    guestCount: 1200,
    vendors: [
      { role: 'Venue', name: 'The Nishat Royal Marquee' },
      { role: 'Décor & Flowers', name: 'QYT Royal Décor' },
      { role: 'Photography', name: "Maha's Photography & Films" },
      { role: 'Bridal Couture', name: 'Ali Xeeshan Theater Studio' }
    ]
  },
  {
    id: 'areeba-daniyal-mehndi',
    couple: 'Areeba & Daniyal',
    ceremony: 'Mehndi',
    city: 'Karachi',
    venueName: 'Creek Marina Grand Lawns',
    venueId: 'creek-lawns-karachi',
    date: 'January 2026',
    coverImage: mehndiHennaArtisan,
    story: 'An electric outdoor coastal Mehndi with traditional dholak circles, thousands of marigold blooms, and bespoke henna storytelling.',
    palette: ['#D4AF37', '#725B38', '#0B0F17'],
    guestCount: 850,
    vendors: [
      { role: 'Venue', name: 'Creek Marina Grand Lawns' },
      { role: 'Henna Artistry', name: "Kashee's Royal Henna" },
      { role: 'Makeup', name: 'Natasha Salon Haute Bridal' },
      { role: 'Catering', name: 'Haji Muhammad Din Catering' }
    ]
  },
  {
    id: 'sana-bilal-baraat',
    couple: 'Sana & Bilal',
    ceremony: 'Baraat / Nikkah',
    city: 'Islamabad',
    venueName: 'Serena Sheesh Mahal',
    venueId: 'serena-sheesh-mahal-islamabad',
    date: 'December 2025',
    coverImage: bridalCoutureRed,
    story: 'A solemn royal Nikkah followed by a candlelight Baraat against the Margalla hills, celebrating authentic heritage craft.',
    palette: ['#0B0F17', '#C5A880', '#BA1A1A'],
    guestCount: 650,
    vendors: [
      { role: 'Venue', name: 'Serena Sheesh Mahal & Mughal Lawns' },
      { role: 'Bridal Couture', name: 'Bunto Kazmi Heirloom Atelier' },
      { role: 'Décor', name: 'QYT Royal Décor' },
      { role: 'Photography', name: "Maha's Photography & Films" }
    ]
  }
];

export const EDITORIAL_ARTICLES = [
  {
    id: 'punjab-one-dish-law-guide',
    title: 'Navigating Punjab’s One-Dish Law & 10:00 PM Curfew for 2026 Weddings',
    summary: 'A practical legal and hospitality guide for families planning in Lahore, Rawalpindi, and Multan. Understanding permissible catering menus, strict curfew penalties, and generator backup compliances.',
    category: 'Legal & Protocol',
    readTime: '6 min read',
    date: 'Published Feb 2026'
  },
  {
    id: 'segregated-halls-planning',
    title: 'The Art of Segregated Hall Planning: Acoustic Isolation & Dual Buffets',
    summary: 'How Pakistan’s top marquee architects create seamless flow for families requiring soundproof male and female halls while maintaining equal ceremonial grandeur on both sides.',
    category: 'Venue Architecture',
    readTime: '8 min read',
    date: 'Published Jan 2026'
  },
  {
    id: 'couture-trousseau-timeline',
    title: 'The Royal Trousseau Timeline: When to Book Bunto, Faraz Manan & Ali Xeeshan',
    summary: 'From hand-dyed organzas to real silver tilla sampling, here is why bespoke Pakistani bridal ensembles require a minimum of 4 to 6 months of atelier lead time.',
    category: 'Haute Couture',
    readTime: '5 min read',
    date: 'Published Nov 2025'
  }
];
