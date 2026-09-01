export interface CaseStudyItem {
  id: string;
  title: string;
  description: string;
  industry: string;
  metrics: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  priceRange: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "cs-1",
    title: "Intelligent Process Automation",
    description:
      "AI system that transformed repetitive manual operations into automated intelligent workflows.",
    industry: "Logistics & Operations",
    metrics: [
      { label: "Faster processing", value: "40%" },
      { label: "Lower operational cost", value: "35%" },
      { label: "Hours saved per month", value: "200+" },
    ],
    testimonial: {
      quote: "The system paid for itself in under 6 weeks.",
      author: "Sarah Jenkins",
      role: "VP of Operations, Vertex Global",
    },
  },
  {
    id: "cs-2",
    title: "Multi-Agent Compliance System",
    description:
      "Multi-agent system that automated regulatory compliance checks across enterprise workflows.",
    industry: "Financial Services",
    metrics: [
      { label: "Automation rate", value: "85%" },
      { label: "Faster execution", value: "12x" },
      { label: "Compliance accuracy", value: "99.9%" },
    ],
    testimonial: {
      quote: "We eliminated hundreds of hours of manual compliance work.",
      author: "David Chen",
      role: "Head of Infrastructure, Synthetix Labs",
    },
  },
  {
    id: "cs-3",
    title: "Voice AI Support Infrastructure",
    description:
      "Voice AI infrastructure that handled customer support, routing, and triage at scale.",
    industry: "Customer Experience",
    metrics: [
      { label: "Reduction in manual workload", value: "60%" },
      { label: "Faster first response", value: "8x" },
      { label: "Customer satisfaction increase", value: "32%" },
    ],
    testimonial: {
      quote: "Our support team now focuses on complex cases — the AI handles the rest.",
      author: "Marcus Vance",
      role: "Director of Support, Apex Ledger",
    },
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "discovery",
    name: "Discovery",
    priceRange: "$2,500 — $5,000",
    description: "Scoping, architecture, and technical blueprint.",
    features: [
      "AI opportunity audit",
      "Technical architecture design",
      "Integration mapping",
      "ROI projection",
      "Implementation roadmap",
    ],
  },
  {
    id: "build",
    name: "Build",
    priceRange: "$15,000 — $75,000+",
    description: "Full system development and deployment.",
    features: [
      "Custom AI system development",
      "Integration with existing stack",
      "Testing and optimization",
      "Production deployment",
      "90-day post-launch support",
    ],
    isPopular: true,
  },
  {
    id: "scale",
    name: "Scale",
    priceRange: "$3,000 — $10,000/mo",
    description: "Ongoing optimization and expansion.",
    features: [
      "Continuous model tuning",
      "Performance monitoring",
      "System expansion",
      "Priority support",
      "Monthly reporting",
    ],
  },
];
