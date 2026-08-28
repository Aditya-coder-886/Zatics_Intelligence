export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is Zatics Intelligence?",
    answer: "Zatics Intelligence is an enterprise-grade AI agency and technology provider. We build and deploy intelligent automation layers, custom AI agents, and semantic data systems designed to automate workflows and optimize strategic decisions."
  },
  {
    id: "faq-2",
    question: "What types of AI systems can Zatics build?",
    answer: "We specialize in autonomous AI agents, intelligent workflow automation, RAG/semantic search indexing, predictive decision systems, and custom machine learning pipelines integrated directly into your existing infrastructure."
  },
  {
    id: "faq-3",
    question: "Can Zatics integrate with existing systems?",
    answer: "Yes. All our AI solutions are built to integrate seamlessly with your existing stack via REST APIs, database connectors, and secure webhooks. We support legacy setups, ERPs, CRM platforms, and standard cloud architectures."
  },
  {
    id: "faq-4",
    question: "How does implementation work?",
    answer: "Our implementation follows a structured 4-step timeline: Understand (discovery & auditing), Connect (integrating data sources & systems), Intelligence (applying models & custom layers), and Optimize (ongoing analytics & tuning to ensure business metrics are met)."
  },
  {
    id: "faq-5",
    question: "Is the platform suitable for enterprises?",
    answer: "Absolutely. Security is our priority. We construct our systems with private cloud VPC hosting options, data isolation models, SOC2-compliant design patterns, role-based access control, and guarantee a 99.9% uptime SLA."
  },
  {
    id: "faq-6",
    question: "Can Zatics build custom AI solutions?",
    answer: "Yes, custom AI is a core pillar. We evaluate your unique dataset and business challenges, select and train the best base models (e.g., custom fine-tuning, retrieval setups), and deploy bespoke solutions tailored specifically to your operations."
  },
  {
    id: "faq-7",
    question: "How long does implementation take?",
    answer: "Typical discovery and design take 1-2 weeks. Basic workflow systems can be deployed within 4-6 weeks, while highly complex, custom multi-agent enterprise setups may take 8-12 weeks from alignment to deployment."
  },
  {
    id: "faq-8",
    question: "How do we get started?",
    answer: "Simply book a demo through our calendar scheduling link or submit an inquiry using our contact form. Our technical team will coordinate an initial discovery workshop to understand your objectives."
  }
];
