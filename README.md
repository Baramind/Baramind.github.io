# Baramind Marketing Site

This repository is a Hugo static site intended for GitHub Pages.

## Minimal Steps To Publish

1. Push this repository to GitHub as `Baramind.github.io`.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to the `main` branch.
5. Open the **Actions** tab and wait for the **Build and deploy** workflow to finish.
6. Visit `https://baramind.github.io/`.

## Local Preview

Install Hugo, then run:

```bash
hugo server
```

The site will be available at the local URL printed by Hugo, usually `http://localhost:1313/`.

## Editing content

Most homepage copy lives in `data/` so it can be changed without touching templates:

- `data/products.yaml` — product cards (Demand Pilot, PySmith)
- `data/services.yaml` — the three services
- `data/process.yaml` — the "How we work" steps and the two entry paths
- `data/team.yaml` — the three disciplines
- `data/faq.yaml` — FAQ answers

Pages live in `content/`: `products/demand-pilot.md`, `services/*.md`, `how-we-work.md`, `about/index.md` and `insights/*.md`.
New articles go in `content/insights/` with `title`, `date`, `topic` and `summary` in the front matter.

## Notes

- Contact form: set `contactEndpoint` in `hugo.toml` (e.g. a Formspree form URL) to receive submissions. While it is empty, the form opens a pre-filled email to `hello@baramind.com`.
- Custom domain: `static/CNAME` contains `baramind.com` and `baseURL` is `https://baramind.com/`. The domain must also be set under **Settings > Pages**.
- Theme styles are in `themes/baramind/assets/css/site.css`; colours are CSS variables at the top, with dark-mode values below them.
- The generated `public/` folder should not be committed; GitHub Actions builds and deploys it automatically.
