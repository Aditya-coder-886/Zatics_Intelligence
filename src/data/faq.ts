export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What does Zatics Intelligence build?",
    answer:
      "We build custom AI systems including automation platforms, multi-agent architectures, AI infrastructure, voice AI, RAG systems, integrations, and AI-powered products.",
  },
  {
    id: "faq-2",
    question: "Do you work with existing software?",
    answer:
      "Yes. We integrate AI into the systems your business already uses rather than forcing you to replace your entire stack.",
  },
  {
    id: "faq-3",
    question: "Can you build something completely custom?",
    answer:
      "Yes. Our systems are designed around the specific workflow, data, infrastructure, and objectives of each business.",
  },
  {
    id: "faq-4",
    question: "How long does an implementation take?",
    answer:
      "It depends on the complexity of the system. After the initial discovery, we'll define the architecture, scope, and implementation timeline.",
  },
  {
    id: "faq-5",
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We can continue optimizing, maintaining, and expanding your AI infrastructure after deployment.",
  },
  {
    id: "faq-6",
    question: "How much does it cost?",
    answer:
      "Projects vary based on complexity, integrations, infrastructure, and ongoing requirements. We'll scope the appropriate solution after understanding your requirements.",
  },
];
