# Nouman J. — Working Table Portfolio

Your complete static portfolio. All pages, interactions, fonts, and verified logos are included. No installation, build command, API key, or paid hosting is required.

## Replace noumanjavaid.github.io

1. Unzip this download on your computer.
2. Open your `noumanjavaid.github.io` GitHub repository.
3. Upload the contents of this folder to the repository root, replacing matching files. `index.html` and the `assets` folder must sit at the root, not inside another folder. Include the `.github` folder so its workflow replaces the previous dist-based workflow.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions**.
5. Commit the files to `main`. The included **Deploy portfolio to GitHub Pages** workflow publishes the site. You can also run it from the **Actions** tab.
6. Once the workflow succeeds, open https://noumanjavaid.github.io/.

If you prefer branch publishing, disable any older GitHub Pages Actions workflow first, then choose **Deploy from a branch → main → /(root)** in Settings → Pages. The included `.nojekyll` file makes this a plain static site.

Back up your current repository before replacing it. This ZIP does not contain private source credentials or hosting-specific files.

## Edit the portfolio

- `index.html` — copy, roles, projects, links, contact details, and hero panels.
- `assets/styles.css` — colours, typography, layout, and mobile rules. The main tokens are near the top.
- `assets/script.js` — project-file interactions, case-study content, navigation, and copy-link action.
- `assets/logos/` — local official project marks.
- `assets/fonts/` — local fonts and their licence files.
- `PROJECT-LOGOS.md` — logo sources and the five projects that still need an official link or asset.

Open `index.html` locally for a quick look. The clipboard action requires a secure hosted page; all reading, navigation, project-file toggles, and case studies work without a backend.

## Layout and accessibility

On wide, sufficiently tall screens, each section's introduction stays in place while its content scrolls. On mobile, tablets, and short windows, sections flow naturally. Scrolling is never captured or hijacked.

Use Tab to reach controls and Enter or Space to open a hero file. The file buttons also support Up/Down arrows and Home/End. Escape closes navigation or a case study. System reduced-motion preferences are respected. The hero panels are illustrative overviews, not live dashboards or internal architecture screenshots.

## Logo follow-up

Capital Cortex, The Forge, ErxiebenAI, Matching Paws, and InCours are shown as plain names until an official project link or logo file is provided. Ciquora EMR uses the verified corporate Ciquora Solutions logo. No substitute personal initials or unrelated business marks are used.
