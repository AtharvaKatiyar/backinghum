import { C, H2, P, Callout, CodeBlock, IC, HR } from './shared.jsx';

export default function ExamplesPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Examples · 4 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Examples
      </h1>
      <P>Real-world usage patterns for common backup scenarios.</P>

      <HR />
      <H2 id="mongo-local">MongoDB — local backup</H2>
      <P>Back up a local MongoDB instance running on the default port with no authentication.</P>
      <CodeBlock language="bash" code={`backinghum backup:create

# Prompts:
# > Database type: mongodb
# > Connection type: Local
# > Auth required: No
# > Host: 127.0.0.1
# > Port: 27017
# > Database name: myapp
# > Output directory: ./backups`} />
      <P>The backup is saved as a folder: <IC>./backups/myapp-1776174984348/</IC></P>

      <HR />
      <H2 id="mongo-atlas">MongoDB — Atlas with compression</H2>
      <P>Back up a MongoDB Atlas cluster using a connection URI and compress the output.</P>
      <CodeBlock language="bash" code={`backinghum backup:create --compress

# Prompts:
# > Database type: mongodb
# > Connection type: MongoDB Atlas (URI)
# > URI: mongodb+srv://user:pass@cluster.mongodb.net/
# > Database name: production
# > Output directory: ./backups`} />
      <P>Output: <IC>./backups/production-1776174984348.tar.gz</IC></P>

      <HR />
      <H2 id="mysql-remote">MySQL — remote with URI</H2>
      <P>Back up a remote MySQL database using a connection URI.</P>
      <CodeBlock language="bash" code={`backinghum backup:create --compress --verbose

# Prompts:
# > Database type: mysql
# > Connection type: Remote
# > Connection method: Connection URI
# > URI: mysql://admin:secret@db.example.com:3306/shop
# > Output directory: ./backups`} />
      <Callout variant="info">
        In URI mode the database name is inferred from the URI path (<IC>/shop</IC> → <IC>shop</IC>) and saved to the registry automatically.
      </Callout>

      <HR />
      <H2 id="postgres-docker">PostgreSQL — Docker container</H2>
      <P>Back up a PostgreSQL database running inside a Docker container.</P>
      <CodeBlock language="bash" code={`backinghum backup:create

# Prompts:
# > Database type: postgres
# > Connection type: Docker
# > Container name: postgres_prod
# > User: postgres
# > Password: secret
# > Database name: appdb
# > Output directory: ./backups`} />
      <P>Backinghum runs <IC>docker exec -e PGPASSWORD=... postgres_prod pg_dump ...</IC> internally and streams the output to disk.</P>

      <HR />
      <H2 id="restore-replace">Restore with replace mode</H2>
      <P>Restore a backup and drop existing data first (full replace).</P>
      <CodeBlock language="bash" code={`# List backups to find the ID
backinghum backup:list

# Restore
backinghum backup:restore 1776174984348

# Prompts:
# > Restore mode: Replace (drop existing data)
# > Are you sure? Yes`} />
      <Callout variant="warning">
        Replace mode is irreversible. The CLI requires explicit confirmation before dropping existing data.
      </Callout>

      <HR />
      <H2 id="cron">Automated backups with cron</H2>
      <P>Schedule daily compressed backups using a cron job. Because <IC>backup:create</IC> is interactive, use a wrapper script that pre-answers the prompts via environment or a non-interactive approach.</P>
      <CodeBlock language="bash" code={`# Example cron entry — runs at 2am daily
0 2 * * * /usr/local/bin/backinghum backup:create --compress >> /var/log/backinghum.log 2>&1`} />
      <Callout variant="info">
        For fully automated (non-interactive) use, consider extending the CLI with a <IC>--config</IC> flag that reads connection details from a file. This is a planned feature.
      </Callout>
    </div>
  );
}
