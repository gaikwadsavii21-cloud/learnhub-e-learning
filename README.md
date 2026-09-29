# E-Learn — E-Learning Platform Frontend (College Project)

A complete, responsive frontend for an e-learning platform, built with **HTML5, CSS3, Bootstrap 5 and vanilla JavaScript** only — no React, Angular, Vue or Node.js. It is structured so it can later be connected to a **Java Spring Boot REST API + MySQL** backend.

## Run it locally
No install needed. Just open `index.html` in a browser.
(Optional, for the smoothest experience: right-click `index.html` in VS Code and choose "Open with Live Server".)

## Deploy to Netlify (get a live URL)

**Option A — Drag and drop (fastest, no account setup beyond signing in):**
1. Go to https://app.netlify.com/drop
2. Log in / sign up (free).
3. Drag the whole `elearning-frontend` folder (the one containing `index.html`) onto the page.
4. Netlify uploads it and gives you a live URL like `https://random-name-123.netlify.app` in a few seconds.
5. Optional: in **Site settings → Change site name**, pick a custom subdomain, e.g. `my-elearn-project.netlify.app`.

**Option B — Netlify CLI:**
```bash
npm install -g netlify-cli
cd elearning-frontend
netlify deploy          # follow the prompts, choose this folder as the publish directory
netlify deploy --prod   # once you're happy, publish it live
```

**Option C — Connect a Git repo (auto-deploys on every push):**
1. Push this folder to a new GitHub repository.
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build command: leave blank. Publish directory: `.` (the repo root, since `index.html` is at the top level).
4. Deploy — Netlify gives you a live URL and redeploys automatically whenever you push.

No `netlify.toml` or redirect rules are needed — every page is a real static `.html` file, so Netlify serves them directly.

## Demo login
This is a frontend-only demo: any username/password combination logs you in (see `js/auth.js` / `js/admin.js`). Data lives in `js/mock-data.js` and in the browser's `localStorage` for the session flag only — nothing is sent to a server yet.

## Project structure
```
elearning-frontend/
├── index.html, login.html, register.html, courses.html, course-details.html,
│   dashboard.html, my-courses.html, assignments.html, assignment-details.html,
│   profile.html, about.html, contact.html
├── admin/
│   ├── login.html, dashboard.html, students.html, courses.html,
│   └── materials.html, assignments.html, enrollments.html, submissions.html
├── css/style.css
├── js/
│   ├── main.js         shared UI behaviour (nav highlighting, toasts, logout)
│   ├── auth.js          register/login validation, show/hide password
│   ├── courses.js       catalog search/filter/sort, course details, enroll, My Courses
│   ├── assignments.js   assignment list, status filters, submission simulation
│   ├── profile.js       profile view, edit, change password
│   ├── dashboard.js     student dashboard widgets
│   ├── admin.js         admin login, dashboard stats, table CRUD simulation
│   ├── api.js            service functions ready to swap in real fetch() calls
│   └── mock-data.js      all demo data, kept separate from UI/API code
└── assets/images/
```

## Connecting the real backend later
Every page already calls functions from `js/api.js` (`loginUser`, `getCourses`, `enrollCourse`, `submitAssignment`, etc.) instead of touching mock data directly. Each function currently resolves a Promise with data from `mock-data.js`. To connect Java Spring Boot:
1. Set `API_BASE_URL` in `js/api.js` to your backend, e.g. `http://localhost:8080/api`.
2. Replace the body of each function with a real `fetch()` call (the commented-out example line above each function shows the intended endpoint and method).
3. No HTML or other JS files need to change, since they only ever call the functions in `api.js`.

## Notes for your report / viva
- Demo data and simulated CRUD actions are clearly separated (`mock-data.js`, `api.js`) from UI code, exactly so the backend can be dropped in later.
- Form validation (registration, login, contact, admin login, profile) is done with vanilla JavaScript, no libraries.
- All pages share one navbar/footer/sidebar pattern and one design system (`css/style.css`) for a consistent professional look across the site.
