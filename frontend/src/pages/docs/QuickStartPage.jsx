import { C, H2, P, Callout, StepList, CodeBlock, IC, HR } from './shared.jsx';

const steps = [
  {
    title: 'Install the CLI globally',
    description: 'Requires Node.js LTS or later. This installs the backinghum executable on your PATH.',
    code: 'npm install -g backinghum',
    lang: 'bash',
  },
  {
    title: 'Verify the installation',
    description: 'Confirm the binary is available and check the version.',
    code: 'backinghum --version',
    lang: 'bash',
  },
  {
    title: 'Create your first backup',
    description: 'Run the interactive wizard. You will be prompted to select a database type and enter connection details.',
    code: 'backinghum backup:create',
    lang: 'bash',
  },
  {
    title: 'List your backups',
    description: 'View all backups stored in the local registry, including IDs, sizes, and timestamps.',
    code: 'backinghum backup:list',
    lang: 'bash',
  },
];

export default function QuickStartPage() {
  return (
    <div>
      <p style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Quick start · 2 min read
      </p>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: C.text }}>
        Quick start
      </h1>
      <P>Get from zero to your first backup in under two minutes.</P>

      <Callout variant="info">
        Make sure you have the native database tools installed for the database you want to back up. See the <strong>Installation</strong> page for the full prerequisites list.
      </Callout>

      <StepList steps={steps} />

      <Callout variant="success">
        Your backup is now saved to disk and registered in <IC>~/.db_backup/backupRegistry.json</IC>. Use the ID from <IC>backup:list</IC> to restore or delete it later.
      </Callout>

      <HR />
      <H2 id="next">What's next</H2>
      <P>Now that you have a backup, here are the most common next steps:</P>
      <ul style={{ fontFamily: 'monospace', fontSize: 13, color: C.muted, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>Restore a backup — <IC>backinghum backup:restore &lt;id&gt;</IC></li>
        <li>Create a compressed backup — <IC>backinghum backup:create --compress</IC></li>
        <li>Enable verbose output — add <IC>--verbose</IC> to any create command</li>
        <li>Delete an old backup — <IC>backinghum backup:delete &lt;id&gt;</IC></li>
      </ul>

      <HR />
      <H2 id="example">End-to-end example</H2>
      <P>A complete workflow from create to restore to cleanup:</P>
      <CodeBlock language="bash" code={`# 1. Create a compressed backup with verbose output
backinghum backup:create --compress --verbose

# 2. List all backups and note the ID
backinghum backup:list

# 3. Restore by ID (you will be prompted for merge or replace)
backinghum backup:restore 1776174984348

# 4. Delete the backup when no longer needed
backinghum backup:delete 1776174984348`} />
    </div>
  );
}
