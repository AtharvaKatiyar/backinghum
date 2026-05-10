import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { C } from './docs/shared.jsx';
import logo from '../assets/logo.png';
import OverviewPage     from './docs/OverviewPage.jsx';
import QuickStartPage   from './docs/QuickStartPage.jsx';
import InstallationPage from './docs/InstallationPage.jsx';
import CommandsPage     from './docs/CommandsPage.jsx';
import ArchitecturePage from './docs/ArchitecturePage.jsx';
import ExamplesPage     from './docs/ExamplesPage.jsx';
import ChangelogPage    from './docs/ChangelogPage.jsx';
import FaqPage          from './docs/FaqPage.jsx';

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const SIDEBAR_W  = 260;

// ── Nav structure ────────────────────────────────────────────────────────────
const NAV = [
  {
    group: 'Get started',
    items: [
      { id: 'overview',     label: 'Overview' },
      { id: 'quick-start',  label: 'Quick start' },
      { id: 'installation', label: 'Installation' },
    ],
  },
  {
    group: 'Reference',
    items: [
      { id: 'commands',     label: 'Commands' },
      { id: 'architecture', label: 'Architecture' },
    ],
  },
  {
    group: 'Learn',
    items: [
      { id: 'examples',     label: 'Examples' },
    ],
  },
  {
    group: 'Project',
    items: [
      { id: 'changelog',    label: 'Changelog' },
      { id: 'faq',          label: 'FAQ' },
    ],
  },
];

const ALL_PAGES = NAV.flatMap(g => g.items.map(i => ({ ...i, group: g.group })));

function getAdjacentPages(id) {
  const idx = ALL_PAGES.findIndex(p => p.id === id);
  return {
    prev: idx > 0 ? ALL_PAGES[idx - 1] : null,
    next: idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null,
  };
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────
function Icon({ d, size = 16, stroke = C.muted, fill = 'none', strokeWidth = 1.75 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
    </svg>
  );
}
const Icons = {
  Menu:    () => <Icon d={['M3 12h18','M3 6h18','M3 18h18']} />,
  X:       () => <Icon d={['M18 6 6 18','M6 6l12 12']} />,
  Search:  () => <Icon d={['M21 21l-4.35-4.35']} size={16}><circle cx="11" cy="11" r="8" /></Icon>,
  ChevL:   () => <Icon d={['M15 18l-6-6 6-6']} />,
  ChevR:   () => <Icon d={['M9 18l6-6-6-6']} />,
  ArrowL:  () => <Icon d={['M19 12H5','M12 19l-7-7 7-7']} />,
  ArrowR:  () => <Icon d={['M5 12h14','M12 5l7 7-7 7']} />,
  GitHub:  ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.muted} style={{ flexShrink: 0 }}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
};

// Proper SVG search icon (circle + line)
function SearchIcon({ size = 13, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ── Page content router ──────────────────────────────────────────────────────
function PageContent({ page, onNavigate }) {
  switch (page) {
    case 'overview':     return <OverviewPage onNavigate={onNavigate} />;
    case 'quick-start':  return <QuickStartPage />;
    case 'installation': return <InstallationPage />;
    case 'commands':     return <CommandsPage />;
    case 'architecture': return <ArchitecturePage />;
    case 'examples':     return <ExamplesPage />;
    case 'changelog':    return <ChangelogPage />;
    case 'faq':          return <FaqPage />;
    default:             return <OverviewPage onNavigate={onNavigate} />;
  }
}

// ── Page navigation (prev / next) ────────────────────────────────────────────
function PageNav({ currentPage, onNavigate }) {
  const { prev, next } = getAdjacentPages(currentPage);
  if (!prev && !next) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
      {prev ? (
        <button onClick={() => onNavigate(prev.id)}
          style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 18px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.surface, cursor: 'pointer', textAlign: 'left', flex: 1, maxWidth: '48%', transition: 'border-color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHov)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.dim, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Previous
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: C.text, fontWeight: 500 }}>{prev.label}</span>
        </button>
      ) : <div style={{ flex: 1 }} />}

      {next ? (
        <button onClick={() => onNavigate(next.id)}
          style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 18px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.surface, cursor: 'pointer', textAlign: 'right', flex: 1, maxWidth: '48%', alignItems: 'flex-end', transition: 'border-color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = C.borderHov)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.dim, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
            Next
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: C.text, fontWeight: 500 }}>{next.label}</span>
        </button>
      ) : <div style={{ flex: 1 }} />}
    </div>
  );
}

// ── Search Modal ─────────────────────────────────────────────────────────────
function SearchModal({ open, onClose, onNavigate }) {
  const [query, setQuery]     = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const results = query.trim()
    ? ALL_PAGES.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.group.toLowerCase().includes(query.toLowerCase()))
    : ALL_PAGES.slice(0, 6);

  useEffect(() => {
    if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);
  useEffect(() => { setSelected(0); }, [query]);

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && results[selected]) { onNavigate(results[selected].id); onClose(); }
    if (e.key === 'Escape') onClose();
  }

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 560, margin: '0 16px', border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', background: C.bg, boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}>
        <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderBottom: `1px solid ${C.border}` }}>
          <SearchIcon size={16} color={C.muted} />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKey}
            placeholder="Search documentation..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: 13, color: C.text }} />
          <span style={{ fontFamily: 'monospace', fontSize: 10, border: `1px solid ${C.border}`, borderRadius: 4, padding: '1px 6px', color: C.muted }}>ESC</span>
        </div>
        <div>
          {results.map((r, i) => (
            <button key={r.id} onClick={() => { onNavigate(r.id); onClose(); }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 16px', background: i === selected ? C.surfaceHov : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < results.length - 1 ? `1px solid ${C.border}` : 'none' }}
              onMouseEnter={() => setSelected(i)}>
              <span style={{ fontFamily: 'monospace', fontSize: 13, color: C.text }}>{r.label}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>{r.group}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar content (shared between desktop + mobile drawer) ─────────────────
function SidebarContent({ activePage, onNavigate }) {
  return (
    <>
      <style>{`
        .docs-sb::-webkit-scrollbar{width:3px}
        .docs-sb::-webkit-scrollbar-track{background:transparent}
        .docs-sb::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:99px}
      `}</style>
      <div className="docs-sb" style={{ height: '100%', overflowY: 'auto', padding: '12px 0' }}>
        {NAV.map((group, gi) => (
          <div key={group.group}>
            {gi > 0 && <div style={{ height: 1, background: C.border, margin: '6px 0' }} />}
            <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 20px 6px', color: C.dim }}>
              {group.group}
            </div>
            {group.items.map(item => {
              const active = activePage === item.id;
              return (
                <button key={item.id} onClick={() => onNavigate(item.id)}
                  style={{ width: '100%', height: 32, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: 'monospace', fontSize: 12, borderLeft: active ? `2px solid ${C.accent}` : '2px solid transparent', background: active ? C.accentDim : 'transparent', color: active ? C.accent : C.muted, border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.text; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.muted; } }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

// ── Main DocsPage ────────────────────────────────────────────────────────────
export default function DocsPage() {
  const navigate    = useNavigate();
  const [activePage, setActivePage] = useState('overview');
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const [visible,    setVisible]    = useState(true);
  // sidebar: desktop collapsed state + mobile open state
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const contentRef = useRef(null);

  // detect mobile (≤768px)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // close mobile drawer on resize to desktop
  useEffect(() => { if (!isMobile) setMobileOpen(false); }, [isMobile]);

  // ⌘K shortcut
  useEffect(() => {
    const fn = e => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); } };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // scroll progress
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const fn = () => {
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollPct(isNaN(pct) ? 0 : pct * 100);
    };
    el.addEventListener('scroll', fn);
    return () => el.removeEventListener('scroll', fn);
  }, [activePage]);

  const handleNavigate = useCallback((page) => {
    if (page === activePage) { setMobileOpen(false); return; }
    setVisible(false);
    setTimeout(() => {
      setActivePage(page);
      setVisible(true);
      setMobileOpen(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }, 160);
  }, [activePage]);

  const sidebarWidth = isMobile ? 0 : (collapsed ? 0 : SIDEBAR_W);

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* ── Scroll progress ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, height: 2, width: `${scrollPct}%`, background: C.accent, pointerEvents: 'none', transition: 'none' }} />

      {/* ── Top nav ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 56, zIndex: 200, display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}`, background: C.bg }}>

        {/* Logo zone — always 260px wide on desktop, auto on mobile */}
        <div style={{ width: isMobile ? 'auto' : SIDEBAR_W, flexShrink: 0, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, borderRight: isMobile ? 'none' : `1px solid ${C.border}`, height: '100%' }}>
          {/* Hamburger / collapse toggle */}
          <button
            onClick={() => isMobile ? setMobileOpen(o => !o) : setCollapsed(c => !c)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, borderRadius: 4, flexShrink: 0, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <img src={logo} alt="Backinghum" style={{ height: 26, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
          {!isMobile && !collapsed && (
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>docs</span>
          )}
        </div>

        {/* Search bar */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
          <button onClick={() => setSearchOpen(true)}
            style={{ width: '100%', maxWidth: 380, height: 32, borderRadius: 6, border: `1px solid ${C.border}`, background: C.surface, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, color: C.muted, textAlign: 'left' }}>
            <SearchIcon size={13} />
            <span style={{ flex: 1 }}>Search docs...</span>
            {!isMobile && <span style={{ fontSize: 10, border: `1px solid ${C.border}`, borderRadius: 4, padding: '1px 5px', color: C.dim }}>⌘K</span>}
          </button>
        </div>

        {/* Right actions */}
        <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'monospace', fontSize: 12, color: C.muted, textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
            <Icons.GitHub size={15} />
            {!isMobile && 'GitHub'}
          </a>
          {!isMobile && (
            <span style={{ fontFamily: 'monospace', fontSize: 10, borderRadius: 4, padding: '2px 8px', border: `1px solid ${C.border}`, color: C.muted }}>v1.0.6</span>
          )}
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontFamily: 'monospace', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.15s', padding: 0, flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = C.text)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            {!isMobile && 'Home'}
          </button>
        </div>
      </nav>

      {/* ── Desktop sidebar ── */}
      {!isMobile && (
        <aside style={{
          position: 'fixed', top: 56, left: 0,
          width: collapsed ? 0 : SIDEBAR_W,
          height: 'calc(100vh - 56px)',
          borderRight: collapsed ? 'none' : `1px solid ${C.border}`,
          background: C.bg, overflow: 'hidden',
          transition: 'width 0.22s ease',
          zIndex: 100,
        }}>
          <div style={{ width: SIDEBAR_W }}>
            <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
          </div>
        </aside>
      )}

      {/* ── Mobile drawer backdrop ── */}
      {isMobile && mobileOpen && (
        <div onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }} />
      )}

      {/* ── Mobile drawer ── */}
      {isMobile && (
        <aside style={{
          position: 'fixed', top: 56, left: 0,
          width: SIDEBAR_W,
          height: 'calc(100vh - 56px)',
          borderRight: `1px solid ${C.border}`,
          background: C.bg,
          transform: mobileOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
          transition: 'transform 0.22s ease',
          zIndex: 160,
          overflowY: 'auto',
        }}>
          <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
        </aside>
      )}

      {/* ── Main content ── */}
      <main ref={contentRef} style={{
        marginLeft: sidebarWidth,
        marginTop: 56,
        height: 'calc(100vh - 56px)',
        overflowY: 'auto',
        width: `calc(100vw - ${sidebarWidth}px)`,
        transition: 'margin-left 0.22s ease, width 0.22s ease',
      }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: isMobile ? '32px 20px' : '48px 64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}>
          <PageContent page={activePage} onNavigate={handleNavigate} />
          <PageNav currentPage={activePage} onNavigate={handleNavigate} />

          {/* Footer */}
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.dim }}>backinghum · ISC License</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              <Icons.GitHub size={13} /> GitHub
            </a>
          </div>
        </div>
      </main>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
    </div>
  );
}
