// Add, remove or reorder members here. Photos go in /public/team/ (e.g. "/team/ama.jpg").
// Students under 18: only publish a photo, name and bio with parent/guardian consent.
// Leave photo as "" to show the member's initials instead.
export type Member = { name: string; role: string; bio: string; photo?: string };

export const team: Member[] = [
  {
    name: "Lavanya Sharma",
    role: "President & Founder",
    bio: "Two or three sentences about who they are and why they care about this work.",
    photo: "/team/lavanya.png",
  },
  {
    name: "Bettina Kukua Donkoh",
    role: "Vice President",
    bio: "A short, friendly bio. Share only what they’re comfortable having public.",
    photo: "",
  },
  {
    name: "Shreya Riny Sumanlal",
    role: "Executive Director",
    bio: "Replace this placeholder with a real bio and, if consent is given, a photo.",
    photo: "",
  },
];