export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Process", href: "#process" },
  { label: "Engagement", href: "#engagement" },
  { label: "FAQ", href: "#faq" }
];

export const footerLinks = {
  platform: [
    { label: "AI Intelligence", href: "#platform" },
    { label: "AI Agents", href: "#features" },
    { label: "Automation", href: "#features" },
    { label: "Data Intelligence", href: "#platform" }
  ],
  solutions: [
    { label: "Enterprise AI", href: "#solutions" },
    { label: "Operations", href: "#solutions" },
    { label: "Analytics", href: "#solutions" },
    { label: "Custom AI", href: "#solutions" }
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" }
  ],
  resources: [
    { label: "Insights", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "FAQ", href: "#faq" }
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" }
  ]
};

export const socialLinks = {
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  youtube: "https://youtube.com"
};
