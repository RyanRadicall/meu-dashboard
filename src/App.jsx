import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: "#050A14",
  glass: "rgba(15,30,60,0.5)",
  border: "rgba(56,139,253,0.15)",
  borderHover: "rgba(56,139,253,0.4)",
  blue: "#388BFD", cyan: "#39D0D8", purple: "#A855F7",
  green: "#22C55E", orange: "#F97316", red: "#EF4444",
  text: "#EFF6FF", textSec: "#94A3B8", textMuted: "#475569",
};

const COLORS = ["blue","cyan","purple","green","orange","red"];
const COLOR_MAP = {
  blue: T.blue, cyan: T.cyan, purple: T.purple,
  green: T.green, orange: T.orange, red: T.red,
};
const ICONS_LIST = ["📒","🏦","💹","📊","🔎","⚖️","📐","🧮","📝","🎯","📚","💡","🧠","⭐","🔬","🗂️"];

// ── localStorage helpers ──────────────────────────────────────────────────────
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

// ── Tiny components ───────────────────────────────────────────────────────────
const GlassCard = ({ children, style = {}, glow, onClick }) => (
  <motion.div onClick={onClick} whileHover={onClick ? { scale: 1.005 } : {}}
    style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: 16,
      backdropFilter: "blur(20px)", overflow: "hidden",
      boxShadow: glow ? "0 0 40px rgba(56,139,253,0.08),0 1px 0 rgba(255,255,255,0.05) inset" : "0 1px 0 rgba(255,255,255,0.04) inset",
      ...style }}>
    {children}
  </motion.div>
);

const Badge = ({ children, color = "blue" }) => {
  const map = {
    blue:   { bg:"rgba(56,139,253,0.15)",  text:T.blue,   border:"rgba(56,139,253,0.3)" },
    cyan:   { bg:"rgba(57,208,216,0.12)",  text:T.cyan,   border:"rgba(57,208,216,0.3)" },
    green:  { bg:"rgba(34,197,94,0.12)",   text:T.green,  border:"rgba(34,197,94,0.3)"  },
    orange: { bg:"rgba(249,115,22,0.12)",  text:T.orange, border:"rgba(249,115,22,0.3)" },
    purple: { bg:"rgba(168,85,247,0.12)",  text:T.purple, border:"rgba(168,85,247,0.3)" },
    red:    { bg:"rgba(239,68,68,0.12)",   text:T.red,    border:"rgba(239,68,68,0.3)"  },
  };
  const c = map[color] || map.blue;
  return <span style={{ background:c.bg, color:c.text, border:`1px solid ${c.border}`,
    borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>{children}</span>;
};

const Prog = ({ value=0, color=T.blue, h=4 }) => (
  <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:99, overflow:"hidden", height:h }}>
    <motion.div initial={{ width:0 }} animate={{ width:`${Math.min(100,Math.max(0,value))}%` }}
      transition={{ duration:0.8, ease:[0.25,0.46,0.45,0.94] }}
      style={{ height:"100%", background:`linear-gradient(90deg,${color},${color}cc)`, borderRadius:99, boxShadow:`0 0 8px ${color}66` }} />
  </div>
);

// ── Modal reutilizável ────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
    style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
    onClick={e => e.target===e.currentTarget && onClose()}>
    <motion.div initial={{ scale:0.92, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.92, y:20 }}
      style={{ background:"rgba(8,16,36,0.98)", border:`1px solid ${T.border}`, borderRadius:20,
        backdropFilter:"blur(40px)", padding:28, width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div style={{ fontSize:16, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>{title}</div>
        <button onClick={onClose} style={{ background:"transparent", border:`1px solid ${T.border}`, color:T.textMuted, cursor:"pointer", borderRadius:8, padding:"4px 10px", fontSize:13 }}>✕</button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

// ── Confirm delete dialog ─────────────────────────────────────────────────────
const ConfirmDelete = ({ label, onConfirm, onCancel }) => (
  <Modal title="Confirmar exclusão" onClose={onCancel}>
    <p style={{ fontSize:13, color:T.textSec, marginBottom:20, lineHeight:1.6 }}>
      Tem certeza que deseja excluir <strong style={{ color:T.text }}>{label}</strong>? Esta ação não pode ser desfeita.
    </p>
    <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
      <Btn ghost onClick={onCancel}>Cancelar</Btn>
      <Btn color={T.red} onClick={onConfirm}>Excluir</Btn>
    </div>
  </Modal>
);

// ── Botão reutilizável ────────────────────────────────────────────────────────
const Btn = ({ children, onClick, color, ghost, full, small, disabled }) => (
  <motion.button onClick={onClick} disabled={disabled} whileHover={!disabled ? { scale:1.02 } : {}}
    style={{ padding: small ? "6px 14px" : "9px 18px", borderRadius:9, border: ghost ? `1px solid ${T.border}` : "none",
      background: ghost ? "transparent" : color ? `linear-gradient(135deg,${color},${color}cc)` : `linear-gradient(135deg,${T.blue},${T.cyan})`,
      color: ghost ? T.textSec : "#fff", cursor: disabled ? "default" : "pointer",
      fontSize: small ? 12 : 13, fontWeight:600, fontFamily:"'DM Sans',sans-serif",
      width: full ? "100%" : "auto", opacity: disabled ? 0.5 : 1 }}>
    {children}
  </motion.button>
);

// ── Input / Select reutilizável ────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div style={{ marginBottom:14 }}>
    {label && <div style={{ fontSize:11, color:T.textMuted, marginBottom:5, fontWeight:600, letterSpacing:"0.05em" }}>{label.toUpperCase()}</div>}
    {children}
  </div>
);
const Input = ({ value, onChange, placeholder, type="text", onKeyDown }) => (
  <input type={type} value={value || ""} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown}
    style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:`1px solid ${T.border}`,
      background:"rgba(255,255,255,0.04)", color:T.text, fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }} />
);
const Select = ({ value, onChange, children }) => (
  <select value={value || ""} onChange={onChange}
    style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:`1px solid ${T.border}`,
      background:"rgba(8,16,36,0.9)", color:T.text, fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
    {children}
  </select>
);

// ── ColorPicker ───────────────────────────────────────────────────────────────
const ColorPick = ({ value, onChange }) => (
  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
    {COLORS.map(c => (
      <button key={c} onClick={() => onChange(c)}
        style={{ width:26, height:26, borderRadius:7, border: value===c ? `2px solid #fff` : "2px solid transparent",
          background: COLOR_MAP[c], cursor:"pointer", transition:"transform 0.15s",
          transform: value===c ? "scale(1.2)" : "scale(1)" }} />
    ))}
  </div>
);

// ── IconPicker ────────────────────────────────────────────────────────────────
const IconPick = ({ value, onChange }) => (
  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
    {ICONS_LIST.map(ic => (
      <button key={ic} onClick={() => onChange(ic)}
        style={{ width:34, height:34, borderRadius:8, border: value===ic ? `2px solid ${T.blue}` : `1px solid ${T.border}`,
          background: value===ic ? "rgba(56,139,253,0.15)" : "rgba(255,255,255,0.04)",
          cursor:"pointer", fontSize:16 }}>{ic}</button>
    ))}
  </div>
);

// ── Empty state ───────────────────────────────────────────────────────────────
const Empty = ({ text, sub }) => (
  <div style={{ textAlign:"center", padding:"30px 0" }}>
    <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
    <div style={{ fontSize:13, color:T.textSec, marginBottom:4 }}>{text}</div>
    {sub && <div style={{ fontSize:11, color:T.textMuted }}>{sub}</div>}
  </div>
);

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV = [
  { id:"home",     label:"Dashboard",       emoji:"🏠" },
  { id:"subjects", label:"Disciplinas",     emoji:"📚" },
  { id:"plan",     label:"Plano de Estudo", emoji:"📅" },
  { id:"exams",    label:"Simulados",       emoji:"⚡" },
  { id:"reviews",  label:"Revisões",        emoji:"🔄" },
  { id:"goals",    label:"Metas",           emoji:"🎯" },
  { id:"performance", label:"Desempenho",   emoji:"📊" },
];

const Sidebar = ({ active, onNav, userProgress }) => (
  <motion.aside initial={{ x:-40, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ duration:0.5 }}
    style={{ width:220, flexShrink:0, height:"100vh", position:"sticky", top:0,
      display:"flex", flexDirection:"column", padding:"24px 0",
      background:"linear-gradient(180deg,rgba(8,16,36,0.98),rgba(5,10,20,0.98))",
      borderRight:`1px solid ${T.border}`, backdropFilter:"blur(40px)" }}>

    {/* Logo */}
    <div style={{ padding:"0 20px 24px", borderBottom:`1px solid ${T.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${T.blue},${T.cyan})`,
          display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 20px ${T.blue}55` }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width:18, height:18 }}>
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", lineHeight:1.1 }}>MeuEstudo</div>
          <div style={{ fontSize:10, color:T.cyan, fontWeight:600, letterSpacing:"0.08em" }}>PRO</div>
        </div>
      </div>
    </div>

    {/* Nav */}
    <nav style={{ flex:1, padding:"16px 12px", display:"flex", flexDirection:"column", gap:2 }}>
      {NAV.map((item, i) => {
        const isActive = active === item.id;
        return (
          <motion.button key={item.id} onClick={() => onNav(item.id)}
            initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay: i*0.04+0.1 }}
            whileHover={{ x:2 }}
            style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10,
              border:"none", cursor:"pointer", background: isActive ? "rgba(56,139,253,0.15)" : "transparent",
              color: isActive ? T.blue : T.textMuted, fontWeight: isActive ? 600 : 400, fontSize:13,
              position:"relative", boxShadow: isActive ? "inset 0 0 0 1px rgba(56,139,253,0.2)" : "none" }}>
            {isActive && <motion.div layoutId="nav-active" style={{ position:"absolute", left:0, top:0, bottom:0,
              width:2.5, background:T.blue, borderRadius:99, boxShadow:`0 0 12px ${T.blue}` }} />}
            <span style={{ fontSize:15 }}>{item.emoji}</span>
            <span style={{ fontFamily:"'DM Sans',sans-serif" }}>{item.label}</span>
          </motion.button>
        );
      })}
    </nav>

    {/* User */}
    <div style={{ padding:"16px 12px", borderTop:`1px solid ${T.border}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:10, background:"rgba(255,255,255,0.03)" }}>
        <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${T.purple},#7c3aed)`,
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>👤</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, fontWeight:600, color:T.text }}>{userProgress.name || "Estudante"}</div>
          <div style={{ fontSize:10, color:T.textMuted }}>Nível {userProgress.level || 1} • {userProgress.xp || 0} XP</div>
        </div>
      </div>
    </div>
  </motion.aside>
);

// ── Topbar ────────────────────────────────────────────────────────────────────
const Topbar = ({ title, subtitle, streak }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
    <div>
      <motion.h1 initial={{ y:-10, opacity:0 }} animate={{ y:0, opacity:1 }}
        style={{ fontSize:22, fontWeight:800, color:T.text, letterSpacing:"-0.04em", margin:0, fontFamily:"'Syne',sans-serif" }}>
        {title}
      </motion.h1>
      <motion.p initial={{ y:-6, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.05 }}
        style={{ fontSize:12, color:T.textMuted, margin:"3px 0 0" }}>{subtitle}</motion.p>
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
        <motion.div animate={{ scale:[1,1.08,1] }} transition={{ repeat:Infinity, duration:2 }}
          style={{ fontSize:20, filter:"drop-shadow(0 0 10px #F97316)" }}>🔥</motion.div>
        <div style={{ fontSize:11, fontWeight:800, color:T.orange }}>{streak || 0} dias</div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// DASHBOARD HOME
// ══════════════════════════════════════════════════════════════════════════════
const HomeDashboard = ({ userProgress, subjects, goals, planTasks, reviews }) => {
  const totalSubjects = subjects?.length || 0;
  const avgProgress = totalSubjects > 0
    ? Math.round(subjects.reduce((s, x) => s + (x.progress || 0), 0) / totalSubjects) : 0;
  const completedTasks = planTasks?.filter(t => t.done).length || 0;
  const totalTasks = planTasks?.length || 0;
  const pendingReviews = reviews?.filter(r => !r.done).length || 0;
  const completedGoals = goals?.filter(g => (g.progress || 0) >= 100).length || 0;
  const totalGoals = goals?.length || 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          { label:"PROGRESSO GERAL", value:`${avgProgress}%`, sub:`${totalSubjects} disciplinas`, color:T.blue, icon:"📈" },
          { label:"TAREFAS HOJE",    value:`${completedTasks}/${totalTasks || 0}`, sub:"concluídas", color:T.cyan, icon:"✅" },
          { label:"STREAK",          value:`${userProgress?.streak || 0}`, sub:"dias seguidos", color:T.orange, icon:"🔥" },
          { label:"REVISÕES",        value:String(pendingReviews), sub:"pendentes", color:T.purple, icon:"🔄" },
        ].map((k,i) => (
          <motion.div key={i} initial={{ y:16, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:i*0.06 }}>
            <GlassCard glow style={{ padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ fontSize:10, color:T.textMuted, fontWeight:600, letterSpacing:"0.05em" }}>{k.label}</div>
                <span style={{ fontSize:18 }}>{k.icon}</span>
              </div>
              <div style={{ fontSize:28, fontWeight:800, color:T.text, fontFamily:"'Syne',sans-serif", letterSpacing:"-0.04em", lineHeight:1 }}>{k.value}</div>
              <div style={{ fontSize:11, color:k.color, marginTop:5, fontWeight:500 }}>{k.sub}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Disciplinas resumo */}
      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:14 }}>
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>📚 Disciplinas</div>
          {subjects?.length === 0
            ? <Empty text="Nenhuma disciplina cadastrada ainda." sub="Vá em Disciplinas para adicionar." />
            : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {subjects?.slice(0,5).map(s => (
                  <div key={s.id}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:12, color:T.textSec }}>{s.icon} {s.name}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:COLOR_MAP[s.color] || T.blue }}>{s.progress || 0}%</span>
                    </div>
                    <Prog value={s.progress || 0} color={COLOR_MAP[s.color] || T.blue} h={4} />
                  </div>
                ))}
              </div>
          }
        </GlassCard>

        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>🎯 Metas</div>
          {goals?.length === 0
            ? <Empty text="Nenhuma meta ainda." sub="Vá em Metas para criar." />
            : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {goals?.slice(0,4).map(g => (
                  <div key={g.id}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:12, color:T.textSec }}>{g.icon} {g.title}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:COLOR_MAP[g.color] || T.blue }}>{g.progress || 0}%</span>
                    </div>
                    <Prog value={g.progress || 0} color={COLOR_MAP[g.color] || T.blue} h={4} />
                  </div>
                ))}
              </div>
          }
        </GlassCard>
      </div>

      {/* Resumo XP */}
      <GlassCard style={{ padding:22 }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg,${T.purple},${T.blue})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#fff",
            fontFamily:"'Syne',sans-serif", boxShadow:`0 0 20px ${T.purple}44`, flexShrink:0 }}>
            Lv{userProgress?.level || 1}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:13, fontWeight:600, color:T.text }}>Experiência</span>
              <span style={{ fontSize:12, color:T.textMuted }}>{(userProgress?.xp || 0)} / {(userProgress?.maxXp || 500)} XP</span>
            </div>
            <Prog value={((userProgress?.xp || 0) / (userProgress?.maxXp || 500)) * 100} color={T.purple} h={8} />
            <div style={{ fontSize:11, color:T.textMuted, marginTop:6 }}>
              Faltam {(userProgress?.maxXp || 500) - (userProgress?.xp || 0)} XP para o nível {(userProgress?.level || 1) + 1}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// SUBJECTS PAGE — CRUD completo
// ══════════════════════════════════════════════════════════════════════════════
const SubjectsPage = ({ subjects, setSubjects, onXP }) => {
  const [modal, setModal] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [form, setForm] = useState({ name:"", icon:"📒", color:"blue", progress:0, notes:"" });

  const openAdd = () => { setForm({ name:"", icon:"📒", color:"blue", progress:0, notes:"" }); setModal("add"); };
  const openEdit = (s) => { setForm({ name:s.name, icon:s.icon, color:s.color, progress:s.progress, notes:s.notes||"" }); setModal({ edit:s }); };

  const save = () => {
    if (!form.name.trim()) return;
    if (modal === "add") {
      setSubjects(prev => [...(prev || []), { ...form, id:`sub_${Date.now()}`, progress: Number(form.progress) }]);
      onXP(5);
    } else {
      setSubjects(prev => (prev || []).map(s => s.id===modal.edit.id ? { ...s, ...form, progress:Number(form.progress) } : s));
    }
    setModal(null);
  };

  const del = () => {
    setSubjects(prev => (prev || []).filter(s => s.id !== delTarget.id));
    setDelTarget(null);
  };

  const addProgress = (id, delta) => {
    setSubjects(prev => (prev || []).map(s => {
      if (s.id !== id) return s;
      const p = Math.min(100, Math.max(0, (s.progress || 0) + delta));
      if (p > (s.progress || 0)) onXP(10);
      return { ...s, progress:p };
    }));
  };

  const subjectsList = subjects || [];

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div style={{ fontSize:13, color:T.textMuted }}>{subjectsList.length} disciplina{subjectsList.length !== 1 ? "s" : ""} cadastrada{subjectsList.length !== 1 ? "s" : ""}</div>
        <Btn onClick={openAdd}>+ Nova disciplina</Btn>
      </div>

      {subjectsList.length === 0
        ? <GlassCard style={{ padding:40 }}><Empty text="Nenhuma disciplina ainda." sub='Clique em "+ Nova disciplina" para começar.' /></GlassCard>
        : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
            {subjectsList.map((s,i) => {
              const col = COLOR_MAP[s.color] || T.blue;
              return (
                <motion.div key={s.id} initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:i*0.06 }}>
                  <GlassCard style={{ padding:22 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:44, height:44, borderRadius:12, background:`${col}22`, border:`1px solid ${col}44`,
                          display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{s.icon}</div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>{s.name}</div>
                          {s.notes && <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{s.notes}</div>}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => openEdit(s)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`,
                          color:T.textMuted, cursor:"pointer", borderRadius:7, padding:"4px 8px", fontSize:11 }}>✏️</button>
                        <button onClick={() => setDelTarget(s)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)",
                          color:T.red, cursor:"pointer", borderRadius:7, padding:"4px 8px", fontSize:11 }}>🗑️</button>
                      </div>
                    </div>

                    <div style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:11, color:T.textMuted }}>Progresso</span>
                        <span style={{ fontSize:14, fontWeight:700, color:col }}>{s.progress || 0}%</span>
                      </div>
                      <Prog value={s.progress || 0} color={col} h={7} />
                    </div>

                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => addProgress(s.id, -5)}
                        style={{ flex:1, padding:"7px", borderRadius:8, border:`1px solid ${T.border}`, background:"transparent",
                          color:T.textMuted, cursor:"pointer", fontSize:12 }}>− 5%</button>
                      <button onClick={() => addProgress(s.id, 5)}
                        style={{ flex:2, padding:"7px", borderRadius:8, border:`1px solid ${col}44`, background:`${col}11`,
                          color:col, cursor:"pointer", fontSize:12, fontWeight:600 }}>+ 5% progresso</button>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
      }

      <AnimatePresence>
        {modal && (
          <Modal title={modal==="add" ? "Nova Disciplina" : "Editar Disciplina"} onClose={() => setModal(null)}>
            <Field label="Nome da disciplina">
              <Input value={form.name} onChange={e => setForm(f=>({...f, name:e.target.value}))} placeholder="Ex: Contabilidade Geral" onKeyDown={e => e.key==="Enter" && save()} />
            </Field>
            <Field label="Ícone">
              <IconPick value={form.icon} onChange={ic => setForm(f=>({...f, icon:ic}))} />
            </Field>
            <Field label="Cor">
              <ColorPick value={form.color} onChange={c => setForm(f=>({...f, color:c}))} />
            </Field>
            <Field label="Progresso atual (%)">
              <Input type="number" value={form.progress} onChange={e => setForm(f=>({...f, progress:e.target.value}))} placeholder="0" />
            </Field>
            <Field label="Notas / Tópico atual (opcional)">
              <Input value={form.notes} onChange={e => setForm(f=>({...f, notes:e.target.value}))} placeholder="Ex: Balanço Patrimonial" />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={() => setModal(null)}>Cancelar</Btn>
              <Btn onClick={save} disabled={!form.name.trim()}>{modal==="add" ? "Adicionar" : "Salvar"}</Btn>
            </div>
          </Modal>
        )}
        {delTarget && <ConfirmDelete label={delTarget.name} onConfirm={del} onCancel={() => setDelTarget(null)} />}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PLAN PAGE — CRUD completo
// ══════════════════════════════════════════════════════════════════════════════
const PlanPage = ({ planTasks, setPlanTasks, subjects, onXP }) => {
  const [modal, setModal] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [form, setForm] = useState({ subject:"", topic:"", time:"", type:"Estudo", color:"blue" });

  const subjectOpts = subjects?.map(s => s.name) || [];
  const TYPES = ["Estudo","Revisão","Prova","Exercícios","Leitura"];

  const openAdd = () => { setForm({ subject:"", topic:"", time:"", type:"Estudo", color:"blue" }); setModal("add"); };
  const openEdit = (t) => { setForm({ subject:t.subject, topic:t.topic, time:t.time, type:t.type, color:t.color }); setModal({ edit:t }); };

  const save = () => {
    if (!form.subject.trim()) return;
    if (modal === "add") {
      setPlanTasks(prev => [...(prev || []), { ...form, id:`task_${Date.now()}`, done:false }]);
    } else {
      setPlanTasks(prev => (prev || []).map(t => t.id===modal.edit.id ? { ...t, ...form } : t));
    }
    setModal(null);
  };

  const toggle = (id) => {
    setPlanTasks(prev => (prev || []).map(t => {
      if (t.id !== id) return t;
      if (!t.done) onXP(15);
      return { ...t, done:!t.done };
    }));
  };

  const del = () => {
    setPlanTasks(prev => (prev || []).filter(t => t.id !== delTarget.id));
    setDelTarget(null);
  };

  const tasksList = planTasks || [];
  const done = tasksList.filter(t => t.done).length;

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:18 }}>
      <GlassCard style={{ padding:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>
            📅 Plano — {new Date().toLocaleDateString("pt-BR")}
          </div>
          <Btn small onClick={openAdd}>+ Tarefa</Btn>
        </div>

        {tasksList.length === 0
          ? <Empty text="Nenhuma tarefa no plano." sub='Clique em "+ Tarefa" para adicionar.' />
          : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {tasksList.map((p,i) => {
                const col = COLOR_MAP[p.color] || T.blue;
                return (
                  <motion.div key={p.id} initial={{ x:-10, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:i*0.05 }}
                    style={{ display:"flex", gap:14, padding:"14px 16px", borderRadius:12,
                      background: p.done ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.025)",
                      border:`1px solid ${p.done ? "rgba(34,197,94,0.2)" : T.border}`,
                      opacity: p.done ? 0.7 : 1, transition:"all 0.2s" }}>
                    <button onClick={() => toggle(p.id)}
                      style={{ width:24, height:24, borderRadius:99, border:`2px solid ${p.done ? T.green : col}`,
                        background: p.done ? "rgba(34,197,94,0.15)" : "transparent",
                        color: p.done ? T.green : col, cursor:"pointer", fontSize:12,
                        flexShrink:0, marginTop:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.done ? "✓" : ""}
                    </button>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                        <span style={{ fontSize:13, fontWeight:600, color:T.text, textDecoration:p.done ? "line-through" : "none" }}>{p.subject}</span>
                        <Badge color={p.type==="Revisão"?"orange":p.type==="Prova"?"purple":p.type==="Leitura"?"cyan":p.type==="Exercícios"?"green":"blue"}>{p.type}</Badge>
                      </div>
                      {p.topic && <div style={{ fontSize:11, color:T.textMuted }}>{p.topic}</div>}
                      {p.time && <div style={{ fontSize:10, color:col, marginTop:3 }}>⏰ {p.time}</div>}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      <button onClick={() => openEdit(p)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, color:T.textMuted, cursor:"pointer", borderRadius:6, padding:"3px 7px", fontSize:10 }}>✏️</button>
                      <button onClick={() => setDelTarget(p)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:T.red, cursor:"pointer", borderRadius:6, padding:"3px 7px", fontSize:10 }}>🗑️</button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
        }
      </GlassCard>

      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <GlassCard style={{ padding:20 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:12 }}>📊 Progresso do Dia</div>
          {tasksList.length > 0 ? (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontSize:11, color:T.textMuted }}>{done} de {tasksList.length}</span>
                <span style={{ fontSize:13, fontWeight:700, color:T.blue }}>{Math.round((done/tasksList.length)*100)}%</span>
              </div>
              <Prog value={(done/tasksList.length)*100} color={T.blue} h={8} />
              <div style={{ marginTop:12, display:"flex", gap:10 }}>
                <div style={{ flex:1, padding:10, borderRadius:10, background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:T.green }}>{done}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>Concluídas</div>
                </div>
                <div style={{ flex:1, padding:10, borderRadius:10, background:"rgba(56,139,253,0.08)", border:`1px solid rgba(56,139,253,0.2)`, textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:800, color:T.blue }}>{tasksList.length-done}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>Pendentes</div>
                </div>
              </div>
              {done===tasksList.length && done>0 && (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                  style={{ marginTop:12, padding:10, borderRadius:10, background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.3)", textAlign:"center" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:T.green }}>🎉 Plano concluído!</span>
                </motion.div>
              )}
            </>
          ) : <Empty text="Sem tarefas ainda." />}
        </GlassCard>

        <GlassCard style={{ padding:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:10 }}>📌 Por tipo</div>
          {TYPES.map(tipo => {
            const count = tasksList.filter(t=>t.type===tipo).length;
            if (count===0) return null;
            return (
              <div key={tipo} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                <span style={{ fontSize:12, color:T.textSec }}>{tipo}</span>
                <Badge color={tipo==="Revisão"?"orange":tipo==="Prova"?"purple":tipo==="Leitura"?"cyan":tipo==="Exercícios"?"green":"blue"}>{count}</Badge>
              </div>
            );
          })}
          {tasksList.length === 0 && <Empty text="Nenhuma tarefa" sub="Adicione tarefas para ver estatísticas" />}
        </GlassCard>
      </div>

      <AnimatePresence>
        {modal && (
          <Modal title={modal==="add" ? "Nova Tarefa" : "Editar Tarefa"} onClose={() => setModal(null)}>
            <Field label="Disciplina / Matéria">
              {subjectOpts.length > 0
                ? <Select value={form.subject} onChange={e => setForm(f=>({...f, subject:e.target.value}))}>
                    <option value="">Selecionar...</option>
                    {subjectOpts.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                : <Input value={form.subject} onChange={e => setForm(f=>({...f, subject:e.target.value}))} placeholder="Ex: Contabilidade" />
              }
            </Field>
            <Field label="Tópico (opcional)">
              <Input value={form.topic} onChange={e => setForm(f=>({...f, topic:e.target.value}))} placeholder="Ex: Balanço Patrimonial" />
            </Field>
            <Field label="Horário (opcional)">
              <Input value={form.time} onChange={e => setForm(f=>({...f, time:e.target.value}))} placeholder="Ex: 14:00 - 15:30" />
            </Field>
            <Field label="Tipo">
              <Select value={form.type} onChange={e => setForm(f=>({...f, type:e.target.value}))}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Cor">
              <ColorPick value={form.color} onChange={c => setForm(f=>({...f, color:c}))} />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={() => setModal(null)}>Cancelar</Btn>
              <Btn onClick={save} disabled={!form.subject.trim()}>{modal==="add" ? "Adicionar" : "Salvar"}</Btn>
            </div>
          </Modal>
        )}
        {delTarget && <ConfirmDelete label={`"${delTarget.subject}"`} onConfirm={del} onCancel={() => setDelTarget(null)} />}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// EXAMS PAGE — banco de questões editável + CRUD de simulados
// ══════════════════════════════════════════════════════════════════════════════
const ExamsPage = ({ exams, setExams, onXP }) => {
  const [activeExam, setActiveExam] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examDone, setExamDone] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [modal, setModal] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [qModal, setQModal] = useState(null);
  const [form, setForm] = useState({ title:"", subject:"", color:"blue" });
  const [qForm, setQForm] = useState({ text:"", a:"", b:"", c:"", d:"", correct:"A", explanation:"" });

  const examsList = exams || [];

  const startExam = (exam) => {
    if (!exam.questions || exam.questions.length === 0) return;
    setActiveExam(exam);
    setQIdx(0);
    setAnswers({});
    setExamDone(false);
    setShowExp(false);
  };

  const currentQ = activeExam?.questions?.[qIdx];
  const curAns = answers[qIdx];

  const handleAnswer = (opt) => {
    if (curAns) return;
    const isCorrect = opt === currentQ.correct;
    setAnswers(prev => ({ ...prev, [qIdx]:{ answer:opt, isCorrect } }));
    setShowExp(true);
    if (isCorrect) onXP(10);
  };

  const handleNext = () => {
    setShowExp(false);
    if (qIdx+1 < activeExam.questions.length) setQIdx(qIdx+1);
    else { setExamDone(true); onXP(50); }
  };

  const getScore = () => {
    const total = Object.values(answers).length;
    const correct = Object.values(answers).filter(a=>a.isCorrect).length;
    return { total, correct, pct: total>0 ? Math.round((correct/total)*100) : 0 };
  };

  const saveExam = () => {
    if (!form.title.trim()) return;
    if (modal==="add") setExams(prev => [...(prev || []), { ...form, id:`exam_${Date.now()}`, questions:[] }]);
    else setExams(prev => (prev || []).map(e => e.id===modal.edit.id ? { ...e, ...form } : e));
    setModal(null);
  };

  const delExam = () => {
    setExams(prev => (prev || []).filter(e => e.id!==delTarget.id));
    setDelTarget(null);
  };

  const saveQuestion = (examId) => {
    if (!qForm.text.trim()||!qForm.a.trim()||!qForm.b.trim()) return;
    const newQ = { text:qForm.text, correct:qForm.correct, explanation:qForm.explanation,
      options:[
        { id:"A", text:qForm.a }, { id:"B", text:qForm.b },
        { id:"C", text:qForm.c }, { id:"D", text:qForm.d },
      ].filter(o=>o.text.trim()) };
    setExams(prev => (prev || []).map(e => e.id===examId ? { ...e, questions:[...(e.questions || []), newQ] } : e));
    setQForm({ text:"", a:"", b:"", c:"", d:"", correct:"A", explanation:"" });
    setQModal(null);
  };

  const delQuestion = (examId, qIndex) => {
    setExams(prev => (prev || []).map(e => e.id===examId ? { ...e, questions:e.questions.filter((_,i)=>i!==qIndex) } : e));
  };

  // Tela: questão ativa
  if (activeExam && !examDone && currentQ) {
    const score = getScore();
    const col = COLOR_MAP[activeExam.color] || T.blue;
    return (
      <GlassCard style={{ padding:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>{activeExam.title}</div>
            <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>Questão {qIdx+1} de {activeExam.questions.length}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:13, fontWeight:700, color:T.green }}>✅ {score.correct}</span>
            <span style={{ fontSize:13, fontWeight:700, color:T.red }}>❌ {score.total-score.correct}</span>
            <Btn small ghost onClick={() => setActiveExam(null)}>Sair</Btn>
          </div>
        </div>
        <Prog value={((qIdx+(curAns?1:0))/activeExam.questions.length)*100} color={col} h={4} />
        <div style={{ margin:"20px 0", padding:"16px", borderRadius:12, background:"rgba(56,139,253,0.06)", border:"1px solid rgba(56,139,253,0.12)" }}>
          <div style={{ fontSize:11, color:T.blue, fontWeight:600, marginBottom:8, letterSpacing:"0.04em" }}>ENUNCIADO</div>
          <div style={{ fontSize:14, color:T.text, lineHeight:1.7 }}>{currentQ.text}</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {currentQ.options.map(opt => {
            const sel = curAns?.answer===opt.id;
            const correct = opt.id===currentQ.correct;
            let bg="rgba(255,255,255,0.025)", border=T.border, color=T.textSec;
            if (curAns && correct) { bg="rgba(34,197,94,0.12)"; border="rgba(34,197,94,0.4)"; color=T.green; }
            else if (curAns && sel) { bg="rgba(239,68,68,0.12)"; border="rgba(239,68,68,0.4)"; color=T.red; }
            return (
              <motion.button key={opt.id} onClick={() => handleAnswer(opt.id)} whileHover={!curAns ? { x:3 } : {}}
                style={{ padding:"12px 16px", borderRadius:10, border:`1px solid ${border}`, background:bg, color, cursor:curAns?"default":"pointer",
                  fontSize:13, textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ width:22, height:22, borderRadius:6, border:"1px solid currentColor", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{opt.id}</span>
                <span style={{ flex:1 }}>{opt.text}</span>
                {curAns && correct && <span>✅</span>}
                {curAns && sel && !correct && <span>❌</span>}
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>
          {showExp && curAns && currentQ.explanation && (
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              style={{ marginTop:14, padding:"14px 16px", borderRadius:10,
                background: curAns.isCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                border:`1px solid ${curAns.isCorrect ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}` }}>
              <div style={{ fontSize:12, fontWeight:700, color: curAns.isCorrect ? T.green : T.red, marginBottom:6 }}>
                {curAns.isCorrect ? "✅ Correto! +10 XP" : "❌ Incorreto"}
              </div>
              <div style={{ fontSize:12, color:T.textSec, lineHeight:1.6 }}>{currentQ.explanation}</div>
            </motion.div>
          )}
        </AnimatePresence>
        {curAns && (
          <motion.button onClick={handleNext} initial={{ opacity:0 }} animate={{ opacity:1 }} whileHover={{ scale:1.02 }}
            style={{ marginTop:14, width:"100%", padding:"12px", borderRadius:10, border:"none",
              background:`linear-gradient(135deg,${col},${col}aa)`, color:"#fff", cursor:"pointer", fontSize:14, fontWeight:700 }}>
            {qIdx+1===activeExam.questions.length ? "Finalizar →" : "Próxima →"}
          </motion.button>
        )}
      </GlassCard>
    );
  }

  // Tela: resultado
  if (examDone) {
    const score = getScore();
    return (
      <GlassCard style={{ padding:32, textAlign:"center", maxWidth:480, margin:"0 auto" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>{score.pct>=70?"🏆":"📚"}</div>
        <div style={{ fontSize:22, fontWeight:800, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:8 }}>Simulado concluído!</div>
        <div style={{ fontSize:13, color:T.textMuted, marginBottom:20 }}>{score.correct} acertos de {score.total} questões</div>
        <div style={{ padding:"16px 32px", borderRadius:12, background:"rgba(56,139,253,0.1)", border:`1px solid ${T.border}`, display:"inline-block", marginBottom:20 }}>
          <div style={{ fontSize:40, fontWeight:800, color:score.pct>=70?T.green:T.orange, fontFamily:"'Syne',sans-serif" }}>{score.pct}%</div>
          <div style={{ fontSize:11, color:T.textMuted }}>Taxa de acerto</div>
        </div>
        <div style={{ fontSize:12, color:T.cyan, marginBottom:20 }}>+50 XP ganhos!</div>
        <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
          <Btn ghost onClick={() => startExam(activeExam)}>Refazer</Btn>
          <Btn onClick={() => { setActiveExam(null); setExamDone(false); }}>Ver simulados</Btn>
        </div>
      </GlassCard>
    );
  }

  // Tela: lista de simulados
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div style={{ fontSize:13, color:T.textMuted }}>{examsList.length} simulado{examsList.length!==1?"s":""}</div>
        <Btn onClick={() => { setForm({ title:"", subject:"", color:"blue" }); setModal("add"); }}>+ Novo simulado</Btn>
      </div>

      {examsList.length===0
        ? <GlassCard style={{ padding:40 }}><Empty text="Nenhum simulado criado." sub='Clique em "+ Novo simulado" para criar.' /></GlassCard>
        : <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {examsList.map((e,i) => {
              const col = COLOR_MAP[e.color] || T.blue;
              const questions = e.questions || [];
              return (
                <motion.div key={e.id} initial={{ y:16, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:i*0.06 }}>
                  <GlassCard style={{ padding:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>{e.title}</div>
                        {e.subject && <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{e.subject}</div>}
                        <div style={{ fontSize:11, color:col, marginTop:4 }}>📝 {questions.length} questão{questions.length!==1?"ões":""}</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={() => setQModal(e.id)} style={{ background:"rgba(56,139,253,0.1)", border:`1px solid rgba(56,139,253,0.2)`, color:T.blue, cursor:"pointer", borderRadius:7, padding:"5px 10px", fontSize:11, fontWeight:600 }}>+ Questão</button>
                        <button onClick={() => { setForm({ title:e.title, subject:e.subject||"", color:e.color }); setModal({ edit:e }); }} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, color:T.textMuted, cursor:"pointer", borderRadius:7, padding:"5px 9px", fontSize:11 }}>✏️</button>
                        <button onClick={() => setDelTarget(e)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:T.red, cursor:"pointer", borderRadius:7, padding:"5px 9px", fontSize:11 }}>🗑️</button>
                      </div>
                    </div>

                    {/* Lista de questões */}
                    {questions.length > 0 && (
                      <div style={{ marginBottom:14 }}>
                        {questions.map((q,qi) => (
                          <div key={qi} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", borderRadius:8,
                            background:"rgba(255,255,255,0.025)", border:`1px solid ${T.border}`, marginBottom:6 }}>
                            <span style={{ fontSize:11, color:T.textSec, flex:1, marginRight:8 }}>{qi+1}. {q.text.slice(0,60)}{q.text.length>60?"...":""}</span>
                            <button onClick={() => delQuestion(e.id, qi)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:T.red, cursor:"pointer", borderRadius:5, padding:"2px 7px", fontSize:10 }}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}

                    <Btn full disabled={questions.length===0} onClick={() => startExam(e)}
                      color={col}>{questions.length===0 ? "Adicione questões para iniciar" : `▶ Iniciar simulado (${questions.length} questões)`}</Btn>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
      }

      <AnimatePresence>
        {modal && (
          <Modal title={modal==="add"?"Novo Simulado":"Editar Simulado"} onClose={() => setModal(null)}>
            <Field label="Título do simulado">
              <Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Ex: Balanço Patrimonial" />
            </Field>
            <Field label="Disciplina (opcional)">
              <Input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Ex: Contabilidade Geral" />
            </Field>
            <Field label="Cor">
              <ColorPick value={form.color} onChange={c=>setForm(f=>({...f,color:c}))} />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn onClick={saveExam} disabled={!form.title.trim()}>{modal==="add"?"Criar":"Salvar"}</Btn>
            </div>
          </Modal>
        )}
        {qModal && (
          <Modal title="Adicionar Questão" onClose={() => setQModal(null)}>
            <Field label="Enunciado">
              <textarea value={qForm.text} onChange={e=>setQForm(f=>({...f,text:e.target.value}))} placeholder="Digite o enunciado da questão..."
                style={{ width:"100%", padding:"10px 12px", borderRadius:9, border:`1px solid ${T.border}`, background:"rgba(255,255,255,0.04)", color:T.text, fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif", minHeight:80, resize:"vertical" }} />
            </Field>
            <Field label="Alternativa A *">
              <Input value={qForm.a} onChange={e=>setQForm(f=>({...f,a:e.target.value}))} placeholder="Texto da opção A" />
            </Field>
            <Field label="Alternativa B *">
              <Input value={qForm.b} onChange={e=>setQForm(f=>({...f,b:e.target.value}))} placeholder="Texto da opção B" />
            </Field>
            <Field label="Alternativa C (opcional)">
              <Input value={qForm.c} onChange={e=>setQForm(f=>({...f,c:e.target.value}))} placeholder="Texto da opção C" />
            </Field>
            <Field label="Alternativa D (opcional)">
              <Input value={qForm.d} onChange={e=>setQForm(f=>({...f,d:e.target.value}))} placeholder="Texto da opção D" />
            </Field>
            <Field label="Resposta correta">
              <Select value={qForm.correct} onChange={e=>setQForm(f=>({...f,correct:e.target.value}))}>
                {["A","B","C","D"].map(l=><option key={l} value={l}>{l}</option>)}
              </Select>
            </Field>
            <Field label="Explicação (opcional)">
              <Input value={qForm.explanation} onChange={e=>setQForm(f=>({...f,explanation:e.target.value}))} placeholder="Por que esta é a resposta correta?" />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={()=>setQModal(null)}>Cancelar</Btn>
              <Btn onClick={()=>saveQuestion(qModal)} disabled={!qForm.text.trim()||!qForm.a.trim()||!qForm.b.trim()}>Salvar questão</Btn>
            </div>
          </Modal>
        )}
        {delTarget && <ConfirmDelete label={`o simulado "${delTarget.title}"`} onConfirm={delExam} onCancel={()=>setDelTarget(null)} />}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// REVIEWS PAGE — CRUD completo
// ══════════════════════════════════════════════════════════════════════════════
const ReviewsPage = ({ reviews, setReviews, subjects, onXP }) => {
  const [modal, setModal] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [form, setForm] = useState({ topic:"", subject:"", priority:"media", color:"blue" });

  const PRIORITIES = { alta:"🔴 Alta", media:"🟡 Média", baixa:"🟢 Baixa" };

  const openAdd = () => { setForm({ topic:"", subject:"", priority:"media", color:"blue" }); setModal("add"); };
  const openEdit = (r) => { setForm({ topic:r.topic, subject:r.subject, priority:r.priority||"media", color:r.color }); setModal({ edit:r }); };

  const save = () => {
    if (!form.topic.trim()) return;
    if (modal==="add") setReviews(prev=>[...(prev || []),{ ...form, id:`rev_${Date.now()}`, done:false }]);
    else setReviews(prev=>(prev || []).map(r=>r.id===modal.edit.id?{...r,...form}:r));
    setModal(null);
  };

  const toggle = (id) => {
    setReviews(prev=>(prev || []).map(r=>{
      if (r.id!==id) return r;
      if (!r.done) onXP(15);
      return {...r, done:!r.done};
    }));
  };

  const del = () => { setReviews(prev=>(prev || []).filter(r=>r.id!==delTarget.id)); setDelTarget(null); };

  const reviewsList = reviews || [];
  const pending = reviewsList.filter(r=>!r.done);
  const done = reviewsList.filter(r=>r.done);

  return (
    <GlassCard style={{ padding:24 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif" }}>🔄 Revisões</div>
          <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{pending.length} pendente{pending.length!==1?"s":""} · {done.length} concluída{done.length!==1?"s":""}</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {done.length>0 && (
            <button onClick={() => setReviews(prev=>(prev || []).filter(r=>!r.done))}
              style={{ padding:"6px 12px", borderRadius:8, border:"1px solid rgba(239,68,68,0.2)", background:"rgba(239,68,68,0.08)", color:T.red, cursor:"pointer", fontSize:11, fontWeight:600 }}>
              Limpar concluídas
            </button>
          )}
          <Btn small onClick={openAdd}>+ Revisão</Btn>
        </div>
      </div>

      {reviewsList.length===0
        ? <Empty text="Nenhuma revisão cadastrada." sub='Clique em "+ Revisão" para adicionar.' />
        : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[...pending, ...done].map((r,i) => {
              const col = COLOR_MAP[r.color] || T.blue;
              const isUrgent = r.priority==="alta";
              return (
                <motion.div key={r.id} initial={{ y:10, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:i*0.05 }}
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", borderRadius:12,
                    background: r.done ? "rgba(34,197,94,0.06)" : isUrgent ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.025)",
                    border:`1px solid ${r.done?"rgba(34,197,94,0.3)":isUrgent?"rgba(249,115,22,0.2)":T.border}`,
                    opacity: r.done ? 0.65 : 1 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:`${col}22`, border:`1px solid ${col}44`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                    {r.done?"✅":isUrgent?"🔴":"📘"}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text, textDecoration:r.done?"line-through":"none", marginBottom:2 }}>{r.topic}</div>
                    {r.subject && <div style={{ fontSize:11, color:T.textMuted }}>{r.subject}</div>}
                    <div style={{ fontSize:10, color: isUrgent?T.orange:T.textMuted, marginTop:2 }}>{PRIORITIES[r.priority||"media"]}</div>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    {!r.done && <motion.button onClick={()=>toggle(r.id)} whileHover={{ scale:1.04 }}
                      style={{ padding:"6px 14px", borderRadius:8, border:"none", background:`linear-gradient(135deg,${col},${col}aa)`, color:"#fff", cursor:"pointer", fontSize:12, fontWeight:600 }}>
                      Revisar ✓
                    </motion.button>}
                    {r.done && <button onClick={()=>toggle(r.id)} style={{ padding:"5px 10px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.textMuted, cursor:"pointer", fontSize:11 }}>Desfazer</button>}
                    <button onClick={()=>openEdit(r)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, color:T.textMuted, cursor:"pointer", borderRadius:7, padding:"5px 8px", fontSize:11 }}>✏️</button>
                    <button onClick={()=>setDelTarget(r)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:T.red, cursor:"pointer", borderRadius:7, padding:"5px 8px", fontSize:11 }}>🗑️</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
      }

      <AnimatePresence>
        {modal && (
          <Modal title={modal==="add"?"Nova Revisão":"Editar Revisão"} onClose={()=>setModal(null)}>
            <Field label="Tópico para revisar *">
              <Input value={form.topic} onChange={e=>setForm(f=>({...f,topic:e.target.value}))} placeholder="Ex: Balanço Patrimonial" />
            </Field>
            <Field label="Disciplina (opcional)">
              {subjects && subjects.length>0
                ? <Select value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}>
                    <option value="">Selecionar...</option>
                    {subjects.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
                  </Select>
                : <Input value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Nome da disciplina" />
              }
            </Field>
            <Field label="Prioridade">
              <Select value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>
                <option value="alta">🔴 Alta</option>
                <option value="media">🟡 Média</option>
                <option value="baixa">🟢 Baixa</option>
              </Select>
            </Field>
            <Field label="Cor">
              <ColorPick value={form.color} onChange={c=>setForm(f=>({...f,color:c}))} />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn onClick={save} disabled={!form.topic.trim()}>{modal==="add"?"Adicionar":"Salvar"}</Btn>
            </div>
          </Modal>
        )}
        {delTarget && <ConfirmDelete label={`"${delTarget.topic}"`} onConfirm={del} onCancel={()=>setDelTarget(null)} />}
      </AnimatePresence>
    </GlassCard>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// GOALS PAGE — CRUD completo
// ══════════════════════════════════════════════════════════════════════════════
const GoalsPage = ({ goals, setGoals, onXP }) => {
  const [modal, setModal] = useState(null);
  const [delTarget, setDelTarget] = useState(null);
  const [form, setForm] = useState({ title:"", icon:"🎯", color:"blue", current:0, target:100, deadline:"", notes:"" });

  const openAdd = () => { setForm({ title:"", icon:"🎯", color:"blue", current:0, target:100, deadline:"", notes:"" }); setModal("add"); };
  const openEdit = (g) => { setForm({ title:g.title, icon:g.icon, color:g.color, current:g.current, target:g.target, deadline:g.deadline||"", notes:g.notes||"" }); setModal({ edit:g }); };

  const save = () => {
    if (!form.title.trim()) return;
    const progress = Math.min(100, Math.round((Number(form.current)/Math.max(1,Number(form.target)))*100));
    if (modal==="add") setGoals(prev=>[...(prev || []),{ ...form, id:`goal_${Date.now()}`, current:Number(form.current), target:Number(form.target), progress }]);
    else setGoals(prev=>(prev || []).map(g=>g.id===modal.edit.id?{...g,...form,current:Number(form.current),target:Number(form.target),progress}:g));
    setModal(null);
  };

  const del = () => { setGoals(prev=>(prev || []).filter(g=>g.id!==delTarget.id)); setDelTarget(null); };

  const updateProgress = (id, delta) => {
    setGoals(prev=>(prev || []).map(g=>{
      if (g.id!==id) return g;
      const newCur = Math.min(g.target, Math.max(0, (g.current||0) + delta));
      const progress = Math.round((newCur/g.target)*100);
      if (progress>(g.progress||0)) onXP(5);
      return {...g, current:newCur, progress};
    }));
  };

  const goalsList = goals || [];

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div style={{ fontSize:13, color:T.textMuted }}>{goalsList.length} meta{goalsList.length!==1?"s":""} · {goalsList.filter(g=>(g.progress||0)>=100).length} concluída{goalsList.filter(g=>(g.progress||0)>=100).length!==1?"s":""}</div>
        <Btn onClick={openAdd}>+ Nova meta</Btn>
      </div>

      {goalsList.length===0
        ? <GlassCard style={{ padding:40 }}><Empty text="Nenhuma meta criada." sub='Clique em "+ Nova meta" para definir seus objetivos.' /></GlassCard>
        : <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {goalsList.map((g,i) => {
              const col = COLOR_MAP[g.color] || T.blue;
              const done = (g.progress || 0) >= 100;
              return (
                <motion.div key={g.id} initial={{ x:-16, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:i*0.07 }}>
                  <GlassCard style={{ padding:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:24 }}>{g.icon}</span>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:T.text }}>{g.title}</div>
                          {g.notes && <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{g.notes}</div>}
                          {g.deadline && <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>📅 {g.deadline}</div>}
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:16, fontWeight:800, color:col, fontFamily:"'Syne',sans-serif" }}>{g.progress || 0}%</span>
                        <button onClick={()=>openEdit(g)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, color:T.textMuted, cursor:"pointer", borderRadius:7, padding:"4px 8px", fontSize:11 }}>✏️</button>
                        <button onClick={()=>setDelTarget(g)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", color:T.red, cursor:"pointer", borderRadius:7, padding:"4px 8px", fontSize:11 }}>🗑️</button>
                      </div>
                    </div>

                    <Prog value={g.progress || 0} color={col} h={7} />

                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                      <span style={{ fontSize:11, color:T.textMuted }}>{(g.current || 0)} / {g.target}</span>
                      {done
                        ? <Badge color="green">🏆 Concluída!</Badge>
                        : <div style={{ display:"flex", gap:8 }}>
                            <button onClick={()=>updateProgress(g.id,-1)} style={{ padding:"5px 12px", borderRadius:7, border:`1px solid ${T.border}`, background:"transparent", color:T.textMuted, cursor:"pointer", fontSize:12 }}>−1</button>
                            <button onClick={()=>updateProgress(g.id,1)} style={{ padding:"5px 14px", borderRadius:7, border:`1px solid ${col}44`, background:`${col}11`, color:col, cursor:"pointer", fontSize:12, fontWeight:600 }}>+1</button>
                          </div>
                      }
                    </div>
                    {(g.progress || 0)>=90 && !done && <div style={{ marginTop:8, fontSize:11, color:T.cyan, fontWeight:600 }}>🎉 Quase lá!</div>}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
      }

      <AnimatePresence>
        {modal && (
          <Modal title={modal==="add"?"Nova Meta":"Editar Meta"} onClose={()=>setModal(null)}>
            <Field label="Título da meta *">
              <Input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Ex: Completar Contabilidade Geral" />
            </Field>
            <Field label="Ícone">
              <IconPick value={form.icon} onChange={ic=>setForm(f=>({...f,icon:ic}))} />
            </Field>
            <Field label="Cor">
              <ColorPick value={form.color} onChange={c=>setForm(f=>({...f,color:c}))} />
            </Field>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <Field label="Valor atual">
                <Input type="number" value={form.current} onChange={e=>setForm(f=>({...f,current:e.target.value}))} placeholder="0" />
              </Field>
              <Field label="Meta (valor alvo)">
                <Input type="number" value={form.target} onChange={e=>setForm(f=>({...f,target:e.target.value}))} placeholder="100" />
              </Field>
            </div>
            <Field label="Prazo (opcional)">
              <Input value={form.deadline} onChange={e=>setForm(f=>({...f,deadline:e.target.value}))} placeholder="Ex: 30 Jun ou 30/06/2025" />
            </Field>
            <Field label="Observações (opcional)">
              <Input value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} placeholder="Notas sobre esta meta..." />
            </Field>
            <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:8 }}>
              <Btn ghost onClick={()=>setModal(null)}>Cancelar</Btn>
              <Btn onClick={save} disabled={!form.title.trim()}>{modal==="add"?"Criar":"Salvar"}</Btn>
            </div>
          </Modal>
        )}
        {delTarget && <ConfirmDelete label={`"${delTarget.title}"`} onConfirm={del} onCancel={()=>setDelTarget(null)} />}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE PAGE — baseado nos dados reais do usuário
// ══════════════════════════════════════════════════════════════════════════════
const PerformancePage = ({ userProgress, subjects, goals }) => {
  const totalGoals = goals?.length || 0;
  const completedGoals = goals?.filter(g=>(g.progress||0)>=100).length || 0;
  const avgSubjectProgress = subjects && subjects.length>0
    ? Math.round(subjects.reduce((s,x)=>s+(x.progress||0),0)/subjects.length) : 0;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          { label:"XP Total", value:userProgress?.xp || 0, icon:"⭐", color:T.purple },
          { label:"Nível atual", value:`Lv ${userProgress?.level || 1}`, icon:"🏆", color:T.blue },
          { label:"Progresso médio", value:`${avgSubjectProgress}%`, icon:"📚", color:T.cyan },
          { label:"Metas concluídas", value:`${completedGoals}/${totalGoals}`, icon:"🎯", color:T.green },
        ].map((m,i)=>(
          <motion.div key={i} initial={{ y:16, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:i*0.07 }}>
            <GlassCard style={{ padding:18 }}>
              <div style={{ fontSize:22, marginBottom:8 }}>{m.icon}</div>
              <div style={{ fontSize:24, fontWeight:800, color:m.color, fontFamily:"'Syne',sans-serif", letterSpacing:"-0.04em" }}>{m.value}</div>
              <div style={{ fontSize:11, color:T.textMuted, marginTop:3 }}>{m.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {subjects && subjects.length>0 && (
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>📚 Progresso por Disciplina</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {subjects.map((s,i) => {
              const col = COLOR_MAP[s.color] || T.blue;
              return (
                <div key={s.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:T.textSec }}>{s.icon} {s.name}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:col }}>{s.progress || 0}%</span>
                  </div>
                  <Prog value={s.progress || 0} color={col} h={6} />
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {goals && goals.length>0 && (
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>🎯 Status das Metas</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {goals.map(g => {
              const col = COLOR_MAP[g.color] || T.blue;
              return (
                <div key={g.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, color:T.textSec }}>{g.icon} {g.title}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      {(g.progress||0)>=100 && <Badge color="green">Concluída</Badge>}
                      <span style={{ fontSize:12, fontWeight:700, color:col }}>{g.progress||0}%</span>
                    </div>
                  </div>
                  <Prog value={g.progress||0} color={col} h={5} />
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      <GlassCard style={{ padding:22 }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.text, fontFamily:"'Syne',sans-serif", marginBottom:16 }}>⭐ Experiência</div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ width:60, height:60, borderRadius:16, background:`linear-gradient(135deg,${T.purple},${T.blue})`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#fff",
            fontFamily:"'Syne',sans-serif", boxShadow:`0 0 24px ${T.purple}44`, flexShrink:0 }}>
            Lv{userProgress?.level || 1}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:13, color:T.textSec }}>Nível {userProgress?.level || 1}</span>
              <span style={{ fontSize:12, color:T.textMuted }}>{(userProgress?.xp || 0)} / {(userProgress?.maxXp || 500)} XP</span>
            </div>
            <Prog value={((userProgress?.xp || 0)/(userProgress?.maxXp || 500))*100} color={T.purple} h={8} />
            <div style={{ fontSize:11, color:T.textMuted, marginTop:6 }}>Faltam {(userProgress?.maxXp || 500)-(userProgress?.xp || 0)} XP para o nível {(userProgress?.level || 1)+1}</div>
          </div>
        </div>
        <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, textAlign:"center" }}>
          {[
            { label:"Streak", value:`${userProgress?.streak || 0} dias`, color:T.orange },
            { label:"XP acumulado", value:userProgress?.xp || 0, color:T.purple },
            { label:"Nível", value:userProgress?.level || 1, color:T.blue },
          ].map((s,i) => (
            <div key={i} style={{ padding:12, borderRadius:10, background:"rgba(255,255,255,0.025)", border:`1px solid ${T.border}` }}>
              <div style={{ fontSize:20, fontWeight:800, color:s.color, fontFamily:"'Syne',sans-serif" }}>{s.value}</div>
              <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════════════════
const PAGE_META = {
  home:        { title:"Dashboard 🏠",        subtitle:"Visão geral do seu progresso." },
  subjects:    { title:"Disciplinas 📚",       subtitle:"Gerencie suas matérias e acompanhe o progresso." },
  plan:        { title:"Plano de Estudo 📅",   subtitle:"Organize as tarefas do seu dia." },
  exams:       { title:"Simulados ⚡",          subtitle:"Crie e faça seus próprios simulados." },
  reviews:     { title:"Revisões 🔄",           subtitle:"Controle o que precisa ser revisado." },
  goals:       { title:"Metas 🎯",             subtitle:"Defina e acompanhe seus objetivos." },
  performance: { title:"Desempenho 📊",         subtitle:"Acompanhe sua evolução." },
};

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const [subjects,  setSubjects]  = useState(() => load("subjects",  []));
  const [planTasks, setPlanTasks] = useState(() => load("planTasks", []));
  const [reviews,   setReviews]   = useState(() => load("reviews",   []));
  const [goals,     setGoals]     = useState(() => load("goals",     []));
  const [exams,     setExams]     = useState(() => load("exams",     []));
  const [userProgress, setUserProgress] = useState(() => load("userProgress", {
    name:"Estudante", level:1, xp:0, maxXp:500, streak:0,
  }));

  // Persistência automática
  useEffect(() => { save("subjects",  subjects);  }, [subjects]);
  useEffect(() => { save("planTasks", planTasks); }, [planTasks]);
  useEffect(() => { save("reviews",   reviews);   }, [reviews]);
  useEffect(() => { save("goals",     goals);     }, [goals]);
  useEffect(() => { save("exams",     exams);     }, [exams]);
  useEffect(() => { save("userProgress", userProgress); }, [userProgress]);

  const addXP = (amount) => {
    setUserProgress(prev => {
      let { xp, maxXp, level, streak, name } = prev;
      xp += amount;
      let leveledUp = false;
      while (xp >= maxXp) { 
        xp -= maxXp; 
        level++; 
        maxXp = Math.round(maxXp * 1.25);
        leveledUp = true;
      }
      return { name, xp, maxXp, level, streak };
    });
  };

  const meta = PAGE_META[activePage] || PAGE_META.home;

  const renderPage = () => {
    switch (activePage) {
      case "home":        return <HomeDashboard userProgress={userProgress} subjects={subjects} goals={goals} planTasks={planTasks} reviews={reviews} />;
      case "subjects":    return <SubjectsPage subjects={subjects} setSubjects={setSubjects} onXP={addXP} />;
      case "plan":        return <PlanPage planTasks={planTasks} setPlanTasks={setPlanTasks} subjects={subjects} onXP={addXP} />;
      case "exams":       return <ExamsPage exams={exams} setExams={setExams} onXP={addXP} />;
      case "reviews":     return <ReviewsPage reviews={reviews} setReviews={setReviews} subjects={subjects} onXP={addXP} />;
      case "goals":       return <GoalsPage goals={goals} setGoals={setGoals} onXP={addXP} />;
      case "performance": return <PerformancePage userProgress={userProgress} subjects={subjects} goals={goals} />;
      default:            return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};font-family:'DM Sans',sans-serif;}
        button{font-family:inherit;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(56,139,253,0.3);border-radius:99px;}
        input[type=number]::-webkit-inner-spin-button{opacity:0.4;}
        select option{background:#0a1428;}
      `}</style>

      {/* Orbs de fundo */}
      <div style={{ position:"fixed", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
        {[{l:"5%",t:"15%",c:T.blue,s:600,o:0.03},{l:"70%",t:"50%",c:T.cyan,s:500,o:0.025},{l:"40%",t:"80%",c:T.purple,s:400,o:0.02}].map((b,i)=>(
          <motion.div key={i} animate={{ scale:[1,1.1,1] }} transition={{ duration:10+i*3, repeat:Infinity }}
            style={{ position:"absolute", left:b.l, top:b.t, width:b.s, height:b.s, borderRadius:"50%", background:b.c, filter:"blur(120px)", opacity:b.o }} />
        ))}
      </div>

      <div style={{ display:"flex", minHeight:"100vh", position:"relative", zIndex:1 }}>
        <Sidebar active={activePage} onNav={setActivePage} userProgress={userProgress} />
        <main style={{ flex:1, overflowY:"auto", padding:"28px 32px", minHeight:"100vh" }}>
          <Topbar title={meta.title} subtitle={meta.subtitle} streak={userProgress.streak} />
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}>
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
