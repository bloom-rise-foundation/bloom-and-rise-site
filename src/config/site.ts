// ONE PLACE TO CUSTOMISE: copy, links, nav, footer, focus areas, steps, roles PDF, status.
export const site = {
  name: "Bloom & Rise",
  suffix: "Foundation",
  email: "bloomandrise.foundation@gmail.com",
  tagline: "Growing healthier, safer and brighter futures—together.",
  mission:
    "Bloom & Rise Foundation promotes girls’ and women’s health, encourages open conversations about overlooked issues, and expands access to STEM education and opportunities. We support orphans and vulnerable children to feel safe, valued, and able to thrive.",
  statusShort: "Planning stage · seeking guidance",
  // Links with an empty href are hidden automatically.
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/bloomandrise_foundation/" },
    { label: "TikTok", href: "" },
    { label: "X", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Email", href: "mailto:bloomandrise.foundation@gmail.com" },
  ],
  nav: [
    { label: "About", href: "/about" },
    { label: "Programmes", href: "/programmes" },
    { label: "Team", href: "/team" },
    { label: "Get involved", href: "/get-involved" },
    { label: "Contact", href: "/contact" },
  ],
  // Footer columns render as vertical lists.
  footer: [
    { title: "Foundation", links: [{ label: "About", href: "/about" }, { label: "Programmes", href: "/programmes" }, { label: "Team", href: "/team" }] },
    { title: "Get involved", links: [{ label: "Join the team", href: "/get-involved" }, { label: "Partner with us", href: "/get-involved#partner" }, { label: "Contact", href: "/contact" }] },
    { title: "Trust", links: [{ label: "Status & safeguards", href: "/transparency" }, { label: "Verify a credential", href: "/verify" }] },
  ],
  phrases: ["health awareness", "open conversations", "STEM education", "support for orphans and vulnerable children"],
  focus: [
    { title: "Girls’ and women’s health", tone: "pink", text: "Trustworthy, age-appropriate health information on topics like menstrual health and stigma, plus pointers to qualified help. Education and referrals, never diagnosis or treatment." },
    { title: "Open conversations", tone: "beet", text: "Respectful, voluntary spaces to ask about issues people find hard to raise. Nobody is pressured to share, and no story is used without informed permission." },
    { title: "STEM education", tone: "blue", text: "Supervised demonstrations, workshops, mentoring and conversations with women working in science, technology, engineering and maths." },
    { title: "Orphans and vulnerable children", tone: "rum", text: "Small, supervised activities planned with trusted, qualified partners under safeguarding rules, and links to services that already exist." },
  ],
  joinSteps: [
    { title: "Learn", script: "something new", text: "Read our focus areas and pick up one reliable fact about girls’ and women’s health or STEM." },
    { title: "Start", script: "a conversation", text: "“Let’s talk about girls’ health.” Said kindly, it makes the next person’s question easier." },
    { title: "Share it with", script: "someone who needs it", text: "Pass it on to a friend, a sibling, a teacher. Knowledge grows when it moves." },
  ],
  values: [
    { title: "Listen first", text: "Community members aren’t just recipients. Their views shape our topics, timing and language." },
    { title: "Start small", text: "A well-planned pilot beats a big promise. We grow when the team, partners and approvals are ready." },
    { title: "Stay honest", text: "We never claim registration, funding, partners or services we don’t have." },
    { title: "Protect people", text: "Supervision, consent and privacy come before any activity, especially with children." },
  ],
  begin: [
    { title: "Form", script: "the team", text: "Agree the mission and values, and write down who is responsible for what." },
    { title: "Listen", script: "to the community", text: "Ask what information and opportunities people want, without asking for sensitive stories." },
    { title: "Find", script: "trusted advisers", text: "Identify adults and qualified organisations for health content, safeguarding, venues and referrals." },
    { title: "Pilot", script: "one or two activities", text: "For example a STEM workshop and a health-information session reviewed by a qualified source." },
    { title: "Plan", script: "for safety", text: "Consent, supervision, accessibility, costs, and what to do if someone asks for help." },
    { title: "Learn", script: "and adapt", text: "Collect simple feedback after each activity and decide whether to adapt or continue." },
  ],
  // Put the PDF in the project's public/ folder; href is its filename with a leading slash.
  rolesPdf: { label: "Download the role descriptions (PDF)", href: "/docs/available-roles.pdf" },
  status: [
    { k: "Registration", v: "Not yet registered. We’re checking the correct local process and asking for guidance." },
    { k: "Programmes", v: "None launched." },
    { k: "Funding", v: "No funds are being collected. Fundraising won’t begin until legal and financial requirements are clear." },
    { k: "Partnerships", v: "None formalised. We’re seeking introductions to schools, health professionals and child-welfare organisations." },
    { k: "Activities with children", v: "Won’t begin until supervision, partner guidance and safeguarding procedures are ready." },
  ],
  limits: [
    "Provide residential care, or take responsibility for any child’s care or private case.",
    "Diagnose, prescribe, treat or counsel, or present volunteers as clinicians.",
    "Promise any specialist service unless it genuinely exists and is properly authorised.",
    "Collect or manage funds until the process and legal requirements are clear.",
    "Call ourselves registered, funded or officially partnered unless that is true and confirmed.",
  ],
  safeguards: [
    { title: "Safeguarding", text: "Conduct expectations, adult supervision, a named person for concerns, and a plan for responding or referring." },
    { title: "Health accuracy", text: "Reliable sources, reviewed by a qualified professional where needed. Volunteers give education, not clinical advice." },
    { title: "Privacy and consent", text: "We collect only what we need. Names, photos and stories are never published without proper consent." },
    { title: "Financial accountability", text: "A budget and receipts for everything, and no one person requests, approves and records the same payment." },
  ],
};