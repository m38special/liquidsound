# LiQUiD SOUND — Cloud Infrastructure Setup

Step-by-step provisioning guide for all cloud services.
After each step, copy the credentials into Vercel's **Environment Variables** dashboard (never into code or `.env.local` in production).

---

## 1. GitHub Organisation (LiQUiDSOUND)

1. Go to https://github.com/organizations/new
2. Organisation name: `LiQUiDSOUND`
3. Create repo `liquid-sound` inside the org (private, no README — we push the existing scaffold)
4. Add all engineers as members with "Write" access

```bash
# From the repo root after org is created:
git remote add origin https://github.com/LiQUiDSOUND/liquid-sound.git
git push -u origin main
```

5. Enable branch protection on `main`:
   - Require pull request reviews before merging (1 reviewer)
   - Require status checks: `lint`, `type-check`, `test`
   - Restrict pushes to `main` to admins only

---

## 2. Vercel — Web App Hosting

1. Go to https://vercel.com/new
2. Import `LiQUiDSOUND/liquid-sound` from GitHub
3. **Root Directory**: `apps/web`
4. **Framework Preset**: Next.js (auto-detected)
5. Vercel will use `apps/web/vercel.json` for build config automatically

### Environments to create

| Environment | Branch      | Purpose                |
| ----------- | ----------- | ---------------------- |
| Production  | `main`      | Production app         |
| Preview     | PRs / `dev` | Per-PR preview deploys |

### Vercel Environment Variables (add after each service below)

All variables in `.env.example` must be set in Vercel's dashboard.
Mark `NEXT_PUBLIC_*` vars as "Available to browser".

### Custom Domain (pending board)

Once a domain is available:

1. Vercel → Project → Settings → Domains → Add domain
2. Point DNS: add CNAME record `@ → cname.vercel-dns.com`

---

## 3. Neon — PostgreSQL Database

> Plan: **Launch** ($19/mo) — enables branching for staging

1. Go to https://console.neon.tech → Create project
2. **Project name**: `liquid-sound`
3. **Region**: US East (N. Virginia) — `aws-us-east-1`
4. **Postgres version**: 16

### Branches

| Branch | Purpose                       |
| ------ | ----------------------------- |
| `main` | Production database           |
| `dev`  | Staging / preview environment |

Create the `dev` branch:
Neon console → Branches → Create branch → name: `dev`, from: `main`

### Credentials

Copy connection strings:

- **Production**: `DATABASE_URL` → Vercel Production env
- **Staging**: `DATABASE_URL` → Vercel Preview env (use `dev` branch URL)

### Run migrations

```bash
# After setting DATABASE_URL locally:
pnpm --filter @liquid-sound/db db:migrate
```

---

## 4. Cloudflare R2 — Object Storage

> Plan: Free tier (10 GB/mo free)

1. Go to https://dash.cloudflare.com → R2 Object Storage → Create bucket
2. **Bucket name**: `liquid-sound-media`
3. **Location**: Automatic (or US East for latency parity with Neon)

### CORS configuration

In the bucket settings → CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://liquid-sound.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### API Token

1. My Profile → API Tokens → Create Token → R2 Token
2. Permissions: Object Read & Write on bucket `liquid-sound-media`
3. Copy: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`

### Public Access URL (pending custom domain)

Once domain is available:

- Add a custom subdomain `media.liquid-sound.com` → point to R2 bucket
- Or enable R2 public bucket URL (less ideal — random Cloudflare URL)
- Update `NEXT_PUBLIC_R2_PUBLIC_URL` in Vercel env vars

---

## 5. Upstash Redis — Queue & Cache

> Plan: Free tier (10k commands/day) → Pay-as-you-go for production

1. Go to https://console.upstash.com → Create Database
2. **Name**: `liquid-sound-redis`
3. **Type**: Regional
4. **Region**: US East 1 (N. Virginia)
5. **Enable TLS**: ✓

Copy from the REST API panel:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

---

## 6. Clerk — Authentication

1. Go to https://dashboard.clerk.com → Create application
2. **Application name**: `LiQUiD SOUND`
3. Enable sign-in methods: Email, Google OAuth (recommended), Apple OAuth
4. Create two **instances**:
   - `liquid-sound-dev` → for Preview/Staging
   - `liquid-sound-prod` → for Production

### Credentials (per instance)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → `pk_test_*` (dev) / `pk_live_*` (prod)
- `CLERK_SECRET_KEY` → `sk_test_*` (dev) / `sk_live_*` (prod)

### Custom Domain (pending board)

Clerk Production → Domains → Add domain: `accounts.liquid-sound.com`

---

## 7. Resend — Transactional Email

1. Go to https://resend.com → Create API Key
2. **Name**: `liquid-sound-production`
3. Permissions: Sending access
4. Copy `RESEND_API_KEY`

### Domain verification (pending board)

1. Resend → Domains → Add domain: `liquid-sound.com`
2. Add DNS records (SPF, DKIM, DMARC) as shown in Resend dashboard
3. Set `RESEND_FROM_EMAIL=noreply@liquid-sound.com` once verified

Until domain is verified, use Resend's onboarding address (`onboarding@resend.dev`) for testing.

---

## 8. AWS — Remotion Lambda (Video Rendering)

> See [LIQA-14](/LIQA/issues/LIQA-14) for the full Remotion Lambda setup.
> Tracked separately; requires AWS account access.

Minimum IAM permissions needed: documented in `apps/video/README.md` (created in LIQA-14).

---

## Summary Checklist

| Service       | Status          | Blocker                       |
| ------------- | --------------- | ----------------------------- |
| GitHub org    | ✅ Ready        | Name confirmed: `LiQUiDSOUND` |
| Vercel        | ✅ Config ready | Needs repo push first         |
| Neon          | ✅ Ready        | —                             |
| Cloudflare R2 | ✅ Ready        | Public URL needs domain       |
| Upstash Redis | ✅ Ready        | —                             |
| Clerk         | ✅ Ready        | Custom domain optional        |
| Resend        | ✅ Ready        | Domain verification optional  |
| AWS / Lambda  | ⏳ LIQA-14      | AWS account access needed     |
| Custom domain | ❌ Blocked      | Board to provide domain name  |
