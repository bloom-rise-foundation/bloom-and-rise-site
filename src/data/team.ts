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

// Heads page (/team/heads). Photos live in /public/team/ (head-<name>.jpg). Leave photo as "" to show initials; leave bio as "" to hide it.
export const heads: Member[] = [
  {
    name: "Nikita Gwalani",
    role: "Secretary & Head of Communications",
    bio: "Hi im nikita, and im the secretary and head of comms at bloom and rise! I am excited to be a part of a community that strives to make a difference and I look forward to growing, learning and contributing to all that we do together!💗",
    photo: "/team/head-nikita.jpg",
  },
  {
    name: "Vansh Johari",
    role: "Head of Fundraising",
    bio: "Hiiii, I'm Vansh! I joined Bloom and Rise because I believe in creating positive change, supporting the community and making a meaningful difference in people’s lives. I'm excited to contribute my ideas and efforts towards the foundation’s mission!",
    photo: "/team/head-vansh.jpg",
  },
  {
    name: "Arabella Grace Naa Ameley Dagadu",
    role: "Co-Head of Fundraising",
    bio: "Hello everyone my name is Arabella - an as level student who you will always catch reading a different book -and co- head of fundraising at bloom and rise, i am dedicated to helping girls discover them selves  and educating them on different aspects of womanhood and I am so  excited to have you join me on the journey to that",
    photo: "/team/head-arabella.jpg",
  },
  {
    name: "Nur Bilal Barakeh",
    role: "Head of Partnerships",
    bio: "Hey everyone! I'm really excited to be part of Bloom and Rise! I enjoy meeting new people, learning and getting involved in causes that make a difference. I chose Bloom and Rise because I believe in supporting others and creating positive change, particularly for women, children and young people. I'm looking forward to this journey and everything it has to offer!",
    photo: "/team/head-nur.jpg",
  },
  {
    name: "Sarah Kaliati",
    role: "Co-Head of Partnerships",
    bio: "Hi, I'm KT and I'm the Co-Head of Partnerships. My goal is to build meaningful relationships, create opportunities, and collaborate with organisations to make a lasting difference. I chose Bloom and Rise Foundation because it empowers individuals, supports communities, and gives me the opportunity to create positive change for those in need.",
    photo: "/team/head-sarah.jpg",
  },
  {
    name: "Hasini Eaga",
    role: "Treasurer",
    bio: "Hi!! I'm Hasini, and I'm the Treasurer for the BRF! I joined this foundation hoping to be a part of this social welfare initiative. I'm committed to managing resources transparently so every contribution makes a real difference!",
    photo: "/team/head-hasini-v2.jpg",
  },
  {
    name: "Emmarine Madisa",
    role: "Head of Logistics",
    bio: "Hi everyone! I’m Emmarine Madisa, an AS Level student who finds joy in music, art and creative expression. I’m passionate about feminism, women’s rights and creating opportunities for young girls to dream boldly, find their voices and thrive.",
    photo: "/team/head-emmarine.jpg",
  },
  {
    name: "Iman Musah",
    role: "Co-Head of Logistics",
    bio: "My name is Iman i’m the co head of logistics at Bloom and Rise, i personally love trying new things so  i joined because i wanted to be part of something that can benefit society and make a difference",
    photo: "/team/head-iman.jpg",
  },
  {
    name: "Ankit Ray",
    role: "Head of Volunteers",
    bio: "Hi! I'm Ankit, excited to join Bloom & Rise as Head of Volunteers. I value teamwork, equality and making a difference. I'm passionate about accessible health education, women's rights and challenging stigma surrounding women's health, while recognising wider health issues affecting our communities. I look forward to contributing to meaningful change!",
    photo: "/team/head-ankit-v2.jpg",
  },
  {
    name: "Maame Akua Twum-Barimah",
    role: "Co-Head of Volunteers",
    bio: "My name is Akua, Co-Head of Volunteers at Bloom and Rise Foundation! 💗 I’m passionate about empowering women through education, awareness and community support. I joined Bloom and Rise to strengthen well-being, amplify women’s and children’s voices and also help build inclusive communities. I’m excited to contribute to meaningful work and create lasting impact together!",
    photo: "/team/head-akua.jpg",
  },
  {
    name: "Melissa Akomaning",
    role: "Head of Education",
    bio: "",
    photo: "",
  },
  {
    name: "Himanshi Joshi",
    role: "Co-Head of Education",
    bio: "Hi, I’m Himanshi, someone who loves learning and making a positive impact, and I’m excited to be part of Bloom and Rise as Co-Head of Education, helping raise awareness about women’s health and mental wellbeing! which is why I chose bloom and rise foundation 🩷",
    photo: "/team/head-himanshi.jpg",
  },
  {
    name: "Thristain Cyril Nii Allotey Thompson",
    role: "Head of STEM",
    bio: "I'm Thristain, a student passionate about technology, science, innovation, and problem solving. I enjoy exploring new ideas, developing creative solutions, and discovering how stem can address real world challenges. I joined Bloom and Rise because I believe every girl deserves the opportunity, confidence, and resources to explore stem and shape the future",
    photo: "/team/head-thristain.jpg",
  },
  {
    name: "Ademola Bello",
    role: "Co-Head of STEM",
    bio: "Hello! I'm Ademola Bello, a young girl who values thought and innovation over all other things. I joined Bloom and Rise because I want girls to have a voice they can rely on and trust.",
    photo: "/team/head-ademola-v3.jpg",
  },
  {
    name: "Awurama S. Nti",
    role: "Head of Outreach & Community Engagement",
    bio: "Hello! I'm Awurama✨️ I'm the head of Outreach and Community Engagement of Bloom and Rise Foundation.🩷 In my role, I help build and maintain strong relationship between our organization and the community 🤝.I hope that by spreading awareness we can foster better relationship in our community and globally.🫂🌍",
    photo: "/team/head-awurama.jpg",
  },
  {
    name: "Abigail Darko",
    role: "Co-Head of Outreach & Community Engagement",
    bio: "Hi, I’m Abigail, a Year 12 student and the Co-Head of Outreach at Bloom & Rise Foundation. I am passionate about raising awareness, creating meaningful connections and finding effective ways to reach individuals who may need support. Through this role, I hope to contribute to the foundation’s mission, make a positive impact in society and help bring about meaningful change through our initiatives✨",
    photo: "/team/head-abigail.jpg",
  },
  {
    name: "Zaima Aribah",
    role: "Head of Research & Impact",
    bio: "Hii! I'm Zaima, and I'm passionate about women's rights, girls' education and advocacy. I joined Bloom & Rise because I believe in empowering young people, raising awareness and creating meaningful change. Excited to work with everyone!",
    photo: "/team/head-zaima.jpg",
  },
  {
    name: "Nidhi Dhulugade",
    role: "Co-Head of Research & Impact",
    bio: "I am a compassionate, action-oriented person who believes that everyone deserves the chance to live a healthy, thriving life. I joined this foundation because empowering women, children, and young people is a cause, close to my heart, and I wanted to turn my care into real, lasting impact. I am proud to contribute my time and energy to a team building healthier, stronger futures every day.",
    photo: "/team/head-nidhi.jpg",
  },
];

export type Department = { id: string; name: string; members: Member[] };

/** Groups people into departments straight from their role titles ("Head of STEM", "Co-Head of Fundraising",
 *  "Secretary & Head of Communications"; the Treasurer leads Finance), in the order they first appear. */
export function byDepartment(members: Member[]): Department[] {
  const out: Department[] = [];
  for (const m of members) {
    const name = /Head of (.+)$/.exec(m.role)?.[1].trim() ?? (/Treasurer/.test(m.role) ? "Finance" : "Leadership");
    const id = name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let d = out.find((x) => x.id === id);
    if (!d) out.push((d = { id, name, members: [] }));
    d.members.push(m);
  }
  return out;
}
