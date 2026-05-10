import { C, H2, H3, P, Callout, CodeBlock, ParamTable, IC, HR } from './shared.jsx';

const createParams = [
  { name: '--compress', type: 'flag', required: false, description: 'Compress the backup output. MongoDB → .tar.gz, MySQL/PostgreSQL → .sql.gz.' },
  { name: '--verbose', type: 'flag', required: false, description: 'Print detailed process logs including spawned command output.' },
];

export default function CommandsPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Commands · 5 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Command reference
      </h1>
      <P>All commands exposed by the <IC>backinghum</IC> CLI.</P>

      <HR />

      {/* backup:create */}
      <H2 id="create">backup:create</H2>
      <P>Launch an interactive wizard to create a new database backup. Prompts guide you through selecting the database type and entering connection details.</P>
      <CodeBlock language="bash" code={`backinghum backup:create
backinghum backup:create --compress
backinghum backup:create --compress --verbose`} />

      <H3>Options</H3>
      <ParamTable params={createParams} />

      <H3>MongoDB prompt flow</H3>
      <P>After selecting MongoDB you will be asked:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Connection type — <IC>Local</IC> or <IC>MongoDB Atlas (URI)</IC></li>
        <li>If Atlas: URI, database name, output directory</li>
        <li>If Local: auth required? → host, port, user, password (if auth), database name, output directory</li>
      </ul>
      <P>Output formats:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Uncompressed — folder named <IC>&lt;database&gt;-&lt;timestamp&gt;</IC></li>
        <li>Compressed — <IC>.tar.gz</IC> archive of that folder (original folder is removed)</li>
      </ul>

      <H3>MySQL prompt flow</H3>
      <P>After selecting MySQL you will be asked:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Connection type — <IC>Local</IC> or <IC>Remote</IC></li>
        <li>If Remote: <IC>Connection URI</IC> or <IC>Manual details</IC></li>
        <li>URI mode: MySQL connection URI + output directory</li>
        <li>Manual mode: host, port, user, password, database, SSL required?, output directory</li>
      </ul>
      <P>Output formats: <IC>.sql</IC> (uncompressed) or <IC>.sql.gz</IC> (compressed)</P>

      <H3>PostgreSQL prompt flow</H3>
      <P>After selecting PostgreSQL you will be asked:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Connection type — <IC>Local</IC>, <IC>Remote</IC>, or <IC>Docker</IC></li>
        <li>Docker mode: container name, user, password, database, output directory</li>
        <li>Local mode: host, port, user, password, database, output directory</li>
        <li>Remote URI mode: PostgreSQL connection URI + output directory</li>
        <li>Remote manual mode: host, port, user, password, database, sslmode, output directory</li>
      </ul>
      <P>Output formats: <IC>.sql</IC> (uncompressed) or <IC>.sql.gz</IC> (compressed)</P>

      <Callout variant="info">
        In URI mode, if the database name is not explicitly provided, it is inferred from the URI path (e.g. <IC>/mydb</IC> → <IC>mydb</IC>) and saved to the registry.
      </Callout>

      <HR />

      {/* backup:list */}
      <H2 id="list">backup:list</H2>
      <P>Print all backup entries from the local registry in a formatted table.</P>
      <CodeBlock language="bash" code="backinghum backup:list" />
      <P>Each row shows:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>ID — use this to restore or delete</li>
        <li>Database type (mongodb / mysql / postgres)</li>
        <li>Database name</li>
        <li>File size</li>
        <li>Created timestamp</li>
        <li>Stored path on disk</li>
      </ul>

      <HR />

      {/* backup:restore */}
      <H2 id="restore">backup:restore</H2>
      <P>Restore a backup by its registry ID. The connection details saved at backup time are reused automatically.</P>
      <CodeBlock language="bash" code="backinghum backup:restore <id>" />
      <CodeBlock language="bash" code="# Example
backinghum backup:restore 1776174984348" />

      <P>You will be prompted to choose a restore mode:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li><strong style={{ color: C.text }}>Merge</strong> — keep existing data, add backup data on top</li>
        <li><strong style={{ color: C.text }}>Replace</strong> — drop existing data first, then restore (requires confirmation)</li>
      </ul>

      <H3>Restore behaviour by database</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>MongoDB — runs <IC>mongorestore</IC>. Replace mode adds <IC>--drop</IC>.</li>
        <li>MySQL — pipes SQL into <IC>mysql</IC>. Supports <IC>.gz</IC> input via <IC>gunzip -c</IC>.</li>
        <li>PostgreSQL — pipes SQL into <IC>psql</IC>. Supports <IC>.gz</IC> input via <IC>gunzip -c</IC>.</li>
      </ul>

      <Callout variant="warning">
        Replace mode drops existing data before restoring. This is irreversible. The CLI will ask for explicit confirmation before proceeding.
      </Callout>

      <HR />

      {/* backup:delete */}
      <H2 id="delete">backup:delete</H2>
      <P>Delete a backup file from disk and remove its entry from the registry.</P>
      <CodeBlock language="bash" code="backinghum backup:delete <id>" />
      <CodeBlock language="bash" code="# Example
backinghum backup:delete 1776174984348" />
      <P>What happens:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Looks up the backup by ID in the registry</li>
        <li>Deletes the backup file or folder from disk (if it still exists)</li>
        <li>Removes the registry entry</li>
        <li>Prints a confirmation message</li>
      </ul>

      <HR />

      {/* --help */}
      <H2 id="help">--help</H2>
      <P>Print all available commands and options.</P>
      <CodeBlock language="bash" code="backinghum --help" />
    </div>
  );
}
