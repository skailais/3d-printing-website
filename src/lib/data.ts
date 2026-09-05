export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/materials", label: "Materials" },
  { href: "/process", label: "Process" },
  { href: "/studio", label: "Studio" },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  detail: string;
  scene: Scene;
  pigment: Pigment;
  specs: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "fdm",
    title: "FDM Printing",
    description: "Durable parts in PLA, PETG, ABS and more.",
    scene: "mountains",
    pigment: "ink",
    detail:
      "Fused filament for parts that need to work — jigs, housings, fixtures, brackets. Layer heights from 0.08 to 0.32 mm.",
    specs: [
      { label: "Build", value: "300 × 300 × 400 mm" },
      { label: "Layer", value: "0.08 – 0.32 mm" },
    ],
  },
  {
    slug: "resin",
    title: "Resin / SLA",
    description: "Ultra-fine detail for miniatures and masters.",
    scene: "blossom",
    pigment: "vermilion",
    detail:
      "Photopolymer printing where surface finish matters — figures, jewellery masters, dental-grade fit, casting patterns.",
    specs: [
      { label: "Build", value: "218 × 123 × 235 mm" },
      { label: "Layer", value: "0.02 – 0.05 mm" },
    ],
  },
  {
    slug: "prototyping",
    title: "Prototyping",
    description: "Iterate fast, from sketch to first article.",
    scene: "cranes",
    pigment: "jade",
    detail:
      "Same-week loops. Print, test, revise, print again — we keep the tooling warm so your revisions do not queue.",
    specs: [
      { label: "Loop", value: "24 – 72 h" },
      { label: "Revisions", value: "Unlimited" },
    ],
  },
  {
    slug: "functional",
    title: "Functional Parts",
    description: "Engineered for load, heat and fatigue.",
    scene: "wave",
    pigment: "ink",
    detail:
      "Material and orientation chosen for the forces the part will actually see. Annealing and post-processing on request.",
    specs: [
      { label: "Infill", value: "20 – 100 %" },
      { label: "Heat", value: "to 110 °C" },
    ],
  },
  {
    slug: "custom",
    title: "Custom Projects",
    description: "Complex geometry, tailored to your brief.",
    scene: "vessel",
    pigment: "gold",
    detail:
      "Bring a drawing, a photo, a broken part or a rough idea. We model it, print it, and hand you something real.",
    specs: [
      { label: "Modelling", value: "In-house" },
      { label: "Scanning", value: "On request" },
    ],
  },
  {
    slug: "batch",
    title: "Small Batch",
    description: "Consistent runs from 10 to 10,000 units.",
    scene: "bamboo",
    pigment: "jade",
    detail:
      "Farm capacity for repeatable production, with first-article approval and per-batch dimensional checks.",
    specs: [
      { label: "Run", value: "10 – 10,000" },
      { label: "QC", value: "Per batch" },
    ],
  },
];

export const steps: {
  index: string;
  title: string;
  description: string;
  detail: string;
  scene: Scene;
  pigment: Pigment;
}[] = [
  {
    index: "01",
    title: "Send Your Model",
    description: "Drop an STL, OBJ or STEP file — or a sketch, if that is all you have.",
    detail:
      "We check wall thickness, manifold geometry and tolerances before anything is quoted, and tell you what we would change.",
    scene: "cranes",
    pigment: "jade",
  },
  {
    index: "02",
    title: "Choose Material & Finish",
    description: "Pick a pigment, a strength, a surface — we advise if you would rather we chose.",
    detail:
      "Material, layer height, infill and orientation are chosen together; they are one decision, not four.",
    scene: "vessel",
    pigment: "gold",
  },
  {
    index: "03",
    title: "We Print It",
    description: "Watched layer by layer, on machines we maintain ourselves.",
    detail:
      "Every plate is inspected off the bed. If it is not right, it is reprinted before you ever hear about it.",
    scene: "mountains",
    pigment: "ink",
  },
  {
    index: "04",
    title: "Receive Your Part",
    description: "Cleaned, checked, packed, and shipped tracked to your door.",
    detail:
      "Supports removed and surfaces finished by hand. Local pickup available if you would rather see it in person.",
    scene: "blossom",
    pigment: "vermilion",
  },
];

export type Material = {
  name: string;
  traits: string[];
  note: string;
  pigment: "jade" | "vermilion" | "gold" | "ink";
};

export const materials: Material[] = [
  { name: "PLA", traits: ["Precise", "Easy"], note: "Crisp detail for form models and display pieces.", pigment: "jade" },
  { name: "PETG", traits: ["Durable", "Tough"], note: "The everyday workhorse — impact resistant, slightly flexible.", pigment: "ink" },
  { name: "ABS", traits: ["Heat Resistant"], note: "Holds its shape where heat would soften others.", pigment: "vermilion" },
  { name: "TPU", traits: ["Flexible"], note: "Gaskets, grips, dampers — parts that need to give.", pigment: "gold" },
  { name: "ASA", traits: ["UV Stable"], note: "Outdoor parts that will not chalk or yellow.", pigment: "jade" },
  { name: "Resin", traits: ["High Detail"], note: "Twenty-micron layers for miniatures and masters.", pigment: "vermilion" },
  { name: "Nylon", traits: ["Wear Resistant"], note: "Living hinges, gears, and anything that rubs.", pigment: "ink" },
  { name: "Carbon Fibre", traits: ["Stiff", "Light"], note: "Filled filaments where deflection is the enemy.", pigment: "gold" },
];

export type Pigment = "jade" | "vermilion" | "gold" | "ink";
export type Scene = "mountains" | "bamboo" | "blossom" | "wave" | "cranes" | "vessel";

export type WorkItem = {
  category: string;
  title: string;
  note: string;
  pigment: Pigment;
  scene: Scene;
  size: "lg" | "md" | "sm";
};

export const work: WorkItem[] = [
  { category: "Prototypes", title: "Concept to first article", note: "Enclosure study, six revisions in nine days.", pigment: "jade", scene: "mountains", size: "lg" },
  { category: "Mechanical Parts", title: "Brackets, gears, housings", note: "PETG and nylon, printed for load paths.", pigment: "ink", scene: "bamboo", size: "sm" },
  { category: "Miniatures", title: "High-detail resin figures", note: "20 µm layers, hand-finished.", pigment: "vermilion", scene: "blossom", size: "sm" },
  { category: "Custom Designs", title: "Built to your geometry", note: "Modelled in-house from a single photograph.", pigment: "gold", scene: "vessel", size: "md" },
  { category: "Replacement Parts", title: "Out of production? Not any more", note: "Measured, remodelled, reprinted in ASA.", pigment: "jade", scene: "wave", size: "md" },
  { category: "Small Batch", title: "Repeatable runs", note: "400 units, dimensional check on every tenth.", pigment: "ink", scene: "cranes", size: "sm" },
];

export const stats = [
  { value: "24h", label: "Typical turnaround", note: "Most parts leave within a day." },
  { value: "±0.1", label: "Millimetre tolerance", note: "Checked, not estimated." },
  { value: "12", label: "Materials in stock", note: "Rigid, flexible, filled, fine." },
  { value: "1:1", label: "You talk to the printer", note: "No account managers." },
];

export const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "STL, OBJ and STEP. If you only have a sketch or a photograph of a broken part, send that instead — we model from it.",
  },
  {
    question: "How long does printing take?",
    answer:
      "Most orders ship within 24 to 72 hours. Large or multi-part runs are quoted with a date before we start.",
  },
  {
    question: "Can you help prepare my model?",
    answer:
      "Yes. We repair non-manifold geometry, thicken walls, add supports and reorient for strength — included in the quote.",
  },
  {
    question: "What materials are available?",
    answer:
      "PLA, PETG, ABS, ASA, TPU, nylon, carbon-filled filaments and standard or tough resins. Ask if you need something specific.",
  },
  {
    question: "Do you ship?",
    answer: "Nationwide, tracked. Local pickup is available by arrangement.",
  },
];

export const principles = [
  {
    title: "One hand, one part",
    body: "The person who quotes your part is the person who prints it and the person who packs it. Nothing is handed down a line.",
  },
  {
    title: "Material before geometry",
    body: "We choose the material for the forces the part will meet, then orient the geometry to serve it — not the other way round.",
  },
  {
    title: "Finished, not merely printed",
    body: "Supports removed, seams cleaned, surfaces worked by hand. A part leaves when it looks like it was meant to exist.",
  },
];
