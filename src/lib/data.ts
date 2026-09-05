export type Service = {
  title: string;
  description: string;
  icon: "fdm" | "resin" | "proto" | "functional" | "custom" | "batch";
};

export const services: Service[] = [
  {
    title: "FDM Printing",
    description: "Durable parts in PLA, PETG, ABS and more.",
    icon: "fdm",
  },
  {
    title: "Resin / SLA Printing",
    description: "Ultra-fine detail for miniatures and molds.",
    icon: "resin",
  },
  {
    title: "Prototyping",
    description: "Iterate fast, from concept to first article.",
    icon: "proto",
  },
  {
    title: "Functional Parts",
    description: "Engineered for load, heat and fatigue.",
    icon: "functional",
  },
  {
    title: "Custom Projects",
    description: "Complex geometry, tailored to your brief.",
    icon: "custom",
  },
  {
    title: "Small Batch Production",
    description: "Consistent runs from 10 to 10,000 units.",
    icon: "batch",
  },
];

export const steps = [
  {
    index: "01",
    title: "Upload Your Model",
    description: "Send an STL, OBJ or STEP file in seconds.",
  },
  {
    index: "02",
    title: "Choose Material & Options",
    description: "Pick a material, finish and quantity.",
  },
  {
    index: "03",
    title: "We Print It",
    description: "Precision printing, checked layer by layer.",
  },
  {
    index: "04",
    title: "Receive Your Part",
    description: "Packed, inspected and shipped to your door.",
  },
];

export type Material = {
  name: string;
  traits: string[];
};

export const materials: Material[] = [
  { name: "PLA", traits: ["Easy", "Precise"] },
  { name: "PETG", traits: ["Durable", "Tough"] },
  { name: "ABS", traits: ["Heat Resistant"] },
  { name: "TPU", traits: ["Flexible"] },
  { name: "ASA", traits: ["UV Stable"] },
  { name: "Resin", traits: ["High Detail"] },
  { name: "Engineering Materials", traits: ["High Performance"] },
];

export type PortfolioItem = {
  category: string;
  label: string;
  size: "lg" | "md" | "sm";
};

export const portfolio: PortfolioItem[] = [
  { category: "Prototypes", label: "Concept to first article", size: "lg" },
  { category: "Mechanical Parts", label: "Brackets, gears, housings", size: "sm" },
  { category: "Miniatures", label: "High-detail resin figures", size: "sm" },
  { category: "Custom Designs", label: "Built to your geometry", size: "md" },
  { category: "Replacement Parts", label: "Out of production? Not anymore", size: "md" },
];

export const stats = [
  { value: "24h", label: "Fast Turnaround" },
  { value: "±0.1mm", label: "High Precision" },
  { value: "10+", label: "Materials Available" },
  { value: "1:1", label: "Custom Support" },
];

export const faqs = [
  {
    question: "What file formats do you accept?",
    answer: "STL, OBJ and STEP are all supported. Not sure your file works? Send it anyway — we'll check it.",
  },
  {
    question: "How long does printing take?",
    answer: "Most orders ship within 24–72 hours depending on size, material and quantity.",
  },
  {
    question: "Can you help prepare my model?",
    answer: "Yes. We can fix non-manifold geometry, add supports, or optimize wall thickness for printing.",
  },
  {
    question: "What materials are available?",
    answer: "PLA, PETG, ABS, TPU, ASA, resin and select engineering-grade materials.",
  },
  {
    question: "Do you ship?",
    answer: "We ship nationwide with tracked delivery, and offer local pickup on request.",
  },
];
