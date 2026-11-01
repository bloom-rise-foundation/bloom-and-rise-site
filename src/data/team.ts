// Add, remove or reorder members here. Photos go in /public/team/ (e.g. "/team/ama.jpg").
// Students under 18: only publish a photo, name and bio with parent/guardian consent.
// Leave photo as "" to show the member's initials instead.
export type Member = { name: string; role: string; bio: string; photo?: string };

export const team: Member[] = [
  {
    name: "Lavanya Sharma",
    role: "President & Founder",
    bio: "I am a Year 12 student who founded Bloom & Rise to dismantle the stigma surrounding girls’ health and to open the door to science, while standing beside vulnerable children whose voices too often go unheard. I believe that every girl, and every child in need, deserves honest answers, a safe place to ask and the confidence to flourish. Alongside my team, I guide our vision so that every conversation, workshop and idea feels welcoming, trustworthy and empowering, and so that every young person can bloom and rise. Wherever you are on your journey, there is a place for you here, and I would love to grow with you.",
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
    role: "Executive Director",
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