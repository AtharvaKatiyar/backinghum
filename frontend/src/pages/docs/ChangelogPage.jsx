import { C, H2, H3, P, Callout, IC, HR, VersionBadge } from './shared.jsx';

export default function ChangelogPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Changelog
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Changelog
      </h1>
      <P>All notable changes to Backinghum are documented here. Published to npm under the <IC>latest</IC> tag.</P>

      <HR />

      {/* v1.0.6 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <VersionBadge version="v1.0.6" />
        <span style={{ fontFamily: 'monospace', fontSize: 11, padding: '2px 8px', borderRadius: 4, border: `1px solid ${C.accent}`, color: C.accent, background: C.accentDim }}>latest</span>
        <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted }}>11 downloads last 7 days</span>
      </div>
      <H2 id="v106">v1.0.6</H2>
      <P>Current stable release. Published 19 days ago.</P>

      <H3>Added</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Unified CLI interface — <IC>backup:create</IC>, <IC>backup:list</IC>, <IC>backup:restore</IC>, <IC>backup:delete</IC></li>
        <li>Interactive prompt wizard for MongoDB, MySQL, and PostgreSQL</li>
        <li>MongoDB adapter — <IC>mongodump</IC> / <IC>mongorestore</IC> with Atlas URI support</li>
        <li>MySQL adapter — <IC>mysqldump</IC> / <IC>mysql</IC> with local, remote URI, and remote manual modes</li>
        <li>PostgreSQL adapter — <IC>pg_dump</IC> / <IC>psql</IC> with local, remote URI, remote manual, and Docker modes</li>
        <li>Optional compression — <IC>.tar.gz</IC> for MongoDB, <IC>.sql.gz</IC> for MySQL and PostgreSQL</li>
        <li>Restore modes — merge (keep existing) and replace (drop first)</li>
        <li>Local JSON registry at <IC>~/.db_backup/backupRegistry.json</IC></li>
        <li>Registry path override via <IC>DB_BACKUP_REGISTRY_PATH</IC> (home directory only)</li>
        <li>Connection snapshot saved with each backup entry for restore reuse</li>
        <li>Typed error classes — <IC>ValidationError</IC>, <IC>ConnectionError</IC>, <IC>BackupError</IC>, <IC>RestoreError</IC>, <IC>RegistryError</IC></li>
        <li>Registry file created with mode <IC>0600</IC>, directory with <IC>0700</IC></li>
        <li>Input sanitization for safe file name components</li>
        <li><IC>prepublishOnly</IC> hook enforces tests and audit before npm publish</li>
        <li>Package <IC>files</IC> allowlist to prevent accidental file leakage on publish</li>
      </ul>

      <H3>Security</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Registry path override restricted to paths inside the current user's home directory</li>
        <li>Unused dependencies removed to reduce supply-chain risk</li>
        <li><IC>DB_BACKUP_REGISTRY_PATH</IC> silently falls back to default if path is outside home</li>
      </ul>

      <HR />

      {/* Version history table */}
      <H2 id="history">Version history</H2>
      <P>All versions published to npm.</P>

      <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', margin: '1.25rem 0' }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: C.codeHeader, borderBottom: `1px solid ${C.border}`, padding: '8px 16px' }}>
          {['Version', 'Downloads (7d)', 'Published'].map(h => (
            <span key={h} style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.muted }}>{h}</span>
          ))}
        </div>
        {[
          { v: '1.0.6', dl: 11, pub: '19 days ago', latest: true },
          { v: '1.0.5', dl: 2,  pub: '19 days ago' },
          { v: '1.0.4', dl: 1,  pub: '19 days ago' },
          { v: '1.0.3', dl: 1,  pub: '19 days ago' },
          { v: '1.0.2', dl: 1,  pub: '19 days ago' },
          { v: '1.0.1', dl: 1,  pub: '19 days ago' },
        ].map((row, i, arr) => (
          <div key={row.v} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.accent }}>v{row.v}</span>
              {row.latest && (
                <span style={{ fontFamily: 'monospace', fontSize: 10, padding: '1px 6px', borderRadius: 3, border: `1px solid ${C.accent}`, color: C.accent, background: C.accentDim }}>latest</span>
              )}
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted }}>{row.dl}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.muted }}>{row.pub}</span>
          </div>
        ))}
      </div>

      <Callout variant="info">
        The API (CLI flags and prompt flow) is considered stable from v1.0.0 onwards. The registry JSON format may evolve in minor versions with backward-compatible additions.
      </Callout>
    </div>
  );
}
