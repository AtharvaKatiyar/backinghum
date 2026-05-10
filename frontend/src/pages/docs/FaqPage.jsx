import { C, H2, P, Callout, IC, HR, Accordion } from './shared.jsx';

const GITHUB_URL=import.meta.env.VITE_GITHUB_URL;

const faqs = [
  {
    q: 'Which Node.js version is required?',
    a: 'Backinghum requires Node.js LTS (v18 or later). It uses ES modules (import/export) and native child_process, both of which are stable in all LTS releases.',
  },
  {
    q: 'Do I need to install database tools separately?',
    a: 'Yes. Backinghum wraps native binaries (mongodump, mysqldump, pg_dump, etc.) — it does not bundle them. You must install the tools for the databases you plan to use and ensure they are on your PATH. See the Installation page for the full list.',
  },
  {
    q: 'Where are my backups stored?',
    a: 'Backup files are saved to the output directory you specify during the prompt wizard (default: ./backups). Backup metadata is stored in ~/.db_backup/backupRegistry.json. You can override the registry path with the DB_BACKUP_REGISTRY_PATH environment variable.',
  },
  {
    q: 'Can I automate backups without interactive prompts?',
    a: 'Not yet in v1.0.0 — the create command is fully interactive. A --config flag for non-interactive use is a planned feature. As a workaround you can use expect scripts or a shell wrapper that pipes answers to stdin.',
  },
  {
    q: 'Is the registry file safe? It contains my database credentials.',
    a: 'The registry file is created with mode 0600 (owner read/write only) and the directory with 0700. This prevents other users on the same system from reading it. However, you should still treat the file as sensitive — avoid committing it to version control or storing it in shared locations.',
  },
  {
    q: 'What happens if I restore with Replace mode?',
    a: 'Replace mode drops the existing database content before restoring. For MongoDB this adds --drop to mongorestore. For MySQL and PostgreSQL the SQL dump is piped directly into the client, which overwrites existing tables. The CLI requires explicit confirmation before proceeding. This operation is irreversible.',
  },
  {
    q: 'Can I back up a PostgreSQL database running in Docker?',
    a: 'Yes. Select Docker as the connection type when prompted. Backinghum runs docker exec -e PGPASSWORD=... <container> pg_dump ... and streams the output to disk. The Docker daemon must be running on the host and the container must have pg_dump available.',
  },
  {
    q: 'How do I override the registry file location?',
    a: 'Set the DB_BACKUP_REGISTRY_PATH environment variable to an absolute path inside your home directory. Paths outside the home directory are silently ignored and the default (~/.db_backup/backupRegistry.json) is used instead.',
  },
];

export default function FaqPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        FAQ
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Frequently asked questions
      </h1>
      <P>Common questions about installation, usage, and security.</P>

      <HR />
      <Accordion items={faqs} />

      <HR />
      <Callout variant="info">
        Have a question that isn't answered here? Open an issue on{' '}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
          style={{ color: C.accent, textDecoration: 'none', fontFamily: 'monospace' }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          GitHub
        </a>.
      </Callout>
    </div>
  );
}
