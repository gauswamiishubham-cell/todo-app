import { useState } from "react";

const db = { users: [], tasks: {} };

const C = {
  bg: "#0f1117",
  surface: "#1a1d27",
  border: "#2a2d3e",
  accent: "#6c63ff",
  accentHover: "#8b84ff",
  accentDim: "#6c63ff22",
  text: "#e8e8f0",
  muted: "#8888aa",
  danger: "#ff6b6b",
  success: "#4ecdc4",
  warn: "#ffd166",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Inter', sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: radial-gradient(ellipse at 60% 0%, #1e1a3a 0%, ${C.bg} 60%); }
  .auth-card { width: 100%; max-width: 420px; background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 20px; padding: 40px 36px; box-shadow: 0 24px 60px #00000060; }
  .brand { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: ${C.accent}; letter-spacing: -0.5px; margin-bottom: 6px; }
  .auth-sub { color: ${C.muted}; font-size: 14px; margin-bottom: 32px; }
  .auth-tabs { display: flex; gap: 4px; background: ${C.bg}; border-radius: 10px; padding: 4px; margin-bottom: 28px; }
  .auth-tab { flex: 1; padding: 9px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s; background: transparent; color: ${C.muted}; }
  .auth-tab.active { background: ${C.accent}; color: #fff; box-shadow: 0 4px 14px #6c63ff44; }
  .field { margin-bottom: 18px; }
  .field label { display: block; font-size: 13px; font-weight: 500; color: ${C.muted}; margin-bottom: 6px; }
  .field input { width: 100%; padding: 11px 14px; background: ${C.bg}; border: 1px solid ${C.border}; border-radius: 10px; color: ${C.text}; font-size: 14px; outline: none; transition: border-color .2s; font-family: inherit; }
  .field input:focus { border-color: ${C.accent}; }
  .btn-primary { width: 100%; padding: 12px; background: ${C.accent}; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .2s, transform .1s; font-family: inherit; margin-top: 4px; }
  .btn-primary:hover { background: ${C.accentHover}; }
  .btn-primary:active { transform: scale(.98); }
  .err { color: ${C.danger}; font-size: 13px; margin-bottom: 14px; background: #ff6b6b18; padding: 9px 12px; border-radius: 8px; }
  .dash { display: flex; flex-direction: column; min-height: 100vh; }
  .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid ${C.border}; background: ${C.surface}; position: sticky; top: 0; z-index: 10; }
  .topbar-brand { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: ${C.accent}; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: ${C.accent}; color: #fff; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .btn-logout { padding: 7px 16px; background: transparent; border: 1px solid ${C.border}; color: ${C.muted}; border-radius: 8px; font-size: 13px; cursor: pointer; transition: all .2s; font-family: inherit; }
  .btn-logout:hover { border-color: ${C.danger}; color: ${C.danger}; }
  .main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 36px 24px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 20px; color: ${C.text}; }
  .add-task-box { background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 16px; padding: 20px; margin-bottom: 32px; }
  .add-task-row { display: flex; gap: 10px; }
  .task-input { flex: 1; padding: 11px 14px; background: ${C.bg}; border: 1px solid ${C.border}; border-radius: 10px; color: ${C.text}; font-size: 14px; outline: none; font-family: inherit; transition: border-color .2s; }
  .task-input:focus { border-color: ${C.accent}; }
  .btn-add { padding: 11px 20px; background: ${C.accent}; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; font-family: inherit; transition: background .2s; }
  .btn-add:hover { background: ${C.accentHover}; }
  .priority-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; align-items: center; }
  .priority-label { font-size: 12px; color: ${C.muted}; }
  .pill { padding: 5px 12px; border-radius: 20px; border: 1px solid ${C.border}; font-size: 12px; font-weight: 500; cursor: pointer; transition: all .15s; background: transparent; font-family: inherit; }
  .pill.low { color: ${C.success}; } .pill.med { color: ${C.warn}; } .pill.high { color: ${C.danger}; }
  .pill.active.low { background: ${C.success}22; border-color: ${C.success}; }
  .pill.active.med { background: ${C.warn}22; border-color: ${C.warn}; }
  .pill.active.high { background: ${C.danger}22; border-color: ${C.danger}; }
  .filters { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .filter-btn { padding: 6px 16px; border-radius: 20px; border: 1px solid ${C.border}; background: transparent; color: ${C.muted}; font-size: 13px; cursor: pointer; font-family: inherit; transition: all .15s; }
  .filter-btn.active { background: ${C.accentDim}; border-color: ${C.accent}; color: ${C.accent}; }
  .task-list { display: flex; flex-direction: column; gap: 10px; }
  .task-card { background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 14px; padding: 16px 18px; display: flex; align-items: flex-start; gap: 14px; transition: border-color .2s, box-shadow .2s; }
  .task-card:hover { border-color: #3a3d55; box-shadow: 0 4px 20px #00000030; }
  .task-card.done { opacity: .55; }
  .check-btn { width: 22px; height: 22px; border-radius: 50%; border: 2px solid ${C.border}; background: transparent; cursor: pointer; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; transition: all .15s; color: #fff; font-size: 11px; }
  .check-btn.checked { background: ${C.success}; border-color: ${C.success}; }
  .check-btn:hover:not(.checked) { border-color: ${C.success}; }
  .task-body { flex: 1; min-width: 0; }
  .task-title { font-size: 15px; font-weight: 500; color: ${C.text}; word-break: break-word; line-height: 1.4; }
  .task-card.done .task-title { text-decoration: line-through; color: ${C.muted}; }
  .task-meta { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }
  .badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; }
  .badge.low { background: ${C.success}22; color: ${C.success}; }
  .badge.med { background: ${C.warn}22; color: ${C.warn}; }
  .badge.high { background: ${C.danger}22; color: ${C.danger}; }
  .task-date { font-size: 12px; color: ${C.muted}; }
  .delete-btn { background: transparent; border: none; color: ${C.muted}; cursor: pointer; font-size: 18px; padding: 2px 4px; border-radius: 6px; transition: color .15s, background .15s; flex-shrink: 0; }
  .delete-btn:hover { color: ${C.danger}; background: ${C.danger}18; }
  .stats { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
  .stat-card { flex: 1; min-width: 100px; background: ${C.surface}; border: 1px solid ${C.border}; border-radius: 14px; padding: 16px 18px; text-align: center; }
  .stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: ${C.accent}; }
  .stat-lbl { font-size: 12px; color: ${C.muted}; margin-top: 2px; }
  .empty { text-align: center; padding: 48px 0; color: ${C.muted}; font-size: 14px; }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
`;

const uid = () => Math.random().toString(36).slice(2);
const initials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
const fmtDate = (ts) => new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function AuthScreen({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    setErr("");
    if (tab === "signup") {
      if (!name.trim()) return setErr("Please enter your name.");
      if (!email.trim()) return setErr("Please enter an email.");
      if (pass.length < 6) return setErr("Password must be at least 6 characters.");
      if (db.users.find(u => u.email === email.toLowerCase())) return setErr("Account already exists.");
      const user = { id: uid(), name: name.trim(), email: email.toLowerCase() };
      db.users.push({ ...user, pass });
      db.tasks[user.id] = [];
      onLogin(user);
    } else {
      if (!email.trim() || !pass) return setErr("Please enter email and password.");
      const found = db.users.find(u => u.email === email.toLowerCase() && u.pass === pass);
      if (!found) return setErr("Incorrect email or password.");
      onLogin({ id: found.id, name: found.name, email: found.email });
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand">✦ TaskFlow</div>
        <p className="auth-sub">Your minimal task workspace</p>
        <div className="auth-tabs">
          <button className={`auth-tab${tab === "login" ? " active" : ""}`} onClick={() => { setTab("login"); setErr(""); }}>Log in</button>
          <button className={`auth-tab${tab === "signup" ? " active" : ""}`} onClick={() => { setTab("signup"); setErr(""); }}>Sign up</button>
        </div>
        {err && <div className="err">{err}</div>}
        {tab === "signup" && <div className="field"><label>Full name</label><input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key==="Enter"&&submit()} placeholder="Jane Doe" /></div>}
        <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter"&&submit()} placeholder="you@example.com" /></div>
        <div className="field"><label>Password</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key==="Enter"&&submit()} placeholder="••••••••" /></div>
        <button className="btn-primary" onClick={submit}>{tab === "signup" ? "Create account" : "Log in"}</button>
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState(db.tasks[user.id] || []);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("med");
  const [filter, setFilter] = useState("all");

  const save = (updated) => { db.tasks[user.id] = updated; setTasks([...updated]); };
  const addTask = () => { if (!input.trim()) return; save([{ id: uid(), title: input.trim(), priority, done: false, created: Date.now() }, ...tasks]); setInput(""); };
  const toggle = (id) => save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id) => save(tasks.filter(t => t.id !== id));
  const filtered = tasks.filter(t => filter === "active" ? !t.done : filter === "done" ? t.done : true);
  const total = tasks.length, done = tasks.filter(t => t.done).length, active = total - done;

  return (
    <div className="dash">
      <header className="topbar">
        <div className="topbar-brand">✦ TaskFlow</div>
        <div className="topbar-right">
          <div className="avatar">{initials(user.name)}</div>
          <span style={{ fontSize: 14, color: C.muted }}>{user.name}</span>
          <button className="btn-logout" onClick={onLogout}>Log out</button>
        </div>
      </header>
      <main className="main">
        <div className="section-title">Good day, {user.name.split(" ")[0]} 👋</div>
        <div className="stats">
          <div className="stat-card"><div className="stat-num">{total}</div><div className="stat-lbl">Total</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: C.warn }}>{active}</div><div className="stat-lbl">Active</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: C.success }}>{done}</div><div className="stat-lbl">Done</div></div>
        </div>
        <div className="add-task-box">
          <div className="add-task-row">
            <input className="task-input" placeholder="Add a new task…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter"&&addTask()} />
            <button className="btn-add" onClick={addTask}>+ Add</button>
          </div>
          <div className="priority-row">
            <span className="priority-label">Priority:</span>
            {["low","med","high"].map(p => <button key={p} className={`pill ${p}${priority===p?" active":""}`} onClick={() => setPriority(p)}>{p==="med"?"Medium":p.charAt(0).toUpperCase()+p.slice(1)}</button>)}
          </div>
        </div>
        <div className="filters">
          {["all","active","done"].map(f => <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
        </div>
        <div className="task-list">
          {filtered.length === 0 ? (
            <div className="empty"><div className="empty-icon">{filter==="done"?"🎉":"📋"}</div>{filter==="done"?"No completed tasks yet.":filter==="active"?"You're all caught up!":"No tasks yet. Add one above!"}</div>
          ) : filtered.map(task => (
            <div key={task.id} className={`task-card${task.done?" done":""}`}>
              <button className={`check-btn${task.done?" checked":""}`} onClick={() => toggle(task.id)}>{task.done&&"✓"}</button>
              <div className="task-body">
                <div className="task-title">{task.title}</div>
                <div className="task-meta">
                  <span className={`badge ${task.priority}`}>{task.priority==="med"?"Medium":task.priority.charAt(0).toUpperCase()+task.priority.slice(1)}</span>
                  <span className="task-date">{fmtDate(task.created)}</span>
                </div>
              </div>
              <button className="delete-btn" onClick={() => remove(task.id)}>×</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <style>{css}</style>
      <div className="app">
        {user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <AuthScreen onLogin={setUser} />}
      </div>
    </>
  );
}
