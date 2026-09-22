import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileCheck2,
  Fingerprint,
  Globe2,
  Linkedin,
  LockKeyhole,
  LogIn,
  Mail,
  Menu,
  Network,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  UserRound,
  X,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

type Status = "BLACK" | "RED" | "YELLOW";
type EntityType = "Employee" | "Company" | "NGO / INGO";

type RiskRecord = {
  fileNo: string;
  status: Status;
  type: EntityType;
  name: string;
  role: string;
  profile: string;
  nrc?: string;
  id?: string;
  license?: string;
  crimeCode: string;
  summary: string;
  legal: string;
  evidence: string;
  signatures: string;
  associated: string;
  initials: string;
  avatarTone: string;
  mark: string;
};

const records: RiskRecord[] = [
  {
    fileNo: "EMP-B-2026-0012",
    status: "BLACK",
    type: "Employee",
    name: "U Aung Min Khant",
    role: "Senior Financial Officer",
    profile: "NexusTech Solutions Co., Ltd. (Fintech Services)",
    nrc: "9/KAMASA(N)123456",
    id: "FIN-2023-089",
    crimeCode: "IND-V-01",
    summary: "Fraudulently transferred over 50 million MMK from company financial accounts to personal bank accounts at the Yangon headquarters.",
    legal: "Court Summons No. YGN-CRT-2026/045 · Hearing: Mar 10, 2026 · Warrant: W-2026-089",
    evidence: "Complaint filed Dec 2, 2025. Investigated and verified by GUARDIAN Investigation Team Jan 10, 2026; final legal approval Feb 5, 2026.",
    signatures: "CEO of NexusTech Solutions Co., Ltd. + GUARDIAN Verified Legal Officer · Digital signatures verified",
    associated: "Daw Su Su Hlaing · Junior Accountant · Yellow status",
    initials: "AK",
    avatarTone: "tone-ink",
    mark: "01",
  },
  {
    fileNo: "EMP-R-2026-0045",
    status: "RED",
    type: "Employee",
    name: "U Zaw Myo Htet",
    role: "Site Engineer",
    profile: "Future Build Construction Co., Ltd.",
    nrc: "9/MaHtaLa(N)654321",
    id: "ENG-2024-112",
    crimeCode: "IND-V-05",
    summary: "Repeated workplace harassment and safety protocol violations against female employees at a construction site in Mandalay.",
    legal: "Court Summons No. MDY-CRT-2026/012 · Hearing: Apr 5, 2026 · Warrant: W-2026-034",
    evidence: "Reported to HR Feb 20, 2026. CCTV footage and witness testimony confirmed by GUARDIAN Investigation Team Mar 5, 2026.",
    signatures: "HR Director of Future Build Construction + GUARDIAN Legal Officer · Digital signatures verified",
    associated: "None reported",
    initials: "ZM",
    avatarTone: "tone-scarlet",
    mark: "02",
  },
  {
    fileNo: "COM-B-2026-009",
    status: "BLACK",
    type: "Company",
    name: "Alpha Cloud Dynamics",
    role: "Private Limited · B2B Services",
    profile: "IT and software development agency",
    nrc: "12/MAYATA(N)789012",
    license: "DICA-109876543",
    crimeCode: "CORP-V-02",
    summary: "Unauthorized theft and commercial exploitation of proprietary software architecture and source code from partner companies.",
    legal: "IP Infringement Court Summons No. YGN-IP-2026/007 · Hearing: May 15, 2026 · Warrant: W-2026-112",
    evidence: "Server logs submitted by the aggrieved company. Forensic audit verified by GUARDIAN in February 2026 and confirmed by legal review.",
    signatures: "Aggrieved Company CEO + IP Court Verification Seal",
    associated: "Beta Tech Hub · Indirect associate",
    initials: "AC",
    avatarTone: "tone-cloud",
    mark: "03",
  },
  {
    fileNo: "NGO-B-2026-003",
    status: "RED",
    type: "NGO / INGO",
    name: "Hope Reach Network",
    role: "Local NGO",
    profile: "Humanitarian aid and rural development",
    nrc: "8/MaKaNa(N)456789",
    license: "NGO-REG-2019-045",
    crimeCode: "NGO-V-02",
    summary: "Misappropriation of rural development grants exceeding $100,000 USD and falsification of project outcomes in Magway Region.",
    legal: "Financial Intelligence Unit Summons No. NPT-FIU-2026/021 · Warrant: W-2026-077",
    evidence: "Donor reporting discrepancies reported Jan 2026. Fraud confirmed following GUARDIAN field audits and independent third-party auditors.",
    signatures: "Aggrieved Donor Director + Court Verification Seal",
    associated: "U Tin Win · Finance Manager · Blacklisted",
    initials: "HR",
    avatarTone: "tone-leaf",
    mark: "04",
  },
  {
    fileNo: "EMP-Y-2026-0158",
    status: "YELLOW",
    type: "Employee",
    name: "Ma Aye Thanda",
    role: "Digital Marketing Executive",
    profile: "Zenith Marketing Agency",
    nrc: "14/PaThaNa(N)987654",
    id: "MKT-2024-055",
    crimeCode: "IND-V-06",
    summary: "Abrupt job abandonment without the contractual notice period, causing project delays and operational disruption at the Yangon branch.",
    legal: "No court litigation · Internal HR contractual warning level · Warrant: N/A",
    evidence: "Complaint filed by Zenith Marketing HR Apr 15, 2026, supported by attendance logs and communications; verified May 1, 2026.",
    signatures: "Zenith Marketing Agency HR Manager + GUARDIAN Officer",
    associated: "None reported",
    initials: "AT",
    avatarTone: "tone-gold",
    mark: "05",
  },
  {
    fileNo: "COM-Y-2026-088",
    status: "YELLOW",
    type: "Company",
    name: "Blue Wave Logistics",
    role: "Private Limited",
    profile: "Transportation and supply chain services",
    nrc: "13/NASANA(N)347860",
    license: "DICA-345678901",
    crimeCode: "CORP-V-04",
    summary: "Persistent failure to settle outstanding invoices to subcontractors after receiving services along Yangon–Mandalay freight routes.",
    legal: "Under warning review · No warrant recorded",
    evidence: "Unpaid invoices and contract copies submitted by three aggrieved subcontractors in February 2026; verified in March 2026.",
    signatures: "Signatures of aggrieved subcontractors",
    associated: "None reported",
    initials: "BW",
    avatarTone: "tone-ocean",
    mark: "06",
  },
  {
    fileNo: "NGO-Y-2026-024",
    status: "YELLOW",
    type: "NGO / INGO",
    name: "Bright Future Education",
    role: "INGO Local Branch",
    profile: "Youth education and vocational training",
    nrc: "9/KAMASA(N)095432",
    license: "INGO-REG-2021-089",
    crimeCode: "NGO-V-04",
    summary: "Nepotism and procurement opacity in vocational training center construction projects throughout 2025.",
    legal: "Compliance warning · No court litigation recorded",
    evidence: "Procurement tender logs submitted by former whistleblowers in January 2026; verified by GUARDIAN Investigation Team in February 2026.",
    signatures: "Whistleblower signatures · Former employees",
    associated: "Chen Brothers Co., Ltd. · Procurement supplier",
    initials: "BF",
    avatarTone: "tone-sun",
    mark: "07",
  },
];

const recommendations = [
  {
    label: "EMPLOYEE",
    title: "Daw Thazin Oo",
    role: "Operations Manager · Global Reach Trading Co., Ltd.",
    body: "Flawless disciplinary record, strict compliance and outstanding leadership skills.",
    metric: "8+ yrs",
    metricLabel: "operations",
    seal: "SECURE HIRE",
    accent: "blue",
  },
  {
    label: "COMPANY",
    title: "Prime Build Development Co., Ltd.",
    role: "Real estate development and construction management",
    body: "12 major commercial projects delivered with zero safety violations and full tax clearance.",
    metric: "100%",
    metricLabel: "clear record",
    seal: "CORPORATE TRUST",
    accent: "violet",
  },
  {
    label: "NGO / INGO",
    title: "Clean Water Initiative Myanmar",
    role: "Sustainable clean water solutions for rural communities",
    body: "All grants utilized directly for field projects with transparent financial reporting.",
    metric: "0",
    metricLabel: "operational delays",
    seal: "DONOR APPROVED",
    accent: "cyan",
  },
];

function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`logo-mark ${small ? "logo-mark-small" : ""}`} aria-hidden="true">
      <span className="logo-ring logo-ring-outer" />
      <span className="logo-ring logo-ring-inner" />
      <span className="logo-core"><ShieldCheck size={small ? 14 : 18} strokeWidth={2.5} /></span>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  return <span className={`status-pill status-${status.toLowerCase()}`}><i />{status}</span>;
}

function RiskAvatar({ record, large = false }: { record: RiskRecord; large?: boolean }) {
  return (
    <div className={`risk-avatar ${record.avatarTone} ${large ? "risk-avatar-large" : ""}`}>
      <div className="avatar-halo" />
      <div className="avatar-head" />
      <div className="avatar-body" />
      <span className="avatar-initials">{record.initials}</span>
      <span className="avatar-corner">{record.mark}</span>
    </div>
  );
}

function OrbitVisual() {
  return (
    <div className="orbit-stage" aria-label="Interactive 3D risk intelligence visualization" role="img">
      <div className="orbit-glow" />
      <div className="orbit-plane orbit-plane-one" />
      <div className="orbit-plane orbit-plane-two" />
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <div className="orbit-ring ring-three" />
      <div className="shield-object">
        <div className="shield-face"><Shield size={42} strokeWidth={1.5} /></div>
        <div className="shield-side" />
        <div className="shield-check"><Check size={24} /></div>
      </div>
      <div className="data-node node-a"><span />VERIFIED</div>
      <div className="data-node node-b"><span />SECURE</div>
      <div className="data-node node-c"><span />EVIDENCE</div>
      <div className="orbit-label label-top"><span className="pulse-dot" /> LIVE RISK INDEX <b>99.2</b></div>
      <div className="orbit-label label-bottom">PBVS / CORE SYSTEM <span>·</span> 2026</div>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 160, damping: 18 }), [-100, 100], [4, -4]);
  const rotateY = useTransform(useSpring(x, { stiffness: 160, damping: 18 }), [-100, 100], [-4, 4]);
  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >{children}</motion.div>
  );
}

function RecordCard({ record, onOpen }: { record: RiskRecord; onOpen: (record: RiskRecord) => void }) {
  return (
    <TiltCard className="record-card">
      <button className="record-card-button" onClick={() => onOpen(record)} aria-label={`Open details for ${record.name}`}>
        <div className="record-card-top"><span className="file-no">{record.fileNo}</span><StatusPill status={record.status} /></div>
        <div className="record-card-main">
          <RiskAvatar record={record} />
          <div className="record-summary">
            <h3>{record.name}</h3>
            <p>{record.role}</p>
            <div className="record-meta"><span>{record.type}</span><span>{record.nrc ?? record.license}</span></div>
          </div>
        </div>
        <div className="record-card-footer"><span>{record.crimeCode}</span><span className="check-more">Check more <ArrowRight size={14} /></span></div>
        <span className="card-sheen" />
      </button>
    </TiltCard>
  );
}

function LoginModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div className="modal-backdrop login-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="login-modal" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-close" onClick={onClose} aria-label="Close sign in"><X size={18} /></button>
        <div className="login-brand"><LogoMark /><span><b>GUARDIAN</b><small>PBVS / RISK INTELLIGENCE</small></span></div>
        <span className="section-index">SECURE ACCESS</span>
        <h2 id="login-title">Welcome back.</h2>
        <p className="login-subtitle">Sign in to continue to your GUARDIAN workspace.</p>
        <form className="login-form" onSubmit={(event) => { event.preventDefault(); toast.success("Demo sign in submitted."); }}>
          <label>Username<input name="username" type="text" autoComplete="username" placeholder="Enter your username" required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required /></label>
          <button className="button-primary login-submit" type="submit"><LogIn size={16} /> Sign in</button>
        </form>
        <div className="login-divider"><span>or continue with</span></div>
        <div className="social-login-grid">
          <button className="social-login-button" type="button" onClick={() => toast("Google sign in is ready for OAuth integration.")}><span className="social-letter social-google">G</span> Google</button>
          <button className="social-login-button" type="button" onClick={() => toast("LinkedIn sign in is ready for OAuth integration.")}><Linkedin size={16} className="social-linkedin" /> LinkedIn</button>
        </div>
        <p className="login-note"><LockKeyhole size={14} /> Demo interface — no credentials are stored.</p>
      </motion.div>
    </motion.div>
  );
}

function DetailModal({ record, onClose }: { record: RiskRecord; onClose: () => void }) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="detail-modal" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button className="modal-close" onClick={onClose} aria-label="Close record details"><X size={18} /></button>
        <div className="detail-hero">
          <div className="detail-identity"><RiskAvatar record={record} large /><div><span className="eyebrow">GUARDIAN VERIFIED RECORD</span><h2 id="detail-title">{record.name}</h2><p>{record.role} · {record.type}</p></div></div>
          <div className="detail-status"><StatusPill status={record.status} /><span>{record.fileNo}</span></div>
        </div>
        <div className="detail-grid">
          <div className="detail-section"><span className="detail-label">Identity & registration</span><h4>{record.nrc ?? record.license}</h4><p>{record.id ? `Internal ID · ${record.id}` : `License · ${record.license}`}</p><p>Previous / current profile · {record.profile}</p></div>
          <div className="detail-section"><span className="detail-label">Violation code</span><h4>{record.crimeCode}</h4><p>Recorded against {record.type.toLowerCase()} status review.</p></div>
          <div className="detail-section detail-wide"><span className="detail-label">About the record</span><h4>{record.summary}</h4></div>
          <div className="detail-section"><span className="detail-label">Legal action</span><p>{record.legal}</p></div>
          <div className="detail-section"><span className="detail-label">Evidence log</span><p>{record.evidence}</p></div>
          <div className="detail-section"><span className="detail-label">Signatures & seals</span><p>{record.signatures}</p><div className="verified-line"><BadgeCheck size={16} /> Digital signatures verified</div></div>
          <div className="detail-section"><span className="detail-label">Associated entities</span><p>{record.associated}</p></div>
        </div>
        <div className="modal-footnote"><LockKeyhole size={15} /> This demonstration record is presented for interface review. Production records require authorized account access.</div>
      </motion.div>
    </motion.div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status | "ALL">("ALL");
  const [entityType, setEntityType] = useState<EntityType | "ALL">("ALL");
  const [selectedRecord, setSelectedRecord] = useState<RiskRecord | null>(null);
  const [cookieVisible, setCookieVisible] = useState(true);
  const [activePlan, setActivePlan] = useState("Monthly");
  const [loginOpen, setLoginOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesSearch = `${record.name} ${record.fileNo} ${record.crimeCode} ${record.profile}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "ALL" || record.status === status;
    const matchesType = entityType === "ALL" || record.type === entityType;
    return matchesSearch && matchesStatus && matchesType;
  }), [search, status, entityType]);

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const routeName = location === "/verify-records" ? "verify" : location === "/orgguard" ? "orgguard" : location === "/about" ? "about" : "overview";

  return (
    <div className={`site-shell route-${routeName}`}>
      <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => goTo("/")} aria-label="Go to GUARDIAN home"><LogoMark /><span><b>GUARDIAN</b><small>PBVS / RISK INTELLIGENCE</small></span></button>
        <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`} aria-label="Primary navigation">
          <button onClick={() => goTo("/")}>Overview</button><button onClick={() => goTo("/verify-records")}>Verify records</button><button onClick={() => goTo("/orgguard")}>OrgGuard</button><button onClick={() => goTo("/about")}>About</button>
          <button className="nav-mobile-cta" onClick={() => goTo("/verify-records")}>Request access <ArrowUpRightIcon /></button>
        </nav>
        <div className="nav-actions"><button className="nav-login" onClick={() => setLoginOpen(true)}>Sign in <CircleUserRound size={16} /></button><button className="nav-cta" onClick={() => goTo("/verify-records")}>Request access <ArrowRight size={15} /></button></div>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="overview" className="route-screen route-overview hero-section section-pad">
          <div className="hero-grid"><div className="hero-copy">
            <motion.div className="eyebrow eyebrow-blue" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}><span className="eyebrow-line" /> B2B VERIFICATION INFRASTRUCTURE <span className="eyebrow-dot" /></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.05 }}>Eliminate workplace risks <em>before</em> they cost your enterprise.</motion.h1>
            <motion.p className="hero-subcopy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}>GUARDIAN turns evidence-backed background verification into a clear operating advantage for hiring, funding and investment decisions.</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}><button className="button-primary" onClick={() => goTo("/verify-records")}>Explore the registry <ArrowUpRightIcon /></button><button className="button-text" onClick={() => goTo("/about")}>How it works <ArrowRight size={16} /></button></motion.div>
            <div className="hero-proof"><div className="proof-avatars"><span>AT</span><span>ZM</span><span>HR</span><span>+</span></div><div><div className="proof-stars">★★★★★ <b>4.9/5</b></div><p>Built for responsible decision-makers</p></div></div>
          </div><motion.div className="hero-visual-wrap" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}><OrbitVisual /></motion.div></div>
          <div className="hero-bottomline"><span>SCROLL TO DISCOVER</span><div className="scroll-line"><i /></div><span>01 / 06</span></div>
        </section>

        <section id="trust" className="route-screen route-overview logo-strip section-pad"><p>Trusted thinking for high-stakes decisions</p><div className="logo-words"><span><Building2 size={18} /> ENTERPRISE</span><span><Network size={18} /> B2B NETWORK</span><span><Globe2 size={18} /> REGIONAL DATA</span><span><Fingerprint size={18} /> LEGAL GRADE</span></div></section>

        <section id="verify" className="route-screen route-verify registry-section section-pad section-paper"><div className="section-heading-row"><div><span className="section-index">02 / REGISTRY</span><h2>Protect your <span>sustainability.</span></h2><p>Search verified records across corporate, organization and employee risk categories before you commit resources.</p></div><button className="button-outline" onClick={() => toast.success("Verification request queued for your workspace.")}>Start a private check <ArrowUpRightIcon /></button></div>
          <div className="registry-shell"><div className="registry-toolbar"><div className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, file number or code..." aria-label="Search risk records" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={14} /></button>}</div><div className="filter-group"><span className="filter-label">STATUS</span>{(["ALL", "BLACK", "RED", "YELLOW"] as const).map((item) => <button key={item} className={status === item ? "filter-active" : ""} onClick={() => setStatus(item)}>{item === "ALL" ? "All" : item}</button>)}<span className="filter-divider" /><span className="filter-label">TYPE</span><select value={entityType} onChange={(event) => setEntityType(event.target.value as EntityType | "ALL")} aria-label="Filter by entity type"><option value="ALL">All entities</option><option value="Employee">Employees</option><option value="Company">Companies</option><option value="NGO / INGO">NGO / INGO</option></select></div></div>
            <div className="registry-count"><span><b>{filteredRecords.length}</b> visible records</span><span><i className="live-dot" /> Database sync live · refreshed 2m ago</span></div>
            {filteredRecords.length > 0 ? <div className="record-grid">{filteredRecords.map((record, index) => <motion.div key={record.fileNo} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.045 }}><RecordCard record={record} onOpen={setSelectedRecord} /></motion.div>)}</div> : <div className="empty-state"><Search size={28} /><h3>No matching records</h3><p>Try a different name, code, status or entity type.</p><button className="button-text" onClick={() => { setSearch(""); setStatus("ALL"); setEntityType("ALL"); }}>Reset filters <ArrowRight size={16} /></button></div>}
          </div>
        </section>

        <section id="method" className="route-screen route-about cover-section section-pad"><div className="cover-art cover-art-image"><div className="cover-grid-lines" /><img className="cover-logo-image" src={`${import.meta.env.BASE_URL}brand/guardian-logo.png`} alt="GUARDIAN logo" /><span className="cover-stamp stamp-left">EVIDENCE / 04</span><span className="cover-stamp stamp-right">PROTECT / 24</span></div><div className="cover-copy"><span className="section-index">03 / THE METHOD</span><h2>Clarity is a <span>control.</span></h2><p>Every profile is a compact signal. Open the record only when you need the full evidence trail, legal action, associated entities and verified signatures behind it.</p><div className="cover-list"><div><i>01</i><span><b>Evidence-backed</b><small>Audited documents, CCTV and official notices.</small></span></div><div><i>02</i><span><b>Dual-tier review</b><small>Technical specialists and legal advocates.</small></span></div><div><i>03</i><span><b>Fair appeals</b><small>A structured protocol for corrections.</small></span></div></div><button className="button-text" onClick={() => goTo("/about")}>See our system <ArrowRight size={16} /></button></div></section>

        <section id="signals" className="route-screen route-orgguard stats-section section-pad"><div className="stats-intro"><span className="section-index">04 / SIGNALS</span><h2>Decisions with <span>less noise.</span></h2><p>Risk intelligence built to compress uncertainty without hiding the story behind a status.</p></div><div className="stat-cards"><TiltCard className="stat-card"><ShieldCheck size={20} /><strong>99.2<span>%</span></strong><p>verification signal integrity</p><i /></TiltCard><TiltCard className="stat-card stat-card-blue"><Clock3 size={20} /><strong>24<span>/7</span></strong><p>on-demand B2B portal access</p><i /></TiltCard><TiltCard className="stat-card stat-card-dark"><Target size={20} /><strong>4<span> tiers</span></strong><p>clear color-coded risk language</p><i /></TiltCard></div></section>

        <section id="orgguard" className="route-screen route-orgguard orgguard-section section-pad section-paper"><div className="section-heading-row"><div><span className="section-index">05 / ORGGUARD</span><h2>Invest with confidence.<br /><span>Protect every asset.</span></h2><p>Targeted recommendations for investors, donors and HR leaders who need a stronger “yes”.</p></div><div className="orgguard-mark"><Sparkles size={16} /> ORGGUARD <small>VERIFIED RECOMMENDATIONS</small></div></div><div className="recommendation-grid">{recommendations.map((item, index) => <motion.div key={item.title} className={`recommendation-card recommendation-${item.accent}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }}><div className="recommendation-top"><span>{item.label}</span><BadgeCheck size={17} /></div><div className="recommendation-body"><div className="recommendation-avatar"><span>{item.title.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div className="seal-check"><Check size={11} /></div></div><div><h3>{item.title}</h3><p className="recommendation-role">{item.role}</p></div></div><p className="recommendation-quote">“{item.body}”</p><div className="recommendation-bottom"><div><strong>{item.metric}</strong><small>{item.metricLabel}</small></div><span className="recommendation-seal"><ShieldCheck size={14} /> {item.seal}</span></div><button onClick={() => toast("Recommendation detail view is ready for your authorized workspace.")}>View recommendation <ArrowUpRightIcon /></button></motion.div>)}</div></section>

        <section id="access" className="route-screen route-orgguard pricing-section section-pad"><div className="pricing-head"><div><span className="section-index">06 / ACCESS</span><h2>Choose your <span>level of certainty.</span></h2></div><div className="plan-switcher" role="tablist" aria-label="Pricing cadence">{["Monthly", "Annual"].map((plan) => <button key={plan} className={activePlan === plan ? "plan-active" : ""} onClick={() => setActivePlan(plan)}>{plan}{plan === "Annual" && <small>2 months free</small>}</button>)}</div></div><div className="pricing-grid"><div className="price-card"><span>Regional / SME</span><h3>{activePlan === "Monthly" ? "$40" : "$400"}<small>/{activePlan === "Monthly" ? "mo" : "yr"}</small></h3><p>Essential verification for growing teams.</p><ul><li><Check /> Nationwide database connection</li><li><Check /> 15 days OrgGuard access</li><li><Check /> Credential and compliance checks</li></ul><button className="button-outline" onClick={() => toast.success("Regional plan interest noted.")}>Select regional <ArrowRight size={16} /></button></div><div className="price-card price-card-featured"><div className="popular-tag">MOST REQUESTED</div><span>Corporate</span><h3>{activePlan === "Monthly" ? "$150" : "$1,500"}<small>/{activePlan === "Monthly" ? "mo" : "yr"}</small></h3><p>Year-round confidence for enterprise decisions.</p><ul><li><Check /> Full OrgGuard enterprise access</li><li><Check /> B2B partner networks</li><li><Check /> Priority dispute support</li></ul><button className="button-primary" onClick={() => toast.success("Corporate plan interest noted.")}>Talk to GUARDIAN <ArrowUpRightIcon /></button></div><div className="price-card"><span>Private Premium</span><h3>{activePlan === "Monthly" ? "$2.2k" : "$2,200"}<small>/yr</small></h3><p>Dual-mode access for high-security environments.</p><ul><li><Check /> Regional + international databases</li><li><Check /> Government and embassy ready</li><li><Check /> 24/7 unrestricted access</li></ul><button className="button-outline" onClick={() => toast.success("Premium plan interest noted.")}>Explore premium <ArrowRight size={16} /></button></div></div></section>

        <section id="about" className="route-screen route-about about-section section-pad"><div className="about-copy"><span className="section-index">07 / GUARDIAN PBVS</span><h2>A safer workplace is a <span>business advantage.</span></h2><p>GUARDIAN is a law-tech B2B SaaS platform delivering tamper-proof workforce risk assessments with transparency, legal defensibility and operational security.</p><button className="button-text" onClick={() => toast("A GUARDIAN specialist will be available in the next product release.")}>Talk to a specialist <ArrowRight size={16} /></button></div><div className="about-system"><div className="system-node system-node-main"><LogoMark small /><span>GUARDIAN<br /><b>PBVS CORE</b></span></div><div className="system-node system-node-a"><FileCheck2 size={17} /><span>Evidence<br /><b>audited</b></span></div><div className="system-node system-node-b"><ScaleIcon /><span>Legal<br /><b>reviewed</b></span></div><div className="system-node system-node-c"><ShieldCheck size={17} /><span>Signal<br /><b>verified</b></span></div><div className="system-line line-a" /><div className="system-line line-b" /><div className="system-line line-c" /></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><div><button className="brand-lockup footer-brand" onClick={() => goTo("/")}><LogoMark small /><span><b>GUARDIAN</b><small>PBVS / RISK INTELLIGENCE</small></span></button><p>Eliminate workplace risks before they cost your enterprise.</p></div><div className="footer-links"><div><b>Explore</b><button onClick={() => goTo("/verify-records")}>Verify records</button><button onClick={() => goTo("/orgguard")}>OrgGuard</button><button onClick={() => goTo("/about")}>About us</button></div><div><b>Connect</b><a href="mailto:guardianpbvs@gmail.com"><Mail size={14} /> Email</a><a href="#linkedin"><Linkedin size={14} /> LinkedIn</a><a href="#youtube"><Youtube size={14} /> Updates</a></div></div></div><div className="footer-bottom"><span>© 2026 GUARDIAN PBVS. All rights reserved.</span><span>Privacy & cookie policy · Legal defensibility by design</span><span className="footer-domain">gurdianpbvs82.com <ArrowUpRightIcon /></span></div></footer>

      <button className="report-fab" onClick={() => toast.success("Report intake opened — our team will follow up securely.")}><TriangleAlert size={15} /> Report a concern</button>
      {cookieVisible && <motion.div className="cookie-banner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div><LockKeyhole size={18} /><p><b>GUARDIAN uses cookies for account security</b><span>We never sell your data for advertising purposes.</span></p></div><div className="cookie-actions"><button onClick={() => toast("Cookie preferences saved.")}>Manage</button><button className="button-primary" onClick={() => setCookieVisible(false)}>Accept all <Check size={15} /></button></div></motion.div>}
      {selectedRecord && <DetailModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={16} className="arrow-up-right" aria-hidden="true" />; }
function ScaleIcon() { return <Network size={17} />; }

export default Home;
