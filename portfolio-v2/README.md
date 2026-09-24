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
- `src/components/layout/`: shared AppShell and its CSS Module.
- `src/components/navigation/`: typed navigation data, disclosure tree, and responsive controller.
- `src/hooks/`: IntersectionObserver-based Home section tracking.
- `src/pages/`: minimal route pages.
- `src/data/`: repository-owned content; currently one temporary project record.
- `src/types/`: content contracts.
- `src/styles/`: semantic grayscale tokens and accessible global defaults.

Global resets live in `global.css`, shared values in `tokens.css`, and layout/page
styles in CSS Modules. Add hooks and further components when features need them.
`public/` is currently empty; the generated demo assets have been removed.

## Routes

- `/`: Home.
- `/projects/:slug`: project placeholder (`accountability-os` is the sole sample).
- `*`: Not Found, with a link home. Unknown project slugs also show Not Found.

React Router uses browser history. A future static host must serve the application
entry point for direct route requests. Deployment configuration is intentionally
deferred. Only verified V1 contact destinations are reused; content migration and
Projects/Contact/404 animation work remain out of scope.

## Shell and themes

The shell provides a keyboard skip link and one focusable main region shared by
all routes. At 64rem and above, a sticky sidebar contains ordinary disclosure
navigation. Its content can scroll independently on short screens. Below 64rem,
a sticky compact header opens a full-width native modal dialog. Closing it via
Escape or Close returns focus to the trigger. Tab/Shift+Tab wrap within the menu,
the background is inert through the native dialog, and body scrolling is locked
only while the dialog is open. Internal destination selection closes the menu
and focuses the destination main region or section.

One branch is expanded at a time. A user-selected branch stays open until the
route or active section's parent branch changes. The project route automatically
exposes Projects. Collapsed groups are inert and hidden from assistive technology.
Contact destinations use normal same-tab anchors (Email opens the mail handler).

Home includes minimal section targets for About and Contact. IntersectionObserver
updates the active section without a continuous scroll listener. Explicit anchor
selection is honored initially, and the end of the document selects Contact.
The temporary sections are short: several can fit in one viewport, and lower
anchors cannot always reach the top. Reassess the observation boundaries when
real content arrives rather than adding artificial height now.

Light grayscale tokens are the default. Setting `data-theme="dark"` on the root
`html` element selects the dark tokens. There is no theme toggle or stored theme
preference yet. Disclosure transitions use CSS only and become effectively
immediate under `prefers-reduced-motion`. The mobile dialog opens/closes without
an entrance animation.
