import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FaultyTerminal from '../components/FaultyTerminal.jsx';

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const INSTALL_CMD = 'npm install -g backinghum';

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  function handleCopy() {
    navigator.clipboard.writeText(INSTALL_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', background: '#080808', overflow: 'hidden' }}>

      {/* ── Terminal background — full bleed, mouse-reactive ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35 }}>
        <FaultyTerminal
          scale={1.8}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.4}
          pause={false}
          scanlineIntensity={0.4}
          glitchAmount={0.6}
          flickerAmount={0.5}
          noiseAmp={0.8}
          chromaticAberration={0}
          dither={0}
          curvature={0.05}
          tint="#A7EF9E"
          mouseReact={true}
          mouseStrength={0.4}
          pageLoadAnimation
          brightness={0.55}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* ── Radial vignette — pointer-events off so mouse passes through to terminal ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 65% at 50% 50%, transparent 15%, #080808 100%)',
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, #080808, transparent)',
        }}
      />

      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
        }}
      >
        {/* subtle backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,8,8,0.8), transparent)',
            pointerEvents: 'none',
          }}
        />
        <span
          style={{
            position: 'relative',
            color: '#A7EF9E',
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.8,
            userSelect: 'none',
          }}
        >
          backinghum
        </span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            <GitHubIcon size={19} />
          </a>
          <button
            onClick={() => navigate('/docs')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            docs
          </button>
        </div>
      </nav>

      {/* ── Hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none', // let mouse events fall through to terminal
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '100px 24px 60px',
          gap: '40px',
          textAlign: 'center',
        }}
      >
        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', userSelect: 'none' }}>
          <p
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            database backup cli
          </p>
          <h1 style={{ color: '#fff', lineHeight: 1.1, margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 300, letterSpacing: '-0.02em' }}>
              back up your
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(48px, 8vw, 82px)',
                color: '#A7EF9E',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              databases,
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 300, letterSpacing: '-0.02em' }}>
              effortlessly.
            </span>
          </h1>
          <p
            style={{
              marginTop: '18px',
              color: 'rgba(255,255,255,0.38)',
              fontSize: '16px',
              fontWeight: 300,
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            One CLI for MongoDB, MySQL, and PostgreSQL —{' '}
            <span style={{ fontFamily: "'Dancing Script', cursive", color: 'rgba(255,255,255,0.55)', fontSize: '18px' }}>
              create, list, restore, delete.
            </span>
          </p>
        </div>

        {/* Install command box — re-enable pointer events for interaction */}
        <div style={{ width: '100%', maxWidth: '440px', pointerEvents: 'auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              padding: '16px 20px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#A7EF9E',
              boxShadow: '0 0 60px 0 rgba(167,239,158,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <span style={{ userSelect: 'all', letterSpacing: '0.04em' }}>{INSTALL_CMD}</span>
            <button
              onClick={handleCopy}
              aria-label="Copy install command"
              style={{
                flexShrink: 0,
                background: 'none',
                border: 'none',
                color: copied ? '#A7EF9E' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (!copied) e.currentTarget.style.color = '#A7EF9E'; }}
              onMouseLeave={e => { if (!copied) e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
            >
              {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            </button>
          </div>
        </div>

        {/* CTA buttons — re-enable pointer events */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              padding: '12px 24px',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              transition: 'all 0.2s',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <button
            onClick={() => navigate('/docs')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '12px',
              border: 'none',
              background: '#A7EF9E',
              padding: '12px 24px',
              color: '#080808',
              fontFamily: 'monospace',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#8de084')}
            onMouseLeave={e => (e.currentTarget.style.background = '#A7EF9E')}
          >
            Documentation
            <ArrowRightIcon size={13} />
          </button>
        </div>

        {/* DB badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
          {['MongoDB', 'MySQL', 'PostgreSQL'].map((db) => (
            <span
              key={db}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '6px 16px',
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {db}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */

function GitHubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function CopyIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#A7EF9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
