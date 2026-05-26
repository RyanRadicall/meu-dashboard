// App.jsx - Versão Completa e Dinâmica
import { useState, useEffect, useRef } from "react";
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

const cx = (...args) => args.filter(Boolean).join(" ");

// ── Icons ────────────────────────────────────────────────────────────────────────
const Icon = {
  home: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> ),
  book: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg> ),
  calendar: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> ),
  zap: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> ),
  chart: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> ),
  refresh: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg> ),
  target: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg> ),
  settings: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg> ),
  bell: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg> ),
  star: ( <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.5}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> ),
  play: ( <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg> ),
  upload: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></svg> ),
  check: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg> ),
  trash: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg> ),
  download: ( <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><polyline points="8 17 12 21 16 17" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" /></svg> ),
};

// ── Componentes Base ────────────────────────────────────────────────────────────
const GlassCard = ({ children, className = "", glow = false, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.005, borderColor: TOKEN.borderHover }}
    style={{
      background: TOKEN.glass,
      border: `1px solid ${TOKEN.border}`,
      borderRadius: 16,
      backdropFilter: "blur(20px)",
      boxShadow: glow ? `0 0 40px rgba(56,139,253,0.08), 0 1px 0 rgba(255,255,255,0.05) inset` : `0 1px 0 rgba(255,255,255,0.04) inset`,
      transition: "border-color 0.2s",
    }}
    className={cx("overflow-hidden", className)}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: { bg: "rgba(56,139,253,0.15)", text: "#388BFD", border: "rgba(56,139,253,0.3)" },
    cyan: { bg: "rgba(57,208,216,0.12)", text: "#39D0D8", border: "rgba(57,208,216,0.3)" },
    green: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.3)" },
    orange: { bg: "rgba(249,115,22,0.12)", text: "#F97316", border: "rgba(249,115,22,0.3)" },
    purple: { bg: "rgba(168,85,247,0.12)", text: "#A855F7", border: "rgba(168,85,247,0.3)" },
  };
  const c = colors[color] || colors.blue;
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}>
      {children}
    </span>
  );
};

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

const StreakWidget = ({ days = 12 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      style={{ fontSize: 28, filter: "drop-shadow(0 0 12px #F97316)" }}>🔥</motion.div>
    <div style={{ fontSize: 24, fontWeight: 800, color: TOKEN.orange, lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>{days}</div>
    <div style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500 }}>dias consecutivos</div>
  </div>
);

const XPBar = ({ level = 7, xp = 2340, maxXp = 3000 }) => (
  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <motion.div whileHover={{ scale: 1.05 }} style={{
      width: 36, height: 36, borderRadius: 10,
      background: `linear-gradient(135deg, ${TOKEN.purple}, ${TOKEN.blue})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 800, color: "#fff",
      boxShadow: `0 0 16px ${TOKEN.purple}55`,
    }}>Lv{level}</motion.div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: TOKEN.textSecondary, fontWeight: 500 }}>{xp} XP</span>
        <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{maxXp}</span>
      </div>
      <ProgressBar value={(xp / maxXp) * 100} color={TOKEN.purple} height={5} />
    </div>
  </motion.div>
);

// ── Toast Notification ──────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.4)", text: TOKEN.green },
    error: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.4)", text: TOKEN.red },
    info: { bg: "rgba(56,139,253,0.15)", border: "rgba(56,139,253,0.4)", text: TOKEN.blue },
  };
  const c = colors[type] || colors.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 1000,
        padding: "12px 20px", borderRadius: 10,
        background: c.bg, border: `1px solid ${c.border}`,
        backdropFilter: "blur(20px)",
        color: c.text, fontSize: 13, fontWeight: 500,
        display: "flex", alignItems: "center", gap: 10,
      }}
    >
      <span>{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      {message}
    </motion.div>
  );
};

// ── Sidebar ────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "home", label: "Dashboard", icon: Icon.home },
  { id: "subjects", label: "Disciplinas", icon: Icon.book },
  { id: "plan", label: "Plano de Estudo", icon: Icon.calendar },
  { id: "exams", label: "Provas & Simulados", icon: Icon.zap },
  { id: "performance", label: "Desempenho", icon: Icon.chart },
  { id: "reviews", label: "Revisões", icon: Icon.refresh },
  { id: "goals", label: "Metas", icon: Icon.target },
  { id: "materials", label: "Materiais", icon: Icon.upload },
];

const Sidebar = ({ active, onNav, userProgress }) => {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: 240, flexShrink: 0, height: "100vh", display: "flex", flexDirection: "column",
        background: "linear-gradient(180deg, rgba(8,16,36,0.98) 0%, rgba(5,10,20,0.98) 100%)",
        borderRight: `1px solid ${TOKEN.border}`,
        backdropFilter: "blur(40px)",
        position: "sticky", top: 0,
        padding: "24px 0",
      }}
    >
      <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${TOKEN.border}` }}>
        <motion.div whileHover={{ scale: 1.03 }} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 20px ${TOKEN.blue}55`,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>MeuEstudo</div>
            <div style={{ fontSize: 10, color: TOKEN.cyan, fontWeight: 600, letterSpacing: "0.08em" }}>CONTÁBIL</div>
          </div>
        </motion.div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map((item, i) => {
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onNav(item.id)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ x: 4 }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                background: isActive ? "rgba(56,139,253,0.15)" : "transparent",
                color: isActive ? TOKEN.blue : TOKEN.textMuted,
                fontWeight: isActive ? 600 : 400, fontSize: 13,
                transition: "all 0.15s",
                position: "relative",
              }}
            >
              {isActive && (
                <motion.div layoutId="sidebar-active"
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: TOKEN.blue, borderRadius: 99, boxShadow: `0 0 12px ${TOKEN.blue}` }}
                />
              )}
              <span style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: `1px solid ${TOKEN.border}` }}>
        <XPBar level={userProgress.level} xp={userProgress.xp} maxXp={userProgress.maxXp} />
        <motion.div whileHover={{ scale: 1.02 }} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${TOKEN.purple}, #7c3aed)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>Estudante</div>
            <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Ciências Contábeis</div>
          </div>
          <div style={{ width: 20, height: 20, opacity: 0.5 }}>{Icon.settings}</div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

// ── Topbar ─────────────────────────────────────────────────────────────────────
const Topbar = ({ title, streak, notifications, onClearNotification }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
    <div>
      <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 24, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", margin: 0, fontFamily: "'Syne', sans-serif" }}>
        {title}
      </motion.h1>
      <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
        style={{ fontSize: 13, color: TOKEN.textMuted, margin: "4px 0 0" }}>
        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </motion.p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <motion.div whileHover={{ scale: 1.05 }} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10,
        background: TOKEN.glass, border: `1px solid ${TOKEN.border}`,
        cursor: "pointer", backdropFilter: "blur(12px)",
      }}>
        <span style={{ fontSize: 12, color: TOKEN.textSecondary }}>⌘ K</span>
      </motion.div>
      
      <div style={{ position: "relative" }}>
        <motion.button whileHover={{ scale: 1.05 }} style={{
          width: 38, height: 38, borderRadius: 10, border: `1px solid ${TOKEN.border}`,
          background: TOKEN.glass, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          color: TOKEN.textSecondary, backdropFilter: "blur(12px)",
        }}>
          {Icon.bell}
          {notifications.length > 0 && (
            <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: 99, background: TOKEN.orange, boxShadow: `0 0 6px ${TOKEN.orange}` }} />
          )}
        </motion.button>
        {notifications.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ position: "absolute", top: 45, right: 0, width: 260, background: TOKEN.surface, backdropFilter: "blur(20px)", borderRadius: 12, border: `1px solid ${TOKEN.border}`, overflow: "hidden", zIndex: 100 }}>
            {notifications.slice(0, 3).map((n, i) => (
              <div key={i} style={{ padding: "10px 14px", borderBottom: `1px solid ${TOKEN.border}`, fontSize: 12, color: TOKEN.textSecondary }}>
                {n}
              </div>
            ))}
          </motion.div>
        )}
      </div>
      
      <StreakWidget days={streak} />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LandingPage = ({ onEnter }) => {
  return (
    <div style={{ minHeight: "100vh", background: TOKEN.bg, overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        {[{ x: "10%", y: "20%", c: TOKEN.blue, s: 500 }, { x: "70%", y: "60%", c: TOKEN.cyan, s: 400 }, { x: "50%", y: "10%", c: TOKEN.purple, s: 300 }].map((b, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8 + i * 2, repeat: Infinity }}
            style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: "50%", background: b.c, filter: "blur(120px)", opacity: 0.04 }} />
        ))}
      </div>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(20px)", borderBottom: `1px solid ${TOKEN.border}`, background: "rgba(5,10,20,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} style={{ width: 16, height: 16 }}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>MeuEstudo Contábil</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <motion.button whileHover={{ scale: 1.03 }} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.textSecondary, cursor: "pointer", fontSize: 13 }}>Entrar</motion.button>
          <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${TOKEN.blue}66` }} onClick={onEnter} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Começar grátis →</motion.button>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "160px 48px 100px", textAlign: "center" }}>
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 20px" }}>
          Seu estudo,{" "}
          <span style={{ background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>organizado e otimizado</span> pela IA
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ fontSize: 18, color: TOKEN.textSecondary, lineHeight: 1.6, margin: "0 0 36px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
          O sistema inteligente que reorganiza suas aulas, aplica revisões no momento certo e acompanha sua evolução em Ciências Contábeis.
        </motion.p>
        <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${TOKEN.blue}55` }} onClick={onEnter} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, boxShadow: `0 0 24px ${TOKEN.blue}44` }}>
          🚀 Começar gratuitamente
        </motion.button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD HOME
// ══════════════════════════════════════════════════════════════════════════════
const HomeDashboard = ({ userProgress, onUpdateProgress, studyData, onToggleTask, onShowToast }) => {
  const subjects = [
    { name: "Contabilidade Geral", sub: "Obr. divulgação e publicação", pct: 70, status: "Em andamento", statusColor: "cyan" },
    { name: "Contabilidade Societária", sub: "Demonstrações (CPC26)", pct: 45, status: "Em andamento", statusColor: "cyan" },
    { name: "Contabilidade de Custos", sub: "Custeio por absorção", pct: 20, status: "Iniciante", statusColor: "purple" },
  ];

  const upcomingReviews = [
    { id: "review1", topic: "Balanço Patrimonial", due: "Hoje", questions: 10, urgent: true, completed: studyData.completedReviews.includes("review1") },
    { id: "review2", topic: "DRE (CPC 26)", due: "Amanhã", questions: 15, urgent: false, completed: studyData.completedReviews.includes("review2") },
    { id: "review3", topic: "Fluxo de Caixa", due: "12/06", questions: 8, urgent: false, completed: studyData.completedReviews.includes("review3") },
  ];

  const recentAchievements = [
    { icon: "🏆", title: "Primeira semana!", desc: "7 dias de streak", earned: userProgress.streak >= 7 },
    { icon: "⚡", title: "Velocista", desc: "100 questões respondidas", earned: userProgress.totalQuestions >= 100 },
    { icon: "🎯", title: "Precisão", desc: "80% de acerto", earned: userProgress.accuracy >= 80 },
  ];

  const handleCompleteReview = (reviewId, xpGain = 10) => {
    if (!studyData.completedReviews.includes(reviewId)) {
      onUpdateProgress({ type: "ADD_XP", value: xpGain });
      onUpdateProgress({ type: "ADD_QUESTION" });
      onToggleTask(reviewId);
      onShowToast(`✅ Revisão concluída! +${xpGain} XP`, "success");
    }
  };

  const handleStartSuggestedExam = () => {
    onShowToast("📝 Prova iniciada! Vá até a aba 'Provas & Simulados'", "info");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Progresso geral", value: `${Math.round((userProgress.xp / userProgress.maxXp) * 100)}%`, delta: "+5% esta semana", color: TOKEN.blue, icon: "📈" },
          { label: "Questões hoje", value: `${userProgress.todayQuestions}/${userProgress.dailyGoal}`, delta: `${userProgress.dailyGoal - userProgress.todayQuestions} restantes`, color: TOKEN.cyan, icon: "✅" },
          { label: "Taxa de acertos", value: `${userProgress.accuracy}%`, delta: `+${userProgress.accuracyChange}% vs semana`, color: TOKEN.green, icon: "🎯" },
          { label: "Tempo de estudo", value: `${Math.floor(userProgress.studyTime / 60)}h ${userProgress.studyTime % 60}m`, delta: "Hoje", color: TOKEN.purple, icon: "⏱" },
        ].map((k, i) => (
          <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <GlassCard glow style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 4 }}>{k.label.toUpperCase()}</div>
                  <motion.div key={k.value} initial={{ scale: 1.1 }} animate={{ scale: 1 }} style={{ fontSize: 28, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{k.value}</motion.div>
                  <div style={{ fontSize: 11, color: k.color, marginTop: 4, fontWeight: 500 }}>{k.delta}</div>
                </div>
                <div style={{ fontSize: 24 }}>{k.icon}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Study Plan & Progress */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🧠 Plano de Estudos Inteligente</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Baseado nas disciplinas da faculdade</div>
            </div>
            <Badge color="cyan">IA Ativa</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {subjects.map((s, i) => (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.sub}</div>
                  </div>
                  <Badge color={s.statusColor}>{s.status}</Badge>
                </div>
                <ProgressBar value={s.pct} color={TOKEN.blue} height={6} />
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📊 Progresso por Disciplina</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "Contabilidade Geral", progress: 70, color: TOKEN.blue },
              { name: "Contabilidade Societária", progress: 45, color: TOKEN.cyan },
              { name: "Contabilidade de Custos", progress: 20, color: TOKEN.purple },
              { name: "Análise de Balanços", progress: 55, color: TOKEN.green },
              { name: "Auditoria", progress: 30, color: TOKEN.orange },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.progress}%</span>
                </div>
                <ProgressBar value={s.progress} color={s.color} height={4} />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Reviews & Streak */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.8fr", gap: 14 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📈 Evolução de Acertos</div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 100 }}>
            {[55, 62, 58, 70, 65, 72, userProgress.accuracy].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ width: "100%", background: i === 6 ? `linear-gradient(180deg, ${TOKEN.blue}, ${TOKEN.cyan})` : "rgba(56,139,253,0.25)", borderRadius: "4px 4px 2px 2px", minHeight: 4 }} />
                <span style={{ fontSize: 9, color: TOKEN.textMuted }}>{["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"][i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📅 Próximas Revisões</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingReviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 2 }} onClick={() => handleCompleteReview(r.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: r.completed ? "rgba(34,197,94,0.08)" : (r.urgent ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.025)"), border: `1px solid ${r.completed ? "rgba(34,197,94,0.3)" : (r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border)}`, cursor: "pointer", opacity: r.completed ? 0.6 : 1 }}>
                <div style={{ fontSize: 20 }}>{r.completed ? "✅" : (r.urgent ? "🔴" : "📘")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>{r.topic}</div>
                  <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{r.questions} questões</div>
                </div>
                <Badge color={r.completed ? "green" : (r.urgent ? "orange" : "blue")}>{r.completed ? "Concluído" : r.due}</Badge>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>🔥 Sequência</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 14 }}>Dias consecutivos estudando</div>
          <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
            <StreakWidget days={userProgress.streak} />
          </div>
        </GlassCard>
      </div>

      {/* Suggested Exam & Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <GlassCard style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🎯 Prova Sugerida para Hoje</div>
            <Badge color="blue">10 questões</Badge>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(56,139,253,0.06)", border: `1px solid rgba(56,139,253,0.15)` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 4 }}>Balanço Patrimonial</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted, marginBottom: 12 }}>Tema: Obr. divulgação e publicação (CPC 26)</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              <Badge color="orange">Médio</Badge>
              <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>⏱ ~15 min</span>
            </div>
            <motion.button onClick={handleStartSuggestedExam} whileHover={{ scale: 1.02, boxShadow: `0 0 24px ${TOKEN.blue}55` }}
              style={{ width: "100%", padding: "11px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {Icon.play} Iniciar Prova
            </motion.button>
          </div>
        </GlassCard>

        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>🏅 Conquistas Recentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentAchievements.map((a, i) => (
              <motion.div key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: a.earned ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${a.earned ? "rgba(34,197,94,0.3)" : TOKEN.border}`, opacity: a.earned ? 1 : 0.5 }}>
                <div style={{ fontSize: 28 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{a.desc}</div>
                </div>
                {a.earned && <div style={{ marginLeft: "auto", color: TOKEN.orange }}>{Icon.star}</div>}
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: "rgba(168,85,247,0.08)", border: `1px solid rgba(168,85,247,0.15)` }}>
            <XPBar level={userProgress.level} xp={userProgress.xp} maxXp={userProgress.maxXp} />
            <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 8, textAlign: "center" }}>{userProgress.maxXp - userProgress.xp} XP para o próximo nível</div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SUBJECTS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SubjectsPage = ({ onUpdateProgress, onShowToast }) => {
  const [subjects, setSubjects] = useState([
    { id: "cont_geral", name: "Contabilidade Geral", icon: "📒", pct: 70, topics: 12, done: 8, color: TOKEN.blue, level: "Intermediário" },
    { id: "cont_soc", name: "Contabilidade Societária", icon: "🏦", pct: 45, topics: 9, done: 4, color: TOKEN.cyan, level: "Avançado" },
    { id: "cont_custos", name: "Contabilidade de Custos", icon: "💹", pct: 20, topics: 8, done: 2, color: TOKEN.purple, level: "Iniciante" },
    { id: "analise_bal", name: "Análise de Balanços", icon: "📊", pct: 55, topics: 7, done: 4, color: TOKEN.green, level: "Intermediário" },
    { id: "auditoria", name: "Auditoria", icon: "🔎", pct: 30, topics: 10, done: 3, color: TOKEN.orange, level: "Iniciante" },
    { id: "dir_trib", name: "Direito Tributário", icon: "⚖️", pct: 10, topics: 6, done: 1, color: TOKEN.red, level: "Iniciante" },
  ]);

  const handleStudy = (subjectId, subjectName) => {
    onUpdateProgress({ type: "ADD_XP", value: 15 });
    onUpdateProgress({ type: "ADD_STUDY_TIME", value: 30 });
    onUpdateProgress({ type: "ADD_QUESTION" });
    onShowToast(`📚 Estudando ${subjectName}! +15 XP`, "success");
    
    setSubjects(prev => prev.map(s => 
      s.id === subjectId && s.pct < 100 
        ? { ...s, pct: Math.min(100, s.pct + 2), done: Math.min(s.topics, Math.floor((s.pct + 2) / 100 * s.topics)) }
        : s
    ));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
      {subjects.map((s, i) => (
        <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
          <GlassCard style={{ padding: 22, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.done}/{s.topics} temas</div>
                </div>
              </div>
              <Badge color={s.pct > 60 ? "green" : s.pct > 30 ? "orange" : "purple"}>{s.level}</Badge>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: TOKEN.textMuted }}>Progresso</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.pct}%</span>
              </div>
              <ProgressBar value={s.pct} color={s.color} height={7} />
            </div>
            <motion.button onClick={() => handleStudy(s.id, s.name)} whileHover={{ scale: 1.02 }} style={{ width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${s.color}44`, background: `${s.color}11`, color: s.color, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {s.pct >= 100 ? "✅ Concluído" : "Continuar estudando →"}
            </motion.button>
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MATERIALS PAGE - Upload de PDF Funcional
// ══════════════════════════════════════════════════════════════════════════════
const MaterialsPage = ({ onShowToast, uploadedMaterials, onAddMaterial, onRemoveMaterial }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      const isValidType = validTypes.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.pptx');
      const isValidSize = file.size <= 50 * 1024 * 1024;
      
      if (!isValidType) onShowToast(`❌ ${file.name}: formato não suportado`, "error");
      else if (!isValidSize) onShowToast(`❌ ${file.name}: arquivo muito grande (max 50MB)`, "error");
      else return true;
      return false;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMaterial = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: (file.size / 1024 / 1024).toFixed(2),
          date: new Date().toLocaleDateString('pt-BR'),
          data: e.target.result,
        };
        onAddMaterial(newMaterial);
        onShowToast(`✅ ${file.name} enviado com sucesso!`, "success");
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileUpload(files);
  };

  const handleDownload = (material) => {
    const link = document.createElement('a');
    link.href = material.data;
    link.download = material.name;
    link.click();
    onShowToast(`📥 Baixando ${material.name}`, "success");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 20 }}>
      {/* Upload Area */}
      <GlassCard style={{ padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>📤 Upload de Materiais</div>
        <div style={{ fontSize: 12, color: TOKEN.textMuted, marginBottom: 20 }}>Envie PDFs, apresentações e documentos das suas aulas</div>
        
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          animate={{ borderColor: isDragging ? TOKEN.blue : TOKEN.border, scale: isDragging ? 1.02 : 1 }}
          style={{ border: `2px dashed ${isDragging ? TOKEN.blue : TOKEN.border}`, borderRadius: 16, padding: "40px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: isDragging ? "rgba(56,139,253,0.05)" : "transparent" }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
          <div style={{ fontSize: 14, color: TOKEN.textSecondary, fontWeight: 500, marginBottom: 6 }}>Arraste seus arquivos aqui</div>
          <div style={{ fontSize: 12, color: TOKEN.textMuted, marginBottom: 16 }}>PDF, DOCX, PPTX • Máx 50MB</div>
          <input type="file" ref={fileInputRef} accept=".pdf,.docx,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation" multiple style={{ display: "none" }} onChange={(e) => handleFileUpload(e.target.files)} />
          <motion.button onClick={() => fileInputRef.current?.click()} whileHover={{ scale: 1.03 }} style={{ padding: "10px 24px", borderRadius: 10, border: `1px solid ${TOKEN.border}`, background: "rgba(56,139,253,0.1)", color: TOKEN.blue, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            Selecionar arquivos
          </motion.button>
        </motion.div>

        <div style={{ marginTop: 20, padding: "12px", borderRadius: 10, background: "rgba(56,139,253,0.05)", border: `1px solid ${TOKEN.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textSecondary, marginBottom: 8 }}>📌 Formatos suportados:</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Badge color="blue">PDF</Badge>
            <Badge color="cyan">DOCX</Badge>
            <Badge color="purple">PPTX</Badge>
          </div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 10 }}>✓ Armazenamento seguro na nuvem</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted }}>✓ Acesso de qualquer dispositivo</div>
        </div>
      </GlassCard>

      {/* Materials List */}
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>📚 Meus Materiais</div>
          <Badge color="cyan">{uploadedMaterials.length} arquivos</Badge>
        </div>
        
        {uploadedMaterials.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12, opacity: 0.5 }}>📭</div>
            <div style={{ fontSize: 14, color: TOKEN.textMuted }}>Nenhum material enviado ainda</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted, marginTop: 4 }}>Envie seus primeiros arquivos acima</div>
          </div>
        ) : (
          <AnimatePresence>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 500, overflowY: "auto" }}>
              {uploadedMaterials.map((material, i) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKEN.border}` }}
                >
                  <div style={{ fontSize: 28 }}>{material.type.includes('pdf') ? "📕" : material.type.includes('word') ? "📘" : "📙"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{material.name}</div>
                    <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{material.size} MB • {material.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDownload(material)} style={{ padding: "6px", borderRadius: 6, border: `1px solid ${TOKEN.border}`, background: "rgba(56,139,253,0.1)", color: TOKEN.blue, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {Icon.download}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => onRemoveMaterial(material.id)} style={{ padding: "6px", borderRadius: 6, border: `1px solid ${TOKEN.border}`, background: "rgba(239,68,68,0.1)", color: TOKEN.red, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {Icon.trash}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </GlassCard>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// EXAMS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ExamsPage = ({ onUpdateProgress, onShowToast }) => {
  const [currentExamIndex, setCurrentExamIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examCompleted, setExamCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const exams = [
    { id: "exam1", title: "Balanço Patrimonial", subject: "Cont. Geral", level: "Médio", color: TOKEN.blue, questions: generateQuestions("BP") },
    { id: "exam2", title: "DRE e CPC 26", subject: "Cont. Societária", level: "Difícil", color: TOKEN.cyan, questions: generateQuestions("DRE") },
    { id: "exam3", title: "Custeio por Absorção", subject: "Cont. de Custos", level: "Fácil", color: TOKEN.purple, questions: generateQuestions("CUSTOS") },
  ];

  function generateQuestions(type) {
    const questions = {
      BP: [
        { text: "O que representa o Ativo no Balanço Patrimonial?", options: [{ id: "A", text: "As obrigações da empresa com terceiros" }, { id: "B", text: "Os bens e direitos da empresa" }, { id: "C", text: "O patrimônio líquido da empresa" }, { id: "D", text: "As despesas do período" }], correct: "B", explanation: "O Ativo representa todos os bens e direitos que a empresa possui." },
        { text: "Qual a fórmula do Patrimônio Líquido?", options: [{ id: "A", text: "Ativo + Passivo" }, { id: "B", text: "Ativo - Passivo" }, { id: "C", text: "Receitas - Despesas" }, { id: "D", text: "Passivo - Ativo" }], correct: "B", explanation: "PL = Ativo - Passivo" },
      ],
      DRE: [
        { text: "A Demonstração do Resultado do Exercício (DRE) evidencia:", options: [{ id: "A", text: "A posição financeira da empresa" }, { id: "B", text: "O desempenho econômico da entidade" }, { id: "C", text: "As mutações do patrimônio líquido" }, { id: "D", text: "Os fluxos de caixa" }], correct: "B", explanation: "A DRE evidencia o desempenho econômico." },
        { text: "O que é EBITDA?", options: [{ id: "A", text: "Lucro antes de juros, impostos, depreciação e amortização" }, { id: "B", text: "Lucro líquido do período" }, { id: "C", text: "Resultado operacional" }, { id: "D", text: "Margem bruta" }], correct: "A", explanation: "EBITDA = Lucro antes de juros, impostos, depreciação e amortização." },
      ],
      CUSTOS: [
        { text: "O que caracteriza o custeio por absorção?", options: [{ id: "A", text: "Apropria apenas custos variáveis" }, { id: "B", text: "Apropria todos os custos de produção" }, { id: "C", text: "Apropria apenas custos fixos" }, { id: "D", text: "Não apropria custos indiretos" }], correct: "B", explanation: "O custeio por absorção apropria todos os custos de produção." },
      ],
    };
    return questions[type] || questions.BP;
  }

  const currentExam = currentExamIndex !== null ? exams[currentExamIndex] : null;
  const currentQuestions = currentExam?.questions || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const currentAnswer = answers[`${currentExamIndex}_${currentQuestionIndex}`];

  const handleStartExam = (index) => {
    setCurrentExamIndex(index);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setExamCompleted(false);
    setShowExplanation(false);
    onShowToast(`📝 Iniciando ${exams[index].title}`, "info");
  };

  const handleAnswer = (questionIdx, answerId) => {
    if (currentAnswer) return;
    const isCorrect = answerId === currentQuestion.correct;
    setAnswers({ ...answers, [`${currentExamIndex}_${questionIdx}`]: { answer: answerId, isCorrect } });
    setShowExplanation(true);
    
    if (isCorrect) {
      onUpdateProgress({ type: "ADD_XP", value: 10 });
      onUpdateProgress({ type: "ADD_CORRECT_ANSWER" });
      onShowToast(`✅ Correto! +10 XP`, "success");
    } else {
      onUpdateProgress({ type: "ADD_WRONG_ANSWER" });
      onShowToast(`❌ Incorreto. A resposta correta era ${currentQuestion.correct}`, "error");
    }
    onUpdateProgress({ type: "ADD_QUESTION" });
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < currentQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const correct = Object.values(answers).filter(a => a && a.isCorrect).length;
      const total = currentQuestions.length;
      const percentage = (correct / total) * 100;
      onUpdateProgress({ type: "ADD_XP", value: 50 });
      onShowToast(`🏆 Prova concluída! ${correct}/${total} acertos. +50 XP`, "success");
      setExamCompleted(true);
      setCurrentExamIndex(null);
    }
  };

  if (currentExam && currentQuestion) {
    return (
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary }}>{currentExam.title}</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted }}>Questão {currentQuestionIndex + 1} de {currentQuestions.length}</div>
          </div>
          <Badge color={currentExam.level === "Difícil" ? "orange" : currentExam.level === "Médio" ? "cyan" : "green"}>{currentExam.level}</Badge>
        </div>
        <ProgressBar value={((currentQuestionIndex + (currentAnswer ? 1 : 0)) / currentQuestions.length) * 100} color={currentExam.color} height={4} />
        
        <div style={{ marginTop: 24, marginBottom: 24, padding: "20px", borderRadius: 12, background: "rgba(56,139,253,0.06)", border: `1px solid rgba(56,139,253,0.12)` }}>
          <div style={{ fontSize: 12, color: TOKEN.blue, fontWeight: 600, marginBottom: 10 }}>ENUNCIADO</div>
          <div style={{ fontSize: 15, color: TOKEN.textPrimary, lineHeight: 1.7 }}>{currentQuestion.text}</div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {currentQuestion.options.map((opt) => {
            const isSelected = currentAnswer?.answer === opt.id;
            const isCorrect = opt.id === currentQuestion.correct;
            let bg = "rgba(255,255,255,0.025)", border = TOKEN.border, textColor = TOKEN.textSecondary;
            if (currentAnswer && isCorrect) { bg = "rgba(34,197,94,0.12)"; border = "rgba(34,197,94,0.4)"; textColor = TOKEN.green; }
            else if (currentAnswer && isSelected && !isCorrect) { bg = "rgba(239,68,68,0.12)"; border = "rgba(239,68,68,0.4)"; textColor = TOKEN.red; }
            else if (isSelected) { bg = "rgba(56,139,253,0.15)"; border = TOKEN.blue; textColor = TOKEN.blue; }
            return (
              <motion.button key={opt.id} onClick={() => handleAnswer(currentQuestionIndex, opt.id)} whileHover={!currentAnswer ? { x: 3 } : {}}
                style={{ padding: "14px 18px", borderRadius: 10, border: `1px solid ${border}`, background: bg, color: textColor, cursor: currentAnswer ? "default" : "pointer", fontSize: 13, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid currentColor`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{opt.id}</span>
                <span>{opt.text}</span>
                {currentAnswer && isCorrect && <span style={{ marginLeft: "auto" }}>✅</span>}
                {currentAnswer && isSelected && !isCorrect && <span style={{ marginLeft: "auto" }}>❌</span>}
              </motion.button>
            );
          })}
        </div>
        
        <AnimatePresence>
          {showExplanation && currentAnswer && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: currentAnswer.isCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${currentAnswer.isCorrect ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: currentAnswer.isCorrect ? TOKEN.green : TOKEN.red, marginBottom: 6 }}>
                {currentAnswer.isCorrect ? "✅ Correto!" : "❌ Incorreto"}
              </div>
              <div style={{ fontSize: 12, color: TOKEN.textSecondary, lineHeight: 1.6 }}>{currentQuestion.explanation}</div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {currentAnswer && (
          <motion.button onClick={handleNextQuestion} whileHover={{ scale: 1.02 }} style={{ marginTop: 16, width: "100%", padding: "14px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${currentExam.color}, ${currentExam.color}cc)`, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
            {currentQuestionIndex + 1 === currentQuestions.length ? "Finalizar prova →" : "Próxima questão →"}
          </motion.button>
        )}
      </GlassCard>
    );
  }

  if (examCompleted) {
    return (
      <GlassCard style={{ padding: 40, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🏆</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: TOKEN.textPrimary, marginBottom: 10 }}>Prova Concluída!</div>
        <motion.button onClick={() => setExamCompleted(false)} whileHover={{ scale: 1.02 }} style={{ marginTop: 20, padding: "12px 32px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
          Voltar aos simulados
        </motion.button>
      </GlassCard>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
      <GlassCard style={{ padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 20 }}>⚡ Simulados Disponíveis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {exams.map((e, i) => (
            <motion.div key={i} whileHover={{ x: 3 }} style={{ padding: "16px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: TOKEN.textPrimary }}>{e.title}</div>
                <Badge color={e.level === "Difícil" ? "orange" : e.level === "Médio" ? "cyan" : "green"}>{e.level}</Badge>
              </div>
              <div style={{ fontSize: 12, color: TOKEN.textMuted, marginBottom: 12 }}>{e.subject}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>📝 {e.questions.length} questões</span>
                </div>
                <motion.button onClick={() => handleStartExam(i)} whileHover={{ scale: 1.05 }} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${e.color}, ${e.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  Iniciar
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <GlassCard style={{ padding: 40, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 56, marginBottom: 16 }}>📚</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 8 }}>Selecione um simulado</div>
          <div style={{ fontSize: 13, color: TOKEN.textMuted }}>Escolha uma prova acima para testar seus conhecimentos</div>
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PerformancePage = ({ userProgress }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Total de questões", value: userProgress.totalQuestions, delta: "+124 esta semana", icon: "📝", color: TOKEN.blue },
          { label: "Taxa de acerto", value: `${userProgress.accuracy}%`, delta: `+${userProgress.accuracyChange}%`, icon: "🎯", color: TOKEN.green },
          { label: "Tempo de estudo", value: `${Math.floor(userProgress.studyTime / 60)}h ${userProgress.studyTime % 60}m`, delta: "Total acumulado", icon: "⏱", color: TOKEN.cyan },
          { label: "Nível atual", value: `Lv ${userProgress.level}`, delta: `${userProgress.xp}/${userProgress.maxXp} XP`, icon: "🏆", color: TOKEN.purple },
        ].map((m, i) => (
          <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <GlassCard style={{ padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: m.color, fontFamily: "'Syne', sans-serif" }}>{m.value}</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: m.color, marginTop: 4 }}>{m.delta}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard style={{ padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 20 }}>📊 Estatísticas Detalhadas</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: TOKEN.blue }}>{userProgress.correctAnswers}</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted }}>Acertos</div>
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: TOKEN.red }}>{userProgress.wrongAnswers}</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted }}>Erros</div>
          </div>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: TOKEN.green }}>{userProgress.streak}</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted }}>Dias de streak</div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// GOALS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const GoalsPage = ({ userProgress, goals, onAddGoal, onToggleGoal, onShowToast }) => {
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  const calculateProgress = (goal) => {
    if (goal.type === "questions") return Math.min(100, Math.round((userProgress.totalQuestions / goal.target) * 100));
    if (goal.type === "streak") return Math.min(100, Math.round((userProgress.streak / goal.target) * 100));
    if (goal.type === "accuracy") return Math.min(100, Math.round((userProgress.accuracy / goal.target) * 100));
    return goal.progress;
  };

  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      onAddGoal({ title: newGoalTitle, progress: 0, target: 100, deadline: "30 dias", color: TOKEN.blue, icon: "🎯" });
      setNewGoalTitle("");
      setShowAddGoal(false);
      onShowToast(`🎯 Nova meta adicionada: ${newGoalTitle}`, "success");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary }}>🎯 Minhas Metas</div>
          <motion.button onClick={() => setShowAddGoal(!showAddGoal)} whileHover={{ scale: 1.05 }} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${TOKEN.border}`, background: "rgba(56,139,253,0.1)", color: TOKEN.blue, cursor: "pointer", fontSize: 13 }}>
            + Nova meta
          </motion.button>
        </div>
        
        <AnimatePresence>
          {showAddGoal && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ marginBottom: 20, padding: 16, borderRadius: 12, background: "rgba(56,139,253,0.08)", border: `1px solid ${TOKEN.border}` }}>
              <input type="text" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} placeholder="Digite sua meta..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${TOKEN.border}`, background: TOKEN.bg, color: TOKEN.textPrimary, fontSize: 13, marginBottom: 12, outline: "none" }} />
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button onClick={() => setShowAddGoal(false)} style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.textMuted, cursor: "pointer", fontSize: 12 }}>Cancelar</button>
                <button onClick={handleAddGoal} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, color: "#fff", cursor: "pointer", fontSize: 12 }}>Adicionar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {goals.map((goal, i) => {
            const progress = calculateProgress(goal);
            const completed = progress >= 100;
            return (
              <motion.div key={goal.id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ padding: "16px 18px", borderRadius: 12, background: completed ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)", border: `1px solid ${completed ? "rgba(34,197,94,0.2)" : TOKEN.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{goal.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: TOKEN.textPrimary, textDecoration: completed ? "line-through" : "none" }}>{goal.title}</span>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: completed ? TOKEN.green : goal.color }}>{progress}%</span>
                </div>
                <ProgressBar value={progress} color={completed ? TOKEN.green : goal.color} height={6} />
                {completed && <div style={{ marginTop: 8, fontSize: 11, color: TOKEN.green, fontWeight: 600 }}>🏆 Meta concluída!</div>}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PLAN PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PlanPage = ({ planTasks, onToggleTask, onShowToast }) => {
  const plan = [
    { id: "task1", time: "08:00 - 09:30", subject: "Contabilidade Geral", topic: "Conceitos fundamentais", type: "Estudo", color: TOKEN.blue },
    { id: "task2", time: "10:00 - 10:30", subject: "Revisão", topic: "Balanço Patrimonial", type: "Revisão", color: TOKEN.orange },
    { id: "task3", time: "14:00 - 15:30", subject: "Cont. Societária", topic: "DRE (CPC 26)", type: "Estudo", color: TOKEN.cyan },
    { id: "task4", time: "16:00 - 16:30", subject: "Simulado", topic: "10 questões", type: "Prova", color: TOKEN.purple },
    { id: "task5", time: "19:00 - 20:00", subject: "Revisão Espaçada", topic: "Conceitos do dia", type: "Revisão", color: TOKEN.green },
  ];

  const handleToggleTask = (taskId, taskTitle) => {
    onToggleTask(taskId);
    if (!planTasks.includes(taskId)) {
      onShowToast(`✅ Tarefa concluída: ${taskTitle}`, "success");
    }
  };

  const completedCount = planTasks.length;
  const totalCount = plan.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}>
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary }}>📅 Plano de Hoje</div>
          <Badge color="cyan">IA Otimizado</Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {plan.map((p, i) => {
            const isCompleted = planTasks.includes(p.id);
            return (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                onClick={() => handleToggleTask(p.id, p.subject)} style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer", background: isCompleted ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)", border: `1px solid ${isCompleted ? "rgba(34,197,94,0.2)" : TOKEN.border}`, opacity: isCompleted ? 0.7 : 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: 99, border: `2px solid ${isCompleted ? TOKEN.green : p.color}`, display: "flex", alignItems: "center", justifyContent: "center", background: isCompleted ? "rgba(34,197,94,0.15)" : "transparent", color: isCompleted ? TOKEN.green : p.color, fontSize: 12 }}>{isCompleted ? "✓" : "○"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, textDecoration: isCompleted ? "line-through" : "none" }}>{p.subject}</span>
                    <Badge color={p.type === "Revisão" ? "orange" : p.type === "Prova" ? "purple" : "blue"}>{p.type}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: TOKEN.textMuted }}>{p.topic}</div>
                  <div style={{ fontSize: 11, color: p.color, marginTop: 4 }}>⏰ {p.time}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      <GlassCard style={{ padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 16 }}>📊 Progresso do Dia</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: TOKEN.textMuted }}>{completedCount} de {totalCount} tarefas</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: TOKEN.blue }}>{Math.round((completedCount / totalCount) * 100)}%</span>
        </div>
        <ProgressBar value={(completedCount / totalCount) * 100} color={TOKEN.blue} height={8} />
        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ padding: "14px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: TOKEN.green }}>{completedCount}</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Concluídas</div>
          </div>
          <div style={{ padding: "14px", borderRadius: 10, background: "rgba(56,139,253,0.08)", border: "1px solid rgba(56,139,253,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: TOKEN.blue }}>{totalCount - completedCount}</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>Pendentes</div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REVIEWS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ReviewsPage = ({ completedReviews, onToggleReview, onUpdateProgress, onShowToast }) => {
  const reviews = [
    { id: "rev1", topic: "Balanço Patrimonial", subject: "Cont. Geral", lastSeen: "3 dias", dueScore: 95, color: TOKEN.orange, urgent: true },
    { id: "rev2", topic: "DRE e Resultado", subject: "Cont. Societária", lastSeen: "5 dias", dueScore: 88, color: TOKEN.blue, urgent: false },
    { id: "rev3", topic: "Custeio por Absorção", subject: "Cont. de Custos", lastSeen: "7 dias", dueScore: 82, color: TOKEN.purple, urgent: false },
    { id: "rev4", topic: "Análise Horizontal", subject: "Análise de Balanços", lastSeen: "2 dias", dueScore: 91, color: TOKEN.cyan, urgent: true },
    { id: "rev5", topic: "Fluxo de Caixa", subject: "Cont. Geral", lastSeen: "10 dias", dueScore: 76, color: TOKEN.green, urgent: false },
  ];

  const handleReview = (reviewId, reviewTitle, xpGain = 15) => {
    if (!completedReviews.includes(reviewId)) {
      onToggleReview(reviewId);
      onUpdateProgress({ type: "ADD_XP", value: xpGain });
      onUpdateProgress({ type: "ADD_QUESTION" });
      onShowToast(`📖 Revisão concluída: ${reviewTitle}! +${xpGain} XP`, "success");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TOKEN.textPrimary }}>🔄 Revisões Inteligentes</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted, marginTop: 4 }}>Baseado no algoritmo de repetição espaçada</div>
          </div>
          <Badge color="cyan">{reviews.filter(r => !completedReviews.includes(r.id)).length} pendentes</Badge>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {reviews.map((r, i) => {
            const isCompleted = completedReviews.includes(r.id);
            return (
              <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 12, background: isCompleted ? "rgba(34,197,94,0.06)" : (r.urgent ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.025)"), border: `1px solid ${isCompleted ? "rgba(34,197,94,0.3)" : (r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border)}`, opacity: isCompleted ? 0.6 : 1 }}>
                <div style={{ fontSize: 28 }}>{isCompleted ? "✅" : (r.urgent ? "🔴" : "📘")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: TOKEN.textPrimary }}>{r.topic}</div>
                  <div style={{ fontSize: 12, color: TOKEN.textMuted }}>{r.subject} • Visto há {r.lastSeen}</div>
                </div>
                <div style={{ textAlign: "right", marginRight: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: r.color }}>{r.dueScore}</div>
                  <div style={{ fontSize: 10, color: TOKEN.textMuted }}>prioridade</div>
                </div>
                {!isCompleted && (
                  <motion.button onClick={() => handleReview(r.id, r.topic)} whileHover={{ scale: 1.04 }} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: `linear-gradient(135deg, ${r.color}, ${r.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    Revisar
                  </motion.button>
                )}
                {isCompleted && <Badge color="green">Concluído</Badge>}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGE CONTENT ROUTER
// ══════════════════════════════════════════════════════════════════════════════
const PAGE_META = {
  home: { title: "Olá, Estudante! 👋", subtitle: "Acompanhe seu progresso e mantenha o foco nos estudos" },
  subjects: { title: "Disciplinas 📚", subtitle: "Gerencie suas matérias e acompanhe seu avanço" },
  plan: { title: "Plano de Estudo 📅", subtitle: "Sua rotina inteligente para hoje" },
  exams: { title: "Provas & Simulados ⚡", subtitle: "Teste seus conhecimentos com questões reais" },
  performance: { title: "Desempenho 📊", subtitle: "Analise sua evolução e pontos de melhoria" },
  reviews: { title: "Revisões Inteligentes 🔄", subtitle: "Revise no momento certo para fixar o conteúdo" },
  goals: { title: "Metas 🎯", subtitle: "Defina objetivos e acompanhe suas conquistas" },
  materials: { title: "Meus Materiais 📁", subtitle: "Gerencie seus arquivos e documentos de estudo" },
};

const PageContent = ({ page, userProgress, onUpdateProgress, planTasks, onToggleTask, completedReviews, onToggleReview, goals, onAddGoal, onToggleGoal, uploadedMaterials, onAddMaterial, onRemoveMaterial, onShowToast }) => {
  const components = {
    home: <HomeDashboard userProgress={userProgress} onUpdateProgress={onUpdateProgress} studyData={{ completedReviews }} onToggleTask={onToggleReview} onShowToast={onShowToast} />,
    subjects: <SubjectsPage onUpdateProgress={onUpdateProgress} onShowToast={onShowToast} />,
    plan: <PlanPage planTasks={planTasks} onToggleTask={onToggleTask} onShowToast={onShowToast} />,
    exams: <ExamsPage onUpdateProgress={onUpdateProgress} onShowToast={onShowToast} />,
    performance: <PerformancePage userProgress={userProgress} />,
    reviews: <ReviewsPage completedReviews={completedReviews} onToggleReview={onToggleReview} onUpdateProgress={onUpdateProgress} onShowToast={onShowToast} />,
    goals: <GoalsPage userProgress={userProgress} goals={goals} onAddGoal={onAddGoal} onToggleGoal={onToggleGoal} onShowToast={onShowToast} />,
    materials: <MaterialsPage onShowToast={onShowToast} uploadedMaterials={uploadedMaterials} onAddMaterial={onAddMaterial} onRemoveMaterial={onRemoveMaterial} />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
        {components[page] || components.home}
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
  const [toasts, setToasts] = useState([]);
  
  // Estado do plano de estudo
  const [planTasks, setPlanTasks] = useState(() => {
    const saved = localStorage.getItem("planTasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Estado das revisões completadas
  const [completedReviews, setCompletedReviews] = useState(() => {
    const saved = localStorage.getItem("completedReviews");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Estado das metas
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    if (saved) return JSON.parse(saved);
    return [
      { id: "goal1", title: "Completar Contabilidade Geral", progress: 68, target: 100, deadline: "30 Jun", color: TOKEN.blue, icon: "📒" },
      { id: "goal2", title: "100 questões respondidas", progress: 67, target: 100, deadline: "Dom 29", color: TOKEN.cyan, icon: "⚡", type: "questions" },
      { id: "goal3", title: "80% de acerto", progress: 89, target: 80, deadline: "Contínuo", color: TOKEN.green, icon: "🎯", type: "accuracy" },
      { id: "goal4", title: "Streak de 30 dias", progress: 40, target: 30, deadline: "13 Jun", color: TOKEN.orange, icon: "🔥", type: "streak" },
    ];
  });
  
  // Estado dos materiais enviados
  const [uploadedMaterials, setUploadedMaterials] = useState(() => {
    const saved = localStorage.getItem("uploadedMaterials");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Estado do progresso do usuário
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem("userProgress");
    if (saved) return JSON.parse(saved);
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

  // Persistência no localStorage
  useEffect(() => { localStorage.setItem("planTasks", JSON.stringify(planTasks)); }, [planTasks]);
  useEffect(() => { localStorage.setItem("completedReviews", JSON.stringify(completedReviews)); }, [completedReviews]);
  useEffect(() => { localStorage.setItem("goals", JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem("uploadedMaterials", JSON.stringify(uploadedMaterials)); }, [uploadedMaterials]);
  useEffect(() => { localStorage.setItem("userProgress", JSON.stringify(userProgress)); }, [userProgress]);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const updateUserProgress = (action) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      switch (action.type) {
        case "ADD_XP":
          newProgress.xp += action.value;
          if (newProgress.xp >= newProgress.maxXp) {
            newProgress.level++;
            newProgress.xp -= newProgress.maxXp;
            newProgress.maxXp = Math.round(newProgress.maxXp * 1.2);
            showToast(`🎉 Parabéns! Você subiu para o nível ${newProgress.level}!`, "success");
          }
          break;
        case "ADD_QUESTION":
          newProgress.totalQuestions++;
          newProgress.todayQuestions++;
          if (newProgress.todayQuestions >= newProgress.dailyGoal && prev.todayQuestions < newProgress.dailyGoal) {
            newProgress.streak++;
            showToast(`🔥 Você completou sua meta diária! Streak: ${newProgress.streak} dias`, "success");
          }
          break;
        case "ADD_CORRECT_ANSWER":
          newProgress.correctAnswers++;
          newProgress.accuracy = Math.round((newProgress.correctAnswers / (newProgress.correctAnswers + newProgress.wrongAnswers)) * 100);
          break;
        case "ADD_WRONG_ANSWER":
          newProgress.wrongAnswers++;
          newProgress.accuracy = Math.round((newProgress.correctAnswers / (newProgress.correctAnswers + newProgress.wrongAnswers)) * 100);
          break;
        case "ADD_STUDY_TIME":
          newProgress.studyTime += action.value;
          break;
        default: break;
      }
      return newProgress;
    });
  };

  const togglePlanTask = (taskId) => {
    setPlanTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  const toggleReview = (reviewId) => {
    setCompletedReviews(prev => prev.includes(reviewId) ? prev : [...prev, reviewId]);
  };

  const toggleGoal = (goalId) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, completed: !g.completed } : g));
  };

  const addGoal = (goal) => {
    setGoals(prev => [...prev, { ...goal, id: `goal_${Date.now()}`, completed: false }]);
  };

  const addMaterial = (material) => {
    setUploadedMaterials(prev => [material, ...prev]);
  };

  const removeMaterial = (materialId) => {
    setUploadedMaterials(prev => prev.filter(m => m.id !== materialId));
    showToast("🗑️ Material removido", "info");
  };

  if (page === "landing") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${TOKEN.bg}; }
          ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(56,139,253,0.3); border-radius: 99px; }
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
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(56,139,253,0.3); border-radius: 99px; }
        button { font-family: inherit; }
      `}</style>

      {/* Toasts */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </AnimatePresence>

      {/* Background Orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[{ l: "5%", t: "15%", c: TOKEN.blue, s: 600 }, { l: "70%", t: "50%", c: TOKEN.cyan, s: 500 }, { l: "40%", t: "80%", c: TOKEN.purple, s: 400 }].map((b, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10 + i * 3, repeat: Infinity }}
            style={{ position: "absolute", left: b.l, top: b.t, width: b.s, height: b.s, borderRadius: "50%", background: b.c, filter: "blur(120px)", opacity: 0.03 }} />
        ))}
      </div>

      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Sidebar active={activePage} onNav={setActivePage} userProgress={userProgress} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minHeight: "100vh" }}>
          <Topbar title={meta.title} streak={userProgress.streak} notifications={[]} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 24, marginTop: -20 }}>
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
            onToggleGoal={toggleGoal}
            uploadedMaterials={uploadedMaterials}
            onAddMaterial={addMaterial}
            onRemoveMaterial={removeMaterial}
            onShowToast={showToast}
          />
        </main>
      </div>
    </>
  );
}
