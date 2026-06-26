import { useState } from "react";

const db = {
  users: [{ id: "user1", name: "Shubham Gaushwami", email: "shubham@example.com", pass: "123456" }],
  tasks: { "user1": [] }
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0f1117; color: #e8e8f0; font-family: 'Inter', sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }
  .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: radial-gradient(ellipse at 60% 0%, #1e1a3a 0%, #0f1117 60%); }
  .auth-card { width: 100%; max-width: 420px; background: #1a1d27; border: 1px solid #2a2d3e; border-radius: 20px; padding: 40px 36px; box-shadow: 0 24px 60px #00000060; }
  .brand { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: #6c63ff; margin-bottom: 6px; }
  .auth-sub { color: #8888aa; font-size: 14px; margin-bottom: 32px; }
  .auth-tabs { display: flex; gap: 4px; background: #0f1117; border-radius: 10px; padding: 4px; margin-bottom: 28px; }
  .auth-tab { flex: 1; padding: 9px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; background: transparent; color: #8888aa; }
  .auth-tab.active { background: #6c63ff; color: #fff; }
  .field { margin-bottom: 18px; }
  .field label { display: block; font-size: 13px; font-weight: 500; color: #8888aa; margin-bottom: 6px; }
  .field input { width: 100%; padding: 11px 14px; background: #0f1117; border: 1px solid #2a2d3e; border-radius: 10px; color: #e8e8f0; font-size: 14px; outline: none; font-family: inherit; }
  .field input:focus { border-color: #6c63ff; }
  .btn-primary { width: 100%; padding: 12px; background: #6c63ff; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; margin-top: 4px; }
  .btn-primary:hover { background: #8b84ff; }
  .err { color: #ff6b6b; font-size: 13px; margin-bottom: 14px; background: #ff6b6b18; padding: 9px 12px; border-radius: 8px; }
  .dash { display: flex; flex-direction: column; min-height: 100vh; }
  .topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 28px; border-bottom: 1px solid #2a2d3e; background: #1a1d27; position: sticky; top: 0; z-index: 10; }
  .topbar-brand { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #6c63ff; }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: #6c63ff; color: #fff; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .btn-logout { padding: 7px 16px; background: transparent; border: 1px solid #2a2d3e; color: #8888aa; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit; }
  .btn-logout:hover { border-color: #ff6b6b; color: #ff6b6b; }
  .main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 36px 24px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 20px; }
  .add-task-box { background: #1a1d27; border: 1px solid #2a2d3e; border-radius: 16px; padding: 20px; margin-bottom: 32px; }
  .add-task-row { display: flex; gap: 10px; }
  .task-input { flex: 1; padding: 11px 14px; background: #0f1117; border: 1px solid #2a2d3e; border-radius: 10px; color: #e8e8f0; font-size: 14px; outline: none; font-family: inherit; }
  .task-input:focus { border-color: #6c63ff; }
  .btn-add { padding: 11px 20px; background: #6c63ff; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
  .btn-add:hover { background: #8b84ff; }
  .priority-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; align-items: center; }
  .priority-label { font-size: 12px; color: #8888aa; }
  .pill { padding: 5px 12px; border-radius: 20px; border: 1px solid #2a2d3e; font-size: 12px; font-weight: 500; cursor: pointer; background: transparent; font-family: inherit; }
  .pill.low { color: #4ecdc4; } .pill.med { color: #ffd166; } .pill.high { color: #ff6b6b; }
  .pill.active.low { background: #4ecdc422; border-color: #4ecdc4; }
  .pill.active.med { background: #ffd16622; border-color: #ffd166; }
  .pill.active.high { background: #ff6b6b22; border-color: #ff6b6b; }
  .filters { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
  .filter-btn { padding: 6px 16px; border-radius: 20px; border: 1px solid #2a2d3e; background: transparent; color: #8888aa; font-size: 13px; cursor: pointer; font-family: inherit; }
  .filter-btn.active { background: #6c63ff22; border-color: #6c63ff; color: #6c63ff; }
  .task-list { display: flex; flex-direction: column; gap: 10px; }
  .task-card { background: #1a1d27; border: 1px solid #2a2d3e; border-radius: 14px; padding: 16px 18px; display: flex; align-items: flex-start; gap: 14px; }
  .task-card:hover { border-color: #3a3d55; box-shadow: 0 4px 20px #00000030; }
  .task-card.done { opacity: .55; }
  .check-btn { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #2a2d3e; background: transparent; cursor: pointer; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; }
  .check-btn.checked { background: #4ecdc4; border-color: #4ecdc4; }
  .check-btn:hover:not(.checked) { border-color: #4ecdc4; }
  .task-body { flex: 1; min-width: 0; }
  .task-title { font-size: 15px; font-weight: 500; color: #e8e8f0; word-break: break-word; line-height: 1.4; }
  .task-card.done .task-title { text-decoration: line-through; color: #8888aa; }
  .task-meta { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
  .badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; }
  .badge.low { background: #4ecdc422; color: #4ecdc4; }
  .badge.med { background: #ffd16622; color: #ffd166; }
  .badge.high { background: #ff6b6b22; color: #ff6b6b; }
  .task-date { font-size: 12px; color: #8888aa; }
  .delete-btn { background: transparent; border: none; color: #8888aa; cursor: pointer; font-size: 18px; padding: 2px 4px; border-radius: 6px; flex-shrink: 0; }
  .delete-btn:hover { color: #ff6b6b; background: #ff6b6b18; }
  .stats { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
  .stat-card { flex: 1; min-width: 100px; background: #1a1d27; border: 1px solid #2a2d3e; border-radius: 14px; padding: 16px 18px; text-align: center; }
  .stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: #6c63ff; }
  .stat-lbl { font-size: 12px; color: #8888aa; margin-top: 2px; }
  .empty { text-align: center; padding: 48px 0; color: #8888aa; font-size: 14px; }
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
          <button className={"auth-tab" + (tab === "login" ? " active" : "")} onClick={() => { setTab("login"); setErr(""); }}>Log in</button>
          <button className={"auth-tab" + (tab === "signup" ? " active" : "")} onClick={() => { setTab("signup"); setErr(""); }}>Sign up</button>
        </div>
        {err && <div className="err">{err}</div>}
        {tab === "signup" && <div className="field"><label>Full name</label><input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="Jane Doe" /></div>}
        <div className="field"><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="you@example.com" /></div>
        <div className="field"><label>Password</label><input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="••••••••" /></div>
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
          <span style={{ fontSize: 14, color: "#8888aa" }}>{user.name}</span>
          <button className="btn-logout" onClick={onLogout}>Log out</button>
        </div>
      </header>
      <main className="main">
        <div className="section-title">Good day, {user.name.split(" ")[0]} 👋</div>
        <div className="stats">
          <div className="stat-card"><div className="stat-num">{total}</div><div className="stat-lbl">Total</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: "#ffd166" }}>{active}</div><div className="stat-lbl">Active</div></div>
          <div className="stat-card"><div className="stat-num" style={{ color: "#4ecdc4" }}>{done}</div><div className="stat-lbl">Done</div></div>
        </div>
        <div className="add-task-box">
          <div className="add-task-row">
            <input className="task-input" placeholder="Add a new task…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} />
            <button className="btn-add" onClick={addTask}>+ Add</button>
          </div>
          <div className="priority-row">
            <span className="priority-label">Priority:</span>
            {["low", "med", "high"].map(p => (
              <button key={p} className={"pill " + p + (priority === p ? " active" : "")} onClick={() => setPriority(p)}>
                {p === "med" ? "Medium" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="filters">
          {["all", "active", "done"].map(f => (
            <button key={f} className={"filter-btn" + (filter === f ? " active" : "")} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="task-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">{filter === "done" ? "🎉" : "📋"}</div>
              {filter === "done" ? "No completed tasks yet." : filter === "active" ? "You're all caught up!" : "No tasks yet. Add one above!"}
            </div>
          ) : filtered.map(task => (
            <div key={task.id} className={"task-card" + (task.done ? " done" : "")}>
              <button className={"check-btn" + (task.done ? " checked" : "")} onClick={() => toggle(task.id)}>{task.done && "✓"}</button>
              <div className="task-body">
                <div className="task-title">{task.title}</div>
                <div className="task-meta">
                  <span className={"badge " + task.priority}>{task.priority === "med" ? "Medium" : task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
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
  const [user, setUser] = useState({ id: "user1", name: "Shubham Gaushwami", email: "shubham@example.com" });
  return (
    <>
      <style>{css}</style>
      <div className="app">
        {user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <AuthScreen onLogin={setUser} />}
      </div>
    </>
  );
}
