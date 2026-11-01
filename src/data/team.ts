// Add, remove or reorder members here. Photos go in /public/team/ (e.g. "/team/ama.jpg").
// Students under 18: only publish a photo, name and bio with parent/guardian consent.
// Leave photo as "" to show the member's initials instead.
export type Member = { name: string; role: string; bio: string; photo?: string };

export const team: Member[] = [
  {
    name: "Lavanya Sharma",
    role: "President, Founder & Head of Social Media and Marketing",
    bio: "Hi, I’m Lavanya! I’m a Year 12 student, and I started Bloom & Rise to break the stigma around girls’ health, open the door to science, and stand beside vulnerable children whose voices too often go unheard. I aspire to a career in medicine, or a field closely allied to it, and this work lets me begin serving others long before I qualify. Every girl, and every child in need, deserves honest answers, a safe place to ask and the confidence to flourish. Wherever you are on your journey, there’s a place for you here, and I’d love to grow with you.",
    photo: "/team/lavanya.png",
  },
  {
    name: "Bettina Kukua Donkoh",
    role: "Vice President",
    bio: "A short, friendly bio. Share only what they’re comfortable having public.",
    photo: "/team/bettina.jpg",
  },
  {
    name: "Shreya Riny Sumanlal",
    role: "Executive Director & Head of Social Media and Marketing",
    bio: "Replace this placeholder with a real bio and, if consent is given, a photo.",
    photo: "/team/shreya.jpg",
  },
];

// Heads page (/team/heads). Placeholders: replace names, roles and bios, and add photos in /public/team/.
export const heads: Member[] = [
  {
    name: "Name Surname",
    role: "Head of Programmes",
    bio: "Two or three sentences about who they are and what they lead.",
    photo: "",
  },
  {
    name: "Name Surname",
    role: "Head of Communications",
    bio: "Two or three sentences about who they are and what they lead.",
    photo: "",
  },
  {
    name: "Name Surname",
    role: "Head of Partnerships",
    bio: "Two or three sentences about who they are and what they lead.",
    photo: "",
  },
];