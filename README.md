# ConceptLab — Interactive Physics & Science Simulations

A React + Vite frontend for interactive physics/science simulations, guided quizzes and learning analytics. The app features 3D simulations (three.js / react-three-fiber), Tailwind CSS, Firebase auth/firestore/storage integration and an approachable component structure.

This README covers setup, development, architecture, how to add new laws/simulations and deployment notes.

---

## Table of contents
- Quick Start
- Requirements
- Environment (Firebase + Vite env)
- Available Scripts
- Project structure (key files)
- How to add a Law or Simulation
- Styling (Tailwind)
- Deployment
- Troubleshooting
- Contributing
- License

---

## Quick Start

Clone and install dependencies:

```bash
git clone https://github.com/AadithyaSJ/ConceptLab.git
cd ConceptLab
npm install
```

Start development server (Vite):

```bash
npm run dev
# open http://localhost:5173 (Vite will print the URL)
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
# default http://localhost:5173
```

Run linter:

```bash
npm run lint
```

---

## Requirements

- Node.js (LTS recommended, e.g. >= 18)
- npm (comes with Node) or yarn/pnpm (adapt commands as needed)
- A Firebase project for authentication / Firestore / Storage if you intend to use those features.

---

## Environment & Firebase setup

This project currently uses Firebase. For security, replace any hard-coded config with environment variables. Vite requires env variables to be prefixed with `VITE_`.

Create a file at project root named `.env.local` (do NOT commit it):

```
# .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXX
```

Example replacement for src/firebase.js (short snippet — adapt to your needs):

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

Important:
- Never commit `.env.local` or any file containing secrets.
- If you already have a `src/firebase.js` with inline secrets, replace it with the Vite env pattern above.

---

## Available scripts

Defined in `package.json`:

- `npm run dev` — Start Vite dev server with HMR.
- `npm run build` — Create a production build (dist/).
- `npm run preview` — Preview the built app locally.
- `npm run lint` — Run ESLint on the codebase.

---

## Project overview & key files

Top-level flow:
index.html -> src/main.jsx -> src/App.jsx

Important files / folders:

- index.html — app entry and font assets.
- src/main.jsx — React bootstrap and global CSS import.
- src/App.jsx — routing, layout, top-level components and auth watcher.
- src/firebase.js — Firebase initialization (see env notes above).
- src/index.css — Tailwind + global CSS and utility classes.
- tailwind.config.js / postcss.config.js — Tailwind/PostCSS setup.
- src/data/lawsData.js — Core domain data (list of laws, formulas, passages, simulation component name, and quiz id).
- src/pages/
  - Home.jsx — landing page, hero, previews.
  - LawsList.jsx — list of laws generated from lawsData.
  - LawDetail.jsx — detail view + simulation component + quiz start button.
  - Quiz.jsx, Dashboard.jsx, Login.jsx, Signup.jsx, Score.jsx — other pages.
- src/components/
  - Navbar.jsx — top navigation; uses ProtectedRoute links and Firebase signOut.
  - ProtectedRoute.jsx — route wrapper that restricts access to authenticated users.
  - Loader.jsx / LoadingSpinner.jsx — canvas / app loaders.
  - components/simulations/* — individual simulation components (three.js + physics).
  - components/canvas/* — 3D scene helpers & models.
- public/ — static assets (images, models/glTF, etc.) accessible at `/`.

Notes:
- Routing uses react-router-dom; protected routes wrap pages in <ProtectedRoute> in App.jsx.
- Simulations: simulations are referenced by string name in lawsData (component property). See src/components/simulations/index.js for the mapping from name -> component.

---

## How to add or update a Law

The list of laws is a plain JS array in `src/data/lawsData.js`. Each law object includes keys:

```js
{
  name: "Law Name",
  formula: "Formula or short summary",
  passage1: "Description paragraph 1",
  passage2: "Description paragraph 2",
  component: "SimulationComponentName", // maps to /src/components/simulations
  quiz: "quizId" // maps to your quiz dataset
}
```

Steps to add a law:
1. Add the new object to `src/data/lawsData.js`.
2. Create a simulation component under `src/components/simulations/YourSimulation.jsx` and export it from `src/components/simulations/index.js`.
3. Provide quiz data under `src/data/` if applicable and wire the `quiz` field.
4. Add any assets to `public/` or `src/assets/` and reference them in your component.

Example: Add a simple mapping in `src/components/simulations/index.js`

```js
import MyNewSim from './MyNewSim.jsx';
export default {
  ...existingExports,
  MyNewSim,
};
```

Then set `component: "MyNewSim"` in the law object.

---

## Styling (Tailwind)

- Tailwind is used. Configuration: `tailwind.config.js`.
- Global styles & utilities are in `src/index.css`.
- To add custom utilities or colors, edit `tailwind.config.js` under `theme.extend`.
- After changing Tailwind config, restart the dev server.

---

## Deployment

Build the static assets:

```bash
npm run build
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, Firebase Hosting, etc.)

Tips:
- Vercel/Netlify: connect repository and set the build command `npm run build` and output folder `dist`.
- Ensure environment variables (VITE_*) are set in your hosting provider dashboard.
- If using Firebase Hosting, you can run `firebase deploy` after `npm run build` (requires Firebase CLI and firebase.json setup).

---

## Auth & Protected Routes

- Firebase Authentication is used. The Google provider is exported from `src/firebase.js`.
- App.jsx uses `onAuthStateChanged` to subscribe to auth state and conditionally render ProtectedRoute-wrapped pages.
- ProtectedRoute component lives in `src/components/ProtectedRoute.jsx`. It checks auth state and redirects to `/login` when necessary.

---

## Common troubleshooting

- "Blank page" or router 404 on direct refresh
  - Ensure your hosting is configured to rewrite all routes to index.html (single-page-app fallback). Netlify/Vercel handle this by default; static servers may need configuration.
- Firebase errors (auth / storage / firestore)
  - Check that your Vite env variables are correctly set and that the Firebase project enables the services you intend to use (Authentication sign-in methods, Firestore rules, Storage rules).
- Three.js / model loading slow or 0% loader
  - Verify `public/planet/` and other model assets are present and accessible. Use the browser devtools Network tab to confirm 200 responses.
- Tailwind styles not applied
  - Make sure `@tailwind base; @tailwind components; @tailwind utilities;` are included in `src/index.css` (they are). Restart Vite after changing tailwind.config.js.

---

## Tests & CI

- This repository currently has no tests or CI pipeline configured. Consider adding:
  - Unit tests (Jest / React Testing Library)
  - E2E tests (Cypress / Playwright)
  - A GitHub Actions workflow to run lint/build/tests on pull requests.

---

## Contributing

1. Fork the repository.
2. Create a topic branch (feature/your-feature).
3. Make changes and test locally.
4. Open a pull request with a clear description and context.

Please follow these guidelines:
- Keep components small and focused.
- Add comments to complex simulations explaining the physics model.
- Run `npm run lint` before submitting; fix lint issues.

---

## Security & Privacy

- Do not commit API keys or secrets. Use `.env` files with the `VITE_` prefix and add them to `.gitignore`.
- If you need to share test keys, use short-lived credentials or a separate demo Firebase project.

---

## Useful references

- Vite: https://vitejs.dev
- React Router: https://reactrouter.com
- Firebase Web SDK: https://firebase.google.com/docs/web/setup
- Three.js / react-three-fiber: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- Tailwind CSS: https://tailwindcss.com

---

## License

Add a license to the repository (e.g., MIT). Create a `LICENSE` file and document the license in this README.

---

If you want, I can:
- Add a sample .env.example with the VITE_ variables pre-filled (non-secret placeholders).
- Create a PR that migrates src/firebase.js to use Vite env vars and add `.env.local` to .gitignore.
- Draft a CONTRIBUTING.md or a simple GitHub Actions workflow for lint/build.

Thank you — happy hacking!
