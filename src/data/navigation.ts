export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const footerLinks = {
  solutions: [
    { label: "AI Automation", href: "#solutions" },
    { label: "Multi-Agent Systems", href: "#solutions" },
    { label: "AI Infrastructure", href: "#technology" },
    { label: "Voice AI", href: "#solutions" },
    { label: "Custom AI Modules", href: "#solutions" },
    { label: "AI-Powered Products", href: "#solutions" },
  ],
  technology: [
    { label: "Multi-Agent Orchestration", href: "#technology" },
    { label: "Intelligent Model Routing", href: "#technology" },
    { label: "Context & RAG Systems", href: "#technology" },
    { label: "Token Optimization", href: "#technology" },
    { label: "AI Observability", href: "#technology" },
    { label: "Production Architecture", href: "#technology" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Work", href: "#work" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const socialLinks = {
  linkedin: "https://linkedin.com",
  email: "mailto:hello@zatics.com",
};
