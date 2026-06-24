import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Award, ArrowUp, Download, Github, GraduationCap, Linkedin, Mail, MapPin,
  Menu, Moon, Phone, Sun, X, Briefcase, Sparkles, Network, Cpu,
  ChevronLeft, ChevronRight, CheckCircle2, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { z } from "zod";
import profileAsset from "@/assets/okuhle-profile.jpg.asset.json";

const profileUrl = profileAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Okuhle Charlie — AI, Networking & Digital Transformation" },
      { name: "description", content: "Portfolio of Okuhle Charlie, CAPACITI Intern. Showcasing projects, certifications and experience in AI and Network Engineering." },
      { property: "og:title", content: "Okuhle Charlie — Professional Portfolio" },
      { property: "og:description", content: "AI, Networking and Digital Transformation portfolio." },
      { property: "og:image", content: profileUrl },
      { property: "twitter:image", content: profileUrl },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education & Achievements" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 400);
      let current = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) current = n.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-accent" />
          <p className="text-sm text-muted-foreground">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="min-w-0" />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active === n.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => goTo(n.id)} className={`rounded-md px-3 py-3 text-left text-sm font-medium ${active === n.id ? "text-accent" : "text-foreground"}`}>
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer goTo={goTo} />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[var(--navy)] text-white shadow-elegant transition-transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/* ───────────── HERO ───────────── */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--navy)]" />
      <div className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_50%_at_20%_30%,color-mix(in_oklab,var(--sky)_45%,transparent),transparent),radial-gradient(50%_40%_at_85%_70%,color-mix(in_oklab,var(--sky)_30%,transparent),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="text-center lg:text-left animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" /> Available for opportunities
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
            Okuhle Charlie
          </h1>
          <p className="mt-2 text-lg font-bold text-[color:var(--sky)]">CAPACITI Intern</p>
          <p className="mt-4 font-display text-xl font-semibold italic text-white">
            “In everything you do, AIM HIGH!”
          </p>
          <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white lg:max-w-none">
            Passionate about Artificial Intelligence, Networking, and Digital Transformation.
            I am committed to developing innovative technology solutions that create real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="/Okuhle-Charlie-CV.txt"
              download
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[var(--sky)] px-6 text-sm font-bold text-[var(--navy)] shadow-glow transition-transform hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none lg:justify-end animate-fade-up">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[color:var(--sky)]/40 to-transparent blur-2xl" />
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-white/20 shadow-elegant lg:max-w-md">
            <img src={profileUrl} alt="Okuhle Charlie" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── ABOUT ───────────── */
function About() {
  const blocks = [
    { title: "Personal Background", body: "As I grew up with a hardworking single mom who was always willing to learn new things, I developed a strong desire to continuously learn and stay informed. I am a dedicated and ambitious individual passionate about technology, learning, and creating positive impact. I enjoy solving problems, collaborating with others, and developing skills that help me grow both personally and professionally." },
    { title: "Professional Background", body: "I am an IT graduate specializing in Network Engineering with growing expertise in Artificial Intelligence. My experience includes academic projects, professional training, and hands-on learning opportunities that have strengthened my technical and problem-solving skills." },
    { title: "Vision", body: "To become a technology leader who leverages AI and networking technologies to solve complex business and societal challenges." },
    { title: "Mission", body: "To continuously learn, innovate, and create technology-driven solutions that improve efficiency, accessibility, and decision-making." },
    { title: "Career Goals", body: "I plan to pursue an Advanced Diploma in Information Technology next year to expand my knowledge and enhance my career opportunities. My goal is to build a successful career in the technology industry specializing in AI and Network Engineering while continuously learning and growing as a professional." },
    { title: "Professional Interests", body: "My professional interests include Artificial Intelligence, Machine Learning, Network Engineering, Cybersecurity, and Digital Innovation. I am particularly interested in how emerging technologies can be used to improve business processes, enhance decision-making, and create meaningful solutions for society. I enjoy exploring new technologies, working on practical projects, and staying informed about industry trends and advancements." },
  ];
  return (
    <section id="about" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A learner, a builder, an aspiring AI & Networks leader." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {blocks.map((b) => (
            <Card key={b.title} className="p-6 transition-shadow hover:shadow-elegant">
              <h3 className="text-lg font-bold text-[var(--navy)] dark:text-white">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── EDUCATION ───────────── */
function Education() {
  const timeline = [
    { years: "2023 – 2025", school: "Nelson Mandela University", degree: "Diploma in Information Technology (Communication Networks)" },
    { years: "2018 – 2022", school: "Gonubie High School", degree: "National Senior Certificate" },
  ];
  const achievements = [
    { icon: GraduationCap, title: "Completed Diploma in Information Technology", body: "Nelson Mandela University — Communication Networks specialisation." },
    { icon: Award, title: "Completed AI Bootcamp Coursework", body: "CAPACITI AI Bootcamp — ML, Prompt Engineering and Responsible AI." },
  ];

  return (
    <section id="education" className="section-pad bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Education & Achievements" title="Academic journey & milestones." />

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="mb-6 font-display text-xl font-bold">Education Timeline</h3>
            <ol className="relative space-y-8 border-l-2 border-[var(--sky)]/40 pl-8">
              {timeline.map((t) => (
                <li key={t.years} className="relative">
                  <span className="absolute -left-[2.4rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-[var(--sky)] text-[var(--navy)] shadow-glow">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.years}</p>
                  <h4 className="mt-1 text-lg font-bold">{t.school}</h4>
                  <p className="text-sm text-muted-foreground">{t.degree}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-6 font-display text-xl font-bold">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((a) => (
                <Card key={a.title} className="flex gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-semibold">{a.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── EXPERIENCE ───────────── */
function Experience() {
  return (
    <section id="experience" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Experience" title="Current role & responsibilities." />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-1">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--navy)] text-white">
              <Briefcase className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold">Intern</h3>
            <p className="mt-1 text-accent font-semibold">CAPACITI</p>
            <p className="mt-2 text-sm text-muted-foreground">April 2026 – Present</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Current role
            </div>
          </Card>
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-bold">Responsibilities</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Enrolled AI Bootcamp and Professional Development courses where I learnt some AI skills.
              Machine Learning Fundamentals, Prompt Engineering, AI Application Development, and Responsible AI Practices.
              Professional Communication, Team Collaboration, Time Management, Problem-Solving, Workplace Professionalism.
              Working on real-world AI projects to build a strong portfolio and demonstrate applied knowledge.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ───────────── PROJECTS ───────────── */
const PROJECTS = [
  {
    icon: Network,
    title: "Airport Network Design and Simulation",
    role: "Student Network Engineer",
    tools: ["Cisco Packet Tracer"],
    overview: "Uitenhage Airport had no existing network infrastructure despite needing to support regional airport operations. Avenger Networks designed and implemented a complete network solution from scratch, covering connectivity, security, passenger services, and departmental communication. The project included cabling, hardware deployment, network design, IP addressing, VLAN segmentation, and secure remote access.",
    outcome: "Successfully transformed Uitenhage Airport into a secure, scalable, and fully connected facility capable of supporting modern airport operations, passenger services, security systems, and future growth.",
  },
  {
    icon: GraduationCap,
    title: "Student Residence Tracking System",
    role: "Student Software Engineer",
    tools: ["C#", "Windows Forms", "SQL"],
    overview: "Developed a system that helps students locate available accommodation both on-campus and off-campus by tracking residence occupancy and bed availability.",
    outcome: "Students can quickly find available residence spaces while universities and residence managers gain better visibility into accommodation capacity, resulting in faster housing placement and reduced administrative workload.",
  },
  {
    icon: Cpu,
    title: "Aura Seas Ticket Classification System",
    role: "AI Developer",
    tools: ["ChatGPT", "Lovable.dev"],
    overview: "A web-based support portal for a cruise ship environment that allows guests and crew members to submit support requests. An AI engine automatically classifies tickets into the correct department.",
    outcome: "Automatically assigned tickets to relevant departments with improved routing accuracy and reduced response times.",
  },
];

function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="projects" className="section-pad bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Projects" title="Selected work across networks & AI." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Card key={p.title} className="group flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[var(--navy)] to-[color:var(--sky)] text-white">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{p.role}</p>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{p.overview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">{t}</span>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setOpen(i)}
                className="mt-6 self-start"
              >
                View details
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open !== null && (
            <div>
              <h3 className="font-display text-2xl font-bold">{PROJECTS[open].title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{PROJECTS[open].role}</p>
              <div className="mt-6 space-y-5 text-sm leading-relaxed">
                <Field label="Overview" value={PROJECTS[open].overview} />
                <Field label="Technologies Used" value={PROJECTS[open].tools.join(", ")} />
                <Field label="Outcome" value={PROJECTS[open].outcome} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-foreground">{value}</p>
    </div>
  );
}

/* ───────────── CERTIFICATIONS ───────────── */
const CERT_CATEGORIES: { name: string; issuer: string; items: string[] }[] = [
  {
    name: "Candidate Professional Development",
    issuer: "CAPACITI",
    items: [
      "Write Professional Emails in English",
      "Verbal Communications and Presentation Skills",
      "Active Listening: Enhancing Communication Skills",
      "Developing Interpersonal Skills",
      "Work Smarter, Not Harder: Time Management for Personal & Professional Productivity",
      "Emotional Intelligence in the Workplace",
      "Finding Your Professional Voice: Confidence & Impact",
      "Introduction to Personal Branding",
      "Leading with Impact: Team Dynamics, Strategy and Ethics",
      "Financial Planning for Young Adults",
    ],
  },
  {
    name: "AI Bootcamp",
    issuer: "CAPACITI / Coursera",
    items: [
      "Generative AI: Prompt Engineering Basics",
      "AI For Everyone",
      "Introduction to Artificial Intelligence",
      "Introduction to Generative AI",
      "AI Essentials",
      "Generative AI with Large Language Models",
      "AI Foundations: Prompt Engineering with ChatGPT",
      "Python for Data Science, AI and Development",
      "Supervised Machine Learning: Regression and Classification",
      "Advanced Learning Algorithms",
      "Unsupervised Learning, Recommenders, Reinforcement Learning",
      "Trustworthy AI: Managing Bias, Ethics and Accountability",
      "Introduction to Responsible AI",
    ],
  },
  {
    name: "Google AI Essentials Specialization",
    issuer: "Google",
    items: [
      "Introduction to AI",
      "Maximize Productivity with AI Tools",
      "Discover the Art of Prompting",
      "Use AI Responsibly",
      "Stay Ahead of the AI Curve",
      "Google AI Essentials",
    ],
  },
  {
    name: "School Certificate",
    issuer: "Nelson Mandela University",
    items: ["Diploma in Information Technology"],
  },
  {
    name: "CCNA",
    issuer: "Cisco Networking Academy",
    items: [
      "Enterprise Networking, Security and Automation",
      "Switching, Routing and Wireless Essentials",
      "Introduction to Networks",
      "Introduction to Cybersecurity",
    ],
  },
];

function Certifications() {
  const [viewing, setViewing] = useState<{ title: string; issuer: string } | null>(null);

  return (
    <section id="certifications" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Certifications" title="Continuous learning across AI, Networks & professional skills." />

        <div className="mt-12 space-y-14">
          {CERT_CATEGORIES.map((cat) => (
            <CategoryCarousel key={cat.name} category={cat} onView={(title) => setViewing({ title, issuer: cat.issuer })} />
          ))}
        </div>
      </div>

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {viewing && (
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/50 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{viewing.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{viewing.issuer}</p>
                </div>
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${viewing.title} — ${viewing.issuer}\n\nCertificate file placeholder.`)}`}
                  download={`${viewing.title}.txt`}
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
                  aria-label="Download certificate"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>
              <div className="grid place-items-center bg-muted/30 p-10 min-h-[60vh]">
                <div className="w-full max-w-xl rounded-xl border-2 border-dashed border-border bg-card p-10 text-center">
                  <FileText className="mx-auto h-12 w-12 text-accent" />
                  <h4 className="mt-4 font-display text-xl font-bold">{viewing.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Issued by {viewing.issuer}</p>
                  <p className="mt-6 text-xs text-muted-foreground">
                    Certificate preview placeholder. Upload the actual PDF/JPG/PNG file to display it here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function CategoryCarousel({ category, onView }: { category: { name: string; issuer: string; items: string[] }; onView: (title: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };
  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold sm:text-2xl">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.items.length} certificate{category.items.length > 1 ? "s" : ""} · {category.issuer}</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => scroll(1)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div ref={ref} className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
        {category.items.map((title) => (
          <Card key={title} className="flex w-72 shrink-0 snap-start flex-col p-5 transition-shadow hover:shadow-elegant">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
              <Award className="h-5 w-5" />
            </span>
            <h4 className="mt-4 line-clamp-3 font-semibold leading-snug">{title}</h4>
            <p className="mt-2 text-xs text-muted-foreground">{category.issuer}</p>
            <Button variant="outline" size="sm" onClick={() => onView(title)} className="mt-auto self-start">View Certificate</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ───────────── CONTACT ───────────── */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = contactSchema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! Okuhle will be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  const contacts = [
    { icon: Mail, label: "Email", value: "charlieokuhle4@gmail.com", href: "mailto:charlieokuhle4@gmail.com" },
    { icon: Phone, label: "Phone", value: "068 374 4420", href: "tel:+27683744420" },
    { icon: Github, label: "GitHub", value: "OKUHLECHARLIE", href: "https://github.com/OKUHLECHARLIE" },
    { icon: Linkedin, label: "LinkedIn", value: "okuhle-charlie", href: "https://www.linkedin.com/in/okuhle-charlie-b360743a1/" },
  ];

  return (
    <section id="contact" className="section-pad bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Contact" title="Let's connect." />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-3">
            <form onSubmit={submit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5" />
                {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5" />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" disabled={submitting} className="bg-[var(--navy)] text-white hover:bg-[var(--navy)]/90">
                {submitting ? "Sending…" : (<><CheckCircle2 className="mr-2 h-4 w-4" /> Send Message</>)}
              </Button>
            </form>
          </Card>

          <div className="space-y-4 lg:col-span-2">
            {contacts.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:shadow-elegant">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="truncate font-medium group-hover:text-accent">{c.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── FOOTER ───────────── */
function Footer({ goTo }: { goTo: (id: string) => void }) {
  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--sky)]">Quick Links</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}><button onClick={() => goTo(n.id)} className="text-white/80 hover:text-white">{n.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--sky)]">Contact Details</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> charlieokuhle4@gmail.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 068 374 4420</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--sky)]">Social Media</p>
          <div className="mt-4 flex gap-3">
            <a href="https://github.com/OKUHLECHARLIE" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[color:var(--sky)] hover:text-[var(--navy)]"><Github className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/in/okuhle-charlie-b360743a1/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[color:var(--sky)] hover:text-[var(--navy)]"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          © 2026 Okuhle Charlie. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

/* ───────────── SHARED ───────────── */
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{title}</h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--navy)] to-[color:var(--sky)]" />
    </div>
  );
}
