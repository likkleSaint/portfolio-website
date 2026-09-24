# Portfolio V2 foundation

An isolated React + TypeScript + Vite application. The sibling `Portfolio Website/`
directory is V1 and is not part of this application's source or build.

## Local development

Run from `portfolio-v2/` with a Node.js version supported by Vite:

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

On Windows, use `npm.cmd` if PowerShell blocks the `npm.ps1` launcher.
The build includes the strict TypeScript check (`tsc -b`).

## Source organization

- `src/app/`: route definitions.
- `src/pages/`: minimal route pages.
- `src/data/`: repository-owned content; currently one temporary project record.
- `src/types/`: content contracts.
- `src/styles/`: semantic grayscale tokens and accessible global defaults.

Add shared components, hooks, and CSS Modules when concrete features need them.
`public/` is currently empty; the generated demo assets have been removed.

## Routes

- `/`: Home.
- `/projects/:slug`: project placeholder (`accountability-os` is the sole sample).
- `*`: Not Found, with a link home. Unknown project slugs also show Not Found.

React Router uses browser history. A future static host must serve the application
entry point for direct route requests. Deployment configuration is intentionally
deferred. No V1 content, redesign, navigation shell, or animation is included.
