import { C, H2, P, Callout, IC, HR } from './shared.jsx';

// ── Inline SVG icons ─────────────────────────────────────────────────────────
function DbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
    </svg>
  );
}
function PackageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
}
function DockerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="4" height="4" rx="0.5"/><rect x="7" y="8" width="4" height="4" rx="0.5"/>
      <rect x="12" y="8" width="4" height="4" rx="0.5"/><rect x="7" y="3" width="4" height="4" rx="0.5"/>
      <path d="M22 11c-1-1-3-1.5-4.5-.5C17 8 15.5 7 14 7.5M2 13.5s1 3 5 3h8c3 0 5-2 5-5"/>
    </svg>
  );
}
function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}

const features = [
  { Icon: DbIcon,      title: 'Multi-database',  desc: 'MongoDB, MySQL, and PostgreSQL — one unified CLI interface for all three.' },
  { Icon: RefreshIcon, title: 'Full lifecycle',   desc: 'Create, list, restore, and delete backups with a single tool.' },
  { Icon: PackageIcon, title: 'Compression',      desc: 'Optional gzip / tar.gz compression on every backup.' },
  { Icon: DockerIcon,  title: 'Docker support',   desc: 'Backup PostgreSQL running inside a Docker container via docker exec.' },
];

const quickLinks = [
  { Icon: ZapIcon,      title: 'Quick start',  desc: 'Get your first backup running in under 2 minutes.',       page: 'quick-start' },
  { Icon: DownloadIcon, title: 'Installation', desc: 'Install globally or run locally from source.',             page: 'installation' },
  { Icon: BookIcon,     title: 'Commands',     desc: 'Full reference for every CLI command and flag.',           page: 'commands' },
  { Icon: LayersIcon,   title: 'Architecture', desc: 'Understand the adapter pattern and internals.',            page: 'architecture' },
];

export default function OverviewPage({ onNavigate }) {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Updated recently · 3 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Backinghum
      </h1>
      <P>
        A Node.js CLI for creating, listing, restoring, and deleting database backups across MongoDB, MySQL, and PostgreSQL. Interactive prompts guide you through every step — no config files required.
      </P>

      <Callout variant="success">
        Install in one command: <IC>npm install -g backinghum</IC> — then run <IC>backinghum backup:create</IC> to get started.
      </Callout>

      {/* Quick-link cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '2rem 0' }}>
        {quickLinks.map(card => (
          <button key={card.page} onClick={() => onNavigate(card.page)}
            style={{ display: 'flex', flexDirection: 'column', padding: 20, border: `1px solid ${C.border}`, borderRadius: 8, cursor: 'pointer', background: C.surface, textAlign: 'left', transition: 'transform 0.15s, border-color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = C.borderHov; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = C.border; }}>
            <card.Icon />
            <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, color: C.text, marginTop: 12 }}>{card.title}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 1.6 }}>{card.desc}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.accent, marginTop: 16 }}>→</span>
          </button>
        ))}
      </div>

      <HR />
      <H2 id="features">Features</H2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {features.map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 14, padding: '14px 16px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.surface }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}><f.Icon /></div>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />
      <H2 id="stack">Tech stack</H2>
      <P>Backinghum is built on Node.js ES modules and uses the following packages:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2, paddingLeft: 20 }}>
        <li><IC>commander</IC> — CLI argument parsing and command registration</li>
        <li><IC>inquirer</IC> — interactive terminal prompts</li>
        <li>Native <IC>child_process</IC> — spawns mongodump, mysqldump, pg_dump, etc.</li>
        <li>JSON file registry — persists backup metadata in <IC>~/.db_backup/backupRegistry.json</IC></li>
      </ul>

      <HR />
      <H2 id="supported">Supported databases</H2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, margin: '1rem 0' }}>
        {[
          { name: 'MongoDB',    tools: 'mongodump · mongorestore · mongosh · tar' },
          { name: 'MySQL',      tools: 'mysqldump · mysql · gzip · gunzip' },
          { name: 'PostgreSQL', tools: 'pg_dump · psql · gzip · gunzip · docker (optional)' },
        ].map(db => (
          <div key={db.name} style={{ padding: 16, border: `1px solid ${C.border}`, borderRadius: 8, background: C.surface }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 8 }}>{db.name}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, lineHeight: 1.8 }}>{db.tools}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
