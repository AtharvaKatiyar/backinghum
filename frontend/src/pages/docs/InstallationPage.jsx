import { C, H2, H3, P, Callout, CodeBlock, IC, HR } from './shared.jsx';

export default function InstallationPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Installation · 4 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Installation
      </h1>
      <P>Backinghum can be installed globally via npm or run locally from source for development.</P>

      <HR />
      <H2 id="global">Global install (recommended)</H2>
      <P>Install the CLI globally so the <IC>backinghum</IC> command is available anywhere on your system.</P>
      <CodeBlock language="bash" code="npm install -g backinghum" />
      <P>Verify the installation:</P>
      <CodeBlock language="bash" code="backinghum --version" />
      <CodeBlock language="bash" code="backinghum --help" />

      <HR />
      <H2 id="local">Local / contributor install</H2>
      <P>Clone the repository and install dependencies to run the CLI directly from source.</P>
      <CodeBlock language="bash" code={`git clone https://github.com/musabismael/Backinghum.git
cd Backinghum
npm install`} />
      <P>Run the CLI directly without installing globally:</P>
      <CodeBlock language="bash" code="node bin/cli.js --help" />
      <P>Or link it globally so the <IC>backinghum</IC> command points to your local copy:</P>
      <CodeBlock language="bash" code="npm link" />

      <HR />
      <H2 id="uninstall">Uninstall</H2>
      <CodeBlock language="bash" code="npm uninstall -g backinghum" />

      <HR />
      <H2 id="prerequisites">Runtime prerequisites</H2>
      <P>
        Backinghum wraps native database CLI tools. You must have the tools for your target database installed and available on your <IC>PATH</IC> before running any backup or restore commands.
      </P>

      <H3>MongoDB</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li><IC>mongosh</IC> — used for connection testing</li>
        <li><IC>mongodump</IC> — used for creating backups</li>
        <li><IC>mongorestore</IC> — used for restoring backups</li>
        <li><IC>tar</IC> — used for compressing backup folders to <IC>.tar.gz</IC></li>
      </ul>

      <H3>MySQL</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li><IC>mysql</IC> — used for connection testing and restore</li>
        <li><IC>mysqldump</IC> — used for creating backups</li>
        <li><IC>gzip</IC> / <IC>gunzip</IC> — used for compression and decompression</li>
      </ul>

      <H3>PostgreSQL</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li><IC>psql</IC> — used for connection testing and restore</li>
        <li><IC>pg_dump</IC> — used for creating backups</li>
        <li><IC>gzip</IC> / <IC>gunzip</IC> — used for compression and decompression</li>
      </ul>

      <H3>PostgreSQL — Docker mode</H3>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li><IC>docker</IC> — must be installed and running on the host</li>
        <li>The target container must have <IC>pg_dump</IC> and <IC>psql</IC> available inside it</li>
      </ul>

      <Callout variant="warning">
        If a required tool is missing, the CLI will fail with a spawn error when it tries to invoke the binary. Install the missing tool and ensure it is on your <IC>PATH</IC>.
      </Callout>

      <HR />
      <H2 id="registry">Registry location</H2>
      <P>
        Backup metadata is stored in a local JSON file. The default location is:
      </P>
      <CodeBlock language="bash" code="$HOME/.db_backup/backupRegistry.json" />
      <P>
        You can override this path using the <IC>DB_BACKUP_REGISTRY_PATH</IC> environment variable. The custom path must be inside your home directory — paths outside the home directory are silently ignored and the default is used instead.
      </P>
      <CodeBlock language="bash" code={`# Override registry path (must be inside $HOME)
export DB_BACKUP_REGISTRY_PATH="$HOME/.my_backups/registry.json"
backinghum backup:list`} />

      <Callout variant="danger">
        The registry file contains saved connection snapshots including credentials. Protect the <IC>~/.db_backup/</IC> directory accordingly. The directory is created with mode <IC>0700</IC> and the file with mode <IC>0600</IC>.
      </Callout>
    </div>
  );
}
