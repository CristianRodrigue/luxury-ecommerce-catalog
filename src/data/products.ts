export interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
  image: string;
  description: string;
  isNew?: boolean;
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "Athletic Dept. Crest Tee", 
    price: "150", 
    type: "Limited", 
    image: "/PNG/Athletic Dept. Crest Tee (Limited).png",
    description: "Built for the Grind. This heavy-weight crest tee features high-density embroidery and a reinforced collar. Engineered for total durability in combat and streetwear scenarios.",
    isNew: true
  },
  { 
    id: 2, 
    name: "Athletic Dept. Heritage Tee", 
    price: "145", 
    type: "Limited", 
    image: "/PNG/Athletic Dept. Heritage Tee (Limited).png",
    description: "The Standard of Excellence. A clean, architectural fit designed to move with the athlete. Crafted from premium long-staple cotton for a luxury feel with industrial strength.",
    isNew: true
  },
  { 
    id: 3, 
    name: "Championship Mesh Shorts", 
    price: "120", 
    type: "Combat Gear", 
    image: "/PNG/Championship Mesh Shorts (Combat Gear o Staples).png",
    description: "Engineered for Combat. High-performance double-layered mesh provides maximum breathability. Featuring a reinforced waistband and tactical side slits for unrestricted movement.",
    isNew: false
  },
  { 
    id: 4, 
    name: "Heavyweight Heritage Hoodie", 
    price: "280", 
    type: "Streetwear", 
    image: "/PNG/Heavyweight Heritage Hoodie (Streetwear).png",
    description: "The Ultimate Heavyweight. 500GSM brushed fleece ensures maximum comfort and thermal protection. Over-sized luxury fit with heritage P4P branding.",
    isNew: true
  },
  { 
    id: 5, 
    name: "The Elite Muscle Tank", 
    price: "95", 
    type: "Staples", 
    image: "/PNG/The Elite Muscle Tank (staples).png",
    description: "Clean. Aggressive. The Elite Muscle Tank is cut for the athlete's physique. Low-armhole design for maximum ventilation during high-intensity sessions.",
    isNew: false
  },
];
