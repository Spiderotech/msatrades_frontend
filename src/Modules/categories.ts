const categoryImages = {
  Cycles: "/catalog/mountain-bike.png",
  "Mountain Bikes": "/catalog/mountain-bike.png",
  "Road Bikes": "/catalog/road-bike.png",
  "Hybrid Bikes": "/catalog/hybrid-bike.png",
  Accessories: "/catalog/cycle-bag.png",
  "Cycle Bags": "/catalog/cycle-bag.png",
  Lights: "/catalog/cycle-light.png",
  Locks: "/catalog/cycle-lock.png",
  "Spare Parts": "/catalog/cycle-gear.png",
  Tires: "/catalog/cycle-tire.png",
  Brakes: "/catalog/cycle-brake.png",
  Chains: "/catalog/cycle-chain.png",
  Gears: "/catalog/cycle-gear.png",
};

const categoryImage = (label: string) => categoryImages[label] || "/catalog/hybrid-bike.png";

export const categories = [
  {
    id: 1,
    name: "Cycles",
    image: categoryImage("Cycles"),
    products: 9,
    description: "Explore practical cycles for trail riding, road fitness, commuting, and everyday leisure.",
    subcategories: [
      {
        name: "Mountain Bikes",
        image: categoryImage("Mountain Bikes"),
        products: 3,
        description: "Trail-ready cycles built for grip, control, and rougher outdoor routes.",
      },
      {
        name: "Road Bikes",
        image: categoryImage("Road Bikes"),
        products: 3,
        description: "Light and efficient cycles designed for paved roads, speed, and distance.",
      },
      {
        name: "Hybrid Bikes",
        image: categoryImage("Hybrid Bikes"),
        products: 3,
        description: "Versatile cycles for commuting, relaxed fitness, and mixed everyday routes.",
      },
    ],
  },
  {
    id: 2,
    name: "Accessories",
    image: categoryImage("Accessories"),
    products: 9,
    description: "Find useful cycling accessories for storage, visibility, safety, and security.",
    subcategories: [
      {
        name: "Cycle Bags",
        image: categoryImage("Cycle Bags"),
        products: 3,
        description: "Saddle, frame, handlebar, and rack bags for carrying daily ride essentials.",
      },
      {
        name: "Lights",
        image: categoryImage("Lights"),
        products: 3,
        description: "Front, rear, and visibility lights for low-light and night riding.",
      },
      {
        name: "Locks",
        image: categoryImage("Locks"),
        products: 3,
        description: "Cycle locks for quick stops, daily parking, and added security.",
      },
    ],
  },
  {
    id: 3,
    name: "Spare Parts",
    image: categoryImage("Spare Parts"),
    products: 12,
    description: "Replacement parts to keep cycles smooth, safe, and ready for regular use.",
    subcategories: [
      {
        name: "Tires",
        image: categoryImage("Tires"),
        products: 3,
        description: "Road, trail, touring, and mixed-surface tires for different riding needs.",
      },
      {
        name: "Brakes",
        image: categoryImage("Brakes"),
        products: 3,
        description: "Brake kits, calipers, and service parts for dependable stopping control.",
      },
      {
        name: "Chains",
        image: categoryImage("Chains"),
        products: 3,
        description: "Replacement chains for smooth shifting, power transfer, and drivetrain care.",
      },
      {
        name: "Gears",
        image: categoryImage("Gears"),
        products: 3,
        description: "Cassettes, shifters, and derailleur parts for clean gear changes.",
      },
    ],
  },
];
