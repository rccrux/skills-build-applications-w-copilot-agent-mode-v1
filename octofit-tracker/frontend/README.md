# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier app.

## Environment variable requirement

Define VITE_CODESPACE_NAME for Codespaces API routing. Example in .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When set, frontend API requests use:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

When VITE_CODESPACE_NAME is not set, the app safely falls back to:

http://localhost:8000/api/[component]/

This avoids invalid URLs like https://undefined-8000.app.github.dev.

## Scripts

npm run dev
npm run build
npm run preview
npm run lint
