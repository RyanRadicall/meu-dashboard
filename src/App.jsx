// App.jsx — MeuEstudo Contábil — versão corrigida e funcional
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Design Tokens ──────────────────────────────────────────────────────────────
const TOKEN = {
  bg: "#050A14",
  surface: "rgba(10,20,40,0.7)",
  glass: "rgba(15,30,60,0.5)",
  border: "rgba(56,139,253,0.15)",
  borderHover: "rgba(56,139,253,0.4)",
  blue: "#388BFD",
  cyan: "#39D0D8",
  purple: "#A855F7",
  green: "#22C55E",
  orange: "#F97316",
  red: "#EF4444",
  textPrimary: "#EFF6FF",
  textSecondary: "#94A3B8",
  textMuted: "#475569",
};

// ── Utility ──────────────────────────────────────────────────────────────────
const cx = (...args) => args.filter(Boolean).join(" ");

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  home: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
  book: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>),
  calendar: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
  zap: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
  chart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>),
  refresh: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>),
  target: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
  settings: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>),
  bell: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>),
  star: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
  play: (<svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><polygon points="5 3 19 12 5 21 5 3" /></svg>),
  trophy: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4V2H17V4" /><path d="M7 4h10l1 7c.5 3.5-2 5-3 5H9c-1 0-3.5-1.5-3-5L7 4z" /></svg>),
};

// ── GlassCard — CORRIGIDO: agora aceita e aplica a prop `style` ────────────────
const GlassCard = ({ children, className = "", style = {}, glow = false, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: onClick ? 1.005 : 1, borderColor: onClick ? TOKEN.borderHover : undefined }}
    style={{
      background: TOKEN.glass,
      border: `1px solid ${TOKEN.border}`,
      borderRadius: 16,
      backdropFilter: "blur(20px)",
      boxShadow: glow
        ? `0 0 40px rgba(56,139,253,0.08), 0 1px 0 rgba(255,255,255,0.05) inset`
        : `0 1px 0 rgba(255,255,255,0.04) inset`,
      transition: "border-color 0.2s",
      overflow: "hidden",
      ...style, // ← CORREÇÃO: espalhar style para que padding e outros estilos funcionem
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Badge ──────────────────────────────────────────────────────────────────────
const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: { bg: "rgba(56,139,253,0.15)", text: "#388BFD", border: "rgba(56,139,253,0.3)" },
    cyan: { bg: "rgba(57,208,216,0.12)", text: "#39D0D8", border: "rgba(57,208,216,0.3)" },
    green: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.3)" },
    orange: { bg: "rgba(249,115,22,0.12)", text: "#F97316", border: "rgba(249,115,22,0.3)" },
    purple: { bg: "rgba(168,85,247,0.12)", text: "#A855F7", border: "rgba(168,85,247,0.3)" },
    red: { bg: "rgba(239,68,68,0.12)", text: "#EF4444", border: "rgba(239,68,68,0.3)" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
};

// ── ProgressBar ────────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color = TOKEN.blue, height = 4 }) => (
  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", height }}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 99, boxShadow: `0 0 8px ${color}66` }}
    />
  </div>
);

// ── StreakWidget ───────────────────────────────────────────────────────────────
const StreakWidget = ({ days = 0 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      style={{ fontSize: 24, filter: "drop-shadow(0 0 12px #F97316)" }}>🔥</motion.div>
    <div style={{ fontSize: 20, fontWeight: 800, color: TOKEN.orange, lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>{days}</div>
    <div style={{ fontSize: 10, color: TOKEN.textMuted, fontWeight: 500 }}>dias</div>
  </div>
);

// ── XPBar ──────────────────────────────────────────────────────────────────────
const XPBar = ({ level, xp, maxXp }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: `linear-gradient(135deg, ${TOKEN.purple}, ${TOKEN.blue})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 800, color: "#fff",
      boxShadow: `0 0 16px ${TOKEN.purple}55`,
    }}>Lv{level}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: TOKEN.textSecondary, fontWeight: 500 }}>{xp} XP</span>
        <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{maxXp}</span>
      </div>
      <ProgressBar value={(xp / maxXp) * 100} color={TOKEN.purple} height={5} />
    </div>
  </div>
);

// ── Sidebar ────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "home", label: "Dashboard", icon: Icon.home },
  { id: "subjects", label: "Disciplinas", icon: Icon.book },
  { id: "plan", label: "Plano de Estudo", icon: Icon.calendar },
  { id: "exams", label: "Provas & Simulados", icon: Icon.zap },
  { id: "performance", label: "Desempenho", icon: Icon.chart },
  { id: "reviews", label: "Revisões", icon: Icon.refresh },
  { id: "goals", label: "Metas", icon: Icon.target },
];

const Sidebar = ({ active, onNav, userProgress }) => (
  <motion.aside
    initial={{ x: -40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    style={{
      width: 220, flexShrink: 0, height: "100vh", display: "flex", flexDirection: "column",
      background: "linear-gradient(180deg, rgba(8,16,36,0.98) 0%, rgba(5,10,20,0.98) 100%)",
      borderRight: `1px solid ${TOKEN.border}`,
      backdropFilter: "blur(40px)",
      position: "sticky", top: 0,
      padding: "24px 0",
    }}
  >
    {/* Logo */}
    <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${TOKEN.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 20px ${TOKEN.blue}55`,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>MeuEstudo</div>
          <div style={{ fontSize: 10, color: TOKEN.cyan, fontWeight: 600, letterSpacing: "0.08em" }}>CONTÁBIL</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
      {NAV.map((item, i) => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onNav(item.id)}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.04 + 0.1 }}
            whileHover={{ x: 2 }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
              background: isActive ? "rgba(56,139,253,0.15)" : "transparent",
              color: isActive ? TOKEN.blue : TOKEN.textMuted,
              fontWeight: isActive ? 600 : 400, fontSize: 13,
              transition: "all 0.15s",
              position: "relative",
              boxShadow: isActive ? `inset 0 0 0 1px rgba(56,139,253,0.2)` : "none",
            }}
          >
            {isActive && (
              <motion.div layoutId="sidebar-active"
                style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5, background: TOKEN.blue, borderRadius: 99, boxShadow: `0 0 12px ${TOKEN.blue}` }}
              />
            )}
            <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
          </motion.button>
        );
      })}
    </nav>

    {/* User bottom */}
    <div style={{ padding: "16px 12px", borderTop: `1px solid ${TOKEN.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
      <XPBar level={userProgress.level} xp={userProgress.xp} maxXp={userProgress.maxXp} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,0.03)" }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${TOKEN.purple}, #7c3aed)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, boxShadow: `0 0 12px ${TOKEN.purple}44` }}>👤</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>Estudante</div>
          <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Ciências Contábeis</div>
        </div>
        <span style={{ color: TOKEN.textMuted }}>{Icon.settings}</span>
      </div>
    </div>
  </motion.aside>
);

// ── Topbar ─────────────────────────────────────────────────────────────────────
const Topbar = ({ title, streak }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
    <div>
      <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 22, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", margin: 0, fontFamily: "'Syne', sans-serif" }}>
        {title}
      </motion.h1>
      <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
        style={{ fontSize: 13, color: TOKEN.textMuted, margin: "2px 0 0", fontFamily: "'DM Sans', sans-serif" }}>
        {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </motion.p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <motion.button whileHover={{ scale: 1.05 }} style={{
        width: 36, height: 36, borderRadius: 10, border: `1px solid ${TOKEN.border}`,
        background: TOKEN.glass, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", color: TOKEN.textSecondary, backdropFilter: "blur(12px)",
      }}>
        {Icon.bell}
        <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: 99, background: TOKEN.orange, boxShadow: `0 0 6px ${TOKEN.orange}` }} />
      </motion.button>
      <StreakWidget days={streak} />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LandingPage = ({ onEnter }) => {
  const features = [
    { icon: "🧠", title: "IA Adaptativa", desc: "Reorganiza suas prioridades automaticamente com base no seu desempenho" },
    { icon: "⚡", title: "Revisão Espaçada", desc: "Algoritmo científico que otimiza o momento certo de revisar cada tema" },
    { icon: "📊", title: "Analytics Premium", desc: "Dashboards inteligentes que mostram exatamente onde você precisa melhorar" },
    { icon: "🎯", title: "Simulados Inteligentes", desc: "Questões personalizadas baseadas em seu perfil de erros e acertos" },
    { icon: "🔥", title: "Gamificação", desc: "Sistema de streaks, XP e conquistas para manter sua motivação no máximo" },
    { icon: "📚", title: "Upload de Aulas", desc: "Importe seus materiais e o sistema organiza tudo automaticamente" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: TOKEN.bg, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      {/* Orbs */}
      {[{ x: "10%", y: "20%", s: 500, c: TOKEN.blue, o: 0.04 }, { x: "70%", y: "60%", s: 400, c: TOKEN.cyan, o: 0.035 }, { x: "50%", y: "10%", s: 300, c: TOKEN.purple, o: 0.03 }].map((b, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8 + i * 2, repeat: Infinity }}
          style={{ position: "fixed", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: "50%", background: b.c, filter: "blur(120px)", opacity: b.o, pointerEvents: "none", zIndex: 0 }} />
      ))}

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", borderBottom: `1px solid ${TOKEN.border}`, background: "rgba(5,10,20,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${TOKEN.blue}55` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif" }}>MeuEstudo Contábil</span>
        </div>
        <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${TOKEN.blue}66` }} onClick={onEnter}
          style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          Entrar no Dashboard →
        </motion.button>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "160px 48px 100px", textAlign: "center" }}>
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ fontSize: "clamp(38px,6vw,68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 20px" }}>
          Seu estudo,{" "}
          <span style={{ background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            organizado e otimizado
          </span>{" "}pela IA
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 18, color: TOKEN.textSecondary, lineHeight: 1.6, margin: "0 auto 36px", maxWidth: 600 }}>
          O sistema inteligente que reorganiza suas aulas, aplica revisões no momento certo e acompanha sua evolução em Ciências Contábeis.
        </motion.p>
        <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${TOKEN.blue}55` }} onClick={onEnter} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
          style={{ padding: "14px 36px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", boxShadow: `0 0 24px ${TOKEN.blue}44` }}>
          🚀 Começar gratuitamente
        </motion.button>
      </div>

      {/* Features */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "60px 48px 100px" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 48px" }}>Tudo que você precisa para passar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 + 0.3 }}
              whileHover={{ y: -4 }}
              style={{ padding: 24, borderRadius: 16, background: TOKEN.glass, border: `1px solid ${TOKEN.border}`, backdropFilter: "blur(12px)" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: TOKEN.textMuted, lineHeight: 1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD HOME
// ══════════════════════════════════════════════════════════════════════════════
const HomeDashboard = ({ userProgress, onUpdateProgress, completedReviews, onToggleReview }) => {
  // CORREÇÃO: usa completedReviews diretamente, sem confundir com planTasks
  const upcomingReviews = [
    { id: "review1", topic: "Balanço Patrimonial", due: "Hoje", questions: 10, urgent: true },
    { id: "review2", topic: "DRE (CPC 26)", due: "Amanhã", questions: 15, urgent: false },
    { id: "review3", topic: "Receitas e Despesas", due: "12/06", questions: 10, urgent: false },
  ].map(r => ({ ...r, completed: completedReviews.includes(r.id) }));

  const recentAchievements = [
    { icon: "🏆", title: "Primeira semana!", desc: "7 dias de streak", earned: userProgress.streak >= 7 },
    { icon: "⚡", title: "Velocista", desc: "100 questões", earned: userProgress.totalQuestions >= 100 },
    { icon: "🎯", title: "Precisão", desc: "90% de acerto", earned: userProgress.accuracy >= 90 },
  ];

  const handleCompleteReview = (reviewId) => {
    if (!completedReviews.includes(reviewId)) {
      onToggleReview(reviewId);
      onUpdateProgress({ type: "ADD_XP", value: 10 });
      onUpdateProgress({ type: "ADD_QUESTION" });
    }
  };

  const kpis = [
    { label: "PROGRESSO XP", value: `${Math.round((userProgress.xp / userProgress.maxXp) * 100)}%`, delta: `Nível ${userProgress.level}`, color: TOKEN.blue, icon: "📈" },
    { label: "QUESTÕES HOJE", value: `${userProgress.todayQuestions}/${userProgress.dailyGoal}`, delta: `${Math.max(0, userProgress.dailyGoal - userProgress.todayQuestions)} restantes`, color: TOKEN.cyan, icon: "✅" },
    { label: "TAXA DE ACERTOS", value: `${userProgress.accuracy}%`, delta: `+${userProgress.accuracyChange}% vs semana`, color: TOKEN.green, icon: "🎯" },
    { label: "TEMPO DE ESTUDO", value: `${Math.floor(userProgress.studyTime / 60)}h ${userProgress.studyTime % 60}m`, delta: "Total acumulado", color: TOKEN.purple, icon: "⏱" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {kpis.map((k, i) => (
          <motion.div key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
            <GlassCard glow style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500, letterSpacing: "0.04em" }}>{k.label}</div>
                <div style={{ fontSize: 18 }}>{k.icon}</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: k.color, marginTop: 6, fontWeight: 500 }}>{k.delta}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Plano + Progresso disciplinas */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🧠 Plano Inteligente</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Disciplinas da semana</div>
            </div>
            <Badge color="cyan">IA Ativa</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "Cont. Geral", sub: "Obr. divulgação (CPC 26)", pct: 70, status: "Em andamento", statusColor: "cyan" },
              { name: "Cont. Societária", sub: "Demonstrações financeiras", pct: 40, status: "Próximo", statusColor: "orange" },
              { name: "Cont. de Custos", sub: "Custeio por absorção", pct: 0, status: "Bloqueado", statusColor: "purple" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 + 0.2 }}
                whileHover={{ x: 3 }} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.sub}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge color={s.statusColor}>{s.status}</Badge>
                    <span style={{ fontSize: 13, fontWeight: 700, color: TOKEN.blue }}>{s.pct}%</span>
                  </div>
                </div>
                <ProgressBar value={s.pct} color={TOKEN.blue} />
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📊 Progresso por Disciplina</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "Contabilidade Geral", progress: 70, color: TOKEN.blue },
              { name: "Cont. Societária", progress: 45, color: TOKEN.cyan },
              { name: "Cont. de Custos", progress: 20, color: TOKEN.purple },
              { name: "Análise de Balanços", progress: 55, color: TOKEN.green },
              { name: "Auditoria", progress: 30, color: TOKEN.orange },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.progress}%</span>
                </div>
                <ProgressBar value={s.progress} color={s.color} height={4} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Revisões + Streak + Conquistas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 1fr", gap: 14 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📅 Próximas Revisões</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingReviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                whileHover={{ x: 2 }} onClick={() => handleCompleteReview(r.id)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10,
                  background: r.completed ? "rgba(34,197,94,0.08)" : r.urgent ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${r.completed ? "rgba(34,197,94,0.3)" : r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border}`,
                  cursor: r.completed ? "default" : "pointer", opacity: r.completed ? 0.6 : 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: r.urgent ? "rgba(249,115,22,0.15)" : "rgba(56,139,253,0.1)", fontSize: 16 }}>
                  {r.completed ? "✅" : r.urgent ? "🔴" : "📘"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>{r.topic}</div>
                  <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{r.questions} questões</div>
                </div>
                <Badge color={r.completed ? "green" : r.urgent ? "orange" : "blue"}>
                  {r.completed ? "Feito" : r.due}
                </Badge>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>🔥 Sequência</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 14 }}>Dias consecutivos</div>
          <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
            <StreakWidget days={userProgress.streak} />
          </div>
          <div style={{ padding: "10px 0", borderTop: `1px solid ${TOKEN.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Meta: {userProgress.streak >= 30 ? "✅ 30 dias!" : userProgress.streak >= 7 ? "30 dias" : "7 dias"}</div>
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>🏅 Conquistas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentAchievements.map((a, i) => (
              <motion.div key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10,
                  background: a.earned ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${a.earned ? "rgba(34,197,94,0.3)" : TOKEN.border}`,
                  opacity: a.earned ? 1 : 0.45 }}>
                <div style={{ fontSize: 22, filter: a.earned ? "drop-shadow(0 0 8px rgba(255,200,0,0.4))" : "none" }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{a.desc}</div>
                </div>
                {a.earned && <span style={{ marginLeft: "auto", color: TOKEN.orange }}>{Icon.star}</span>}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SUBJECTS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SubjectsPage = ({ onUpdateProgress }) => {
  // CORREÇÃO: progresso de cada disciplina controlado localmente com state
  const [subjects, setSubjects] = useState([
    { id: "cont_geral", name: "Contabilidade Geral", icon: "📒", pct: 70, topics: 12, done: 8, color: TOKEN.blue, level: "Intermediário" },
    { id: "cont_soc", name: "Contabilidade Societária", icon: "🏦", pct: 45, topics: 9, done: 4, color: TOKEN.cyan, level: "Avançado" },
    { id: "cont_custos", name: "Contabilidade de Custos", icon: "💹", pct: 20, topics: 8, done: 2, color: TOKEN.purple, level: "Iniciante" },
    { id: "analise_bal", name: "Análise de Balanços", icon: "📊", pct: 55, topics: 7, done: 4, color: TOKEN.green, level: "Intermediário" },
    { id: "auditoria", name: "Auditoria", icon: "🔎", pct: 30, topics: 10, done: 3, color: TOKEN.orange, level: "Iniciante" },
    { id: "dir_trib", name: "Direito Tributário", icon: "⚖️", pct: 10, topics: 6, done: 1, color: TOKEN.red, level: "Iniciante" },
  ]);

  const handleStudy = (subjectId) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      const newPct = Math.min(100, s.pct + 5);
      const newDone = s.done < s.topics && newPct > (s.done / s.topics) * 100
        ? s.done + 1 : s.done;
      return { ...s, pct: newPct, done: newDone };
    }));
    onUpdateProgress({ type: "ADD_XP", value: 15 });
    onUpdateProgress({ type: "ADD_STUDY_TIME", value: 30 });
    onUpdateProgress({ type: "ADD_QUESTION" });
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {subjects.map((s, i) => (
          <motion.div key={s.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
            <GlassCard style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.done}/{s.topics} temas concluídos</div>
                  </div>
                </div>
                <Badge color={s.pct > 60 ? "green" : s.pct > 30 ? "orange" : "purple"}>{s.level}</Badge>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textMuted }}>Progresso</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <ProgressBar value={s.pct} color={s.color} height={6} />
              </div>
              <motion.button onClick={() => handleStudy(s.id)} whileHover={{ scale: 1.02 }}
                style={{ width: "100%", padding: "9px", borderRadius: 8, border: `1px solid ${s.color}44`, background: `${s.color}11`, color: s.color, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                {s.pct === 100 ? "✅ Concluída" : "Continuar estudando →"}
              </motion.button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PLAN PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PlanPage = ({ planTasks, onToggleTask, onUpdateProgress }) => {
  // CORREÇÃO: tasks do plano são persistidas via planTasks prop
  const plan = [
    { id: "task1", time: "08:00 - 09:30", subject: "Contabilidade Geral", topic: "Obr. divulgação e publicação", type: "Estudo", color: TOKEN.blue },
    { id: "task2", time: "10:00 - 10:30", subject: "Revisão", topic: "Balanço Patrimonial", type: "Revisão", color: TOKEN.orange },
    { id: "task3", time: "14:00 - 15:30", subject: "Cont. Societária", topic: "DRE (CPC 26)", type: "Estudo", color: TOKEN.cyan },
    { id: "task4", time: "16:00 - 16:30", subject: "Simulado", topic: "10 questões - Nível médio", type: "Prova", color: TOKEN.purple },
    { id: "task5", time: "19:00 - 20:00", subject: "Revisão Espaçada", topic: "Conceitos-chave do dia", type: "Revisão", color: TOKEN.green },
  ].map(t => ({ ...t, done: planTasks.includes(t.id) }));

  const completedCount = plan.filter(t => t.done).length;

  const handleToggle = (taskId, wasDone) => {
    onToggleTask(taskId);
    if (!wasDone) {
      onUpdateProgress({ type: "ADD_XP", value: 20 });
      onUpdateProgress({ type: "ADD_STUDY_TIME", value: 30 });
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18 }}>
      <GlassCard style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>
            📅 Plano de Hoje — {new Date().toLocaleDateString("pt-BR")}
          </div>
          <Badge color="cyan">IA Otimizado</Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {plan.map((p, i) => (
            <motion.div key={p.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
              onClick={() => handleToggle(p.id, p.done)}
              style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                background: p.done ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${p.done ? "rgba(34,197,94,0.2)" : TOKEN.border}`,
                opacity: p.done ? 0.7 : 1, transition: "all 0.2s" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 50 }}>
                <div style={{ width: 24, height: 24, borderRadius: 99, border: `2px solid ${p.done ? TOKEN.green : p.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: p.done ? "rgba(34,197,94,0.15)" : "transparent",
                  color: p.done ? TOKEN.green : p.color, fontSize: 12 }}>
                  {p.done ? "✓" : "○"}
                </div>
                {i < plan.length - 1 && <div style={{ width: 1, flex: 1, marginTop: 6, background: TOKEN.border }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary, textDecoration: p.done ? "line-through" : "none" }}>{p.subject}</span>
                  <Badge color={p.type === "Revisão" ? "orange" : p.type === "Prova" ? "purple" : "blue"}>{p.type}</Badge>
                </div>
                <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{p.topic}</div>
                <div style={{ fontSize: 10, color: p.color, marginTop: 4, fontWeight: 500 }}>⏰ {p.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>📊 Progresso do Dia</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{completedCount} de {plan.length} tarefas</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: TOKEN.blue }}>{Math.round((completedCount / plan.length) * 100)}%</span>
          </div>
          <ProgressBar value={(completedCount / plan.length) * 100} color={TOKEN.blue} height={8} />
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.green }}>{completedCount}</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Concluídas</div>
            </div>
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(56,139,253,0.08)", border: "1px solid rgba(56,139,253,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.blue }}>{plan.length - completedCount}</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Pendentes</div>
            </div>
          </div>
          {completedCount === plan.length && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ marginTop: 12, padding: "10px", borderRadius: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.green }}>🎉 Plano do dia concluído!</div>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// EXAMS PAGE — CORREÇÃO COMPLETA
// ══════════════════════════════════════════════════════════════════════════════

// Banco de questões real, com múltiplas perguntas por simulado
const QUESTIONS_DB = {
  BP: [
    { text: "O que representa o Ativo no Balanço Patrimonial?", options: [{ id: "A", text: "As obrigações da empresa com terceiros" }, { id: "B", text: "Os bens e direitos da empresa" }, { id: "C", text: "O patrimônio líquido da empresa" }, { id: "D", text: "As despesas do período" }], correct: "B", explanation: "O Ativo representa todos os bens e direitos que a empresa possui, gerando benefícios econômicos futuros." },
    { text: "O Passivo Não Circulante engloba:", options: [{ id: "A", text: "Obrigações com vencimento até 12 meses" }, { id: "B", text: "Apenas dívidas bancárias" }, { id: "C", text: "Obrigações com vencimento superior a 12 meses" }, { id: "D", text: "Somente fornecedores de longo prazo" }], correct: "C", explanation: "O Passivo Não Circulante compreende as obrigações com vencimento acima de 12 meses da data do balanço." },
    { text: "O Patrimônio Líquido é calculado como:", options: [{ id: "A", text: "Ativo Total + Passivo Total" }, { id: "B", text: "Ativo Total − Passivo Total" }, { id: "C", text: "Ativo Circulante − Passivo Circulante" }, { id: "D", text: "Ativo Não Circulante − Passivo Não Circulante" }], correct: "B", explanation: "PL = Ativo Total − Passivo Total (exigível total). Representa o valor contábil pertencente aos sócios." },
    { text: "Qual dos itens abaixo é classificado no Ativo Circulante?", options: [{ id: "A", text: "Imóveis" }, { id: "B", text: "Marcas e patentes" }, { id: "C", text: "Estoque de mercadorias" }, { id: "D", text: "Investimentos em coligadas" }], correct: "C", explanation: "Estoques são ativos realizáveis no curto prazo e por isso integram o Ativo Circulante." },
    { text: "A equação patrimonial fundamental é:", options: [{ id: "A", text: "Ativo = Receitas − Despesas" }, { id: "B", text: "Ativo = Passivo + Patrimônio Líquido" }, { id: "C", text: "Ativo = Passivo − Patrimônio Líquido" }, { id: "D", text: "Ativo + Passivo = Patrimônio Líquido" }], correct: "B", explanation: "A equação patrimonial básica é: Ativo = Passivo Exigível + Patrimônio Líquido." },
  ],
  DRE: [
    { text: "A DRE evidencia:", options: [{ id: "A", text: "A posição financeira em determinada data" }, { id: "B", text: "O desempenho econômico em um período" }, { id: "C", text: "As mutações do patrimônio líquido" }, { id: "D", text: "Os fluxos de caixa" }], correct: "B", explanation: "A DRE evidencia o desempenho econômico da entidade em um período, apresentando receitas, custos, despesas e o resultado." },
    { text: "O Lucro Bruto é obtido pela diferença entre:", options: [{ id: "A", text: "Receita Líquida e Despesas Operacionais" }, { id: "B", text: "Receita Bruta e Impostos" }, { id: "C", text: "Receita Líquida e Custo dos Produtos Vendidos" }, { id: "D", text: "Receita Bruta e Custo dos Produtos Vendidos" }], correct: "C", explanation: "Lucro Bruto = Receita Líquida − CPV (Custo dos Produtos Vendidos ou Serviços Prestados)." },
    { text: "As Despesas Financeiras na DRE são classificadas como:", options: [{ id: "A", text: "Custos operacionais" }, { id: "B", text: "Resultado não operacional" }, { id: "C", text: "Resultado financeiro" }, { id: "D", text: "Deduções da receita bruta" }], correct: "C", explanation: "As despesas financeiras (juros, variação cambial, etc.) compõem o Resultado Financeiro da DRE." },
    { text: "O EBITDA representa:", options: [{ id: "A", text: "Lucro líquido após impostos" }, { id: "B", text: "Lucro antes de juros, impostos, depreciação e amortização" }, { id: "C", text: "Resultado financeiro da empresa" }, { id: "D", text: "Receita bruta menos deduções" }], correct: "B", explanation: "EBITDA: Earnings Before Interest, Taxes, Depreciation and Amortization — representa a geração operacional de caixa." },
    { text: "Qual imposto é deduzido da Receita Bruta para chegar à Receita Líquida?", options: [{ id: "A", text: "IRPJ" }, { id: "B", text: "CSLL" }, { id: "C", text: "ICMS e ISS" }, { id: "D", text: "COFINS apenas" }], correct: "C", explanation: "Da Receita Bruta são deduzidos os impostos sobre vendas (ICMS, PIS, COFINS, ISS, devoluções e abatimentos) para chegar à Receita Líquida." },
  ],
  CUSTOS: [
    { text: "O custeio por absorção caracteriza-se por:", options: [{ id: "A", text: "Apropriar apenas custos variáveis" }, { id: "B", text: "Apropriar todos os custos de produção" }, { id: "C", text: "Apropriar apenas custos fixos" }, { id: "D", text: "Não apropriar custos indiretos" }], correct: "B", explanation: "O custeio por absorção apropria todos os custos de produção (fixos e variáveis) aos produtos fabricados." },
    { text: "No custeio variável, os custos fixos são tratados como:", options: [{ id: "A", text: "Parte do custo do produto" }, { id: "B", text: "Ativo diferido" }, { id: "C", text: "Despesa do período" }, { id: "D", text: "Custo indireto alocável" }], correct: "C", explanation: "No custeio variável, os custos fixos são debitados diretamente ao resultado como despesa do período, sem integrar o custo do produto." },
    { text: "A Margem de Contribuição Unitária é:", options: [{ id: "A", text: "Preço de venda menos custos fixos unitários" }, { id: "B", text: "Preço de venda menos custos e despesas variáveis unitários" }, { id: "C", text: "Lucro líquido por unidade" }, { id: "D", text: "Receita bruta menos impostos" }], correct: "B", explanation: "MCu = Preço de Venda − (Custos Variáveis + Despesas Variáveis) por unidade. Representa a contribuição de cada unidade para cobrir os custos fixos." },
    { text: "O ponto de equilíbrio contábil é atingido quando:", options: [{ id: "A", text: "A margem de contribuição supera os custos variáveis" }, { id: "B", text: "As receitas totais igualam os custos e despesas totais" }, { id: "C", text: "O lucro líquido é maximizado" }, { id: "D", text: "O fluxo de caixa é positivo" }], correct: "B", explanation: "No ponto de equilíbrio contábil (PEC), Receitas Totais = Custos Totais + Despesas Totais, resultando em lucro zero." },
  ],
};

const ExamsPage = ({ onUpdateProgress }) => {
  const [activeExamIndex, setActiveExamIndex] = useState(null); // null = tela de seleção
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // key: questionIndex
  const [examDone, setExamDone] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const exams = [
    { id: "exam1", title: "Balanço Patrimonial", subject: "Cont. Geral", color: TOKEN.blue, level: "Médio", levelColor: "orange", key: "BP" },
    { id: "exam2", title: "DRE e CPC 26", subject: "Cont. Societária", color: TOKEN.cyan, level: "Difícil", levelColor: "red", key: "DRE" },
    { id: "exam3", title: "Custeio por Absorção", subject: "Cont. de Custos", color: TOKEN.purple, level: "Fácil", levelColor: "green", key: "CUSTOS" },
  ];

  const currentExam = activeExamIndex !== null ? exams[activeExamIndex] : null;
  const questions = currentExam ? QUESTIONS_DB[currentExam.key] : [];
  const currentQuestion = questions[questionIndex] || null;
  const currentAnswer = answers[questionIndex];

  const startExam = (index) => {
    setActiveExamIndex(index);
    setQuestionIndex(0);
    setAnswers({});
    setExamDone(false);
    setShowExplanation(false);
  };

  const handleAnswer = (optId) => {
    if (currentAnswer) return; // já respondeu
    const isCorrect = optId === currentQuestion.correct;
    setAnswers(prev => ({ ...prev, [questionIndex]: { answer: optId, isCorrect } }));
    setShowExplanation(true);
    onUpdateProgress({ type: "ADD_QUESTION" });
    if (isCorrect) {
      onUpdateProgress({ type: "ADD_XP", value: 10 });
      onUpdateProgress({ type: "ADD_CORRECT_ANSWER" });
    } else {
      onUpdateProgress({ type: "ADD_WRONG_ANSWER" });
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setExamDone(true);
      onUpdateProgress({ type: "ADD_XP", value: 50 });
    }
  };

  // CORREÇÃO: cálculo seguro de score sem NaN/Infinity
  const getScore = () => {
    const answered = Object.values(answers).length;
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, pct };
  };

  // Tela: questão ativa
  if (activeExamIndex !== null && !examDone && currentQuestion) {
    const score = getScore();
    return (
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>{currentExam.title}</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Questão {questionIndex + 1} de {questions.length}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: TOKEN.green }}>✅ {score.correct}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: TOKEN.red }}>❌ {score.answered - score.correct}</span>
            <motion.button onClick={() => setActiveExamIndex(null)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.textMuted, cursor: "pointer", fontSize: 11 }}>
              Sair
            </motion.button>
          </div>
        </div>

        <ProgressBar value={((questionIndex + (currentAnswer ? 1 : 0)) / questions.length) * 100} color={currentExam.color} height={4} />

        <div style={{ margin: "20px 0", padding: "16px", borderRadius: 12, background: "rgba(56,139,253,0.06)", border: `1px solid rgba(56,139,253,0.12)` }}>
          <div style={{ fontSize: 11, color: TOKEN.blue, fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>ENUNCIADO</div>
          <div style={{ fontSize: 14, color: TOKEN.textPrimary, lineHeight: 1.7 }}>{currentQuestion.text}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {currentQuestion.options.map((opt) => {
            const isSelected = currentAnswer?.answer === opt.id;
            const isCorrect = opt.id === currentQuestion.correct;
            let bg = "rgba(255,255,255,0.025)", border = TOKEN.border, color = TOKEN.textSecondary;
            if (currentAnswer && isCorrect) { bg = "rgba(34,197,94,0.12)"; border = "rgba(34,197,94,0.4)"; color = TOKEN.green; }
            else if (currentAnswer && isSelected && !isCorrect) { bg = "rgba(239,68,68,0.12)"; border = "rgba(239,68,68,0.4)"; color = TOKEN.red; }
            else if (!currentAnswer && isSelected) { bg = "rgba(56,139,253,0.15)"; border = TOKEN.blue; color = TOKEN.blue; }
            return (
              <motion.button key={opt.id} onClick={() => handleAnswer(opt.id)} whileHover={!currentAnswer ? { x: 3 } : {}}
                style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${border}`, background: bg, color, cursor: currentAnswer ? "default" : "pointer", fontSize: 13, textAlign: "left", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, border: "1px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{opt.id}</span>
                <span style={{ flex: 1 }}>{opt.text}</span>
                {currentAnswer && isCorrect && <span>✅</span>}
                {currentAnswer && isSelected && !isCorrect && <span>❌</span>}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && currentAnswer && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginTop: 14, padding: "14px 16px", borderRadius: 10, background: currentAnswer.isCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${currentAnswer.isCorrect ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: currentAnswer.isCorrect ? TOKEN.green : TOKEN.red, marginBottom: 6 }}>
                {currentAnswer.isCorrect ? "✅ Correto! +10 XP" : "❌ Incorreto"}
              </div>
              <div style={{ fontSize: 12, color: TOKEN.textSecondary, lineHeight: 1.6 }}>{currentQuestion.explanation}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentAnswer && (
          <motion.button onClick={handleNext} whileHover={{ scale: 1.02 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${currentExam.color}, ${currentExam.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
            {questionIndex + 1 === questions.length ? "Finalizar prova →" : "Próxima questão →"}
          </motion.button>
        )}
      </GlassCard>
    );
  }

  // Tela: resultado final
  if (examDone) {
    const score = getScore();
    return (
      <GlassCard style={{ padding: 32, textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{score.pct >= 70 ? "🏆" : "📚"}</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>Prova Concluída!</div>
        <div style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 24 }}>
          Você acertou {score.correct} de {score.answered} questões
        </div>
        <div style={{ display: "inline-block", padding: "16px 32px", borderRadius: 12, background: `rgba(56,139,253,0.1)`, border: `1px solid ${TOKEN.border}`, marginBottom: 24 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: score.pct >= 70 ? TOKEN.green : TOKEN.orange, fontFamily: "'Syne', sans-serif" }}>{score.pct}%</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Taxa de acerto</div>
        </div>
        <div style={{ fontSize: 12, color: TOKEN.cyan, marginBottom: 20 }}>+50 XP ganhos!</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <motion.button onClick={() => startExam(activeExamIndex)} whileHover={{ scale: 1.02 }}
            style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.textSecondary, cursor: "pointer", fontSize: 13 }}>
            Refazer
          </motion.button>
          <motion.button onClick={() => { setActiveExamIndex(null); setExamDone(false); }} whileHover={{ scale: 1.02 }}
            style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            Ver todos os simulados
          </motion.button>
        </div>
      </GlassCard>
    );
  }

  // CORREÇÃO: tela de seleção e questão não aparecem juntas — activeExamIndex controla qual tela mostrar
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <GlassCard style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 14 }}>⚡ Simulados Disponíveis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {exams.map((e, i) => (
            <motion.div key={e.id} whileHover={{ x: 3 }}
              style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{e.title}</div>
                <Badge color={e.levelColor}>{e.level}</Badge>
              </div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 10 }}>{e.subject}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>📝 {QUESTIONS_DB[e.key].length} questões</span>
                <motion.button onClick={() => startExam(i)} whileHover={{ scale: 1.05, boxShadow: `0 0 12px ${e.color}55` }}
                  style={{ padding: "5px 14px", borderRadius: 7, border: "none", background: `linear-gradient(135deg, ${e.color}, ${e.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                  Iniciar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 8 }}>Selecione um simulado</div>
          <div style={{ fontSize: 12, color: TOKEN.textMuted }}>Escolha uma prova ao lado para começar</div>
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PerformancePage = ({ userProgress }) => {
  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const weekData = [55, 62, 58, 70, 65, 72, userProgress.accuracy];

  const subjectPerformance = [
    { name: "Contabilidade Geral", correct: 85, incorrect: 15, color: TOKEN.blue },
    { name: "Cont. Societária", correct: 72, incorrect: 28, color: TOKEN.cyan },
    { name: "Cont. de Custos", correct: 60, incorrect: 40, color: TOKEN.purple },
    { name: "Análise de Balanços", correct: 78, incorrect: 22, color: TOKEN.green },
    { name: "Auditoria", correct: 55, incorrect: 45, color: TOKEN.orange },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Total de questões", value: userProgress.totalQuestions, delta: "+124 esta semana", icon: "📝", color: TOKEN.blue },
          { label: "Taxa de acerto", value: `${userProgress.accuracy}%`, delta: `+${userProgress.accuracyChange}% vs. mês`, icon: "🎯", color: TOKEN.green },
          { label: "Tempo médio/questão", value: "1m 42s", delta: "-12s vs. semana", icon: "⚡", color: TOKEN.cyan },
          { label: "Simulados completos", value: "23", delta: "3 esta semana", icon: "🏆", color: TOKEN.purple },
        ].map((m, i) => (
          <motion.div key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
            <GlassCard style={{ padding: 18 }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em" }}>{m.value}</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: m.color, marginTop: 4, fontWeight: 500 }}>{m.delta}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📈 Evolução Semanal</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 100 }}>
            {weekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 9, color: TOKEN.textMuted }}>{v}%</div>
                <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.06, duration: 0.7 }}
                  style={{ width: "100%", background: i === 6 ? `linear-gradient(180deg, ${TOKEN.blue}, ${TOKEN.cyan})` : "rgba(56,139,253,0.25)", borderRadius: "4px 4px 2px 2px", minHeight: 4, boxShadow: i === 6 ? `0 0 12px ${TOKEN.blue}66` : "none" }} />
                <span style={{ fontSize: 9, color: TOKEN.textMuted }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>🎯 Desempenho por Disciplina</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {subjectPerformance.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: TOKEN.textSecondary }}>{s.name}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, color: TOKEN.green }}>{s.correct}% ✓</span>
                    <span style={{ fontSize: 11, color: TOKEN.red }}>{s.incorrect}% ✗</span>
                  </div>
                </div>
                <div style={{ display: "flex", height: 6, borderRadius: 99, overflow: "hidden", gap: 1 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.correct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }}
                    style={{ background: s.color, borderRadius: "99px 0 0 99px" }} />
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.incorrect}%` }} transition={{ delay: i * 0.1 + 0.1, duration: 0.8 }}
                    style={{ background: "rgba(239,68,68,0.3)", borderRadius: "0 99px 99px 0" }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard style={{ padding: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>⏱ Estatísticas de Estudo</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: TOKEN.blue, fontFamily: "'Syne', sans-serif" }}>{Math.floor(userProgress.studyTime / 60)}h {userProgress.studyTime % 60}m</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Tempo total</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: TOKEN.green, fontFamily: "'Syne', sans-serif" }}>{userProgress.totalQuestions}</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Questões respondidas</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: TOKEN.orange, fontFamily: "'Syne', sans-serif" }}>{userProgress.streak}</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Dias de streak</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REVIEWS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ReviewsPage = ({ completedReviews, onToggleReview, onUpdateProgress }) => {
  const reviews = [
    { id: "rev1", topic: "Balanço Patrimonial", subject: "Cont. Geral", lastSeen: "3 dias", dueScore: 95, color: TOKEN.orange, urgent: true },
    { id: "rev2", topic: "DRE e Resultado", subject: "Cont. Societária", lastSeen: "5 dias", dueScore: 88, color: TOKEN.blue, urgent: false },
    { id: "rev3", topic: "Custeio por Absorção", subject: "Cont. de Custos", lastSeen: "7 dias", dueScore: 82, color: TOKEN.purple, urgent: false },
    { id: "rev4", topic: "Análise Horizontal", subject: "Análise de Balanços", lastSeen: "2 dias", dueScore: 91, color: TOKEN.cyan, urgent: true },
    { id: "rev5", topic: "Fluxo de Caixa DFC", subject: "Cont. Geral", lastSeen: "10 dias", dueScore: 76, color: TOKEN.green, urgent: false },
  ].map(r => ({ ...r, completed: completedReviews.includes(r.id) }));

  const handleReview = (reviewId) => {
    if (!completedReviews.includes(reviewId)) {
      onToggleReview(reviewId);
      onUpdateProgress({ type: "ADD_XP", value: 15 });
      onUpdateProgress({ type: "ADD_QUESTION" });
    }
  };

  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🔄 Revisões Inteligentes</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Algoritmo de repetição espaçada (SM-2)</div>
        </div>
        <Badge color="cyan">{reviews.filter(r => !r.completed).length} pendentes</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {reviews.map((r, i) => (
          <motion.div key={r.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}
            whileHover={{ x: r.completed ? 0 : 3 }}
            style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 12,
              background: r.completed ? "rgba(34,197,94,0.06)" : r.urgent ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.025)",
              border: `1px solid ${r.completed ? "rgba(34,197,94,0.3)" : r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border}`,
              opacity: r.completed ? 0.65 : 1 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${r.color}22`, border: `1px solid ${r.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {r.completed ? "✅" : r.urgent ? "🔴" : "📘"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 2 }}>{r.topic}</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{r.subject} • Visto há {r.lastSeen}</div>
            </div>
            <div style={{ textAlign: "right", marginRight: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.dueScore}</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>prioridade</div>
            </div>
            {r.completed
              ? <Badge color="green">Concluído</Badge>
              : (
                <motion.button onClick={() => handleReview(r.id)} whileHover={{ scale: 1.04, boxShadow: `0 0 14px ${r.color}55` }}
                  style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${r.color}, ${r.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  Revisar
                </motion.button>
              )
            }
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// GOALS PAGE — CORREÇÃO: progresso calculado dinamicamente
// ══════════════════════════════════════════════════════════════════════════════
const GoalsPage = ({ userProgress, goals, onAddGoal }) => {
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  // CORREÇÃO: calcula progresso real para cada tipo de meta
  const calculateProgress = (goal) => {
    switch (goal.type) {
      case "questions": return Math.min(100, Math.round((userProgress.totalQuestions / goal.target) * 100));
      case "streak": return Math.min(100, Math.round((userProgress.streak / goal.target) * 100));
      case "accuracy": return Math.min(100, Math.round((userProgress.accuracy / goal.target) * 100));
      case "study_time": return Math.min(100, Math.round((userProgress.studyTime / goal.target) * 100));
      default: return Math.min(100, goal.progress || 0);
    }
  };

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) return;
    onAddGoal({ title: newGoalTitle, progress: 0, target: 100, deadline: "30 dias", color: TOKEN.blue, icon: "🎯", type: "custom" });
    setNewGoalTitle("");
    setShowAddGoal(false);
  };

  const displayGoals = goals.map(g => ({ ...g, progress: calculateProgress(g) }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🎯 Minhas Metas</div>
          <motion.button onClick={() => setShowAddGoal(!showAddGoal)} whileHover={{ scale: 1.05 }}
            style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${TOKEN.border}`, background: "rgba(56,139,253,0.1)", color: TOKEN.blue, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            + Nova meta
          </motion.button>
        </div>

        <AnimatePresence>
          {showAddGoal && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ marginBottom: 16, padding: 14, borderRadius: 10, background: "rgba(56,139,253,0.08)", border: `1px solid ${TOKEN.border}` }}>
              <input type="text" value={newGoalTitle} onChange={e => setNewGoalTitle(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAddGoal()}
                placeholder="Nome da meta..." autoFocus
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${TOKEN.border}`, background: TOKEN.bg, color: TOKEN.textPrimary, fontSize: 13, marginBottom: 10, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button onClick={() => setShowAddGoal(false)} style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.textMuted, cursor: "pointer", fontSize: 12 }}>Cancelar</button>
                <button onClick={handleAddGoal} style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Adicionar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {displayGoals.map((g, i) => (
            <motion.div key={g.id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
              style={{ padding: "16px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${g.progress >= 100 ? "rgba(34,197,94,0.3)" : TOKEN.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{g.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{g.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textMuted }}>📅 {g.deadline}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: g.color, fontFamily: "'Syne', sans-serif" }}>{g.progress}%</span>
                </div>
              </div>
              <ProgressBar value={g.progress} color={g.color} height={6} />
              {g.progress >= 100 && <div style={{ marginTop: 8, fontSize: 11, color: TOKEN.green, fontWeight: 600 }}>🏆 Meta concluída!</div>}
              {g.progress >= 90 && g.progress < 100 && <div style={{ marginTop: 8, fontSize: 11, color: TOKEN.cyan, fontWeight: 600 }}>🎉 Quase lá!</div>}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE CONTENT ROUTER
// ══════════════════════════════════════════════════════════════════════════════
const PAGE_META = {
  home: { title: "Olá, Estudante! 👋", subtitle: "Vamos organizar seus estudos e testar seu conhecimento." },
  subjects: { title: "Disciplinas 📚", subtitle: "Gerencie todas as suas disciplinas e acompanhe o progresso." },
  plan: { title: "Plano de Estudo 📅", subtitle: "Seu plano inteligente para hoje." },
  exams: { title: "Provas & Simulados ⚡", subtitle: "Teste seus conhecimentos com questões personalizadas." },
  performance: { title: "Desempenho 📊", subtitle: "Acompanhe sua evolução e identifique pontos de melhoria." },
  reviews: { title: "Revisões Inteligentes 🔄", subtitle: "Sistema de repetição espaçada para não esquecer nada." },
  goals: { title: "Metas 🎯", subtitle: "Defina e acompanhe seus objetivos de aprendizado." },
};

const PageContent = ({ page, userProgress, onUpdateProgress, planTasks, onToggleTask, completedReviews, onToggleReview, goals, onAddGoal }) => {
  const pages = {
    home: <HomeDashboard userProgress={userProgress} onUpdateProgress={onUpdateProgress} completedReviews={completedReviews} onToggleReview={onToggleReview} />,
    subjects: <SubjectsPage onUpdateProgress={onUpdateProgress} />,
    plan: <PlanPage planTasks={planTasks} onToggleTask={onToggleTask} onUpdateProgress={onUpdateProgress} />,
    exams: <ExamsPage onUpdateProgress={onUpdateProgress} />,
    performance: <PerformancePage userProgress={userProgress} />,
    reviews: <ReviewsPage completedReviews={completedReviews} onToggleReview={onToggleReview} onUpdateProgress={onUpdateProgress} />,
    goals: <GoalsPage userProgress={userProgress} goals={goals} onAddGoal={onAddGoal} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
        {pages[page] || pages.home}
      </motion.div>
    </AnimatePresence>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");
  const [activePage, setActivePage] = useState("home");

  const [planTasks, setPlanTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("planTasks")) || []; } catch { return []; }
  });

  const [completedReviews, setCompletedReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem("completedReviews")) || []; } catch { return []; }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("goals"));
      if (saved) return saved;
    } catch {}
    return [
      { id: "goal1", title: "Completar Contabilidade Geral", progress: 68, target: 100, deadline: "30 Jun", color: TOKEN.blue, icon: "📒" },
      { id: "goal2", title: "100 questões esta semana", progress: 67, target: 100, deadline: "Dom 29", color: TOKEN.cyan, icon: "⚡", type: "questions" },
      { id: "goal3", title: "90% de acerto em simulados", progress: 89, target: 90, deadline: "Contínuo", color: TOKEN.green, icon: "🎯", type: "accuracy" },
      { id: "goal4", title: "Streak de 30 dias", progress: 40, target: 30, deadline: "13 Jun", color: TOKEN.orange, icon: "🔥", type: "streak" },
      { id: "goal5", title: "Finalizar revisões do mês", progress: 55, target: 100, deadline: "31 Mai", color: TOKEN.purple, icon: "📅" },
    ];
  });

  const [userProgress, setUserProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("userProgress"));
      if (saved) return saved;
    } catch {}
    return {
      level: 7,
      xp: 2340,
      maxXp: 3000,
      streak: 12,
      totalQuestions: 847,
      todayQuestions: 18,
      dailyGoal: 30,
      accuracy: 80,
      accuracyChange: 8,
      studyTime: 135,
      correctAnswers: 678,
      wrongAnswers: 169,
    };
  });

  // Persistência
  useEffect(() => { localStorage.setItem("planTasks", JSON.stringify(planTasks)); }, [planTasks]);
  useEffect(() => { localStorage.setItem("completedReviews", JSON.stringify(completedReviews)); }, [completedReviews]);
  useEffect(() => { localStorage.setItem("goals", JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem("userProgress", JSON.stringify(userProgress)); }, [userProgress]);

  const updateUserProgress = (action) => {
    setUserProgress(prev => {
      const p = { ...prev };
      switch (action.type) {
        case "ADD_XP":
          p.xp += action.value;
          while (p.xp >= p.maxXp) {
            p.level++;
            p.xp -= p.maxXp;
            p.maxXp = Math.round(p.maxXp * 1.2);
          }
          break;
        case "ADD_QUESTION":
          p.totalQuestions++;
          p.todayQuestions++;
          if (p.todayQuestions >= p.dailyGoal) p.streak++;
          break;
        case "ADD_CORRECT_ANSWER":
          p.correctAnswers++;
          p.accuracy = Math.round((p.correctAnswers / (p.correctAnswers + p.wrongAnswers)) * 100);
          break;
        case "ADD_WRONG_ANSWER":
          p.wrongAnswers++;
          p.accuracy = Math.round((p.correctAnswers / (p.correctAnswers + p.wrongAnswers)) * 100);
          break;
        case "ADD_STUDY_TIME":
          p.studyTime += action.value;
          break;
        default:
          break;
      }
      return p;
    });
  };

  const togglePlanTask = (taskId) => {
    setPlanTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const toggleReview = (reviewId) => {
    setCompletedReviews(prev => prev.includes(reviewId) ? prev.filter(id => id !== reviewId) : [...prev, reviewId]);
  };

  const addGoal = (goal) => {
    setGoals(prev => [...prev, { ...goal, id: `goal_${Date.now()}` }]);
  };

  if (page === "landing") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${TOKEN.bg}; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(56,139,253,0.3); border-radius: 99px; }
        `}</style>
        <LandingPage onEnter={() => setPage("app")} />
      </>
    );
  }

  const meta = PAGE_META[activePage] || PAGE_META.home;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${TOKEN.bg}; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(56,139,253,0.3); border-radius: 99px; }
        button { font-family: inherit; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[{ l: "5%", t: "15%", c: TOKEN.blue, s: 600, o: 0.03 }, { l: "70%", t: "50%", c: TOKEN.cyan, s: 500, o: 0.025 }, { l: "40%", t: "80%", c: TOKEN.purple, s: 400, o: 0.02 }].map((b, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10 + i * 3, repeat: Infinity }}
            style={{ position: "absolute", left: b.l, top: b.t, width: b.s, height: b.s, borderRadius: "50%", background: b.c, filter: "blur(120px)", opacity: b.o }} />
        ))}
      </div>

      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Sidebar active={activePage} onNav={setActivePage} userProgress={userProgress} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minHeight: "100vh" }}>
          <Topbar title={meta.title} streak={userProgress.streak} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 24, marginTop: -20, fontFamily: "'DM Sans', sans-serif" }}>
            {meta.subtitle}
          </motion.p>
          <PageContent
            page={activePage}
            userProgress={userProgress}
            onUpdateProgress={updateUserProgress}
            planTasks={planTasks}
            onToggleTask={togglePlanTask}
            completedReviews={completedReviews}
            onToggleReview={toggleReview}
            goals={goals}
            onAddGoal={addGoal}
          />
        </main>
      </div>
    </>
  );
}
