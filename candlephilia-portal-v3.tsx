import React, { useState, useEffect } from "react";

// ── BRAND ─────────────────────────────────────────────────────────────
const B = {
  gold: "#C8860A", accent: "#F5C842", dark: "#1A0F00",
  cream: "#FDF6E3", warm: "#F2E4C4", muted: "#8B6914",
  text: "#2C1A00", softGold: "#E8A825", deep: "#3D1F00",
  cardBg: "#FFFBF0", border: "#E2C97E",
};

// ── CLASS SCHEDULE ────────────────────────────────────────────────────
const SCHEDULE = [
  { day: 1, date: "2026-06-15", label: "June 15" },
  { day: 2, date: "2026-06-16", label: "June 16" },
  { day: 3, date: "2026-06-17", label: "June 17" },
  { day: 4, date: "2026-06-18", label: "June 18" },
  { day: 5, date: "2026-06-19", label: "June 19" },
  { day: 6, date: "2026-06-22", label: "June 22" },
  { day: 7, date: "2026-06-23", label: "June 23" },
  { day: 8, date: "2026-06-24", label: "June 24" },
  { day: 9, date: "2026-06-25", label: "June 25" },
  { day: 10, date: "2026-06-26", label: "June 26" },
];

// ── CURRICULUM ────────────────────────────────────────────────────────
const CURRICULUM = {
  1: {
    topics: [
      "What is home fragrance?",
      "Physical examples of the types we will be learning about",
      "What is scent?",
      "Types and classes of scents",
      "What is a scent frequency and how can you tell?",
    ],
    essentials: ["Notebook & pen", "Curiosity & open mind"],
    assignment: "1. List out 5 scents each that fall under each scent note.\n2. List out 5 more examples each on each class of scent listed above.\n\nSubmit to instructor's DM.",
  },
  2: {
    topics: [
      "Difference between fragrance oil and essential oil",
      "When best to use each",
      "Difference between volume and weight — when best to use each",
      "SI units and how to measure each",
      "How to blend fragrances to create your own unique scent",
    ],
    essentials: ["Notebook & pen", "Calculator", "Measuring tools if available"],
    assignment: null,
  },
  3: {
    topics: [
      "What is a candle and its components",
      "Types of candles",
      "Types of candle vessels",
      "Types of candle wicks and their effects",
      "Types of candle waxes and their effects",
    ],
    essentials: ["Notebook & pen", "Apron", "Safety gloves"],
    assignment: "Replicate the wax exercise for:\n1. Soft Soy Wax\n2. Hard Soy Wax\n3. Beeswax\n4. Coconut Wax\n5. Jelly Wax\n\nMaintain temperatures in °F. This is essential for the next class!",
  },
  4: {
    topics: [
      "Double, triple wicking, wick boosting and why",
      "Wax blending and why",
      "Tools needed for candle making",
      "How to determine & calculate amount of wax needed for your vessel",
      "How to determine & calculate amount of fragrance oil needed for your vessel",
    ],
    essentials: ["Notebook & pen", "Calculator", "Measuring scale"],
    assignment: null,
  },
  5: {
    topics: [
      "How to make scented candles",
      "How to make sculptured candles",
      "How to make wax melts",
      "How to make tea light candles",
      "How to make dessert candles",
    ],
    essentials: ["Apron", "Gloves", "Eye protection", "Closed-toe shoes", "Pouring jug"],
    assignment: "List 10 possible flaws in candle making:\nFor each: Professional name, meaning, cause, solution/prevention.",
  },
  6: {
    topics: [
      "How to conduct a burn test",
      "Things to look out for in a burn test",
      "How to improve cold throw",
      "How to improve hot throw",
      "How to calculate total burn time for your candle",
    ],
    essentials: ["Candle samples", "Timer", "Notebook & pen"],
    assignment: null,
  },
  7: {
    topics: [
      "Possible candle flaws and how to fix them",
      "Room size to candle portioning",
      "Things a standard candle label should include",
      "Mechanism of scent dispersion in candles",
      "All candle-related questions (open Q&A)",
    ],
    essentials: ["Notebook & pen", "All previous notes"],
    assignment: "5 advantages & 5 disadvantages of each wax type in candle making only.",
  },
  8: {
    topics: [
      "What are linen sprays?",
      "Various methods of making them",
      "Instructor's easiest & best recipe for linen sprays",
      "Adding colour if you must",
      "How to test its strength",
    ],
    essentials: ["Spray bottles", "Measuring tools", "Notebook & pen"],
    assignment: null,
  },
  9: {
    topics: [
      "What is a reed diffuser?",
      "Methods of making reed diffusers",
      "Instructor's own recipe for reed diffusers",
      "How it works and what differentiates it from a car diffuser",
      "How to test the strength of your diffuser",
    ],
    essentials: ["Reed sticks", "Diffuser vessels", "Notebook & pen"],
    assignment: "Different types of diffusers & how they function.\nHome fragrance brands you like & why you like them.",
  },
  10: {
    topics: [
      "Importance of product testing",
      "Power of content creation & storytelling",
      "Essentials for great pricing",
      "Packaging insight",
      "Understanding your target audience & marketing",
    ],
    essentials: ["Notebook & pen", "Phone (for content examples)"],
    assignment: "Share your overall training experience — leave a review on Google Maps for Candlephilia.",
  },
};

// ── PRE-REGISTERED STUDENTS (demo) ───────────────────────────────────
const INIT_STUDENTS = [
  { email: "ada@example.com", name: "Ada Okafor" },
  { email: "temi@example.com", name: "Temi Adeyemi" },
  { email: "blessing@example.com", name: "Blessing Nwosu" },
  { email: "grace@example.com", name: "Grace Musa" },
  { email: "chiamaka@example.com", name: "Chiamaka Eze" },
];

const ADMIN_PASSWORD = "candlephilia2026";
const CRITERIA = ["Participation", "Assignment", "Engagement", "Punctuality"];
const MAX_SCORE = 10;

// ── HELPERS ───────────────────────────────────────────────────────────
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function isDayUnlocked(dateStr) {
  return today() >= dateStr;
}

function totalScore(scores, email) {
  let total = 0, count = 0;
  SCHEDULE.forEach(s => {
    CRITERIA.forEach(c => {
      const v = scores?.[email]?.[s.day]?.[c];
      if (v !== undefined && v !== "") { total += Number(v); count++; }
    });
  });
  return { total, max: CRITERIA.length * SCHEDULE.length * MAX_SCORE, count };
}

function medal(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

// ── FLAME SVG ─────────────────────────────────────────────────────────
function Flame({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 6 8 6 13a6 6 0 0012 0c0-5-6-11-6-11z" fill={B.accent} opacity="0.9"/>
      <path d="M12 8C12 8 9 12 9 14.5a3 3 0 006 0C15 12 12 8 12 8z" fill={B.gold} opacity="0.8"/>
    </svg>
  );
}

// ── TOAST ─────────────────────────────────────────────────────────────
function Toast({ msg }) {
  return (
    <div style={{
      position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
      background:B.dark, color:B.accent, padding:"12px 28px", borderRadius:99,
      fontSize:14, fontWeight:700, boxShadow:"0 8px 32px rgba(0,0,0,0.5)",
      border:`1px solid rgba(200,134,10,0.4)`, zIndex:9999,
      fontFamily:"'Cormorant Garamond',Georgia,serif", whiteSpace:"nowrap",
      animation:"fadeUp 0.3s ease",
    }}>{msg}</div>
  );
}

// ══════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("signin");
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState(INIT_STUDENTS);
  const [attendance, setAttendance] = useState({});
  const [scores, setScores] = useState({});
  const [feedback, setFeedback] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [activeTab, setActiveTab] = useState("topics");
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toast, setToast] = useState(null);
  const [mounted, setMounted] = useState(false);
  // Admin
  const [adminMode, setAdminMode] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminScreen, setAdminScreen] = useState("login"); // login | dashboard | scoring | register
  const [scoringDay, setScoringDay] = useState(1);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [feedbackDay, setFeedbackDay] = useState({ topic:"", note:"", rating:0 });
  const [feedbackSent, setFeedbackSent] = useState({});

  useEffect(() => { setMounted(true); }, []);

  function showToast(msg) { setToast(msg); setTimeout(()=>setToast(null), 3000); }

  // ── SIGN IN ─────────────────────────────────────────────────────────
  function handleSignIn() {
    const found = students.find(s => s.email.toLowerCase() === emailInput.trim().toLowerCase());
    if (!found) { setEmailError("Email not registered. Please contact your instructor."); return; }
    // Find first unlocked day
    const firstUnlocked = SCHEDULE.find(s => isDayUnlocked(s.date));
    setStudent(found);
    setActiveDay(firstUnlocked ? firstUnlocked.day : 1);
    // Mark attendance if not already marked today
    const todayStr = today();
    const dayEntry = SCHEDULE.find(s => s.date === todayStr);
    if (dayEntry && !attendance[found.email]?.[dayEntry.day]) {
      setAttendance(prev => ({
        ...prev,
        [found.email]: { ...(prev[found.email]||{}), [dayEntry.day]: new Date().toLocaleTimeString("en-NG", {hour:"2-digit",minute:"2-digit"}) },
      }));
      showToast(`✅ Attendance marked — Day ${dayEntry.day}`);
    }
    setScreen("portal");
    setEmailError("");
  }

  // ── LEADERBOARD DATA ────────────────────────────────────────────────
  const leaderboard = students
    .map(s => {
      const { total, max, count } = totalScore(scores, s.email);
      const daysIn = Object.keys(attendance[s.email]||{}).length;
      return { ...s, total, max, count, daysIn, pct: max>0 ? Math.round((total/max)*100) : 0 };
    })
    .sort((a,b) => b.total - a.total);

  // ── PORTAL ──────────────────────────────────────────────────────────
  const unlockedDays = SCHEDULE.filter(s => isDayUnlocked(s.date));
  const activeCurr = activeDay ? CURRICULUM[activeDay] : null;
  const activeSched = activeDay ? SCHEDULE.find(s=>s.day===activeDay) : null;

  // ══ SIGN IN SCREEN ══════════════════════════════════════════════════
  if (screen === "signin" && !adminMode) return (
    <div style={{
      minHeight:"100vh",
      background:`radial-gradient(ellipse at 55% 0%, #3D1F00 0%, #1A0F00 55%, #0D0700 100%)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Cormorant Garamond',Georgia,serif", padding:24,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600&display=swap');
      @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{
        width:"100%", maxWidth:400,
        opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(24px)",
        transition:"all 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{textAlign:"center", marginBottom:36}}>
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:14}}>
            <Flame size={32}/><Flame size={44}/><Flame size={32}/>
          </div>
          <h1 style={{fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:600, color:B.accent, letterSpacing:"0.18em", margin:0, textTransform:"uppercase"}}>Candlephilia</h1>
          <p style={{color:"#C8A96A", fontSize:12, letterSpacing:"0.28em", textTransform:"uppercase", marginTop:6, marginBottom:0}}>Candle Academy · Batch C · 2026</p>
        </div>

        <div style={{background:"rgba(253,246,227,0.05)", border:"1px solid rgba(200,134,10,0.28)", borderRadius:20, padding:"32px 28px", backdropFilter:"blur(14px)", boxShadow:"0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,200,66,0.1)"}}>
          <h2 style={{color:B.cream, fontSize:19, fontWeight:600, margin:"0 0 6px"}}>Student Sign In</h2>
          <p style={{color:"#C8A96A", fontSize:13, margin:"0 0 24px", lineHeight:1.65}}>Enter your registered email to access today's class and mark your attendance.</p>

          <label style={labelStyle}>Your Email Address</label>
          <input type="email" value={emailInput}
            onChange={e=>{setEmailInput(e.target.value);setEmailError("");}}
            onKeyDown={e=>e.key==="Enter"&&handleSignIn()}
            placeholder="yourname@email.com"
            style={{...inputStyle, borderColor:emailError?"#FC8181":"rgba(200,134,10,0.35)", marginBottom:emailError?8:20}}
          />
          {emailError && <p style={{color:"#FC8181",fontSize:13,margin:"0 0 16px"}}>{emailError}</p>}

          <button onClick={handleSignIn} style={primaryBtn}>Sign In & Mark Attendance</button>

          <div style={{marginTop:20, paddingTop:18, borderTop:"1px solid rgba(200,134,10,0.15)", display:"flex", justifyContent:"center"}}>
            <button onClick={()=>setAdminMode(true)} style={{background:"transparent", border:"none", color:"#5A3D00", fontSize:12, cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.1em"}}>
              🔐 Instructor Access
            </button>
          </div>
        </div>

        <p style={{color:"#4A2E00", fontSize:12, textAlign:"center", marginTop:16}}>
          Demo: ada@example.com · temi@example.com
        </p>
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  );

  // ══ ADMIN LOGIN ══════════════════════════════════════════════════════
  if (adminMode && adminScreen === "login") return (
    <div style={{minHeight:"100vh", background:`radial-gradient(ellipse at 55% 0%, #1A0F00 0%, #0D0700 100%)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',Georgia,serif", padding:24}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;600&display=swap')`}</style>
      <div style={{width:"100%", maxWidth:360}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <Flame size={40}/>
          <h1 style={{fontFamily:"'Cinzel',serif", fontSize:22, color:B.accent, letterSpacing:"0.18em", margin:"10px 0 4px"}}>INSTRUCTOR PANEL</h1>
          <p style={{color:"#8B6914", fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase"}}>Candlephilia Academy</p>
        </div>
        <div style={{background:"rgba(253,246,227,0.05)", border:"1px solid rgba(200,134,10,0.25)", borderRadius:18, padding:"28px 24px", backdropFilter:"blur(12px)"}}>
          <label style={labelStyle}>Admin Password</label>
          <input type="password" value={adminPw} onChange={e=>{setAdminPw(e.target.value);setAdminError("");}}
            onKeyDown={e=>e.key==="Enter"&&(adminPw===ADMIN_PASSWORD?(setAdminScreen("dashboard")):(setAdminError("Incorrect password")))}
            placeholder="Enter password"
            style={{...inputStyle, borderColor:adminError?"#FC8181":"rgba(200,134,10,0.35)", marginBottom:adminError?8:20}}
          />
          {adminError && <p style={{color:"#FC8181",fontSize:13,margin:"0 0 16px"}}>{adminError}</p>}
          <button onClick={()=>adminPw===ADMIN_PASSWORD?setAdminScreen("dashboard"):setAdminError("Incorrect password")} style={primaryBtn}>Enter</button>
          <button onClick={()=>setAdminMode(false)} style={{...ghostBtn, marginTop:10}}>← Back to Student Login</button>
        </div>
      </div>
    </div>
  );

  // ══ ADMIN DASHBOARD ══════════════════════════════════════════════════
  if (adminMode && adminScreen !== "login") return (
    <div style={{minHeight:"100vh", background:`linear-gradient(160deg,#FDF6E3 0%,#F5E8C0 100%)`, fontFamily:"'Cormorant Garamond',Georgia,serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;600&display=swap')`}</style>
      {/* Admin Header */}
      <div style={{background:B.dark, padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 4px 24px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Flame size={20}/>
          <div>
            <div style={{color:B.accent, fontFamily:"'Cinzel',serif", fontSize:14, letterSpacing:"0.12em"}}>CANDLEPHILIA</div>
            <div style={{color:"#8B6914", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase"}}>Instructor Panel</div>
          </div>
        </div>
        <div style={{display:"flex", gap:10}}>
          {["dashboard","scoring","register"].map(s=>(
            <button key={s} onClick={()=>setAdminScreen(s)} style={{
              padding:"6px 14px", borderRadius:8, border:`1px solid ${adminScreen===s?B.gold:"rgba(200,134,10,0.3)"}`,
              background:adminScreen===s?B.gold:"transparent", color:adminScreen===s?B.dark:"#C8A96A",
              fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:600, textTransform:"capitalize",
            }}>{s}</button>
          ))}
          <button onClick={()=>{setAdminMode(false);setAdminScreen("login");setAdminPw("");}} style={{padding:"6px 14px", borderRadius:8, border:"1px solid rgba(200,134,10,0.3)", background:"transparent", color:"#8B6914", fontSize:12, cursor:"pointer", fontFamily:"inherit"}}>Sign Out</button>
        </div>
      </div>

      <div style={{maxWidth:800, margin:"0 auto", padding:"24px 16px"}}>

        {/* ── ADMIN: DASHBOARD ── */}
        {adminScreen === "dashboard" && (
          <div>
            <h2 style={{color:B.text, fontFamily:"'Cinzel',serif", marginTop:0, letterSpacing:"0.1em"}}>Attendance Overview</h2>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
                <thead>
                  <tr style={{background:B.dark}}>
                    <th style={{...thStyle, textAlign:"left"}}>Student</th>
                    {SCHEDULE.map(s=>(
                      <th key={s.day} style={thStyle}>D{s.day}</th>
                    ))}
                    <th style={thStyle}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st,i)=>(
                    <tr key={st.email} style={{background:i%2===0?B.cardBg:"#FFF5D6"}}>
                      <td style={{padding:"10px 14px", color:B.text, fontWeight:600, fontSize:13, whiteSpace:"nowrap"}}>{st.name}</td>
                      {SCHEDULE.map(s=>(
                        <td key={s.day} style={{padding:"10px 8px", textAlign:"center", fontSize:16}}>
                          {attendance[st.email]?.[s.day] ? "✅" : isDayUnlocked(s.date) ? "❌" : "🔒"}
                        </td>
                      ))}
                      <td style={{padding:"10px 8px", textAlign:"center", color:B.gold, fontWeight:700}}>
                        {Object.keys(attendance[st.email]||{}).length}/{SCHEDULE.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={{color:B.text, fontFamily:"'Cinzel',serif", marginTop:32, letterSpacing:"0.1em"}}>Feedback Submitted</h2>
            {Object.keys(feedback).length === 0 ? (
              <p style={{color:B.muted, fontSize:14}}>No feedback submitted yet.</p>
            ) : (
              <div style={{display:"flex", flexDirection:"column", gap:10}}>
                {Object.entries(feedback).map(([key, fb])=>(
                  <div key={key} style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:12, padding:"14px 18px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
                      <span style={{color:B.gold, fontWeight:700, fontSize:14}}>{fb.studentName}</span>
                      <span style={{color:B.muted, fontSize:12}}>Day {fb.day} · {fb.topic}</span>
                    </div>
                    <p style={{color:B.text, fontSize:13, margin:0, lineHeight:1.6}}>{fb.note}</p>
                    <div style={{marginTop:6, fontSize:18}}>{["😕","😐","🙂","😊","🤩"][fb.rating-1]||"—"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ADMIN: SCORING ── */}
        {adminScreen === "scoring" && (
          <div>
            <h2 style={{color:B.text, fontFamily:"'Cinzel',serif", marginTop:0, letterSpacing:"0.1em"}}>Score Students</h2>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:24}}>
              {SCHEDULE.map(s=>(
                <button key={s.day} onClick={()=>setScoringDay(s.day)} style={{
                  padding:"8px 16px", borderRadius:99, border:`2px solid ${scoringDay===s.day?B.gold:B.border}`,
                  background:scoringDay===s.day?B.gold:"transparent", color:scoringDay===s.day?B.dark:B.muted,
                  fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                  opacity:isDayUnlocked(s.date)?1:0.4,
                }}>
                  Day {s.day}
                </button>
              ))}
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:16}}>
              {students.map(st=>(
                <div key={st.email} style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:14, padding:"18px 20px"}}>
                  <div style={{fontWeight:700, color:B.text, fontSize:15, marginBottom:14}}>{st.name}</div>
                  <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12}}>
                    {CRITERIA.map(c=>(
                      <div key={c}>
                        <label style={{color:B.muted, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", display:"block", marginBottom:4}}>{c} <span style={{color:B.gold}}>/10</span></label>
                        <input type="number" min="0" max="10"
                          value={scores[st.email]?.[scoringDay]?.[c] ?? ""}
                          onChange={e=>{
                            const val = e.target.value;
                            setScores(prev=>({
                              ...prev,
                              [st.email]:{...(prev[st.email]||{}),
                                [scoringDay]:{...(prev[st.email]?.[scoringDay]||{}), [c]:val}
                              }
                            }));
                          }}
                          placeholder="0–10"
                          style={{width:"100%", padding:"8px 10px", borderRadius:8, border:`1px solid ${B.border}`, background:"#FFFBF0", color:B.text, fontSize:15, fontFamily:"inherit", outline:"none", boxSizing:"border-box"}}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>showToast("✅ Scores saved!")} style={{...primaryBtn, marginTop:24}}>Save All Scores</button>
          </div>
        )}

        {/* ── ADMIN: REGISTER STUDENTS ── */}
        {adminScreen === "register" && (
          <div>
            <h2 style={{color:B.text, fontFamily:"'Cinzel',serif", marginTop:0, letterSpacing:"0.1em"}}>Registered Students</h2>
            <div style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:14, padding:"20px", marginBottom:24}}>
              <h3 style={{color:B.text, margin:"0 0 16px", fontSize:16}}>Add New Student</h3>
              <label style={labelStyle}>Full Name</label>
              <input value={newStudentName} onChange={e=>setNewStudentName(e.target.value)} placeholder="Student Full Name" style={{...inputStyle, marginBottom:12}}/>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={newStudentEmail} onChange={e=>setNewStudentEmail(e.target.value)} placeholder="student@email.com" style={{...inputStyle, marginBottom:16}}/>
              <button onClick={()=>{
                if(!newStudentName.trim()||!newStudentEmail.trim()){showToast("Fill in both fields.");return;}
                if(students.find(s=>s.email.toLowerCase()===newStudentEmail.toLowerCase())){showToast("Email already registered.");return;}
                setStudents(prev=>[...prev,{name:newStudentName.trim(),email:newStudentEmail.trim().toLowerCase()}]);
                setNewStudentName(""); setNewStudentEmail("");
                showToast("✅ Student registered!");
              }} style={primaryBtn}>Register Student</button>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:10}}>
              {students.map((s,i)=>(
                <div key={s.email} style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div>
                    <div style={{color:B.text, fontWeight:700, fontSize:14}}>{s.name}</div>
                    <div style={{color:B.muted, fontSize:12, marginTop:2}}>{s.email}</div>
                  </div>
                  <div style={{color:B.gold, fontWeight:700, fontSize:13}}>
                    {Object.keys(attendance[s.email]||{}).length}/{SCHEDULE.length} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  );

  // ══ STUDENT PORTAL ═══════════════════════════════════════════════════
  return (
    <div style={{minHeight:"100vh", background:`linear-gradient(160deg,#FDF6E3 0%,#F5E8C0 100%)`, fontFamily:"'Cormorant Garamond',Georgia,serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Cinzel:wght@400;600&display=swap');
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Header */}
      <div style={{background:B.dark, padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 4px 20px rgba(0,0,0,0.35)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Flame size={20}/>
          <div>
            <div style={{color:B.accent, fontFamily:"'Cinzel',serif", fontSize:14, letterSpacing:"0.14em"}}>CANDLEPHILIA</div>
            <div style={{color:"#8B6914", fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase"}}>Candle Academy · Batch C</div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{textAlign:"right"}}>
            <div style={{color:B.cream, fontSize:13, fontWeight:600}}>{student?.name}</div>
            <div style={{color:"#8B6914", fontSize:11}}>{Object.keys(attendance[student?.email]||{}).length}/{SCHEDULE.length} days</div>
          </div>
          <button onClick={()=>{setScreen("signin");setStudent(null);setEmailInput("");setActiveTab("topics");}} style={{padding:"6px 14px", borderRadius:8, border:"1px solid rgba(200,134,10,0.3)", background:"transparent", color:"#C8A96A", fontSize:12, cursor:"pointer", fontFamily:"inherit"}}>Sign Out</button>
        </div>
      </div>

      <div style={{maxWidth:720, margin:"0 auto", padding:"20px 14px"}}>

        {/* Welcome banner */}
        <div style={{background:`linear-gradient(135deg,${B.dark} 0%,${B.deep} 100%)`, borderRadius:16, padding:"22px 24px", marginBottom:22, boxShadow:"0 8px 32px rgba(26,15,0,0.2)", position:"relative", overflow:"hidden"}}>
          <div style={{position:"absolute", right:-8, top:-8, opacity:0.06, fontSize:110, lineHeight:1}}>🕯️</div>
          <div style={{color:B.accent, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:4}}>Welcome back</div>
          <h2 style={{color:B.cream, margin:"0 0 6px", fontSize:21, fontWeight:700}}>{student?.name} 🔥</h2>
          <div style={{display:"flex", gap:16, flexWrap:"wrap"}}>
            {SCHEDULE.map(s=>{
              const checked = attendance[student?.email]?.[s.day];
              const unlocked = isDayUnlocked(s.date);
              return (
                <div key={s.day} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:2}}>
                  <div style={{fontSize:16}}>{!unlocked?"🔒":checked?"✅":"⬜"}</div>
                  <div style={{color:"#8B6914", fontSize:10}}>D{s.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day navigation */}
        <div style={{display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:20}}>
          {SCHEDULE.map(s=>{
            const unlocked = isDayUnlocked(s.date);
            const isActive = activeDay === s.day;
            return (
              <button key={s.day}
                onClick={()=>{ if(!unlocked){showToast(`Day ${s.day} unlocks on ${s.label}`);return;} setActiveDay(s.day); setActiveTab("topics"); }}
                style={{
                  padding:"9px 16px", borderRadius:99, whiteSpace:"nowrap",
                  border:`2px solid ${isActive?B.gold:unlocked?B.border:"rgba(139,105,20,0.3)"}`,
                  background:isActive?B.gold:unlocked?"transparent":"rgba(26,15,0,0.04)",
                  color:isActive?B.dark:unlocked?B.muted:"rgba(139,105,20,0.4)",
                  fontSize:13, fontWeight:700, cursor:unlocked?"pointer":"not-allowed",
                  fontFamily:"inherit", transition:"all 0.18s",
                  opacity:unlocked?1:0.55,
                }}
              >
                {unlocked?"":"🔒 "}Day {s.day}
              </button>
            );
          })}
        </div>

        {activeDay && activeCurr && (
          <>
            {/* Day header */}
            <div style={{marginBottom:18}}>
              <h3 style={{color:B.text, margin:"0 0 2px", fontSize:18, fontFamily:"'Cinzel',serif", letterSpacing:"0.08em"}}>
                Day {activeDay} — {activeSched?.label}
              </h3>
              <div style={{color:B.muted, fontSize:13}}>
                {attendance[student?.email]?.[activeDay]
                  ? `✅ Attendance marked at ${attendance[student?.email][activeDay]}`
                  : today() === activeSched?.date
                    ? "⏳ Sign in again to mark today's attendance"
                    : "📅 Not yet attended"}
              </div>
            </div>

            {/* Tabs */}
            <div style={{display:"flex", borderBottom:`2px solid ${B.border}`, marginBottom:22, gap:0, overflowX:"auto"}}>
              {[
                {key:"topics", label:"📚 Topics"},
                {key:"essentials", label:"🧴 Essentials"},
                {key:"assignment", label:"📝 Assignment"},
                {key:"feedback", label:"💬 Feedback"},
                {key:"leaderboard", label:"🏆 Leaderboard"},
              ].map(t=>(
                <button key={t.key} onClick={()=>setActiveTab(t.key)} style={{
                  padding:"10px 15px", border:"none", fontFamily:"inherit", whiteSpace:"nowrap",
                  borderBottom:`3px solid ${activeTab===t.key?B.gold:"transparent"}`,
                  background:"transparent", color:activeTab===t.key?B.gold:B.muted,
                  fontSize:13, fontWeight:activeTab===t.key?700:500, cursor:"pointer",
                  marginBottom:-2, transition:"all 0.15s",
                }}>{t.label}</button>
              ))}
            </div>

            {/* ── TOPICS ── */}
            {activeTab === "topics" && (
              <div style={{display:"flex", flexDirection:"column", gap:10, animation:"fadeUp 0.4s ease"}}>
                {activeCurr.topics.map((t,i)=>(
                  <div key={i} style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 8px rgba(200,134,10,0.06)"}}>
                    <div style={{width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${B.gold},${B.accent})`, display:"flex", alignItems:"center", justifyContent:"center", color:B.dark, fontSize:13, fontWeight:700, flexShrink:0}}>
                      {i+1}
                    </div>
                    <span style={{color:B.text, fontSize:15, fontWeight:600, lineHeight:1.4}}>{t}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ── ESSENTIALS ── */}
            {activeTab === "essentials" && (
              <div style={{animation:"fadeUp 0.4s ease"}}>
                <p style={{color:B.muted, fontSize:14, marginTop:0, marginBottom:18}}>Come prepared with these items for Day {activeDay}.</p>
                <div style={{display:"flex", flexDirection:"column", gap:10}}>
                  {activeCurr.essentials.map((item,i)=>(
                    <div key={i} style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14}}>
                      <div style={{width:34, height:34, borderRadius:10, background:`linear-gradient(135deg,#FFF3CC,#F5E8A0)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0}}>🕯️</div>
                      <span style={{color:B.text, fontSize:14, fontWeight:500}}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── ASSIGNMENT ── */}
            {activeTab === "assignment" && (
              <div style={{animation:"fadeUp 0.4s ease"}}>
                {activeCurr.assignment ? (
                  <div style={{background:`linear-gradient(135deg,#FFF9ED,#FFF3CC)`, border:`2px solid ${B.accent}`, borderRadius:16, padding:"26px", position:"relative", overflow:"hidden"}}>
                    <div style={{position:"absolute", top:14, right:18, fontSize:44, opacity:0.1}}>📝</div>
                    <div style={{color:B.gold, fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, marginBottom:10}}>Your Task</div>
                    <p style={{color:B.text, fontSize:15, lineHeight:1.85, margin:"0 0 18px", whiteSpace:"pre-line"}}>{activeCurr.assignment}</p>
                    <div style={{paddingTop:14, borderTop:`1px solid #E8D5A0`, color:B.muted, fontSize:12, letterSpacing:"0.1em"}}>📅 Due before the start of the next class</div>
                  </div>
                ) : (
                  <div style={{background:B.cardBg, border:`1px solid ${B.border}`, borderRadius:16, padding:"32px", textAlign:"center"}}>
                    <div style={{fontSize:48, marginBottom:10}}>✨</div>
                    <p style={{color:B.muted, fontSize:15, margin:0}}>No assignment for Day {activeDay}. Focus on today's class!</p>
                  </div>
                )}
              </div>
            )}

            {/* ── FEEDBACK ── */}
            {activeTab === "feedback" && (
              <div style={{animation:"fadeUp 0.4s ease"}}>
                {feedbackSent[activeDay] ? (
                  <div style={{background:"#F0FFF4", border:"2px solid #68D391", borderRadius:16, padding:"32px", textAlign:"center"}}>
                    <div style={{fontSize:48, marginBottom:10}}>✅</div>
                    <h3 style={{color:"#276749", margin:"0 0 8px", fontFamily:"'Cinzel',serif"}}>Feedback Received!</h3>
                    <p style={{color:"#2F855A", margin:0, fontSize:14}}>Your instructor will review this before the next class.</p>
                    <button onClick={()=>setFeedbackSent(p=>({...p,[activeDay]:false}))} style={{...ghostBtn, marginTop:20, borderColor:"#68D391", color:"#276749"}}>Submit Another</button>
                  </div>
                ) : (
                  <div style={{display:"flex", flexDirection:"column", gap:18}}>
                    <div>
                      <label style={labelStyle}>Which topic are you referring to?</label>
                      <select value={feedbackDay.topic} onChange={e=>setFeedbackDay(f=>({...f,topic:e.target.value}))}
                        style={{width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid ${B.border}`, background:B.cardBg, color:B.text, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box"}}>
                        <option value="">— Select a topic —</option>
                        {activeCurr.topics.map((t,i)=><option key={i} value={t}>{t}</option>)}
                        <option value="General">General comment</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>What would you like more clarity on?</label>
                      <textarea value={feedbackDay.note} onChange={e=>setFeedbackDay(f=>({...f,note:e.target.value}))}
                        placeholder="Describe what was unclear or what you'd like explained further..."
                        rows={5} style={{width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid ${B.border}`, background:B.cardBg, color:B.text, fontSize:14, fontFamily:"inherit", outline:"none", resize:"vertical", lineHeight:1.65, boxSizing:"border-box"}}/>
                    </div>
                    <div>
                      <label style={labelStyle}>How was today's class overall?</label>
                      <div style={{display:"flex", gap:8}}>
                        {["😕","😐","🙂","😊","🤩"].map((em,i)=>(
                          <button key={i} onClick={()=>setFeedbackDay(f=>({...f,rating:i+1}))} style={{
                            width:46, height:46, borderRadius:12,
                            border:`2px solid ${feedbackDay.rating===i+1?B.gold:B.border}`,
                            background:feedbackDay.rating===i+1?"#FFF3CC":B.cardBg,
                            fontSize:22, cursor:"pointer",
                            transform:feedbackDay.rating===i+1?"scale(1.18)":"scale(1)",
                            transition:"all 0.15s",
                          }}>{em}</button>
                        ))}
                      </div>
                    </div>
                    <button onClick={()=>{
                      if(!feedbackDay.topic||!feedbackDay.note){showToast("Please fill in all fields.");return;}
                      const key = `${student.email}-${activeDay}-${Date.now()}`;
                      setFeedback(prev=>({...prev,[key]:{studentName:student.name, email:student.email, day:activeDay, topic:feedbackDay.topic, note:feedbackDay.note, rating:feedbackDay.rating}}));
                      setFeedbackSent(p=>({...p,[activeDay]:true}));
                      setFeedbackDay({topic:"",note:"",rating:0});
                      showToast("💬 Feedback sent!");
                    }} style={primaryBtn}>Submit Feedback</button>
                  </div>
                )}
              </div>
            )}

            {/* ── LEADERBOARD ── */}
            {activeTab === "leaderboard" && (
              <div style={{animation:"fadeUp 0.4s ease"}}>
                <h3 style={{color:B.text, marginTop:0, marginBottom:6, fontFamily:"'Cinzel',serif", letterSpacing:"0.1em", fontSize:17}}>🏆 Batch C Leaderboard</h3>
                <p style={{color:B.muted, fontSize:13, marginTop:0, marginBottom:20}}>Scores are based on participation, assignments, engagement & punctuality.</p>
                <div style={{display:"flex", flexDirection:"column", gap:10}}>
                  {leaderboard.map((s,i)=>{
                    const isMe = s.email === student?.email;
                    const rank = i+1;
                    return (
                      <div key={s.email} style={{
                        background:isMe?`linear-gradient(135deg,#FFF9ED,#FFF3CC)`:B.cardBg,
                        border:`${isMe?2:1}px solid ${isMe?B.gold:B.border}`,
                        borderRadius:14, padding:"16px 20px",
                        display:"flex", alignItems:"center", gap:16,
                        boxShadow:isMe?"0 4px 20px rgba(200,134,10,0.18)":"none",
                      }}>
                        <div style={{fontSize:rank<=3?26:18, fontWeight:700, color:B.gold, minWidth:36, textAlign:"center", fontFamily:"'Cinzel',serif"}}>
                          {medal(rank)}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{color:B.text, fontWeight:700, fontSize:15}}>
                            {s.name} {isMe && <span style={{color:B.gold, fontSize:12}}>(You)</span>}
                          </div>
                          <div style={{color:B.muted, fontSize:12, marginTop:2}}>{s.daysIn} classes attended</div>
                          <div style={{background:"#E8D5A0", borderRadius:99, height:6, marginTop:8, overflow:"hidden"}}>
                            <div style={{width:`${s.pct}%`, height:"100%", background:`linear-gradient(90deg,${B.gold},${B.accent})`, borderRadius:99, transition:"width 1s ease"}}/>
                          </div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{color:B.gold, fontWeight:700, fontSize:20, fontFamily:"'Cinzel',serif"}}>{s.total}</div>
                          <div style={{color:B.muted, fontSize:11}}>points</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p style={{color:"#C8A96A", fontSize:12, textAlign:"center", marginTop:20, fontStyle:"italic"}}>
                  Scores are updated by your instructor after each class. Keep showing up! 🔥
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {toast && <Toast msg={toast}/>}
    </div>
  );
}

// ── SHARED STYLES ─────────────────────────────────────────────────────
const labelStyle = { color:B.muted, fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:7, fontFamily:"'Cormorant Garamond',Georgia,serif" };
const inputStyle = { width:"100%", padding:"11px 13px", borderRadius:10, border:`1px solid rgba(200,134,10,0.35)`, background:"rgba(26,15,0,0.55)", color:B.cream, fontSize:14, fontFamily:"'Cormorant Garamond',Georgia,serif", outline:"none", boxSizing:"border-box" };
const primaryBtn = { width:"100%", padding:"13px", borderRadius:10, border:"none", background:`linear-gradient(135deg,${B.gold},${B.softGold})`, color:B.dark, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Cormorant Garamond',Georgia,serif", letterSpacing:"0.05em", boxShadow:`0 4px 18px rgba(200,134,10,0.35)`, transition:"all 0.2s" };
const ghostBtn = { width:"100%", padding:"11px", borderRadius:10, border:`1px solid ${B.border}`, background:"transparent", color:B.muted, fontSize:14, cursor:"pointer", fontFamily:"'Cormorant Garamond',Georgia,serif" };
const thStyle = { padding:"10px 10px", color:B.accent, fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.1em", textAlign:"center", borderBottom:`1px solid rgba(200,134,10,0.2)` };
