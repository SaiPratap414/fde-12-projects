// Publishes the next FDE project (per schedule/state.json) into its own GitHub repo.
// Creates the repo if missing, force-pushes the project folder as `main`, then advances state.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DRY = process.argv.includes('--dry-run');

const OWNER = process.env.GH_OWNER || 'saipratap414';
const TOKEN = process.env.GH_PAT || process.env.GITHUB_TOKEN;

function sh(cmd, args, opts = {}) {
  return execFileSync(cmd, args, { stdio: 'pipe', encoding: 'utf8', ...opts }).trim();
}
const loadJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const saveJson = (p, v) => writeFileSync(p, JSON.stringify(v, null, 2) + '\n');

const manifest = loadJson(join(ROOT, 'schedule', 'manifest.json'));
const statePath = join(ROOT, 'schedule', 'state.json');
const state = loadJson(statePath);

const idx = state.nextIndex ?? 0;
if (idx >= manifest.projects.length) {
  console.log('All 12 projects already published. Nothing to do.');
  process.exit(0);
}

const project = manifest.projects[idx];
console.log(`Publishing #${idx + 1}/12: "${project.title}" -> ${OWNER}/${project.repo}`);

const folder = join(ROOT, 'projects', project.folder);
if (!existsSync(folder)) {
  console.error(`Project folder missing: ${folder}`);
  process.exit(1);
}

if (DRY) {
  console.log('[dry-run] Would create the repo and push this folder. No changes made.');
  process.exit(0);
}
if (!TOKEN) {
  console.error('Missing GH_PAT (or GITHUB_TOKEN) environment variable.');
  process.exit(1);
}

await ensureRepo(OWNER, project.repo, project.description);

const work = mkdtempSync(join(tmpdir(), 'fde-'));
cpSync(folder, work, { recursive: true });

const remote = `https://x-access-token:${TOKEN}@github.com/${OWNER}/${project.repo}.git`;
const g = (...a) => sh('git', a, { cwd: work });
g('init', '-q');
g('config', 'user.name', process.env.GIT_AUTHOR_NAME || 'FDE Automation');
g('config', 'user.email', process.env.GIT_AUTHOR_EMAIL || 'automation@users.noreply.github.com');
g('add', '.');
g('commit', '-q', '-m', `Publish: ${project.title}`);
g('branch', '-M', 'main');
g('remote', 'add', 'origin', remote);
g('push', '-u', 'origin', 'main', '--force');
console.log(`Pushed to https://github.com/${OWNER}/${project.repo}`);

state.nextIndex = idx + 1;
state.published = state.published || [];
state.published.push({ repo: project.repo, title: project.title, at: new Date().toISOString() });
saveJson(statePath, state);
console.log(`State advanced. Next index: ${state.nextIndex}`);

async function ensureRepo(owner, repo, description) {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'fde-automation',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  const check = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (check.status === 200) {
    console.log('Repo already exists — will force-push current scaffold.');
    return;
  }
  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name: repo, description, private: false, auto_init: false })
  });
  if (!res.ok) {
    throw new Error(`Failed to create repo ${owner}/${repo}: ${res.status} ${await res.text()}`);
  }
  console.log('Repo created.');
}
