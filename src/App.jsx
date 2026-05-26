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

// ── Tiny utility ──────────────────────────────────────────────────────────────
const cx = (...args) => args.filter(Boolean).join(" ");

// ── Icons (inline SVG) ────────────────────────────────────────────────────────
const Icon = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v5A2.5 2.5 0 004.5 17v0A2.5 2.5 0 007 19.5v0A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 002.5-2.5v0a2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2z" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4V2H17V4" /><path d="M7 4h10l1 7c.5 3.5-2 5-3 5H9c-1 0-3.5-1.5-3-5L7 4z" /><path d="M4 4h2M18 4h2M4 4c0 3.5 0 5-1 6M20 4c0 3.5 0 5 1 6" />
    </svg>
  ),
  lightning: "⚡",
};

// ── Glassmorphism card ─────────────────────────────────────────────────────────
const GlassCard = ({ children, className = "", glow = false, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.005, borderColor: TOKEN.borderHover }}
    style={{
      background: TOKEN.glass,
      border: `1px solid ${TOKEN.border}`,
      borderRadius: 16,
      backdropFilter: "blur(20px)",
      boxShadow: glow
        ? `0 0 40px rgba(56,139,253,0.08), 0 1px 0 rgba(255,255,255,0.05) inset`
        : `0 1px 0 rgba(255,255,255,0.04) inset`,
      transition: "border-color 0.2s",
    }}
    className={cx("overflow-hidden", className)}
  >
    {children}
  </motion.div>
);

// ── Neon pill badge ────────────────────────────────────────────────────────────
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

// ── Progress bar ───────────────────────────────────────────────────────────────
const ProgressBar = ({ value, color = TOKEN.blue, height = 4 }) => (
  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden", height }}>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 99, boxShadow: `0 0 8px ${color}66` }}
    />
  </div>
);

// ── Mini donut chart ───────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
  const size = 120, stroke = 14, r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = data.map((d) => {
    const dash = (d.pct / 100) * circ;
    const seg = { ...d, dash, offset, gap: circ - dash };
    offset += dash;
    return seg;
  });
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      {segments.map((s, i) => (
        <motion.circle
          key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={s.color} strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
          strokeLinecap="round"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
        />
      ))}
    </svg>
  );
};

// ── Mini sparkline ─────────────────────────────────────────────────────────────
const Sparkline = ({ data, color = TOKEN.cyan }) => {
  const w = 140, h = 50;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 0.01)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" points={pts} />
      <polygon fill="url(#sg)" points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
};

// ── Calendar mini widget ───────────────────────────────────────────────────────
const MiniCalendar = () => {
  const today = 25;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = Array.from({ length: 35 }, (_, i) => {
    const d = i - 3; // offset
    return d > 0 && d <= 31 ? d : null;
  });
  const studyDays = [18, 19, 20, 21, 22, 24, 25];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
        {days.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, color: TOKEN.textMuted, fontWeight: 600, padding: "2px 0" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {dates.map((d, i) => (
          <motion.div key={i} whileHover={d ? { scale: 1.15 } : {}} style={{
            width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: d === today ? 8 : 6, fontSize: 11, fontWeight: d === today ? 700 : 400,
            background: d === today ? TOKEN.blue : studyDays.includes(d) ? "rgba(56,139,253,0.15)" : "transparent",
            color: d === today ? "#fff" : studyDays.includes(d) ? TOKEN.blue : d ? TOKEN.textSecondary : "transparent",
            cursor: d ? "pointer" : "default",
            boxShadow: d === today ? `0 0 12px ${TOKEN.blue}66` : "none",
          }}>{d}</motion.div>
        ))}
      </div>
    </div>
  );
};

// ── Streak flame ───────────────────────────────────────────────────────────────
const StreakWidget = ({ days = 12 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }}
      style={{ fontSize: 28, filter: "drop-shadow(0 0 12px #F97316)" }}>🔥</motion.div>
    <div style={{ fontSize: 24, fontWeight: 800, color: TOKEN.orange, lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>{days}</div>
    <div style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500 }}>day streak</div>
  </div>
);

// ── XP / Level bar ─────────────────────────────────────────────────────────────
const XPBar = ({ level = 7, xp = 2340, maxXp = 3000 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: `linear-gradient(135deg, ${TOKEN.purple}, ${TOKEN.blue})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, fontWeight: 800, color: "#fff",
      boxShadow: `0 0 16px ${TOKEN.purple}55`,
    }}>Lv{level}</div>
    <div style={{ flex: 1 }}>
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

const Sidebar = ({ active, onNav }) => {
  return (
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
        <motion.div whileHover={{ scale: 1.03 }} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
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
        </motion.div>
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

      {/* Bottom section */}
      <div style={{ padding: "16px 12px", borderTop: `1px solid ${TOKEN.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
        <XPBar />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", cursor: "pointer" }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: `linear-gradient(135deg, ${TOKEN.purple}, #7c3aed)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, boxShadow: `0 0 12px ${TOKEN.purple}44`,
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>Estudante</div>
            <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Ciências Contábeis</div>
          </div>
          {Icon.settings}
        </div>
      </div>
    </motion.aside>
  );
};

// ── Topbar ─────────────────────────────────────────────────────────────────────
const Topbar = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
    <div>
      <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ fontSize: 22, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", margin: 0, fontFamily: "'Syne', sans-serif" }}>
        {title}
      </motion.h1>
      <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
        style={{ fontSize: 13, color: TOKEN.textMuted, margin: "2px 0 0", fontFamily: "'DM Sans', sans-serif" }}>
        Segunda-feira, 26 de Maio de 2025
      </motion.p>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <motion.div whileHover={{ scale: 1.05 }} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10,
        background: TOKEN.glass, border: `1px solid ${TOKEN.border}`,
        cursor: "pointer", backdropFilter: "blur(12px)",
      }}>
        <span style={{ fontSize: 12, color: TOKEN.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>⌘ K</span>
      </motion.div>
      <motion.button whileHover={{ scale: 1.05 }} style={{
        width: 36, height: 36, borderRadius: 10, border: `1px solid ${TOKEN.border}`,
        background: TOKEN.glass, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", color: TOKEN.textSecondary, backdropFilter: "blur(12px)",
      }}>
        {Icon.bell}
        <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: 99, background: TOKEN.orange, boxShadow: `0 0 6px ${TOKEN.orange}` }} />
      </motion.button>
      <StreakWidget days={12} />
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
const LandingPage = ({ onEnter }) => {
  const orbs = [
    { x: "10%", y: "20%", size: 500, color: TOKEN.blue, opacity: 0.04 },
    { x: "70%", y: "60%", size: 400, color: TOKEN.cyan, opacity: 0.035 },
    { x: "50%", y: "10%", size: 300, color: TOKEN.purple, opacity: 0.03 },
  ];

  const features = [
    { icon: "🧠", title: "IA Adaptativa", desc: "Reorganiza suas prioridades automaticamente com base no seu desempenho" },
    { icon: "⚡", title: "Revisão Espaçada", desc: "Algoritmo científico que otimiza o momento certo de revisar cada tema" },
    { icon: "📊", title: "Analytics Premium", desc: "Dashboards inteligentes que mostram exatamente onde você precisa melhorar" },
    { icon: "🎯", title: "Simulados Inteligentes", desc: "Questões personalizadas baseadas em seu perfil de erros e acertos" },
    { icon: "🔥", title: "Gamificação", desc: "Sistema de streaks, XP e conquistas para manter sua motivação no máximo" },
    { icon: "📚", title: "Upload de Aulas", desc: "Importe seus materiais e o sistema organiza tudo automaticamente" },
  ];

  const stats = [
    { value: "94%", label: "Taxa de aprovação" },
    { value: "3.2×", label: "Mais rápido para aprender" },
    { value: "10k+", label: "Estudantes ativos" },
    { value: "98%", label: "Satisfação" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: TOKEN.bg, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      {/* Background orbs */}
      {orbs.map((o, i) => (
        <motion.div key={i} animate={{ scale: [1, 1.08, 1], opacity: [o.opacity, o.opacity * 1.4, o.opacity] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "fixed", left: o.x, top: o.y, width: o.size, height: o.size, borderRadius: "50%",
            background: o.color, filter: "blur(120px)", opacity: o.opacity, pointerEvents: "none", zIndex: 0 }}
        />
      ))}

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(20px)", borderBottom: `1px solid ${TOKEN.border}`,
        background: "rgba(5,10,20,0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
            display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${TOKEN.blue}55` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, letterSpacing: "-0.02em", fontFamily: "'Syne', sans-serif" }}>MeuEstudo Contábil</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <motion.button whileHover={{ scale: 1.03 }} style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${TOKEN.border}`,
            background: "transparent", color: TOKEN.textSecondary, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            Entrar
          </motion.button>
          <motion.button whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${TOKEN.blue}66` }} onClick={onEnter}
            style={{ padding: "8px 18px", borderRadius: 8, border: "none",
            background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
            color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Começar grátis →
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "160px 48px 100px", textAlign: "center" }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 99,
            background: "rgba(56,139,253,0.1)", border: `1px solid rgba(56,139,253,0.25)`, marginBottom: 28 }}>
            <span style={{ fontSize: 10, color: TOKEN.cyan, fontWeight: 700, letterSpacing: "0.1em" }}>NOVA VERSÃO 2.0</span>
            <span style={{ fontSize: 11, color: TOKEN.textMuted }}>→ IA ainda mais inteligente</span>
          </div>
        </motion.div>

        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          style={{ fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em",
            fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 20px" }}>
          Seu estudo,{" "}
          <span style={{ background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            organizado e otimizado
          </span>
          {" "}pela IA
        </motion.h1>

        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 18, color: TOKEN.textSecondary, lineHeight: 1.6, margin: "0 0 36px", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
          O sistema inteligente que reorganiza suas aulas, aplica revisões no momento certo e acompanha sua evolução em Ciências Contábeis.
        </motion.p>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${TOKEN.blue}55` }} onClick={onEnter}
            style={{ padding: "14px 32px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
              color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              boxShadow: `0 0 24px ${TOKEN.blue}44` }}>
            🚀 Começar gratuitamente
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }}
            style={{ padding: "14px 32px", borderRadius: 12, border: `1px solid ${TOKEN.border}`,
              background: TOKEN.glass, backdropFilter: "blur(12px)",
              color: TOKEN.textSecondary, cursor: "pointer", fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>
            ▶ Ver demonstração
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64, flexWrap: "wrap" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: TOKEN.blue, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: TOKEN.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "60px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 12px" }}>
            Tudo que você precisa para passar
          </h2>
          <p style={{ fontSize: 16, color: TOKEN.textMuted }}>Desenvolvido com base em ciência do aprendizado e design de produto premium</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 + 0.3 }}
              whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(56,139,253,0.12)` }}
              style={{ padding: 24, borderRadius: 16, background: TOKEN.glass, border: `1px solid ${TOKEN.border}`,
                backdropFilter: "blur(12px)", transition: "all 0.2s" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: TOKEN.textMuted, lineHeight: 1.6 }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 48px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", padding: "48px 64px", borderRadius: 24,
          background: `linear-gradient(135deg, rgba(56,139,253,0.1), rgba(57,208,216,0.06))`,
          border: `1px solid rgba(56,139,253,0.2)`, backdropFilter: "blur(20px)" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", color: TOKEN.textPrimary, margin: "0 0 12px" }}>
            Pronto para evoluir?
          </h2>
          <p style={{ fontSize: 15, color: TOKEN.textMuted, margin: "0 0 28px" }}>Junte-se a milhares de estudantes que já estão evoluindo com o MeuEstudo</p>
          <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${TOKEN.blue}66` }} onClick={onEnter}
            style={{ padding: "14px 36px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
              color: "#fff", cursor: "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            Entrar no Dashboard →
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD HOME
// ══════════════════════════════════════════════════════════════════════════════
const subjectColors = { "Cont. Geral": TOKEN.blue, "Cont. Societária": TOKEN.cyan, "Cont. de Custos": TOKEN.purple, "Análise de Balanços": TOKEN.green, "Auditoria": TOKEN.orange };
const donutData = [
  { pct: 27, color: TOKEN.blue },
  { pct: 18, color: TOKEN.cyan },
  { pct: 8, color: TOKEN.purple },
  { pct: 22, color: TOKEN.green },
  { pct: 12, color: TOKEN.orange },
  { pct: 13, color: TOKEN.textMuted },
];
const perfData = [55, 62, 58, 70, 65, 72, 80];
const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const weekHours = [2.5, 1.8, 3.2, 0, 2.8, 1.5, 0.8];

const HomeDashboard = () => {
  const subjects = [
    { name: "Cont. Geral", sub: "Obr. divulgação e publicação", pct: 70, status: "Em andamento", statusColor: "cyan" },
    { name: "Cont. Societária", sub: "Demonstrações (CPC26)", pct: 40, status: "Próximo", statusColor: "orange" },
    { name: "Cont. de Custos", sub: "Custeio por absorção", pct: 0, status: "Bloqueado", statusColor: "purple" },
  ];
  const upcomingReviews = [
    { topic: "Balanço Patrimonial", due: "Hoje", questions: 10, urgent: true },
    { topic: "DRE (CPC 26)", due: "Amanhã", questions: 15, urgent: false },
    { topic: "Receitas e Despesas", due: "12/06", questions: 10, urgent: false },
  ];
  const recentAchievements = [
    { icon: "🏆", title: "Primeira semana!", desc: "7 dias de streak" },
    { icon: "⚡", title: "Velocista", desc: "100 questões em um dia" },
    { icon: "🎯", title: "Precisão", desc: "90% de acerto" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Row 1 - KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Progresso geral", value: "68%", delta: "+5% esta semana", color: TOKEN.blue, icon: "📈", spark: [40, 52, 58, 60, 63, 65, 68] },
          { label: "Questões hoje", value: "24/30", delta: "6 restantes", color: TOKEN.cyan, icon: "✅", spark: [5, 10, 15, 16, 20, 22, 24] },
          { label: "Taxa de acertos", value: "80%", delta: "+3% vs semana", color: TOKEN.green, icon: "🎯", spark: [70, 72, 74, 75, 77, 78, 80] },
          { label: "Tempo de estudo", value: "2h 15m", delta: "Hoje", color: TOKEN.purple, icon: "⏱", spark: [1.2, 2.5, 1.8, 3.2, 2.8, 1.5, 2.2] },
        ].map((k, i) => (
          <motion.div key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
            <GlassCard glow style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: TOKEN.textMuted, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 4 }}>{k.label.toUpperCase()}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: TOKEN.textPrimary, letterSpacing: "-0.04em", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{k.value}</div>
                  <div style={{ fontSize: 11, color: k.color, marginTop: 4, fontWeight: 500 }}>{k.delta}</div>
                </div>
                <div style={{ fontSize: 20 }}>{k.icon}</div>
              </div>
              <Sparkline data={k.spark} color={k.color} />
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        {/* Study plan */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🧠 Plano de Estudos Inteligente</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Baseado nas disciplinas da faculdade</div>
            </div>
            <Badge color="cyan">IA Ativa</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {subjects.map((s, i) => (
              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 + 0.2 }}
                whileHover={{ x: 3 }} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px",
                  borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.sub}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Badge color={s.statusColor}>{s.status}</Badge>
                    <span style={{ fontSize: 13, fontWeight: 700, color: subjectColors[s.name] || TOKEN.blue }}>{s.pct}%</span>
                  </div>
                </div>
                <ProgressBar value={s.pct} color={subjectColors[s.name] || TOKEN.blue} />
              </motion.div>
            ))}
          </div>
          <motion.button whileHover={{ x: 4 }} style={{ marginTop: 14, width: "100%", padding: "10px", borderRadius: 10,
            border: `1px solid ${TOKEN.border}`, background: "transparent", color: TOKEN.blue,
            cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
            Ver todos os temas →
          </motion.button>
        </GlassCard>

        {/* Disciplines donut */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📊 Disciplinas</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ position: "relative" }}>
              <DonutChart data={donutData} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>68%</div>
                <div style={{ fontSize: 9, color: TOKEN.textMuted, fontWeight: 500 }}>GERAL</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(subjectColors).map(([name, color], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 99, background: color }} />
                    <span style={{ fontSize: 11, color: TOKEN.textMuted }}>{name}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color }}>{[68, 45, 20, 55, 30][i]}%</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Row 3 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.8fr", gap: 14 }}>
        {/* Performance chart */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>📈 Desempenho Recente</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 16 }}>Últimos 7 dias</div>
          {/* Bar chart */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
            {perfData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ width: "100%", background: i === perfData.length - 1
                    ? `linear-gradient(180deg, ${TOKEN.blue}, ${TOKEN.cyan})`
                    : "rgba(56,139,253,0.25)",
                    borderRadius: "4px 4px 2px 2px", minHeight: 4,
                    boxShadow: i === perfData.length - 1 ? `0 0 12px ${TOKEN.blue}66` : "none" }}
                />
                <span style={{ fontSize: 9, color: TOKEN.textMuted }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.green, fontFamily: "'Syne', sans-serif" }}>80%</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Hoje</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>68%</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Média</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.cyan, fontFamily: "'Syne', sans-serif" }}>+12%</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Evolução</div>
            </div>
          </div>
        </GlassCard>

        {/* Upcoming reviews */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📅 Próximas Revisões</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {upcomingReviews.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                whileHover={{ x: 2 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                  borderRadius: 10, background: r.urgent ? "rgba(249,115,22,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  background: r.urgent ? "rgba(249,115,22,0.15)" : "rgba(56,139,253,0.1)", fontSize: 16 }}>
                  {r.urgent ? "🔴" : "📘"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: TOKEN.textPrimary }}>{r.topic}</div>
                  <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{r.questions} questões</div>
                </div>
                <Badge color={r.urgent ? "orange" : "blue"}>{r.due}</Badge>
              </motion.div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${TOKEN.blue}44` }} style={{
            marginTop: 14, width: "100%", padding: "10px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
            color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            ▶ Iniciar revisão de hoje
          </motion.button>
        </GlassCard>

        {/* Calendar + streak */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>Maio 2025</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 14 }}>Calendário de estudos</div>
          <MiniCalendar />
          <div style={{ marginTop: 16, padding: "10px 0", borderTop: `1px solid ${TOKEN.border}`, display: "flex", justifyContent: "center" }}>
            <StreakWidget days={12} />
          </div>
        </GlassCard>
      </div>

      {/* Row 4 — Suggested exam + Achievements */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Suggested exam */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🎯 Prova Sugerida para Hoje</div>
            <Badge color="blue">10 questões</Badge>
          </div>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(56,139,253,0.06)", border: `1px solid rgba(56,139,253,0.15)` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TOKEN.textPrimary, marginBottom: 4 }}>Balanço Patrimonial</div>
            <div style={{ fontSize: 12, color: TOKEN.textMuted, marginBottom: 12 }}>Tema: Obr. divulgação e publicação (CPC 26)</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 11, color: TOKEN.textMuted }}>Nível:</span>
                <Badge color="orange">Médio</Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 11, color: TOKEN.textMuted }}>⏱</span>
                <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>~15 min</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 24px ${TOKEN.blue}55` }}
              style={{ width: "100%", padding: "11px", borderRadius: 10, border: "none",
                background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
                color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {Icon.play} Iniciar Prova
            </motion.button>
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>🏅 Conquistas Recentes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentAchievements.map((a, i) => (
              <motion.div key={i} initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                  borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ fontSize: 24, filter: "drop-shadow(0 0 8px rgba(255,200,0,0.4))" }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{a.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", color: TOKEN.orange }}>{Icon.star}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: "rgba(168,85,247,0.08)", border: `1px solid rgba(168,85,247,0.15)` }}>
            <XPBar />
            <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 8, textAlign: "center" }}>
              660 XP para o próximo nível
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SUBJECTS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const SubjectsPage = () => {
  const subjects = [
    { name: "Contabilidade Geral", icon: "📒", pct: 68, topics: 12, done: 8, color: TOKEN.blue, level: "Intermediário" },
    { name: "Contabilidade Societária", icon: "🏦", pct: 45, topics: 9, done: 4, color: TOKEN.cyan, level: "Avançado" },
    { name: "Contabilidade de Custos", icon: "💹", pct: 20, topics: 8, done: 2, color: TOKEN.purple, level: "Iniciante" },
    { name: "Análise de Balanços", icon: "📊", pct: 55, topics: 7, done: 4, color: TOKEN.green, level: "Intermediário" },
    { name: "Auditoria", icon: "🔎", pct: 30, topics: 10, done: 3, color: TOKEN.orange, level: "Iniciante" },
    { name: "Direito Tributário", icon: "⚖️", pct: 10, topics: 6, done: 1, color: TOKEN.red, level: "Iniciante" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {subjects.map((s, i) => (
          <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
            <GlassCard style={{ padding: 22, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{s.done}/{s.topics} temas concluídos</div>
                  </div>
                </div>
                <Badge color={s.pct > 60 ? "green" : s.pct > 30 ? "orange" : "purple"}>{s.level}</Badge>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: TOKEN.textMuted }}>Progresso</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                </div>
                <ProgressBar value={s.pct} color={s.color} height={6} />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} style={{ width: "100%", padding: "9px", borderRadius: 8, border: `1px solid ${s.color}44`,
                background: `${s.color}11`, color: s.color, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                Continuar estudando →
              </motion.button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// EXAMS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ExamsPage = () => {
  const [activeQ, setActiveQ] = useState(null);
  const [answered, setAnswered] = useState({});

  const question = {
    text: "A Demonstração do Resultado do Exercício (DRE) evidencia:",
    options: [
      { id: "A", text: "A posição financeira da empresa em determinada data" },
      { id: "B", text: "O desempenho econômico da entidade em um período" },
      { id: "C", text: "As mutações do patrimônio líquido" },
      { id: "D", text: "Os fluxos de caixa da empresa" },
    ],
    correct: "B",
    explanation: "A DRE evidencia o desempenho econômico da entidade em um determinado período, apresentando receitas, custos, despesas e o resultado (lucro ou prejuízo).",
  };

  const exams = [
    { title: "Balanço Patrimonial", subject: "Cont. Geral", questions: 10, time: "15 min", level: "Médio", color: TOKEN.blue },
    { title: "DRE e CPC 26", subject: "Cont. Societária", questions: 15, time: "20 min", level: "Difícil", color: TOKEN.cyan },
    { title: "Custeio por Absorção", subject: "Cont. de Custos", questions: 8, time: "12 min", level: "Fácil", color: TOKEN.purple },
  ];

  const handleAnswer = (id) => {
    if (!answered.q1) setAnswered({ ...answered, q1: id });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
      {/* Left - exam list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 14 }}>⚡ Simulados Disponíveis</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exams.map((e, i) => (
              <motion.div key={i} whileHover={{ x: 3 }} style={{ padding: "14px 16px", borderRadius: 12,
                background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary }}>{e.title}</div>
                  <Badge color={e.level === "Difícil" ? "orange" : e.level === "Médio" ? "cyan" : "green"}>{e.level}</Badge>
                </div>
                <div style={{ fontSize: 11, color: TOKEN.textMuted, marginBottom: 10 }}>{e.subject}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>📝 {e.questions} questões</span>
                    <span style={{ fontSize: 11, color: TOKEN.textSecondary }}>⏱ {e.time}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 12px ${e.color}55` }} style={{ padding: "5px 14px", borderRadius: 7, border: "none",
                    background: `linear-gradient(135deg, ${e.color}, ${e.color}aa)`, color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                    Iniciar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
        {/* Upload */}
        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>📤 Upload de Material</div>
          <motion.div whileHover={{ borderColor: TOKEN.blue }}
            style={{ border: `2px dashed ${TOKEN.border}`, borderRadius: 12, padding: "24px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>☁️</div>
            <div style={{ fontSize: 13, color: TOKEN.textSecondary, fontWeight: 500, marginBottom: 4 }}>Arraste seus PDFs aqui</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted }}>PDF, DOCX, PPTX • Máx 50MB</div>
            <motion.button whileHover={{ scale: 1.03 }} style={{ marginTop: 12, padding: "8px 20px", borderRadius: 8, border: `1px solid ${TOKEN.border}`,
              background: "rgba(56,139,253,0.1)", color: TOKEN.blue, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              Escolher arquivo
            </motion.button>
          </motion.div>
        </GlassCard>
      </div>

      {/* Right - live question */}
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>Prova: DRE</div>
            <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Questão 4 de 10</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.orange }}>⏱ 08:32</div>
            <Badge color="orange">Médio</Badge>
          </div>
        </div>
        <ProgressBar value={40} color={TOKEN.blue} height={4} />
        <div style={{ marginTop: 20, marginBottom: 20, padding: "16px", borderRadius: 12, background: "rgba(56,139,253,0.06)", border: `1px solid rgba(56,139,253,0.12)` }}>
          <div style={{ fontSize: 11, color: TOKEN.blue, fontWeight: 600, marginBottom: 8, letterSpacing: "0.04em" }}>ENUNCIADO</div>
          <div style={{ fontSize: 14, color: TOKEN.textPrimary, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{question.text}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt) => {
            const ans = answered.q1;
            const isSelected = ans === opt.id;
            const isCorrect = opt.id === question.correct;
            const showResult = !!ans;
            let bg = "rgba(255,255,255,0.025)", border = TOKEN.border, color = TOKEN.textSecondary;
            if (showResult && isCorrect) { bg = "rgba(34,197,94,0.12)"; border = "rgba(34,197,94,0.4)"; color = TOKEN.green; }
            else if (showResult && isSelected && !isCorrect) { bg = "rgba(239,68,68,0.12)"; border = "rgba(239,68,68,0.4)"; color = TOKEN.red; }
            else if (isSelected) { bg = "rgba(56,139,253,0.15)"; border = TOKEN.blue; color = TOKEN.blue; }
            return (
              <motion.button key={opt.id} onClick={() => handleAnswer(opt.id)} whileHover={!ans ? { x: 3 } : {}}
                style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${border}`, background: bg,
                  color, cursor: ans ? "default" : "pointer", fontSize: 13, textAlign: "left", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 12, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, border: `1px solid currentColor`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{opt.id}</span>
                <span>{opt.text}</span>
                {showResult && isCorrect && <span style={{ marginLeft: "auto" }}>✅</span>}
                {showResult && isSelected && !isCorrect && <span style={{ marginLeft: "auto" }}>❌</span>}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>
          {answered.q1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ marginTop: 14, padding: "14px 16px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: TOKEN.green, marginBottom: 6 }}>✅ Correto! +10 XP</div>
              <div style={{ fontSize: 12, color: TOKEN.textSecondary, lineHeight: 1.6 }}>{question.explanation}</div>
            </motion.div>
          )}
        </AnimatePresence>
        {answered.q1 && (
          <motion.button whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${TOKEN.blue}44` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ marginTop: 14, width: "100%", padding: "12px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${TOKEN.blue}, ${TOKEN.cyan})`,
              color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            Próxima questão →
          </motion.button>
        )}
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PerformancePage = () => {
  const weekData = [55, 62, 58, 70, 65, 72, 80];
  const monthData = [50, 52, 55, 58, 60, 62, 65, 63, 68, 70, 72, 71, 74, 76, 75, 78, 80, 78, 82, 80, 83, 81, 84, 82, 85, 83, 86, 84, 87, 88];

  const metrics = [
    { label: "Total de questões", value: "847", delta: "+124 esta semana", icon: "📝", color: TOKEN.blue },
    { label: "Taxa de acerto", value: "80%", delta: "+8% vs. mês anterior", icon: "🎯", color: TOKEN.green },
    { label: "Tempo médio/questão", value: "1m 42s", delta: "-12s vs. semana", icon: "⚡", color: TOKEN.cyan },
    { label: "Simulados completos", value: "23", delta: "3 esta semana", icon: "🏆", color: TOKEN.purple },
  ];

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
        {metrics.map((m, i) => (
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
        {/* Weekly trend */}
        <GlassCard style={{ padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>📈 Evolução Semanal</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 100 }}>
            {weekData.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 9, color: TOKEN.textMuted }}>{v}%</div>
                <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }}
                  transition={{ delay: i * 0.06, duration: 0.7 }}
                  style={{ width: "100%", background: `linear-gradient(180deg, ${TOKEN.blue}, ${TOKEN.cyan}44)`,
                    borderRadius: "4px 4px 2px 2px", minHeight: 4, opacity: 0.5 + (i / weekData.length) * 0.5 }} />
                <span style={{ fontSize: 9, color: TOKEN.textMuted }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Subject breakdown */}
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

      {/* Heatmap-style weekly hours */}
      <GlassCard style={{ padding: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>⏱ Horas de Estudo — Semana Atual</div>
        <div style={{ display: "flex", gap: 10 }}>
          {weekHours.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ height: 80, borderRadius: 10, display: "flex", alignItems: "flex-end", overflow: "hidden",
                background: "rgba(255,255,255,0.03)", position: "relative" }}>
                <motion.div initial={{ height: 0 }} animate={{ height: `${(h / 4) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  style={{ width: "100%", background: h > 0 ? `linear-gradient(180deg, ${TOKEN.blue}, ${TOKEN.cyan}66)` : "transparent",
                    boxShadow: h > 0 ? `0 0 12px ${TOKEN.blue}44` : "none" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: h > 0 ? TOKEN.blue : TOKEN.textMuted }}>{h > 0 ? `${h}h` : "—"}</div>
                <div style={{ fontSize: 10, color: TOKEN.textMuted }}>{weekDays[i]}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// GOALS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const GoalsPage = () => {
  const goals = [
    { title: "Completar Contabilidade Geral", progress: 68, target: 100, deadline: "30 Jun", color: TOKEN.blue, icon: "📒" },
    { title: "100 questões esta semana", progress: 67, target: 100, deadline: "Dom 29", color: TOKEN.cyan, icon: "⚡" },
    { title: "90% de acerto em simulados", progress: 89, target: 90, deadline: "Contínuo", color: TOKEN.green, icon: "🎯" },
    { title: "Streak de 30 dias", progress: 40, target: 100, deadline: "13 Jun", color: TOKEN.orange, icon: "🔥" },
    { title: "Finalizar revisões do mês", progress: 55, target: 100, deadline: "31 Mai", color: TOKEN.purple, icon: "📅" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard style={{ padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>🎯 Minhas Metas</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {goals.map((g, i) => (
            <motion.div key={i} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
              style={{ padding: "16px 18px", borderRadius: 12, background: "rgba(255,255,255,0.025)", border: `1px solid ${TOKEN.border}` }}>
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
              {g.progress >= 90 && <div style={{ marginTop: 6, fontSize: 11, color: TOKEN.green, fontWeight: 600 }}>🎉 Quase lá!</div>}
            </motion.div>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.02 }} style={{ marginTop: 16, width: "100%", padding: "11px", borderRadius: 10,
          border: `1px solid ${TOKEN.border}`, background: "rgba(56,139,253,0.08)", color: TOKEN.blue,
          cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          + Adicionar nova meta
        </motion.button>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PLAN PAGE
// ══════════════════════════════════════════════════════════════════════════════
const PlanPage = () => {
  const plan = [
    { time: "08:00 - 09:30", subject: "Contabilidade Geral", topic: "Obr. divulgação e publicação", type: "Estudo", color: TOKEN.blue, done: true },
    { time: "10:00 - 10:30", subject: "Revisão", topic: "Balanço Patrimonial", type: "Revisão", color: TOKEN.orange, done: true },
    { time: "14:00 - 15:30", subject: "Cont. Societária", topic: "DRE (CPC 26)", type: "Estudo", color: TOKEN.cyan, done: false },
    { time: "16:00 - 16:30", subject: "Simulado", topic: "10 questões - Nível médio", type: "Prova", color: TOKEN.purple, done: false },
    { time: "19:00 - 20:00", subject: "Revisão Espaçada", topic: "Conceitos-chave do dia", type: "Revisão", color: TOKEN.green, done: false },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18 }}>
      <GlassCard style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>📅 Plano de Hoje — 26/05</div>
          <Badge color="cyan">IA Otimizado</Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {plan.map((p, i) => (
            <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
              style={{ display: "flex", gap: 14, padding: "14px 16px", borderRadius: 12,
                background: p.done ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${p.done ? "rgba(34,197,94,0.2)" : TOKEN.border}`,
                opacity: p.done ? 0.7 : 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 50 }}>
                <div style={{ width: 24, height: 24, borderRadius: 99, border: `2px solid ${p.done ? TOKEN.green : p.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center", background: p.done ? "rgba(34,197,94,0.15)" : "transparent",
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
          <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>📊 Meta de Hoje</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: TOKEN.textMuted }}>2 temas • 15 questões</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: TOKEN.blue }}>60%</span>
          </div>
          <ProgressBar value={60} color={TOKEN.blue} height={8} />
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.green }}>9</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Questões feitas</div>
            </div>
            <div style={{ flex: 1, padding: "10px", borderRadius: 10, background: "rgba(56,139,253,0.08)", border: "1px solid rgba(56,139,253,0.2)", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: TOKEN.blue }}>6</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>Restantes</div>
            </div>
          </div>
        </GlassCard>
        <GlassCard style={{ padding: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>🗓 Calendário</div>
          <MiniCalendar />
        </GlassCard>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REVIEWS PAGE
// ══════════════════════════════════════════════════════════════════════════════
const ReviewsPage = () => {
  const reviews = [
    { topic: "Balanço Patrimonial", subject: "Cont. Geral", lastSeen: "3 dias", dueScore: 95, color: TOKEN.orange, urgent: true },
    { topic: "DRE e Resultado", subject: "Cont. Societária", lastSeen: "5 dias", dueScore: 88, color: TOKEN.blue, urgent: false },
    { topic: "Custeio por Absorção", subject: "Cont. de Custos", lastSeen: "7 dias", dueScore: 82, color: TOKEN.purple, urgent: false },
    { topic: "Análise Horizontal", subject: "Análise de Balanços", lastSeen: "2 dias", dueScore: 91, color: TOKEN.cyan, urgent: true },
    { topic: "Fluxo de Caixa DFC", subject: "Cont. Geral", lastSeen: "10 dias", dueScore: 76, color: TOKEN.green, urgent: false },
  ];
  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: TOKEN.textPrimary, fontFamily: "'Syne', sans-serif" }}>🔄 Revisões Inteligentes</div>
          <div style={{ fontSize: 11, color: TOKEN.textMuted, marginTop: 2 }}>Algoritmo de repetição espaçada (SM-2)</div>
        </div>
        <Badge color="cyan">5 pendentes</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {reviews.map((r, i) => (
          <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}
            whileHover={{ x: 3 }} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 18px", borderRadius: 12,
              background: r.urgent ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.025)",
              border: `1px solid ${r.urgent ? "rgba(249,115,22,0.2)" : TOKEN.border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${r.color}22`, border: `1px solid ${r.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {r.urgent ? "🔴" : "📘"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 2 }}>{r.topic}</div>
              <div style={{ fontSize: 11, color: TOKEN.textMuted }}>{r.subject} • Visto há {r.lastSeen}</div>
            </div>
            <div style={{ textAlign: "right", marginRight: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.dueScore}</div>
              <div style={{ fontSize: 10, color: TOKEN.textMuted }}>prioridade</div>
            </div>
            <motion.button whileHover={{ scale: 1.04, boxShadow: `0 0 14px ${r.color}55` }} style={{ padding: "8px 16px", borderRadius: 8, border: "none",
              background: `linear-gradient(135deg, ${r.color}, ${r.color}aa)`, color: "#fff",
              cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              Revisar
            </motion.button>
          </motion.div>
        ))}
      </div>
    </GlassCard>
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

const PageContent = ({ page }) => {
  const components = {
    home: <HomeDashboard />,
    subjects: <SubjectsPage />,
    plan: <PlanPage />,
    exams: <ExamsPage />,
    performance: <PerformancePage />,
    reviews: <ReviewsPage />,
    goals: <GoalsPage />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
        {components[page] || <HomeDashboard />}
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

      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[{ l: "5%", t: "15%", c: TOKEN.blue, s: 600, o: 0.03 }, { l: "70%", t: "50%", c: TOKEN.cyan, s: 500, o: 0.025 }, { l: "40%", t: "80%", c: TOKEN.purple, s: 400, o: 0.02 }].map((b, i) => (
          <motion.div key={i} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10 + i * 3, repeat: Infinity }}
            style={{ position: "absolute", left: b.l, top: b.t, width: b.s, height: b.s, borderRadius: "50%",
              background: b.c, filter: "blur(120px)", opacity: b.o }} />
        ))}
      </div>

      <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Sidebar active={activePage} onNav={setActivePage} />
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", minHeight: "100vh" }}>
          <Topbar title={meta.title} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 24, marginTop: -20, fontFamily: "'DM Sans', sans-serif" }}>
            {meta.subtitle}
          </motion.p>
          <PageContent page={activePage} />
        </main>
      </div>
    </>
  );
}
