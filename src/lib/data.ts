// --- TYPES & INTERFACES ---

export type Language = "id" | "en";

export interface Skill {
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Mobile & Desktop"
    | "Tools"
    | "Design";
  logo: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

// Update: Menambahkan property 'relatedSkills' untuk menggabungkan skill ke layanan
export interface Service {
  title: string;
  desc: string;
  icon: string;
  relatedSkills: string[]; // Array nama skill, misal: ["React", "Next.js"]
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  skillTags: string[];
  images?: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  image: string;
  linkUrl?: string;
  githubUrl?: string;
}

export interface PortfolioContent {
  about: {
    heading: string;
    bio: string[];
    avatars: string[];
  };
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
  services: Service[];
}

export interface PortfolioData {
  id: PortfolioContent;
  en: PortfolioContent;
  skills: Skill[];
}

// --- MAIN DATA ---

export const portfolioData: PortfolioData = {
  skills: [
    // Frontend
    {
      name: "Next.js",
      category: "Frontend",
      logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    },
    {
      name: "React",
      category: "Frontend",
      logo: "https://cdn.simpleicons.org/react/61DAFB",
    },
    {
      name: "Tailwind",
      category: "Frontend",
      logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    },
    {
      name: "TypeScript",
      category: "Frontend",
      logo: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "Framer",
      category: "Frontend",
      logo: "https://cdn.simpleicons.org/framer/0055FF",
    },

    // Mobile & Desktop (Added Flutter)
    {
      name: "Flutter",
      category: "Mobile & Desktop",
      logo: "https://cdn.simpleicons.org/flutter/02569B",
    },
    {
      name: "Electron",
      category: "Mobile & Desktop",
      logo: "https://cdn.simpleicons.org/electron/47848F",
    },
    {
      name: "React Native",
      category: "Mobile & Desktop",
      logo: "https://cdn.simpleicons.org/react/61DAFB",
    },

    // Backend & DB
    {
      name: "Node.js",
      category: "Backend",
      logo: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
      name: "Prisma",
      category: "Database",
      logo: "https://cdn.simpleicons.org/prisma/ffffff",
    },
    {
      name: "Supabase",
      category: "Database",
      logo: "https://cdn.simpleicons.org/supabase/3ECF8E",
    },
    {
      name: "PostgreSQL",
      category: "Database",
      logo: "https://cdn.simpleicons.org/postgresql/4169E1",
    },
    {
      name: "MySQL",
      category: "Database",
      logo: "https://cdn.simpleicons.org/mysql/4479A1",
    },

    // Design
    {
      name: "Figma",
      category: "Design",
      logo: "https://cdn.simpleicons.org/figma/F24E1E",
    },

    // Tools
    {
      name: "Git",
      category: "Tools",
      logo: "https://cdn.simpleicons.org/git/F05032",
    },
    {
      name: "Docker",
      category: "Tools",
      logo: "https://cdn.simpleicons.org/docker/2496ED",
    },
    {
      name: "Postman",
      category: "Tools",
      logo: "https://cdn.simpleicons.org/postman/FF6C37",
    },
    {
      name: "VS Code",
      category: "Tools",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    },
  ],

  id: {
    about: {
      heading: "Tentang Saya",
      avatars: [
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
      ],
      bio: [
        "Halo! Saya seorang mahasiswa sekaligus Software Engineer yang sangat antusias dengan dunia Fullstack Development. Bagi saya, membangun perangkat lunak bukan sekadar merangkai baris kode, melainkan tentang menciptakan solusi utuh—mulai dari desain UI/UX yang intuitif, antarmuka yang responsif, hingga arsitektur backend dan database yang andal.",
        "Sejauh ini, saya telah terlibat dalam berbagai eksplorasi proyek end-to-end melintasi platform web, desktop, maupun mobile. Mulai dari mengembangkan platform AI generatif, sistem manajemen akademik multi-role, aplikasi desktop untuk restoran, hingga digitalisasi UMKM desa. Saya sangat menikmati proses mengubah ide-ide kompleks menjadi produk digital yang fungsional dan berdampak nyata.",
      ],
    },
    experiences: [
      {
        id: "exp-1",
        role: "Lead Web Developer (KKN/KKT)",
        company: "Desa Leilem, Minahasa",
        duration: "Okt 2025 - Selesai",
        description: [
          "Memimpin pengembangan website profil desa sebagai bagian dari program pengabdian masyarakat.",
          "Membangun platform promosi UMKM lokal untuk membantu digitalisasi ekonomi desa.",
        ],
        skillTags: ["Next.js", "Leadership", "Fullstack", "Supabase"],
        images: [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-2",
        role: "Web Developer Intern",
        company: "PT. Bank SulutGo (Divisi Pemasaran Dana)",
        duration: "Sep 2025",
        description: [
          "Mendapatkan pengalaman kerja profesional di kantor pusat perbankan.",
          "Merancang dan membangun sistem presensi serta pelaporan harian berbasis web menggunakan metode pengembangan Prototyping.",
          "Sistem berhasil diimplementasikan untuk menjawab kendala pencatatan pada sistem yang ada sebelumnya.",
        ],
        skillTags: ["Prototyping", "Corporate System", "Web App"],
        images: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-3",
        role: "Frontend Developer",
        company: "SPARK - Techofest",
        duration: "[Tahun]",
        description: [
          "Berkontribusi sebagai Frontend Developer pada proyek SPARK, sebuah platform AI Generatif edukatif yang diikutkan dalam event Techofest.",
          "Membangun antarmuka website utama SPARK, termasuk fitur Chatbot AI yang interaktif, serta merancang halaman About dan Team Profil yang responsif.",
        ],
        skillTags: ["React/Next.js", "AI Integration", "Chatbot UI"],
        images: [
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-4",
        role: "Software Engineer",
        company: "Proyek Akademik JTE",
        duration: "[Tahun]",
        description: [
          "Sistem Manajemen Ruang Kelas: Membangun website penjadwalan dan peminjaman ruang kelas di Gedung JTE. Sistem ini menerapkan arsitektur multi-role (Superadmin, Admin, dan User) dengan hak akses spesifik, serta dilengkapi fitur rating dan ulasan.",
          "Aplikasi Manajemen Restoran: Mengembangkan aplikasi desktop kasir/manajemen restoran dengan otentikasi 3 peran pengguna: Admin (Laporan), Chef (Stok/Pesanan), dan Pelayan (Pemilihan Meja/Pembayaran).",
        ],
        skillTags: [
          "Role-Based Auth",
          "Multi-level Access",
          "Desktop App",
          "Scheduling System",
        ],
      },
    ],
    certificates: [
      {
        id: "cert-1",
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialUrl: "#",
      },
      {
        id: "cert-2",
        title: "Frontend Web Developer Expert",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialUrl: "#",
      },
      {
        id: "cert-3",
        title: "Sertifikasi Kompetensi BNSP",
        issuer: "Badan Nasional Sertifikasi Profesi",
        date: "2025",
        credentialUrl: "#",
      },
      {
        id: "cert-4",
        title: "React.js Essential Training",
        issuer: "LinkedIn Learning",
        date: "2023",
        credentialUrl: "#",
      },
    ],
    // --- LAYANAN (ID) - Updated dengan relatedSkills ---
    services: [
      {
        title: "Frontend Engineering",
        desc: "Membangun antarmuka responsif dan interaktif dengan performa tinggi.",
        icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
        relatedSkills: ["Next.js", "React", "Tailwind", "TypeScript", "Framer"],
      },
      {
        title: "Mobile & Desktop Apps", // Diganti agar mencakup Flutter & Electron
        desc: "Mengembangkan aplikasi lintas platform untuk Android, iOS, dan Desktop.",
        icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
        relatedSkills: ["Flutter", "React Native", "Electron"],
      },
      {
        title: "System Architecture",
        desc: "Merancang struktur database relasional dan manajemen backend yang efisien.",
        icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75",
        relatedSkills: ["Node.js", "Prisma", "Supabase", "PostgreSQL", "MySQL"],
      },
      {
        title: "UI/UX & Tools",
        desc: "Menerjemahkan desain menjadi kode presisi serta manajemen versi.",
        icon: "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.077-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
        relatedSkills: ["Figma", "Git", "Docker", "Postman", "VS Code"],
      },
    ],
    projects: [],
  },

  en: {
    about: {
      heading: "About Me",
      avatars: [
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
      ],
      bio: [
        "Hello! I am a student and Software Engineer highly enthusiastic about Fullstack Development. To me, building software is not just about writing lines of code, but about creating complete solutions—from intuitive UI/UX design and responsive interfaces to reliable backend and database architectures.",
        "So far, I have been involved in various end-to-end project explorations across web, desktop, and mobile platforms. From developing generative AI platforms and multi-role academic management systems, to restaurant desktop applications and rural MSME digitization. I truly enjoy the process of transforming complex ideas into functional and impactful digital products.",
      ],
    },
    experiences: [
      {
        id: "exp-1",
        role: "Lead Web Developer (Community Service)",
        company: "Leilem Village, Minahasa",
        duration: "Oct 2025 - Present",
        description: [
          "Led the development of a village profile website as part of a university community service program.",
          "Built a digital catalog to promote local MSMEs, aiding in rural economic digitization.",
        ],
        skillTags: ["Next.js", "Leadership", "Fullstack", "Supabase"],
        images: [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-2",
        role: "Web Developer Intern",
        company: "PT. Bank SulutGo (Funding Marketing)",
        duration: "Sep 2025",
        description: [
          "Gained professional work experience at a corporate banking headquarters.",
          "Designed and built a web-based attendance and daily reporting system using the Prototyping method.",
        ],
        skillTags: ["Prototyping", "Corporate System", "Web App"],
        images: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-3",
        role: "Frontend Developer",
        company: "SPARK - Techofest",
        duration: "[Year]",
        description: [
          "Contributed as a Frontend Developer for SPARK, an educational Generative AI platform showcased at Techofest.",
          "Built the main web interface, including the interactive AI Chatbot, About, and Team pages.",
        ],
        skillTags: ["React/Next.js", "AI Integration", "Chatbot UI"],
        images: [
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop",
        ],
      },
      {
        id: "exp-4",
        role: "Software Engineer",
        company: "JTE Academic Projects",
        duration: "[Year]",
        description: [
          "Classroom Management System: Built a scheduling and booking website for the JTE building. Implemented a multi-role architecture (Superadmin, Admin, and User) with distinct access privileges, alongside user rating and review features.",
          "Restaurant Management App: Developed a desktop app with 3-role authentication: Admin (Reports), Chef (Stock/Orders), and Waiter (Tables/Payments).",
        ],
        skillTags: [
          "Role-Based Auth",
          "Multi-level Access",
          "Desktop App",
          "Scheduling System",
        ],
      },
    ],
    certificates: [
      {
        id: "cert-1",
        title: "Web Programming Basics",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialUrl: "#",
      },
      {
        id: "cert-2",
        title: "Frontend Web Developer Expert",
        issuer: "Dicoding Indonesia",
        date: "2024",
        credentialUrl: "#",
      },
      {
        id: "cert-3",
        title: "BNSP Competency Certification",
        issuer: "National Professional Certification Board",
        date: "2025",
        credentialUrl: "#",
      },
      {
        id: "cert-4",
        title: "React.js Essential Training",
        issuer: "LinkedIn Learning",
        date: "2023",
        credentialUrl: "#",
      },
    ],
    // --- LAYANAN (EN) - Updated ---
    services: [
      {
        title: "Frontend Engineering",
        desc: "Building responsive, interactive interfaces with high performance.",
        icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
        relatedSkills: ["Next.js", "React", "Tailwind", "TypeScript", "Framer"],
      },
      {
        title: "Mobile & Desktop Apps",
        desc: "Developing cross-platform applications for Android, iOS, and Desktop.",
        icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
        relatedSkills: ["Flutter", "React Native", "Electron"],
      },
      {
        title: "System Architecture",
        desc: "Designing efficient and secure database structures and system relations.",
        icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75",
        relatedSkills: ["Node.js", "Prisma", "Supabase", "PostgreSQL", "MySQL"],
      },
      {
        title: "UI/UX & Tools",
        desc: "Translating designs into precise code and managing version control.",
        icon: "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.077-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42",
        relatedSkills: ["Figma", "Git", "Docker", "Postman", "VS Code"],
      },
    ],
    projects: [],
  },
};
