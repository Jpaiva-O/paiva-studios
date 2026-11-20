# Paiva Studios

The link-in-bio site for **João Oliveira (@paiva_studios)**, published at https://jpaiva-o.github.io/paiva-studios/

Built as a dependency-free static site: HTML, CSS and vanilla JS. Content comes from the connected Instagram account; images are cached locally in `assets/`.

## Files

- `index.html` — page structure, SEO/Open Graph metadata
- `styles.css` — design tokens, responsive layout, motion keyframes
- `script.js` — gallery, filters, lightbox, particles, theme toggle
- `DESIGN.md` — design identity and motion notes
- `assets/` — profile image, post images, favicon
- `data/posts.json` — raw Instagram export

## Updates

Edit the files on `main`; GitHub Pages republishes automatically. To refresh Instagram content, re-export `data/posts.json` and replace images in `assets/`.
