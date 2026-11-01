// Add, remove or reorder members here. Photos go in /public/team/ (e.g. "/team/ama.jpg").
// Students under 18: only publish a photo, name and bio with parent/guardian consent.
// Leave photo as "" to show the member's initials instead.
export type Member = { name: string; role: string; bio: string; photo?: string };

export const team: Member[] = [
  {
    name: "Lavanya Sharma",
    role: "President, Founder & Head of Social Media and Marketing",
    bio: "Hi, I’m Lavanya! I’m a Year 12 student, and I started Bloom & Rise to break the stigma around girls’ health, open the door to science, and stand beside vulnerable children whose voices too often go unheard. I lead our vision as President and shape our online presence as Head of Social Media, which means I’m the one chatting with you behind the screen. I aspire to a career in medicine, or a field closely allied to it, and this work lets me begin serving others long before I qualify. Every girl, and every child in need, deserves honest answers, a safe place to ask and the confidence to flourish. Wherever you are on your journey, there’s a place for you here, and I’d love to grow with you.",
    photo: "/team/lavanya.jpg",
  },
  {
    name: "Bettina Kukua Donkoh",
    role: "Vice President",
    bio: "As Vice President of Bloom and Rise, I am a dedicated Year 12 student passionate about serving as a voice for the underserved. Founded alongside close friends, our non-profit organization works to uplift women and children worldwide through impactful community initiatives and essential resource distribution. Nevertheless, still as an ordinary girl who loves crocheting and playing badminton, i believe with your help, every dream can become a reality.",
    photo: "/team/bettina.jpg",
  },
  {
    name: "Shreya Riny Sumanlal",
    role: "Executive Director & Head of Social Media and Marketing",
    bio: "Hi, I’m Shreya, a year 12 student and the Executive Director and Social Media Head of Bloom & Rise Foundation. I’m passionate about the health and well-being of women, children and young people, and about making sure the issues that often go unspoken finally get heard. In my role, I help guide our team’s direction and shape the way we share our message online, turning important health topics into content that feels clear, welcoming and easy to connect with. Through education, outreach and community support, I hope to help everyone around us feel informed, valued and listened to. Follow along, ask questions and be part of the conversation, because there is a place for every voice here.",
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