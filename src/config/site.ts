// ONE PLACE TO CUSTOMISE: copy, links, nav, footer, focus areas, steps, roles PDF, status.
export const site = {
  name: "Bloom & Rise",
  suffix: "Foundation",
  email: "bloomandrise.foundation@gmail.com",
  tagline: "Cultivating healthier, safer and brighter futures, together.",
  mission:
    "Everyone is owed candid answers, an open door to science and adults who keep them safe. We work unhurriedly, beside the community and not merely for it.",
  statusShort: "Student-led · Ghana · Fledgling",
  // Links with an empty href are hidden automatically.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/bloomandrise_foundation/" },
    { label: "TikTok", href: "https://www.tiktok.com/@bloom.n.rise.foundation" },
    { label: "X", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Email", href: "mailto:bloomandrise.foundation@gmail.com" },
    { label: "Linktree", href: "https://linktr.ee/bloomandrise.foundation" },
  ],
  nav: [
    { label: "Blueprint", href: "/about" },
    { label: "Programmes", href: "/programmes" },
    {
      label: "Cultivators",
      href: "/team",
      children: [
        { label: "Heads", href: "/team/heads" },
        { label: "Executive", href: "/team" },
      ],
    },
    { label: "Get involved", href: "/get-involved" },
    { label: "Contact", href: "/contact" },
  ],
  // Footer columns render as vertical lists.
  footer: [
    { title: "Foundation", links: [{ label: "Blueprint", href: "/about" }, { label: "Programmes", href: "/programmes" }, { label: "Cultivators", href: "/team" }] },
    { title: "Get involved", links: [{ label: "Rise with us", href: "/get-involved" }, { label: "Partner with us", href: "/get-involved#partner" }, { label: "Drop us a line", href: "/contact" }] },
    { title: "Trust", links: [{ label: "Status & safeguards", href: "/transparency" }, { label: "Verify a credential", href: "/verify" }] },
  ],
  phrases: ["health awareness", "open conversations", "STEM education", "support for orphans and vulnerable children"],
  focus: [
    { title: "Girls’ and women’s health", tone: "pink", text: "Forthright guidance on periods, puberty and stigma, with a discreet pointer to qualified help." },
    { title: "Open conversations", tone: "beet", text: "Voluntary spaces to voice the questions that rarely find a hearing." },
    { title: "STEM education", tone: "blue", text: "Workshops and mentors who bring a science career within reach." },
    { title: "Vulnerable children", tone: "rum", text: "Supervised activities where every child feels cherished and secure." },
  ],
  joinSteps: [
    { title: "Learn", script: "something new", text: "Take away one reliable fact about health, STEM or child safety." },
    { title: "Break one ", script: "silence", text: "Say, “Let’s talk about what we usually avoid.”" },
    { title: "Pass it ", script: "on", text: "Tell a friend, a sibling or a teacher." },
  ],
  values: [
    { title: "Listen first", text: "We ask before we plan." },
    { title: "Start small", text: "We tend one session well before trumpeting ten." },
    { title: "Stay honest", text: "We never claim what we do not have." },
    { title: "Protect people", text: "Consent, supervision and privacy come first, above all with children." },
  ],
  begin: [
    { title: "Form", script: "the team", text: "" },
    { title: "Listen", script: "to the community", text: "" },
    { title: "Find", script: "trusted advisers", text: "" },
    { title: "Plan", script: "for safety", text: "" },
    { title: "Pilot", script: "one or two activities", text: "" },
    { title: "Learn", script: "and adapt", text: "" },
  ],
  // Put the PDF in the project's public/ folder; href is its filename with a leading slash.
  rolesPdf: { label: "Download the role descriptions (PDF)", href: "/docs/available-roles.pdf" },
  status: [
    { k: "Registration", v: "Not yet registered; seeking guidance." },
    { k: "Programmes", v: "None launched; first pilots planned." },
    { k: "Funding", v: "No funds are being collected." },
    { k: "Partnerships", v: "None formalised." },
    { k: "Activities with children", v: "No activities until safeguards are in place." },
  ],
  limits: [
    "Provide residential care, or take responsibility for any child’s care or private case.",
    "Diagnose, prescribe, treat or counsel, or present volunteers as clinicians.",
    "Promise any specialist service unless it genuinely exists and is properly authorised.",
    "Collect or manage funds until the process and legal requirements are clear.",
    "Claim registration we do not have.",
  ],
  safeguards: [
    { title: "Safeguarding", text: "Conduct expectations, adult supervision, a named person for concerns, and a plan for responding or referring." },
    { title: "Health accuracy", text: "Reliable sources, reviewed by a qualified professional where needed. Volunteers give education, not clinical advice." },
    { title: "Privacy and consent", text: "We collect only what we need. Names, photos and stories are never published without proper consent." },
    { title: "Financial accountability", text: "A budget and receipts for everything, and no one person requests, approves and records the same payment." },
  ],
};