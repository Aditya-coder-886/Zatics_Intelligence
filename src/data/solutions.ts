export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const solutionsData: SolutionItem[] = [
  {
    id: "enterprise-ai",
    title: "Enterprise AI Systems",
    description: "Production-grade, private LLM deployments tailored to your industry standards and security compliance requirements.",
    iconName: "ShieldAlert"
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Replace repetitive manual processes with cognitive triggers that adapt to changes in files, data, and context.",
    iconName: "Cpu"
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Layers",
    description: "Unified semantic index systems that bridge structural databases and unstructured operational documents.",
    iconName: "Database"
  },
  {
    id: "ai-agents",
    title: "Autonomous Agents",
    description: "Specialized digital workers designed to execute customer success, research, coding, or data entry workflows.",
    iconName: "Bot"
  },
  {
    id: "decision-intelligence",
    title: "Decision Recommendation Engines",
    description: "Analytical models that forecast demand, simulate market factors, and optimize complex inventory decisions.",
    iconName: "TrendingUp"
  },
  {
    id: "custom-ai",
    title: "Custom AI Architectures",
    description: "Bespoke, end-to-end machine learning engineering built to solve your unique business bottlenecks.",
    iconName: "Layers"
  }
];
