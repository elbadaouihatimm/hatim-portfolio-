
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Linkedin, 
  Mail, 
  Smartphone, 
  Send, 
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Bot,
  Shield,
  Globe,
  Target,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Code,
  Github,
  MessageSquare,
  Layers,
  SendHorizontal
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactElement<any>;
  skills: string[];
  color: string;
  accent: string;
}

// --- Data ---
const LINKEDIN_URL = "https://www.linkedin.com/in/el-badaoui-hatim-542aa5358/";

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

const EXPERIENCES: Experience[] = [
  {
    role: "IT Support Specialist & Full-Stack Developer",
    company: "Freelance / Digital Entrepreneur",
    period: "2018 - Present",
    description: [
      "Providing high-level technical support and IT consulting for international B2B clients.",
      "Developing and scaling custom e-commerce solutions using React.js and Shopify Liquid.",
      "Implementing advanced server architectures and network security protocols."
    ]
  },
  {
    role: "Technical Lead - CCTV & Networking",
    company: "STE SECURITOOLS S.A.R.L",
    period: "May 2017 - Present",
    description: [
      "Overseeing the deployment of large-scale CCTV surveillance systems and IP networks.",
      "Configuring complex Cisco/Ubiquiti networking hardware for corporate infrastructure.",
      "Managing technical field teams to ensure project delivery and security compliance."
    ]
  },
  {
    role: "Supervisor - Security Systems & Networking",
    company: "STE SECURESIS S.A.R.L",
    period: "Apr 2016 - Apr 2017",
    description: [
      "Directed the installation and configuration of integrated security solutions.",
      "Coordinated with stakeholders to design robust network layouts for commercial complexes.",
      "Optimized system performance through rigorous testing and proactive maintenance."
    ]
  }
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "IT Infrastructure",
    icon: <Shield className="text-indigo-400" />,
    color: "indigo",
    accent: "#6366f1",
    skills: ["Active Directory", "Cisco Networking", "IP Surveillance", "Network Security", "Cloud Computing", "Virtualization", "IT Helpdesk"]
  },
  {
    title: "E-commerce & Web",
    icon: <Code className="text-emerald-400" />,
    color: "emerald",
    accent: "#10b981",
    skills: ["React.js / Next.js", "Shopify Liquid", "Node.js", "TypeScript", "Tailwind CSS", "REST APIs", "Headless Commerce"]
  },
  {
    title: "Growth Marketing",
    icon: <Target className="text-rose-400" />,
    color: "rose",
    accent: "#f43f5e",
    skills: ["Meta Ads Expert", "Google Ads / SEO", "Sales Funnel Design", "Data Analytics (GA4)", "Email Marketing", "CRO Strategy"]
  },
  {
    title: "Automation & AI",
    icon: <Zap className="text-purple-400" />,
    color: "purple",
    accent: "#a855f7",
    skills: ["n8n / Make", "Python Scripting", "AI Bot Development", "Workflow Optimization", "CRM Integrations", "OpenAI Integration"]
  }
];

const METRICS = [
  { label: "Project Success", value: "98%" },
  { label: "B2B Clients", value: "30+" },
  { label: "Scaling Growth", value: "3.5x" },
  { label: "Systems Online", value: "24/7" },
  { label: "Conversion Lift", value: "40%+" },
  { label: "Exp. Years", value: "10+" }
];

// --- Utils ---
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>, id: string) => {
  e.preventDefault();
  const targetId = id.startsWith('#') ? id.substring(1) : id;
  const element = document.getElementById(targetId);
  if (element) {
    const offset = 80; // Navbar offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Hook for reveal on scroll ---
const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- Components ---

const AnimatedCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState("1");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Matches digits and dots to separate number from suffix
    const match = value.match(/(\d+\.?\d*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const endValue = parseFloat(match[0]);
    const suffix = value.replace(match[0], '');
    const isDecimal = match[0].includes('.');
    const duration = 2000; // Total animation time
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo for smooth slowing down
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      // Calculate current count from 1 to endValue
      const currentCount = (easedProgress * (endValue - 1)) + 1;
      
      let formatted: string;
      if (isDecimal) {
        formatted = currentCount.toFixed(1);
      } else {
        formatted = Math.floor(currentCount).toString();
      }
      
      setDisplayValue(formatted + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return <div ref={containerRef}>{displayValue}</div>;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-10'}`}>
      <div className={`max-w-6xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-2xl py-3 px-8 rounded-full border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)]' : ''}`}>
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')}
          className="flex items-center text-xl font-bold tracking-tighter group cursor-pointer"
        >
          <span className="text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">HATIM EL BADAOUI</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-12">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-zinc-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="group relative overflow-hidden px-8 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all cursor-pointer"
          >
            <span className="relative z-10">HIRE ME</span>
            <div className="absolute inset-0 bg-indigo-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-[110] flex flex-col p-12 space-y-10 animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center">
             <span className="text-2xl font-black tracking-tighter uppercase">Navigation</span>
             <button onClick={() => setIsOpen(false)} className="p-4 bg-white/5 rounded-full"><X size={28} /></button>
          </div>
          <div className="flex flex-col space-y-6">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  setIsOpen(false);
                  scrollToSection(e, link.href);
                }}
                className="text-5xl font-black uppercase tracking-tighter hover:text-indigo-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <a href="mailto:astro.dev.it@gmail.com" className="p-6 bg-white/5 rounded-3xl flex flex-col items-center gap-2">
              <Mail className="text-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 rounded-3xl flex flex-col items-center gap-2">
              <Linkedin className="text-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const SkillsCarousel = () => {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % SKILL_CATEGORIES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + SKILL_CATEGORIES.length) % SKILL_CATEGORIES.length);
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative max-w-5xl mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-12">
        <div className="flex flex-col">
          <span className="text-indigo-500 font-black tracking-[0.3em] text-[10px] uppercase mb-2">Technical Mastery</span>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Professional <br/>Expertise</h3>
        </div>
        <div className="flex gap-4">
          <button onClick={prev} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all active:scale-95 shadow-xl">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all active:scale-95 shadow-xl">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[40px] border border-white/5 bg-[#08080a]">
        <div 
          className="carousel-track flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" 
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="min-w-full p-12 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10`} style={{ borderColor: `${cat.accent}33` }}>
                  {React.cloneElement(cat.icon, { size: 36 })}
                </div>
                <h4 className="text-4xl font-black uppercase tracking-tight">{cat.title}</h4>
                <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                  Driving digital excellence through a blend of traditional IT rigor and modern full-stack methodologies. Focused on building high-conversion systems.
                </p>
              </div>
              <div className="bg-black/20 rounded-[32px] p-8 border border-white/5">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-6">Expertise Stack</div>
                <div className="grid grid-cols-1 gap-4">
                  {cat.skills.map(skill => (
                    <div key={skill} className="flex items-center gap-4 group">
                      <div className="w-2 h-2 rounded-full transition-transform" style={{ backgroundColor: cat.accent }} />
                      <span className="text-zinc-300 font-bold uppercase tracking-widest text-xs group-hover:text-white transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {SKILL_CATEGORIES.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setActive(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full ${active === idx ? 'w-12 bg-indigo-500' : 'w-3 bg-white/10 hover:bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

const AIChatAssistant = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {
      role: 'assistant', 
      content: "Hello! I'm the professional AI assistant for Hatim El Badaoui. Whether you speak English, French, Arabic, or any other language, I'm here to help you learn more about Hatim's expertise in IT, Full-Stack Development, and Digital Strategy. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', content: userMsg}]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, {role: 'user', content: userMsg}].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{text: m.content}]
        })),
        config: {
          systemInstruction: `You are the elite professional AI persona of Hatim El Badaoui. 
          Hatim is a Senior IT Specialist, Full-Stack Web Developer, and E-commerce Growth Strategist based in Safi, Morocco. 
          Your LinkedIn profile is: ${LINKEDIN_URL}. 
          
          CAREER HIGHLIGHTS:
          - Technical Lead at STE SECURITOOLS S.A.R.L (2017-Present): Large-scale CCTV & IP Networks.
          - IT Support & Developer (Freelance): Scaling B2B clients and e-commerce (Shopify/React).
          - Supervisor at STE SECURESIS S.A.R.L (2016-2017): Integrated security solutions.
          
          RULES:
          1. Speak in the first person ("I", "My").
          2. ALWAYS respond in the same language as the user's inquiry (supports Arabic, French, English, etc.).
          3. Be extremely professional and VERY BRIEF (max 2-3 short sentences).
          4. Ground every answer in Hatim's real career data and LinkedIn information.
          5. If asked about contact info, mention email (astro.dev.it@gmail.com) or the LinkedIn profile.
          6. Start with a warm, expert greeting if it's the beginning of a conversation.`,
        }
      });
      setMessages(prev => [...prev, {role: 'assistant', content: response.text || "I'm currently optimizing my systems. Please reach out via email for urgent inquiries."}]);
    } catch {
      setMessages(prev => [...prev, {role: 'assistant', content: "My connection is a bit unstable. Let's talk via LinkedIn or the contact form above!"}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare size={30} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#050505] rounded-full animate-pulse" />
        </button>
      ) : (
        <div className="w-[380px] md:w-[420px] h-[580px] bg-[#0c0c0e] rounded-3xl flex flex-col overflow-hidden border border-white/10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300">
          <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Bot size={22} />
              </div>
              <div>
                <div className="font-bold text-sm">Hatim's Concierge</div>
                <div className="text-[10px] opacity-70 uppercase tracking-widest font-black">Expert AI Active</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-zinc-200 border border-white/10 rounded-tl-none backdrop-blur-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 p-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>
          
          <div className="p-5 bg-black/40 border-t border-white/5 backdrop-blur-xl">
            <div className="relative flex gap-2">
              <input 
                value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-xl px-5 py-3.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                placeholder="Ask me anything in any language..."
              />
              <button onClick={handleSend} disabled={loading} className="bg-indigo-600 p-3.5 rounded-xl text-white hover:bg-indigo-500 active:scale-95 disabled:opacity-50 shadow-lg">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  useRevealOnScroll();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen text-zinc-100 selection:bg-indigo-500/40">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center min-h-screen justify-center overflow-hidden">
        <div className="reveal inline-flex items-center gap-3 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
          <Sparkles size={14} className="animate-pulse" />
          SAFI-BASED • GLOBAL DIGITAL SOLUTIONS
        </div>
        
        <div className="reveal relative mb-12" style={{ transitionDelay: '200ms' }}>
           <h1 className="text-6xl md:text-[180px] font-black leading-[0.8] tracking-tighter uppercase flex flex-col items-center">
             <span className="text-white drop-shadow-2xl uppercase">HATIM</span>
             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 animate-gradient-x px-4 pb-4">EL BADAOUI</span>
           </h1>
           <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full scale-50 md:scale-100 opacity-20 pointer-events-none blur-3xl" />
        </div>

        <p className="reveal text-zinc-400 text-xl md:text-3xl max-w-4xl mb-20 leading-relaxed font-light tracking-tight" style={{ transitionDelay: '400ms' }}>
          Crafting <span className="text-white font-bold">Unbreakable Infrastructures</span> & <span className="text-white font-bold">High-Conversion E-commerce Platforms</span>. Bridging the gap between code and business growth.
        </p>

        <div className="reveal flex flex-wrap gap-8 justify-center" style={{ transitionDelay: '600ms' }}>
          <div 
            onClick={(e) => scrollToSection(e, 'about')}
            className="group relative px-14 py-6 bg-white text-black font-black rounded-full transition-all hover:scale-110 active:scale-95 shadow-[0_25px_50px_-12px_rgba(255,255,255,0.2)] overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-4 uppercase tracking-[0.2em] text-xs">Explore My Services <ArrowUpRight size={20} /></span>
            <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
          </div>
          <div 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="px-14 py-6 bg-white/5 text-white font-black rounded-full border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-110 active:scale-95 uppercase tracking-[0.2em] text-xs cursor-pointer"
          >
            Work With Me
          </div>
        </div>
        
        {/* Metrics Grid */}
        <div className="reveal mt-32 grid grid-cols-2 md:grid-cols-6 gap-12 w-full pt-20 border-t border-white/5" style={{ transitionDelay: '800ms' }}>
          {METRICS.map((m, i) => (
            <div key={i} className="text-center group cursor-default p-4 hover:bg-white/[0.02] rounded-3xl transition-colors">
              <div className="text-4xl font-black text-white mb-2 group-hover:text-indigo-500 transition-all duration-300 group-hover:-translate-y-1">
                <AnimatedCounter value={m.value} />
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-black">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise / Skills Carousel Section */}
      <section id="about" className="py-40 border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
            <div className="max-w-3xl">
              <span className="text-indigo-500 font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Biography</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">ENGINEERING <br/>DIGITAL POWER.</h2>
            </div>
            <div className="text-zinc-500 font-bold text-xl max-w-sm md:text-right border-r-4 border-indigo-500 pr-8 italic leading-relaxed">
              "Success is built on resilient systems and strategic scale."
            </div>
          </div>
          <SkillsCarousel />
        </div>
      </section>

      {/* Experience Journey */}
      <section id="experience" className="py-40 bg-[#08080a] relative overflow-hidden border-t border-white/5 scroll-mt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        <div className="reveal max-w-4xl mx-auto px-6 relative z-10 text-center mb-40">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8">Career</h2>
          <p className="text-zinc-500 text-xl font-medium tracking-wide max-w-2xl mx-auto">A decade of delivering mission-critical IT solutions and growth-focused e-commerce platforms.</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-40">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className={`reveal flex flex-col md:flex-row gap-16 md:items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="md:w-1/2">
                <div className={`p-12 glass-card rounded-[48px] border-t-4 ${idx % 2 === 0 ? 'border-indigo-500/50' : 'border-purple-500/50'} relative group`}>
                   <div className="absolute -top-12 left-10 md:left-auto md:-right-12 text-[120px] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-indigo-500/[0.05] transition-colors">
                     0{idx + 1}
                   </div>
                  <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.5em] mb-6 block">{exp.period}</span>
                  <h3 className="text-4xl font-black mb-3 tracking-tighter group-hover:text-white transition-colors uppercase">{exp.role}</h3>
                  <p className="text-indigo-400 font-black text-sm uppercase tracking-[0.3em] mb-12">{exp.company}</p>
                  <ul className="space-y-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-5 text-zinc-400 text-base leading-relaxed font-medium">
                        <CheckCircle2 size={20} className="text-indigo-500 shrink-0 mt-1" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:flex md:w-1/2 justify-center items-center">
                 <div className="relative group">
                   <div className="w-80 h-80 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-8xl font-black opacity-20 scale-90 group-hover:scale-100 transition-all duration-700">
                     <Layers className="text-indigo-500/50 group-hover:rotate-12 transition-transform" size={100} />
                   </div>
                   <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-ping opacity-20" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 px-6 max-w-5xl mx-auto scroll-mt-20">
        <div className="reveal space-y-16">
          <div className="text-center space-y-4">
             <span className="text-indigo-500 font-black tracking-[0.5em] text-[10px] uppercase">Ready to elevate?</span>
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">Let's <span className="text-indigo-500">Secure</span><br/>Your Vision</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
               <div className="p-8 glass-card rounded-[40px] space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.location.href='mailto:astro.dev.it@gmail.com'}>
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Mail size={24} /></div>
                      <div>
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Email Me</div>
                        <div className="text-sm font-bold">astro.dev.it@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 group cursor-pointer" onClick={() => window.location.href='tel:+212612006766'}>
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all"><Smartphone size={24} /></div>
                      <div>
                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Call Me</div>
                        <div className="text-sm font-bold">+212 612 006 766</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a href={LINKEDIN_URL} target="_blank" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Github size={18} /></a>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-8">
              {formState === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center p-16 glass-card rounded-[40px] text-center space-y-6 animate-in zoom-in-95 duration-500">
                   <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl shadow-emerald-500/20"><CheckCircle2 size={48} /></div>
                   <h3 className="text-4xl font-black uppercase tracking-tighter">Transmission Received</h3>
                   <p className="text-zinc-500 max-w-sm font-medium">Your request has been securely logged. Hatim will reach out shortly.</p>
                   <button onClick={() => setFormState('idle')} className="text-indigo-500 font-black uppercase tracking-widest text-[10px] underline decoration-2 underline-offset-8">New Message</button>
                </div>
              ) : (
                <form className="glass-card p-10 md:p-14 rounded-[48px] space-y-10" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Full Name</label>
                       <div className="relative group">
                          <input required className="w-full bg-[#0c0c0e] border border-white/5 rounded-2xl px-8 py-5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold placeholder:text-zinc-800" placeholder="Name" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Email Address</label>
                       <div className="relative group">
                          <input required type="email" className="w-full bg-[#0c0c0e] border border-white/5 rounded-2xl px-8 py-5 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold placeholder:text-zinc-800" placeholder="name@email.com" />
                       </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Message Details</label>
                     <div className="relative group">
                        <textarea required rows={5} className="w-full bg-[#0c0c0e] border border-white/5 rounded-[32px] px-8 py-7 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all font-bold resize-none placeholder:text-zinc-800" placeholder="How can I assist your business growth?"></textarea>
                     </div>
                  </div>
                  <button type="submit" disabled={formState === 'submitting'} className="group w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[24px] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-6 uppercase tracking-[0.4em] text-[11px]">
                    {formState === 'submitting' ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : <>Finalize Contact <SendHorizontal size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
             <div 
               className="text-3xl font-black tracking-tighter uppercase group cursor-pointer"
               onClick={(e) => scrollToSection(e, 'home')}
             >
               HATIM <span className="text-indigo-500 group-hover:text-purple-500 transition-colors">EL BADAOUI</span>
             </div>
             <p className="text-zinc-600 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-md">
               SYSTEM ARCHITECT • FULL-STACK ENGINEER • GROWTH STRATEGIST <br/>© 2025 HATIM EL BADAOUI.
             </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-all transform hover:-translate-y-1"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex gap-10">
             <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 hover:text-indigo-500 transition-colors">LinkedIn Profile</a>
             <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 hover:text-indigo-500 transition-colors">IT Consulting</a>
           </div>
           <div className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em] text-center">SAFI • MOROCCO • SERVING CLIENTS GLOBALLY</div>
        </div>
      </footer>

      <AIChatAssistant />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
