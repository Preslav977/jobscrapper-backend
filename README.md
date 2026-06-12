# jobscrapper-backend

> REST API and scraping engine for aggregating Developer and Engineer job listings — built with TypeScript, Express, Prisma, and Puppeteer.

[![GitHub stars](https://img.shields.io/github/stars/Preslav977/jobscrapper-backend?style=social)](https://github.com/Preslav977/jobscrapper-backend)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![Star History Chart](https://api.star-history.com/svg?repos=Preslav977/jobscrapper-backend&type=Date)](https://star-history.com/#Preslav977/jobscrapper-backend&Date)

[Live Site]() · [Frontend Repo](https://github.com/Preslav977/jobscrapper-frontend)

---

## ✨ Features

| Feature               | Description                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| 🔐 Authentication     | Local login with PassportJS + GitHub OAuth; sessions stored via PrismaSessionStore for 24h       |
| 🏢 Company Setup      | Create a company with per-site scraping instructions and navigation steps                        |
| 🖼️ Image Upload       | Upload and store images for both companies and users                                             |
| 🧭 Navigation Scripts | Puppeteer scripts that click, select, and navigate target job sites with anti-detection measures |
| 🗂️ Extraction Scripts | Puppeteer scripts that extract job listings and job detail data from scraped pages               |
| 📄 Parsing Scripts    | Post-extraction parsers that clean and normalize raw job detail data for easy consumption        |
| ⏰ Cron Jobs          | Scheduled tasks that trigger scraping runs automatically                                         |
| 🧪 Tests              | Test suite using Vitest                                                                          |

---

## 🚀 Quick Start

### Install

```bash
git clone https://github.com/Preslav977/jobscrapper-backend.git
cd jobscrapper-backend
npm install
```

### Configure

Create a `.env` file in the root:

```env
NODE_ENV=
DATABASE_URL=
TEST_DATABASE_URL= # optional: if you want to run tests
supabaseURL=
supabaseAPI=
sessionSecret=
SECRET=
PORT=
```

### Migrate & Seed

```bash
npx prisma migrate dev
npm run seed        # optional: seed initial company/job data
```

### Run

```bash
npm run dev         # development (ts-node / tsx)
npm run build       # compile to dist/
npm start           # run compiled output
```

> API runs on [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

```
jobscrapper-backend/
  controllers/      # Business logic per resource (user, company, job)
  cron-jobs/        # Scheduled scraping triggers
  db/               # Database client and utilities
  helpers/          # Shared utility functions
  interfaces/       # TypeScript interfaces
  middlewares/      # Auth, session, error handling
  prisma/           # Schema and versioned migrations
  public/           # Uploaded images served statically
  routes/           # Express route definitions
  script/           # Puppeteer scripts: navigation, extraction, parsing
  seed/             # DB seed data
  tests/            # Vitest test files
  types/            # TypeScript type definitions
  app.ts            # Express app setup
  listen.ts         # Server entry point
  dist/             # Compiled JS output (git-ignored)
```

Requests hit Express routes → controllers handle logic → Prisma queries PostgreSQL. Each company stores its own scraping instructions. Puppeteer scripts read those instructions to navigate, extract, and parse job data from the target site. Cron jobs call those scripts on a schedule. All scraping logic is contained in `script/` — split into three stages: navigation → extraction → parsing.

---

## 🤝 Contributing

1. Reach out to me first
2. Fork → Branch → PR
3. Run `npm test` before submitting

---

## 📄 License

MIT © [Preslav977](https://github.com/Preslav977)
