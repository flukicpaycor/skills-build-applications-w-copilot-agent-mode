# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` when running in GitHub Codespaces so the frontend can call the backend on port `8000`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development outside Codespaces, the app safely falls back to `http://localhost:8000/api`.

The Codespaces API base URL format is:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

Create `.env.local` in `octofit-tracker/frontend` to set it for Vite during development.

## Scripts

- `npm run dev --prefix octofit-tracker/frontend`
- `npm run build --prefix octofit-tracker/frontend`
- `npm run lint --prefix octofit-tracker/frontend`
