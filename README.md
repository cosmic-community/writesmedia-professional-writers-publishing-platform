# WritesMedia - Professional Writers Publishing Platform

![App Preview](https://imgix.cosmicjs.com/fa5f86e0-abff-11f0-be7c-6543f3acb6d3-photo-1503095396549-807759245b35-1760777634874.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated content publishing platform for professional writers to showcase their creative works including stories, screenplays, drama scripts, and blog posts. Built with Astro for lightning-fast performance and seamless integration with Cosmic CMS.

## Features

- **Multi-Format Content Display** - Showcase stories, movie scripts, drama scripts, cartoon scripts, child plays, and blog posts
- **Author Profiles** - Rich author pages with bios, avatars, verification badges, and social media links
- **Tag-Based Discovery** - Browse content by tags and categories
- **Copyright Protection** - Display copyright notices and watermark settings
- **Engagement Metrics** - View read counts, like counts, and comment counts
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Static Site Generation** - Lightning-fast page loads with Astro
- **SEO Optimized** - Built-in meta tags and structured data

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f354bfa8c41dcd66871124&clone_repository=68f35718a8c41dcd66871146)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "# Product Requirements Document — **WritesMedia**  
> *Mobile + Web app for professional writers to publish, protect, promote and monetize written works (stories, scripts, blogs, etc.).*
> 
> ---
> 
> ## 1. One-line summary
> A platform for professional writers to create, publish, protect (copyright, watermark), promote and measure written content with social features (likes, comments, shares, leaderboards, trending) and flexible authentication (email/password, OTP).
> 
> ---
> 
> ## 2. Key goals
> - Make publishing fast and professional-quality for scripts, stories, blogs and children's plays.  
> - Protect creators' IP (copyright tagging, automatic watermarking, export controls).  
> - Give creators promotion tools and analytics to grow readership and revenue.  
> - Provide clean UX for reading and discovery (trending, most liked, curated leaderboards).
> 
> ---
> 
> ## 3. Target users
> - Professional & aspiring writers (screenwriters, playwrights, authors, bloggers)  
> - Editors and producers scouting scripts and stories  
> - Fans/readers who follow creators and engage (like, comment, share)
> 
> ---
> 
> ## 4. Core features (MVP → Phase 2)
> ### MVP (must-have)
> - Authentication: Sign Up, Sign In (email/password), OTP login (SMS or email).  
> - User profiles (bio, avatar, social links, badges).  
> - Editor & content types: Story, Movie Script, Drama Script, Cartoon Script, Child Play Script, Blog post.  
> - Publish flow: Draft → Preview → Publish (public / unlisted / private).  
> - Read experience: reader view, reading stats (reads, time spent).  
> - Engagement: Like / Dislike, Comment, Share (social share to FB/Instagram/YouTube link, copy link).  
> - Copyright & attribution: creator-specified copyright notice; publication timestamp & hash.  
> - Watermarking: automatic (visible) watermark on exported PDFs and optional on web viewer.  
> - Basic search & tags; trending & most-liked lists.  
> - Database to store users, content, comments, likes, reads.  
> - Admin dashboard for content moderation, takedown requests, and analytics.  
> - User feedback form & simple promote (boost) purchase flow.
> 
> ### Phase 2 (post-MVP)
> - Stickers, formatting templates and cover art generator for posts.  
> - Advanced watermarking (per-user dynamic watermark with email/ID).  
> - Monetization: paywalled posts, tips, subscription channels.  
> - Promotion/boost marketplace with targeted discovery.  
> - Leaderboards (top writers by reads, likes, earnings) and curated feeds.  
> - Collaborative editing (co-authors, version control).  
> - Export formats: PDF (with watermark), Final Draft/ Fountain, DOCX.  
> - Integrations: Google Drive import/export, social posting API.  
> - Advanced analytics (funnel, cohort, retention heatmaps), plagiarism checks.
> 
> ---
> 
> ## 5. Basic user flows
> ### Sign Up / Sign In
> - Sign Up: email + password OR phone + OTP. Confirm email. Create profile.  
> - Sign In: email/password OR OTP (send code to email/phone). Option for 2FA.  
> - Password reset via email.
> 
> ### Publish content
> - From dashboard → New Post → choose template (Story / Script / Blog) → write or import → add tags, synopsis, cover → choose rights (copyright text, license) → watermark options → publish visibility → share.
> 
> ### Read & Engage
> - Reader opens post: sees header (title, author, tags, read time). Options: Like, Dislike, Comment, Share, Save, Report. Authors see extra controls: Promote, Edit, Export.
> 
> ---
> 
> ## 6. Data model (simplified)
> ### Tables (Postgres / similar)
> - `users`  
>   - id (uuid), email, phone, password_hash, name, username (unique), bio, role (user/admin/mod), avatar_url, created_at, last_login, verified (bool), preferences(json)
> - `auth_otps`  
>   - id, user_id, otp_code, method (sms/email), expires_at, created_at, used(bool)
> - `posts`  
>   - id, author_id, title, slug, type(enum: story/script/blog/...), content(markdown/JSON editor), synopsis, cover_url, tags (array), visibility(enum), copyright_text, watermark_settings(json), read_count(int), like_count(int), dislike_count(int), comment_count(int), created_at, updated_at, published_at
> - `comments`  
>   - id, post_id, user_id, parent_comment_id, content, is_flagged(bool), created_at, updated_at
> - `likes`  
>   - id, post_id, user_id, value (1 or -1), created_at
> - `reads`  
>   - id, post_id, user_id (nullable), session_id, read_duration_seconds, created_at
> - `shares`  
>   - id, post_id, user_id (nullable), platform(enum), created_at
> - `payments/promotions`  
>   - id, post_id, user_id, amount_cents, promotion_type, start_at, end_at, status
> - `reports`  
>   - id, reporter_id, target_type(enum user/post/comment), target_id, reason, status
> - `leaderboards_cache` (materialized/top-N cache)  
>   - metric, period, payload (json), updated_at
> 
> Indexes: posts.slug (unique), posts.author_id, posts.published_at, likes(post_id,user_id) unique, reads(post_id, created_at), full-text index on posts.title + content.
> 
> ---
> 
> ## 7. API surface (REST / GraphQL examples)
> ### Auth
> - `POST /api/v1/auth/signup`  
>   body: `{email, password, name, username}` → returns user + token
> - `POST /api/v1/auth/otp/request`  
>   body: `{phone_or_email}` → returns `{request_id}`
> - `POST /api/v1/auth/otp/verify`  
>   body: `{request_id, code}` → returns user + token
> - `POST /api/v1/auth/login`  
>   body: `{email, password}` → token
> 
> ### Content
> - `GET /api/v1/posts?tag=&type=&sort=trending&page=1`  
> - `GET /api/v1/posts/{id}`  
> - `POST /api/v1/posts` (auth) body: `{title,type,content,tags,visibility,copyright_text,watermark_settings}`
> - `PUT /api/v1/posts/{id}` (auth & owner)
> - `POST /api/v1/posts/{id}/like` body `{value:1|-1}`
> 
> ### Engagement
> - `POST /api/v1/posts/{id}/comment` body `{content, parent_id?}`
> - `POST /api/v1/posts/{id}/share` body `{platform:facebook|instagram|twitter|youtube|copy}`
> - `GET /api/v1/trending`  
> - `GET /api/v1/leaderboard?metric=reads&period=week`
> 
> ### Admin
> - `GET /api/v1/moderation/reports`  
> - `POST /api/v1/moderation/action` body `{report_id, action:remove/warn/approve}`
> 
> Responses in JSON with status codes; use JWT for auth.
> 
> ---
> 
> ## 8. Security & Privacy
> - Passwords: bcrypt/argon2 hashing.  
> - OTP: short expiry (5–10 minutes), rate-limited.  
> - 2FA optional.  
> - Sensitive PII encrypted at rest.  
> - CSRF protection for web; secure cookies for session.  
> - Content export PDFs include visible watermark with user email + timestamp and optional per-export serial number.  
> - Copyright: store publication timestamp + content hash (sha256) and provide downloadable proof-of-publication (PDF with embedded hash). Consider optional blockchain timestamping later (Phase 2).  
> - Takedown/reporting flow and DMCA contact handling.
> 
> ---
> 
> ## 9. Watermark & Copyright implementation details
> - Two watermark modes: **soft (on-web)** and **hard (on-export/PDF)**.  
> - Soft watermark: dynamic overlay in reader view — semi-transparent repeating text: `© Name — email — YYYY-MM-DD` or configurable.  
> - Hard watermark: applied server-side when generating PDF (use wkhtmltopdf / Puppeteer) embedding watermark on each page and adding metadata (XMP) with content hash.  
> - Copyright: author provides license text on publish (All rights reserved / Creative Commons variants). Save license with post metadata.
> 
> ---
> 
> ## 10. UI & UX (screens / components)
> Keep UI minimal and writer-focused: lots of white space, readable fonts, distraction-free editor.
> 
> Screens:
> 1. Onboarding: Sign up / OTP options  
> 2. Home / Discover: Trending, For you, Most liked, New releases  
> 3. Editor: template chooser, scene/act structure, formatting toolbar (Script-style shortcuts like slugline, action, dialogue)  
> 4. Post details (reader): title, meta, author card, share/like/comment, watermark toggle (author visible controls)  
> 5. Profile: works, stats, bio, social links, verify identity badge  
> 6. Promote/Boost modal: choose budget, duration, audience filters  
> 7. Admin/moderation panel: reports, user bans, content takedowns
> 
> Interactions:
> - Like/de-like toggles instantly with optimistic UI.  
> - Comment threading, upvote comments.  
> - Share opens platform chooser or copies link.  
> - Promote opens payment modal (Stripe).
> 
> ---
> 
> ## 11. Analytics & success metrics
> Track for each author & platform:
> - DAU / MAU for writers and readers  
> - New user signups (by channel)  
> - Conversion: signup → first publish  
> - Content reads, average read time, reads per post  
> - Engagement: likes per read, comments per read, shares per read  
> - Trending velocity (reads per hour last 24h)  
> - Promotions ROI: boost spend → additional reads / followers
> Success targets (example MVP targets):
> - 10k registered users in first 6 months  
> - Average read time > 2 minutes per published story  
> - 10% conversion of readers to engaged users (like/comment/share)
> 
> ---
> 
> ## 12. Monetization & business model
> - Freemium: free publishing with limits (number of public posts, storage) + Pro subscription for advanced templates, export options, analytics.  
> - Transaction fee on promotions and tips (Stripe).  
> - Marketplace: paid script listings / agent introductions (later).  
> - Sponsored placements (promotions) in trending/for-you feeds.
> 
> ---
> 
> ## 13. Tech stack (recommended)
> - Frontend: React (web), React Native / Expo (mobile)  
> - Backend: Node.js + Express or NestJS (GraphQL optional)  
> - DB: PostgreSQL (primary), Redis (caching, leaderboards, rate limit), S3-compatible storage for media.  
> - Search: ElasticSearch or Postgres full-text.  
> - PDF generation: Puppeteer / wkhtmltopdf for watermarking.  
> - Auth: JWT + refresh tokens; Twilio or SendGrid for OTP (or alternative).  
> - Payments: Stripe.  
> - Hosting / infra: AWS (ECS / EKS) or Vercel (frontend) + RDS, CloudFront CDN.  
> - Analytics: internal event pipeline (Kafka / Kinesis) → BigQuery / Redshift, or use Mixpanel for MVP.
> 
> ---
> 
> ## 14. Moderation, legal & copyright workflow
> - Automated filters for abusive content (profanity, spam).  
> - User reporting flow with auto-priority for DMCA.  
> - Copyright claim form for takedown; admin tools to review evidence and reinstate.  
> - Takedown policy and appeal process visible in footer.
> 
> ---
> 
> ## 15. MVP roadmap & priorities (high level)
> Week 0–4: Project setup, auth, basic DB, editor, publish/read pages, comments, likes.  
> Week 5–8: OTP, watermark on web, DNS/email, publishing flow, trending algorithm (simple).  
> Week 9–12: Export to PDF with watermark, promote flow basic, admin/moderation tools.  
> Post-launch: analytics, monetization (tips, subscriptions), advanced watermarking, leaderboards.
> 
> ---
> 
> ## 16. Example API & sample payloads
> **Publish post**
> `POST /api/v1/posts`  
> Body:
> ```json
> {
>   "title":"The Last Curtain",
>   "type":"drama_script",
>   "content":"# Act 1\nINT. THEATER - NIGHT\n...",
>   "tags":["drama","short-play"],
>   "visibility":"public",
>   "copyright_text":"© 2025 Jane Doe. All rights reserved.",
>   "watermark_settings":{"mode":"hard","text":"Jane Doe - jane@example.com - 2025-10-18"}
> }
> ```
> Response: `201` with `post_id`, `published_at`, `slug`.
> 
> **Like**
> `POST /api/v1/posts/12345/like` body `{ "value": 1 }` → returns updated like_count.
> 
> ---
> 
> ## 17. Trending & leaderboard algorithm (simple)
> - Trending score = weighted sum: `recent_reads * 0.5 + likes_last_24h * 0.3 + shares_last_24h * 0.15 + comment_activity * 0.05`.  
> - Leaderboard buckets: all-time reads, weekly reads, monthly likes, promoting earnings. Cache top-N every 5 minutes using Redis sorted sets.
> 
> ---
> 
> ## 18. Edge cases & considerations
> - Anonymous reads (no user_id): use session_id to count unique reads; cap reads per session per post to avoid abuse.  
> - Bots & fake likes: rate-limit, require verified email or phone for certain actions (promote/boost).  
> - Content migration: support file import for scripts (Final Draft, Fountain) and offer auto-format mapping.
> 
> ---
> 
> ## 19. Developer handoff artifacts to produce
> - API spec (OpenAPI / GraphQL schema).  
> - DB migration scripts and ERD.  
> - Component library (React) with editor components and storybook.  
> - Infrastructure IaC (Terraform).  
> - Automated tests: unit tests for API, integration tests for publish/read flows.
> 
> ---
> 
> ## 20. Next actionable steps (you can take immediately)
> 1. Decide MVP scope & constraints (which post types, watermark modes, payment support).  
> 2. Prioritize auth methods (email-only or include SMS OTP).  
> 3. Choose hosting and payment providers (Stripe, Twilio, SendGrid).  
> 4. Generate detailed OpenAPI + DB ERD for devs.  
> 5. Build a simple clickable prototype (Figma) for core flows.
> 
> ---
> 
> If you want, I can now:
> - produce the **OpenAPI spec** for the described APIs,  
> - design **ERD** SQL migrations for PostgreSQL,  
> - create **wireframe mockups** (screens descriptions or images), or  
> - generate a **detailed sprint plan** breaking the roadmap into tasks with acceptance criteria.
> 
> Which of those should I generate next?"

### Code Generation Prompt

> "Set up an Astro website powered by my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Astro** - Static site generation framework for optimal performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Inter Font** - Modern, professional typography

## Getting Started

### Prerequisites

- Bun (latest version)
- A Cosmic account with content

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

5. Start the development server:
```bash
bun run dev
```

6. Open [http://localhost:4321](http://localhost:4321) in your browser

## Cosmic SDK Examples

### Fetching Posts with Author Details

```typescript
import { cosmic } from './lib/cosmic'

// Get all posts with connected author and tags (depth=1)
async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching a Single Post

```typescript
// Get post by slug with full metadata
async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'posts',
        slug: slug
      })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

## Cosmic CMS Integration

This application is powered by Cosmic CMS and uses the following object types:

- **Posts** - Stories, scripts, and blog posts with full metadata
- **Users** - Author profiles with bios, avatars, and social links
- **Tags** - Content categorization for improved discovery

The Cosmic SDK is configured in `lib/cosmic.ts` and handles all content fetching with proper error handling and type safety.

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=YOUR_REPO_URL)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add environment variables in Netlify dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform's dashboard:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

<!-- README_END -->