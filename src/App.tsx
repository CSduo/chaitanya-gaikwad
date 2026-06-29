import { motion } from "motion/react";
import { Github, Linkedin, Instagram, ExternalLink, Brain, Shield, Info, GraduationCap, MapPin } from "lucide-react";

const NAV_ITEMS = ["Home", "About", "Research", "Projects", "Writing", "Contact"];

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/dishasinghaa/Portfolio/blob/main/README.md", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/dishasingha?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/alooopostoooo?igsh=Z2hldm84aXNmdG1r", label: "Instagram" },
];

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-warm-bg/80 backdrop-blur-sm border-b border-warm-ink/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="serif text-xl font-semibold tracking-tight"
          >
            DS.
          </motion.span>
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[10px] uppercase tracking-widest hover:text-warm-accent transition-colors font-semibold"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <section id="home" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-warm-accent" />
              </div>
              <h1 className="serif text-7xl md:text-8xl leading-none mb-6">
                Disha <br /> Singha
              </h1>
              <p className="text-base text-warm-ink/70 max-w-sm leading-relaxed mb-8">
                B.Tech Student in CSE (AIML). <br />
                Independent AI safety researcher focused on RLHF robustness, reward hacking, and the structural limits of honest optimization.
              </p>
              <div className="flex space-x-3">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full border border-warm-ink/15 hover:border-warm-accent hover:text-warm-accent transition-all bg-white/40 shadow-sm"
                  >
                    <link.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-warm-ink/5 border border-warm-ink/10 max-w-sm mx-auto md:ml-auto shadow-2xl shadow-warm-accent/5"
            >
              <img 
                src="/regenerated_image_1777361976700.png" 
                alt="Disha Singha"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-24 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <h2 className="serif text-4xl mb-4">Academic & Research</h2>
              <div className="h-px w-20 bg-warm-accent" />
            </div>
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white/50 p-8 rounded-3xl border border-warm-ink/5 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warm-accent/10 rounded-2xl">
                      <GraduationCap className="text-warm-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">B.Tech in CSE (AIML)</h3>
                      <p className="text-sm text-warm-ink/60">Narula Institute of Technology, India</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent bg-warm-accent/5 px-3 py-1.5 rounded-full self-start sm:self-center">
                    2025 — 2029 Expected
                  </span>
                </div>

                <div className="pt-6 border-t border-warm-ink/5 space-y-4">
                  <p className="text-lg leading-relaxed text-warm-ink/90 italic">
                    "Uncertainty is not noise — it's underused information."
                  </p>
                  <p className="text-sm leading-relaxed text-warm-ink/70">
                    Independent AI safety researcher working on RLHF robustness and reward hacking. 
                    My work is driven by a single thread: uncertainty is systematically underused in safety-critical ML pipelines. 
                    This runs across my preprint, my ongoing benchmark work, and my theoretical writing on observer-relative hardness.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4 p-6 rounded-2xl bg-warm-ink/2 border border-warm-ink/5">
                  <div className="flex items-center gap-2 text-warm-accent">
                    <MapPin size={16} />
                    <h4 className="text-[10px] uppercase tracking-widest font-bold">Engagement</h4>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">EAG Global & EAGxIndia · 2025</p>
                    <p className="text-xs text-warm-ink/60 leading-relaxed mb-2">
                      Participated in discussions on AI safety, long-term risks, and global priorities 
                      with researchers in the alignment community.
                    </p>
                    <p className="text-sm font-semibold mb-1 mt-3">BlueDot Impact AI Safety · 2026</p>
                    <p className="text-xs text-warm-ink/60 leading-relaxed">
                      Selective technical curriculum covering alignment engineering, mechanistic interpretability, and inner alignment failures.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-2xl bg-warm-ink/2 border border-warm-ink/5">
                  <div className="flex items-center gap-2 text-warm-accent">
                    <Brain size={16} />
                    <h4 className="text-[10px] uppercase tracking-widest font-bold">Research Focus</h4>
                  </div>
                  <div className="space-y-2">
                    {["RLHF robustness & reward hacking", "Uncertainty estimation in ML", "Mechanistic interpretability", "Observer-relative hardness & complexity theory"].map(item => (
                      <div key={item} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-warm-ink/60 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="mb-24 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="serif text-5xl">Research</h2>
            <a
              href="https://arxiv.org/abs/2604.26360"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-widest font-bold p-3 border border-warm-ink/10 rounded-full hover:bg-warm-accent hover:text-white transition-all"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-warm-ink text-white shadow-2xl mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
              <div>
                <p className="text-warm-accent text-[10px] uppercase tracking-widest font-bold mb-4">arXiv Preprint · Sole Author · v2 June 2026</p>
                <h3 className="serif text-3xl leading-tight max-w-2xl">
                  Uncertainty-Aware Reward Discounting for Mitigating Reward Hacking
                </h3>
              </div>
              <a
                href="https://arxiv.org/abs/2604.26360v2"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-warm-ink flex items-center justify-center transition-all flex-shrink-0"
              >
                <ExternalLink size={24} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/70">
              <p className="text-base leading-relaxed">
                Introduced UARD — a framework that jointly models epistemic and aleatoric uncertainty in RLHF via a confidence-adjusted Reliability Filter. Reduces reward hacking by up to 93.6% across MuJoCo benchmarks vs. nine baselines, with near-zero safety violations under 10–30% annotation noise.
              </p>
              <div className="space-y-3">
                {[
                  "Bellman contraction proof guaranteeing convergence",
                  "Information Bottleneck theoretical grounding",
                  "46 pages · 16 figures · 6 tables",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-2 flex-shrink-0" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Reward Robustness", desc: "Building RLHF systems that don't collapse under distributional shift or annotation noise." },
              { icon: Brain, title: "Structural Limits", desc: "Understanding when honest behavior from optimization-based systems is theoretically impossible." },
              { icon: Info, title: "Observer-Relative Hardness", desc: "Exploring how computational hardness is a relationship between structure and a bounded observer, not an intrinsic property." }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-warm-ink/5 hover:border-warm-accent shadow-sm transition-all"
              >
                <item.icon className="mb-6 text-warm-accent" size={32} strokeWidth={1} />
                <h3 className="serif text-2xl mb-3">{item.title}</h3>
                <p className="text-sm text-warm-ink/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-24 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="serif text-5xl">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* CodeHack-Eval */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/40 p-2 rounded-[3rem] border border-warm-ink/5 group"
            >
              <div className="aspect-[1.5/1] mb-6 rounded-[2.8rem] overflow-hidden bg-indigo-900/5 relative">
                <div className="absolute inset-0 flex items-center justify-center text-indigo-900/10">
                  <Shield size={100} strokeWidth={0.5} />
                </div>
              </div>
              <div className="px-8 pb-10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-700/60 mb-2 block">Alignment · Benchmarking · RLHF</span>
                <h3 className="serif text-3xl mb-4">CodeHack-Eval</h3>
                <p className="text-sm text-warm-ink/70 leading-relaxed max-w-sm mb-6">
                  A benchmark probing whether LLM-based coding agents exploit reward signal vulnerabilities rather than solving the underlying task. Extends the UARD uncertainty framework to agentic code generation settings.
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-600 text-[10px] uppercase font-bold rounded-full animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Ongoing
                  </span>
                </div>
              </div>
            </motion.div>

            {/* UmbraGraph */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/40 p-2 rounded-[3rem] border border-warm-ink/5 group"
            >
              <div className="aspect-[1.5/1] mb-6 rounded-[2.8rem] overflow-hidden bg-warm-ink/5 relative">
                <div className="absolute inset-0 flex items-center justify-center text-warm-ink/5">
                  <Brain size={100} strokeWidth={0.5} />
                </div>
              </div>
              <div className="px-8 pb-10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-warm-ink/30 mb-2 block">Uncertainty · Graph Theory · Infrastructure</span>
                <h3 className="serif text-3xl mb-4">UmbraGraph</h3>
                <p className="text-sm text-warm-ink/70 leading-relaxed max-w-sm mb-6">
                  Probabilistic road-network resilience model using uncertainty-weighted betweenness centrality, producing a two-dimensional resilience index for infrastructure robustness under failure scenarios.
                </p>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-warm-ink/5 text-warm-ink/40 text-[10px] uppercase font-bold rounded-full">Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="mb-24 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="serif text-5xl">Writing & Analysis</h2>
            <a 
              href="https://open.substack.com/pub/klovasdiary" 
              target="_blank" 
              rel="noreferrer"
              className="text-[10px] uppercase tracking-widest font-bold p-3 border border-warm-ink/10 rounded-full hover:bg-warm-accent hover:text-white transition-all"
            >
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="space-y-6">
            {/* Featured: Observer piece */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-10 rounded-[3rem] bg-warm-ink text-white shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
                  <div>
                    <p className="text-warm-accent text-[10px] uppercase tracking-widest font-bold mb-4">Position Paper · Substack · June 2026</p>
                    <h3 className="serif text-4xl leading-tight max-w-2xl">
                      "The Field That Forgot To Name The Observer"
                    </h3>
                  </div>
                  <a
                    href="https://open.substack.com/pub/klovasdiary/p/the-field-that-forgot-to-name-the"
                    target="_blank"
                    rel="noreferrer"
                    className="w-14 h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-warm-ink flex items-center justify-center transition-all flex-shrink-0"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/70">
                  <p className="text-base leading-relaxed">
                    Argues that hardness is observer-relative rather than intrinsic — a relationship between structure and a bounded observer. Synthesizes this claim across LLM arithmetic, mechanistic interpretability, ELK, Kolmogorov complexity, cryptographic hardness, and Impagliazzo's five worlds.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-2" />
                      <p className="text-sm">Observer-relative hardness as a unifying primitive across complexity theory.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-2" />
                      <p className="text-sm">Connects Liu-Pass (2021) and Impagliazzo's five worlds as expected corollaries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  tag: "Technical Essay · Substack · 2026",
                  title: "ELK as an Ill-Posed Inverse Problem",
                  desc: "Argues that ELK failure is a structural consequence of inverting a non-injective, informationally lossy mapping — not an engineering flaw. Deceptive alignment emerges when systems model their overseers during optimization.",
                  href: "https://open.substack.com/pub/klovasdiary/p/what-if-elk-failure-is-a-structural"
                },
                {
                  tag: "Essay · Substack",
                  title: "The Spectacle of Rebellion: Validation in Modern Expression",
                  desc: "How incentive structures (visibility, validation) transform behavioral patterns in feedback-driven environments — directly relevant to reward shaping and alignment.",
                  href: "https://open.substack.com/pub/klovasdiary/p/the-spectacle-of-rebellion-validation"
                }
              ].map((piece, i) => (
                <motion.a
                  key={piece.title}
                  href={piece.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-white/50 border border-warm-ink/5 hover:border-warm-accent shadow-sm transition-all group block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-warm-ink/30">{piece.tag}</p>
                    <ExternalLink size={14} className="text-warm-ink/20 group-hover:text-warm-accent transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                  <h3 className="serif text-xl mb-3 leading-snug">{piece.title}</h3>
                  <p className="text-sm text-warm-ink/60 leading-relaxed">{piece.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-24 border-t border-warm-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="serif text-6xl mb-8 leading-none">Let's build <br /> Safely.</h2>
              <p className="text-lg text-warm-ink/50 mb-10 max-w-sm">
                Open to academic dialogue, research internships, or discussing the mechanics of agency.
              </p>
              <a 
                href="mailto:dishasingha0@gmail.com"
                className="serif text-3xl hover:text-warm-accent transition-colors underline underline-offset-8 decoration-warm-ink/10"
              >
                dishasingha0@gmail.com
              </a>
            </div>
            
            <div className="flex flex-col items-start md:items-end space-y-12">
              <div className="flex space-x-12">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-warm-ink/30 hover:text-warm-accent transition-all group flex flex-col items-center gap-2"
                  >
                    <link.icon size={28} strokeWidth={1} />
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">{link.label}</span>
                  </a>
                ))}
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-ink/20 font-bold mb-2">
                  Portfolio 2026 • Disha Singha
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-ink/20 font-bold">
                  Narula Institute of Tech, India
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
