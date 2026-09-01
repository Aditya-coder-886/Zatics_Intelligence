export interface MetricItem {
  id: string;
  value: string;
  label: string;
  description: string;
  numericValue: number; // useful for count-up animations if needed
  suffix?: string;
}

export const metricsData: MetricItem[] = [
  {
    id: "metric-1",
    value: "3x",
    label: "Faster decision cycles",
    description: "Accelerate analytics and approvals with continuous AI recommendation engines.",
    numericValue: 3,
    suffix: "x"
  },
  {
    id: "metric-2",
    value: "40%",
    label: "Operational overhead reduction",
    description: "Free teams from repetitive decision-heavy data entry and classification work.",
    numericValue: 40,
    suffix: "%"
  },
  {
    id: "metric-3",
    value: "24/7",
    label: "Continuous execution",
    description: "Intelligent agents monitoring alerts and processing workflows around the clock.",
    numericValue: 24,
    suffix: "/7"
  },
  {
    id: "metric-4",
    value: "99.9%",
    label: "Uptime and reliability",
    description: "Enterprise-grade hosting with complete redundancy and automated failover systems.",
    numericValue: 99.9,
    suffix: "%"
  }
];
