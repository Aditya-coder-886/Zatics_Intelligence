export interface AudienceSegment {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const audienceSegments: AudienceSegment[] = [
  {
    id: "startups",
    title: "Startups",
    description: "Build AI into your product from day one.",
    iconName: "Zap",
  },
  {
    id: "growing",
    title: "Growing Businesses",
    description: "Automate operations before they become bottlenecks.",
    iconName: "TrendingUp",
  },
  {
    id: "enterprise",
    title: "Enterprise Teams",
    description: "Integrate AI into existing infrastructure without rebuilding everything.",
    iconName: "Building2",
  },
  {
    id: "ai-native",
    title: "AI-Native Companies",
    description: "Build the infrastructure required to scale intelligent systems.",
    iconName: "Brain",
  },
];
