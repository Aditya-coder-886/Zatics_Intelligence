export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    quote: "Integrating Zatics into our logistics workflow has reduced decision loops from 3 hours to under 2 minutes. The enterprise security safeguards and reliability are outstanding.",
    author: "Sarah Jenkins",
    role: "VP of Operations",
    company: "Vertex Global",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "test-2",
    quote: "The semantic index layer built by Zatics allowed our customer support team to query millions of internal docs instantly. Customer satisfaction index jumped by 32% in three months.",
    author: "Marcus Vance",
    role: "Director of Support Technology",
    company: "Apex Ledger",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "test-3",
    quote: "Zatics doesn't just build chatbots; they build cognitive layers that handle actual decision-making. Their optimization process is continuous and highly measurable.",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
    company: "Novo Group",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "test-4",
    quote: "Zatics' custom AI agent architecture completely automated our repetitive billing compliance check, saving us hundreds of hours and ensuring 99.9% compliance accuracy.",
    author: "David Chen",
    role: "Head of Infrastructure",
    company: "Synthetix Labs",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];
