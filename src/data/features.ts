export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const featuresData: FeatureItem[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Turn repetitive business operations into intelligent automated workflows.",
    iconName: "Workflow",
  },
  {
    id: "multi-agent",
    title: "Multi-Agent Systems",
    description: "Deploy specialized AI agents that collaborate, reason, and execute complex processes.",
    iconName: "Bot",
  },
  {
    id: "ai-infrastructure",
    title: "AI Infrastructure",
    description: "Build the architecture required to run AI reliably, securely, and at scale.",
    iconName: "Server",
  },
  {
    id: "voice-ai",
    title: "Voice AI",
    description: "Create intelligent voice systems for sales, support, operations, and customer experiences.",
    iconName: "Mic",
  },
  {
    id: "custom-modules",
    title: "Custom AI Modules",
    description: "Purpose-built intelligence engineered around your company's specific requirements.",
    iconName: "Puzzle",
  },
  {
    id: "ai-products",
    title: "AI-Powered Products",
    description: "Turn an idea, workflow, or business problem into a production-ready AI product.",
    iconName: "Rocket",
  },
];
