import { C, H2, H3, P, Callout, CodeBlock, IC, HR } from './shared.jsx';

export default function ArchitecturePage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Architecture · 5 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Architecture
      </h1>
      <P>Backinghum uses a layered adapter design that separates CLI concerns from database-specific logic.</P>

      <HR />
      <H2 id="layers">Layers</H2>

      {[
        { n: '1', title: 'CLI entrypoint', file: 'bin/cli.js', desc: 'Registers all commands via Commander and maps them to handler functions. This is the only file that imports Commander directly.' },
        { n: '2', title: 'Command handlers', file: 'src/commands/backup/', desc: 'create.js, list.js, restore.js, delete.js — each handler collects input (CLI flags + interactive prompts), normalises it, and calls the adapter layer.' },
        { n: '3', title: 'Adapter factory', file: 'src/adapters/adaptorFactory.js', desc: 'getAdapter(config) reads config.db and returns the correct adapter instance. Throws ValidationError for unknown database types.' },
        { n: '4', title: 'Database adapters', file: 'src/adapters/', desc: 'MongoAdapter, MySQLAdapter, PostgresAdapter — each extends BaseAdapter and implements testConnection(), backup(), and restore().' },
        { n: '5', title: 'Registry', file: 'src/registry/registry.js', desc: 'Reads and writes the JSON backup registry. Exposes addBackup, listBackups, getBackupById, deleteBackup.' },
        { n: '6', title: 'Utilities', file: 'src/utils/', desc: 'errors.js — typed error classes. normalize.js — option normalisation. validate.js — input validation. sanitize.js — safe file name components.' },
      ].map(layer => (
        <div key={layer.n} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 14px', marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.surface }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.accent }}>{layer.n}</span>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 500, color: C.text }}>{layer.title} <IC>{layer.file}</IC></div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 1.7, marginTop: 4 }}>{layer.desc}</div>
          </div>
        </div>
      ))}

      <HR />
      <H2 id="adapters">Adapter pattern</H2>
      <P>
        <IC>BaseAdapter</IC> defines the interface. Every database adapter extends it and must implement three methods:
      </P>
      <CodeBlock language="js" code={`// src/adapters/baseAdapter.js
export class BaseAdapter {
  constructor(config) {
    this.config = config;
  }

  async testConnection() { throw new Error('not implemented'); }
  async backup()         { throw new Error('not implemented'); }
  async restore()        { throw new Error('not implemented'); }
}`} />
      <P>The factory selects the right adapter at runtime:</P>
      <CodeBlock language="js" code={`// src/adapters/adaptorFactory.js
export function getAdapter(config) {
  switch (config.db.toLowerCase()) {
    case 'mysql':    return new MySQLAdapter(config);
    case 'postgres': return new PostgresAdapter(config);
    case 'mongodb':  return new MongoAdapter(config);
    default: throw new ValidationError(\`Unsupported database: \${config.db}\`);
  }
}`} />

      <HR />
      <H2 id="errors">Error handling</H2>
      <P>All errors extend <IC>AppError</IC> which carries a <IC>code</IC>, <IC>details</IC>, and optional <IC>cause</IC>. This makes error handling consistent across the codebase.</P>
      <CodeBlock language="js" code={`// src/utils/errors.js
class AppError extends Error {
  constructor(message, { code, details, cause } = {}) { ... }
}

class ValidationError  extends AppError { code = 'VALIDATION_ERROR'  }
class ConnectionError  extends AppError { code = 'CONNECTION_ERROR'  }
class BackupError      extends AppError { code = 'BACKUP_ERROR'      }
class RestoreError     extends AppError { code = 'RESTORE_ERROR'     }
class RegistryError    extends AppError { code = 'REGISTRY_ERROR'    }
class NotFoundError    extends AppError { code = 'NOT_FOUND'         }`} />

      <HR />
      <H2 id="registry-format">Registry format</H2>
      <P>Each backup entry written to <IC>backupRegistry.json</IC> contains:</P>
      <CodeBlock language="json" code={`{
  "id": "1776174984348",
  "db": "postgres",
  "database": "myapp",
  "path": "/home/user/backups/myapp_2025-01-10.sql.gz",
  "compressed": true,
  "size": 204800,
  "createdAt": "2025-01-10T14:32:00.000Z",
  "connection": {
    "host": "127.0.0.1",
    "port": "5432",
    "user": "postgres",
    "password": "secret",
    "database": "myapp",
    "mode": "local"
  }
}`} />
      <Callout variant="danger">
        The <IC>connection</IC> object stores credentials in plaintext so that restore operations can reuse them without re-prompting. Protect the registry file accordingly — it is created with mode <IC>0600</IC>.
      </Callout>

      <HR />
      <H2 id="project-structure">Project structure</H2>
      <CodeBlock language="bash" code={`backinghum/
├── bin/
│   └── cli.js                  # CLI entrypoint
├── src/
│   ├── adapters/
│   │   ├── baseAdapter.js
│   │   ├── adaptorFactory.js
│   │   ├── mongoAdapter.js
│   │   ├── mysqlAdaptor.js
│   │   └── postgresAdapter.js
│   ├── commands/backup/
│   │   ├── create.js
│   │   ├── list.js
│   │   ├── restore.js
│   │   └── delete.js
│   ├── prompts/
│   │   ├── mongo.js
│   │   ├── mysql.js
│   │   └── postgres.js
│   ├── registry/
│   │   └── registry.js
│   └── utils/
│       ├── errors.js
│       ├── normalize.js
│       ├── validate.js
│       └── sanitize.js
└── tests/`} />

      <HR />
      <H2 id="tests">Test coverage</H2>
      <P>The <IC>tests/</IC> directory validates:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Adapter selection via the factory</li>
        <li>Argument builders for each database adapter</li>
        <li>Prompt flows — local, remote, URI, and Docker paths</li>
        <li>Option normalisation and validation utilities</li>
        <li>Sanitize helpers for safe file name components</li>
      </ul>
      <CodeBlock language="bash" code={`npm test          # run all tests
npm run audit     # security audit`} />
    </div>
  );
}
