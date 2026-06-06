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

## Notes

- The contact form is static HTML. To receive submissions, connect it to a service such as Formspree, Basin, Netlify Forms, or replace it with a `mailto:` call to action.
- If you want to use `baramind.com`, add a `CNAME` file containing `baramind.com`, keep `baseURL` set to `https://baramind.com/`, and configure DNS with your domain provider.
- The generated `public/` folder should not be committed; GitHub Actions builds and deploys it automatically.
