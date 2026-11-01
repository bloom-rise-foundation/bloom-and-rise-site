export type ClosingContent = {
  title: string;
  script: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

// Used on every page unless that page overrides a field below.
export const closingDefaults: ClosingContent = {
  title: "Today could be the day you speak up.",
  script: "Grow with the community.",
  primaryLabel: "Join us",
  primaryHref: "/get-involved",
  secondaryLabel: "Say hello",
  secondaryHref: "/contact",
};

// Per-page overrides, keyed by path. Leave a field out (or as "") to keep the default.
export const closingByPage: Record<string, Partial<ClosingContent>> = {
  "/about": {
    title: "Spotted a gap?",
    script: "Tell us",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Reach us",
    secondaryHref: "/contact",
  },
  "/contact": {
    title: "Bring your curiosity.",
    script: "Grow with the community.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
  "/get-involved": {
    title: "Let us bloom together.",
    script: "Be the spark that starts something.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
  "/programmes": {
    title: "Know a host for a pilot?",
    script: "Let us talk.",
    primaryLabel: "Partner with us",
    primaryHref: "/get-involved#partner",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
  "/sitemap": {
    title: "Today could be the day you speak up.",
    script: "Grow with the community.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
  "/team": {
    title: "Every great change begins with one brave question.  ",
    script: "Build this with us.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
  "/transparency": {
    title: "Anything unclear?",
    script: "Bring it to our attention.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Tell us",
    secondaryHref: "/contact",
  },
  "/verify": {
    title: "Today could be the day you speak up.",
    script: "Grow with the community.",
    primaryLabel: "Join us",
    primaryHref: "/get-involved",
    secondaryLabel: "Say hello",
    secondaryHref: "/contact",
  },
};