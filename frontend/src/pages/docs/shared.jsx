import { useState, useEffect } from 'react';

// ── Color tokens (inherits from design system) ──────────────────────────────
export const C = {
  bg:        '#080808',
  surface:   'rgba(255,255,255,0.04)',
  surfaceHov:'rgba(255,255,255,0.07)',
  border:    'rgba(255,255,255,0.08)',
  borderHov: 'rgba(255,255,255,0.18)',
  text:      'rgba(255,255,255,0.85)',
  muted:     'rgba(255,255,255,0.38)',
  dim:       'rgba(255,255,255,0.22)',
  accent:    '#A7EF9E',
  accentDim: 'rgba(167,239,158,0.15)',
  danger:    '#FF6B6B',
  dangerDim: 'rgba(255,107,107,0.12)',
  warning:   '#FFB347',
  warningDim:'rgba(255,179,71,0.12)',
  info:      '#7EB8F7',
  infoDim:   'rgba(126,184,247,0.12)',
  success:   '#A7EF9E',
  successDim:'rgba(167,239,158,0.12)',
  codeBg:    '#0e0e0e',
  codeHeader:'#141414',
};

// ── CodeBlock ────────────────────────────────────────────────────────────────
export function CodeBlock({ language = 'bash', code }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', margin: '1.25rem 0', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, padding: '0 16px', background: C.codeHeader, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, color: C.muted, letterSpacing: '0.06em' }}>{language}</span>
        <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? C.accent : C.muted, fontSize: 11, fontFamily: 'monospace', padding: '2px 6px', transition: 'color 0.15s' }}>
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '16px 20px', background: C.codeBg, fontSize: 12, lineHeight: 1.7, color: C.text, overflowX: 'auto', whiteSpace: 'pre' }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Callout icons (SVG) ───────────────────────────────────────────────────────
function CalloutIcon({ variant }) {
  const s = { width: 15, height: 15, flexShrink: 0, marginTop: 1 };
  if (variant === 'info') return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={C.info} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
  if (variant === 'warning') return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={C.warning} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
  if (variant === 'danger') return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={C.danger} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  );
  // success
  return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

// ── Callout ──────────────────────────────────────────────────────────────────
const calloutBg = { info: C.infoDim, warning: C.warningDim, danger: C.dangerDim, success: C.successDim };
const calloutBorder = { info: C.info, warning: C.warning, danger: C.danger, success: C.success };
export function Callout({ variant = 'info', children }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: '0 6px 6px 0', borderLeft: `3px solid ${calloutBorder[variant]}`, background: calloutBg[variant], margin: '1.25rem 0' }}>
      <CalloutIcon variant={variant} />
      <div style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.7, color: C.text }}>{children}</div>
    </div>
  );
}

// ── StepList ─────────────────────────────────────────────────────────────────
export function StepList({ steps }) {
  return (
    <div style={{ margin: '1.25rem 0' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 14px', marginBottom: i < steps.length - 1 ? 0 : 0 }}>
          {/* circle + connector */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: C.surface }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.accent }}>{i + 1}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 1, flex: 1, minHeight: 24, borderLeft: `1px dashed ${C.border}`, marginTop: 4, marginBottom: 4 }} />
            )}
          </div>
          {/* content */}
          <div style={{ paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 4 }}>{step.title}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{step.description}</div>
            {step.code && <CodeBlock language={step.lang || 'bash'} code={step.code} />}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── ParamTable ───────────────────────────────────────────────────────────────
export function ParamTable({ params }) {
  return (
    <div style={{ margin: '1.25rem 0', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: 12 }}>
        <thead>
          <tr style={{ background: C.codeHeader }}>
            {['Name', 'Type', 'Required', 'Description'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 14px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.muted, borderBottom: `1px solid ${C.border}`, fontWeight: 400 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: '10px 14px', color: C.accent }}><code>{p.name}</code></td>
              <td style={{ padding: '10px 14px', color: C.muted }}>{p.type}</td>
              <td style={{ padding: '10px 14px' }}>
                <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 3, border: `1px solid ${p.required ? C.danger : C.border}`, color: p.required ? C.danger : C.dim, fontFamily: 'monospace' }}>
                  {p.required ? 'required' : 'optional'}
                </span>
              </td>
              <td style={{ padding: '10px 14px', color: C.muted, lineHeight: 1.6 }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── MethodBadge ──────────────────────────────────────────────────────────────
const methodColors = {
  GET:    { color: C.success, bg: C.successDim },
  POST:   { color: C.info,    bg: C.infoDim },
  PUT:    { color: C.warning, bg: C.warningDim },
  DELETE: { color: C.danger,  bg: C.dangerDim },
  PATCH:  { color: C.warning, bg: C.warningDim },
};
export function MethodBadge({ method }) {
  const m = methodColors[method] || { color: C.muted, bg: C.surface };
  return (
    <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 4, border: `1px solid ${m.color}`, color: m.color, background: m.bg, letterSpacing: '0.05em', marginRight: 8 }}>
      {method}
    </span>
  );
}

// ── VersionBadge ─────────────────────────────────────────────────────────────
export function VersionBadge({ version }) {
  return (
    <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '3px 10px', borderRadius: 4, border: `1px solid ${C.accent}`, color: C.accent, background: C.accentDim }}>
      {version}
    </span>
  );
}

// ── InlineCode ───────────────────────────────────────────────────────────────
export function IC({ children }) {
  return (
    <code style={{ fontFamily: 'monospace', fontSize: 12, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 6px', background: C.surface, color: C.accent }}>
      {children}
    </code>
  );
}

// ── Section heading helpers ──────────────────────────────────────────────────
export function H2({ children, id }) {
  return (
    <h2 id={id} style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 500, margin: '2.5rem 0 1rem', paddingBottom: 10, borderBottom: `1px solid ${C.border}`, color: C.text, letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  );
}
export function H3({ children }) {
  return (
    <h3 style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, margin: '1.5rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted }}>
      {children}
    </h3>
  );
}
export function P({ children }) {
  return <p style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.85, color: C.muted, margin: '0 0 1rem' }}>{children}</p>;
}
export function HR() {
  return <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '2.5rem 0' }} />;
}

// ── Accordion (FAQ) ──────────────────────────────────────────────────────────
export function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ margin: '1.25rem 0' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'monospace', fontSize: 13, color: C.text, textAlign: 'left' }}
          >
            <span>{item.q}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0, marginLeft: 16, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {open === i && (
            <div style={{ padding: '0 0 16px', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, color: C.muted }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
