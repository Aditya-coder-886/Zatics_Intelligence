export interface FeatureItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  visualType: "agents" | "automation" | "data" | "decision";
}

export const featuresData: FeatureItem[] = [
  {
    id: "agents",
    number: "01",
    category: "AI Agents",
    title: "Autonomous agents that act, learn, and scale.",
    description: "Deploy task-oriented and decision-making AI agents that integrate directly into your workflows. Zatics agents operate independently, handle complex multi-step processes, and continuously optimize their own performance over time.",
    ctaText: "Explore Agents",
    ctaHref: "#contact",
    visualType: "agents"
  },
  {
    id: "automation",
    number: "02",
    category: "Intelligent Automation",
    title: "Automate complex, decision-heavy workflows.",
    description: "Move past simple linear triggers. Zatics connects fragmented enterprise software and applies cognitive AI models to make contextual decisions, classify information, route issues, and execute tasks with human-level accuracy.",
    ctaText: "See Automation",
    ctaHref: "#contact",
    visualType: "automation"
  },
  {
    id: "data",
    number: "03",
    category: "Data Intelligence",
    title: "Connect and query your entire information layer.",
    description: "Siloed data is useless. We build semantic index layers that connect your databases, internal documents, chats, and APIs. Ask questions in natural language and receive verified, source-backed answers in real-time.",
    ctaText: "Unify Data",
    ctaHref: "#contact",
    visualType: "data"
  },
  {
    id: "decision",
    number: "04",
    category: "Decision Intelligence",
    title: "Make strategic moves backed by mathematical certainty.",
    description: "Zatics parses thousands of variables to deliver real-time recommendations, simulate business outcomes, and highlight operational risks, giving your leadership team the power to act faster and with confidence.",
    ctaText: "Deploy Decisions",
    ctaHref: "#contact",
    visualType: "decision"
  }
];
