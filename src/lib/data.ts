// --- TYPES & INTERFACES ---

export type Language = "id" | "en";

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
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
    avatars: string[]; // Mendukung banyak foto untuk animasi Stack
  };
  experiences: Experience[];
  projects: Project[];
}

export interface PortfolioData {
  id: PortfolioContent;
  en: PortfolioContent;
  skills: Skill[];
}

// --- MAIN DATA ---

export const portfolioData: PortfolioData = {
  // Data Skills (Universal, tidak perlu diterjemahkan)
  skills: [
    { name: "Next.js", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Prisma ORM", category: "Database" },
    { name: "Supabase", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Git & GitHub", category: "Tools" },
  ],

  // --- KONTEN BAHASA INDONESIA ---
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
          "Berperan aktif dalam proyek tim untuk merancang dan membangun sistem presensi serta pelaporan harian berbasis web dengan pendekatan Prototyping.",
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
        duration: "[Tahun]", // <- Silakan isi tahunnya jika sudah ingat
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
        duration: "[Tahun]", // <- Silakan isi tahunnya
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
    projects: [], // Akan kita isi saat membuat section Projects
  },

  // --- KONTEN BAHASA INGGRIS ---
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
          "Actively contributed to a team project to design and develop a web-based attendance and daily reporting system using the Prototyping development approach.",
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
    projects: [],
  },
};
