# Git Strategy Guide — Abirami's AI Projects

## The Core Question: One Repo or Many?

There are three patterns developers use. Understanding all three helps you pick the right one.

---

## Pattern 1 — Polyrepo (Separate Repo Per Project)

```
github.com/abiramib07/portfolio          ← one repo
github.com/abiramib07/ai-resume-analyzer ← another repo
github.com/abiramib07/stock-intelligence ← another repo
```

**Who uses this:** Most individual developers, small teams, open source authors.

**Pros:**
- Each project has its own issues, PRs, stars, README
- Clean GitHub profile — each repo shows up independently
- Zero risk of one project's dependency breaking another
- Permissions per project (can make one public, one private)

**Cons:**
- Managing 10+ repos gets tedious (updates, CI config, common tooling)
- Sharing utility code means publishing a package or copy-pasting

**Verdict for you:** ✅ Best for showcasing individual projects on GitHub profile.

---

## Pattern 2 — Monorepo (All Projects in One Repo, One Branch)

```
github.com/abiramib07/genAI
├── portfolio/
├── ai-resume-analyzer/
├── stock-intelligence/
└── shared/         ← optional: shared utilities across projects
```

**Who uses this:** Google (entire codebase), Meta, Airbnb, Vercel (turborepo), Nx-based teams.

**Pros:**
- One place for everything — one `git clone`, one place to search
- Shared code lives in `shared/` — no package publishing
- One CI pipeline to rule them all
- Atomic commits that span multiple projects

**Cons:**
- GitHub repo page shows all projects mixed together
- `git log` mixes commits from all projects
- Can get large and slow over time without tooling (Nx/Turborepo)
- Visitors to your GitHub see one repo, not many projects

**Verdict for you:** ✅ Best if your projects will share code (like a shared LangChain utility).
⚠️  Not ideal purely for portfolio visibility on GitHub.

---

## Pattern 3 — Branch-Per-Project (with or without Worktrees)

```
genAI repo
├── main                    ← one project
├── project/portfolio       ← another project
├── project/ai-resume-analyzer ← another project
```

**Who uses this:** Almost nobody for independent projects. This pattern is designed for:
- Long-lived feature work on the SAME product
- Release branches (v1.x, v2.x) of the SAME software
- GitFlow (develop, release/1.0, hotfix branches) — all same product

**Why it fails for independent projects:**
- GitHub's default view is `main` — visitors never see your other projects
- Branches imply the code will eventually merge. Independent projects never merge.
- `git log` on any branch shows history from ALL branches (same commit graph)
- PRs between unrelated projects make no semantic sense
- CI on `main` might accidentally run portfolio tests on resume-analyzer code

**Verdict for you:** ❌ Do not use this for separate independent projects.

---

## Branch Switching vs Worktrees — The Real Difference

### Branch Switching (`git checkout` / `git switch`)

```
You have ONE working directory.
You switch the whole folder contents to a different branch.

D:\genAI\   ← this folder becomes "portfolio" when on that branch
            ← same folder becomes "resume-analyzer" when you switch
```

**The workflow:**
```bash
git switch portfolio          # D:\genAI now shows portfolio code
# ... work ...
git switch ai-resume-analyzer # D:\genAI now shows resume-analyzer code
```

**Problems:**
- Can't have both projects open in VS Code simultaneously
- Node modules / venv don't survive branch switches cleanly
- If you have unsaved changes on one project, you must stash before switching
- Slow on large projects (git rewrites thousands of files)

---

### Git Worktrees

```
You have MULTIPLE working directories, all linked to ONE .git folder.

D:\genAI\              ← main branch working directory
D:\portfolio\          ← portfolio branch working directory
D:\ai-resume-analyzer\ ← resume-analyzer working directory

All three share D:\genAI\.git — one git history, three live folders.
```

**The workflow:**
```bash
# Set up once
git worktree add D:\portfolio project/portfolio
git worktree add D:\ai-resume-analyzer project/ai-resume-analyzer

# Now just cd to whichever you want to work on
cd D:\portfolio           # work on portfolio
cd D:\ai-resume-analyzer  # work on resume analyzer
# Both are always available simultaneously — no switching needed
```

**Advantages over branch switching:**
- Both projects always live on disk at the same time
- Open both in VS Code simultaneously (two windows)
- npm install / pip install stays per-worktree — no conflicts
- No stashing before switching contexts
- Faster than checkout (no file rewriting)

**The honest trade-off:**

| | Branch Switching | Worktrees |
|---|---|---|
| Disk space | Low (one copy) | Higher (N copies) |
| Context switch speed | Slow (rewrites files) | Instant (just cd) |
| Both open at once | No | Yes |
| Complexity | Simple | Moderate setup |
| Best for | Single project, multiple features | Multiple independent codebases |

---

## How Professional Developers Actually Do It

### Solo developers / open source authors
> **Polyrepo** — one repo per project, GitHub profile shows all of them.
> Branch switching inside each repo for features.

### Startups (< 20 engineers)
> **Polyrepo** — separate repos for backend, frontend, mobile, infra.
> Feature branches + PRs inside each repo.
> Worktrees used occasionally when fixing a bug on main while a feature branch is dirty.

### Mid-size product teams
> **Polyrepo or light monorepo** — repos per domain (payments, auth, notifications).
> GitFlow or trunk-based development inside each repo.

### Big tech (Google, Meta, Airbnb)
> **Monorepo** — single repo, everything in folders.
> No long-lived branches. Trunk-based development (everything merges to main daily).
> Custom tooling (Bazel, Buck) because standard git slows down at that scale.
> Worktrees used heavily by individual engineers to work on multiple CLs simultaneously.

### The worktree sweet spot in professional use
Worktrees are used most often when:
- You're on a feature branch and a critical hotfix comes in — worktree lets you fix main without stashing
- You're reviewing someone else's PR while keeping your own work untouched
- You work on frontend and backend of the same product simultaneously (different branches)

---

## Recommended Strategy for Your Situation

You are: **Solo AI developer, building multiple independent AI projects, want GitHub visibility.**

### Recommendation: Polyrepo + Worktrees inside each repo

```
github.com/abiramib07/genAI              ← existing repo (keep as-is or rename)
github.com/abiramib07/portfolio          ← portfolio project (new repo)
github.com/abiramib07/ai-resume-analyzer ← resume analyzer (new repo, when ready)
```

Inside each repo, use worktrees for parallel feature work:
```
D:\portfolio\          ← main branch (production)
D:\portfolio-dev\      ← feature/highcharts-viz worktree
D:\portfolio-bg\       ← feature/neural-bg worktree
```

**Why this wins for you:**
- Recruiters visiting your GitHub see clean, individual project repos with stars/descriptions
- Each project has its own README, issues, and deployment
- No confusion between unrelated projects sharing a repo
- Worktrees still available inside each project when you need parallel feature work

---

## The Branching Model Inside Each Repo (GitFlow simplified)

```
main         ← always deployable, protected
develop      ← integration branch, merge features here first
feature/xyz  ← one branch per feature, branch from develop
hotfix/xyz   ← branch from main directly for urgent fixes
```

**Day-to-day workflow:**
```bash
# Start a new feature
git switch develop
git switch -c feature/highcharts-skills-radar

# Work, commit, push
git add .
git commit -m "feat: add skills radar chart with Highcharts"
git push origin feature/highcharts-skills-radar

# Open PR: feature/highcharts-skills-radar → develop
# After review, merge to develop
# When develop is stable, PR: develop → main
```

---

## Practical Commands Cheatsheet

```bash
# --- Worktree management ---
git worktree add <path> <branch>     # create worktree
git worktree list                    # see all worktrees
git worktree remove <path>           # remove worktree (keeps branch)
git worktree prune                   # clean up stale worktree refs

# --- Branch management ---
git branch -a                        # list all branches
git switch -c feature/name           # create + switch to new branch
git branch -d feature/name           # delete merged branch
git branch -D feature/name           # force delete unmerged branch

# --- Keeping branches current ---
git fetch origin                     # fetch all remote changes
git switch develop && git pull       # update develop
git switch feature/name && git rebase develop   # rebase feature on latest develop

# --- Clean up merged branches ---
git branch --merged main | grep -v main | xargs git branch -d
```

---

## Summary Table

| Approach | GitHub Visibility | Isolation | Complexity | Recommended For |
|---|---|---|---|---|
| Polyrepo | ✅ Best | ✅ Complete | Low | Independent projects (your case) |
| Monorepo (folders) | ⚠️ One repo | ✅ Good | Medium | Projects sharing utilities |
| Branch-per-project | ❌ Poor | ⚠️ Confusing | Medium | ❌ Not for independent projects |
| Worktrees | N/A (local tool) | ✅ Excellent | Medium | Parallel work within one repo |

**Bottom line:** Use separate repos per project. Use worktrees inside a repo when you need to work on two features of the same project at the same time without context-switching overhead.
