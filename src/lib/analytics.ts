export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}`, properties);
  }

  // Google Analytics (gtag.js) Integration
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", eventName, properties);
    } catch (e) {
      console.warn("GA tracking failed", e);
    }
  }

  // PostHog Integration
  if (typeof window !== "undefined" && (window as any).posthog) {
    try {
      (window as any).posthog.capture(eventName, properties);
    } catch (e) {
      console.warn("PostHog tracking failed", e);
    }
  }
};

export const initAnalytics = () => {
  if (typeof window === "undefined" || process.env.NODE_ENV === "development") return;

  // Insert Microsoft Clarity tracking script if configured in environment
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (clarityId) {
    const win = window as any;
    win.clarity = win.clarity || function() {
      (win.clarity.q = win.clarity.q || []).push(arguments);
    };
    
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityId}`;
    
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }
};
