# Kazim — Developer Portfolio

A lightweight, responsive personal portfolio for Kazim, a Software Developer with a Cybersecurity background based in Malaysia. It is built with plain HTML, CSS, and JavaScript so it can be deployed directly to GitHub Pages without a build process.

## Features

- Premium, responsive dark-theme design with subtle, motion-reduced animations
- Sticky navigation with a keyboard-accessible mobile menu and active-section state
- Recruiter-focused About, skills, projects, security, education, and contact sections
- Accessible project-detail dialogs that keep project cards concise
- Clearly labelled screenshot areas ready to be replaced with real project captures
- Verified GitHub profile links only—no guessed repository, email, or LinkedIn links
- SEO, social metadata, custom SVG favicon, and a matching `404.html` page
- No frameworks, backends, databases, or third-party JavaScript dependencies

## Tech Stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, responsive media queries)
- Vanilla JavaScript (menu, section highlighting, dialogs, scroll reveals)
- Google Fonts: Manrope and DM Mono

## Project Structure

```text
.
├── index.html              # Main portfolio page
├── 404.html                # GitHub Pages error page
├── css/
│   └── style.css           # All shared site styles and responsive rules
├── js/
│   └── script.js           # Navigation, dialogs, animation, current year
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/             # Put project screenshots here
├── .gitignore
└── README.md
```

## Local Development

No installation is required. Open `index.html` directly in a browser, or run a simple static server from this directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages Deployment

This portfolio is prepared for the `Mikaa-dev.github.io` repository and will be published at `https://Mikaa-dev.github.io`.

1. Create a new GitHub repository named exactly `Mikaa-dev.github.io` under the `Mikaa-dev` account.
2. From this project folder, initialise Git and push the files:

   ```bash
   git init
   git add .
   git commit -m "Create developer portfolio"
   git branch -M main
   git remote add origin https://github.com/Mikaa-dev/Mikaa-dev.github.io.git
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. GitHub will publish the site at `https://Mikaa-dev.github.io` after deployment completes.

If the repository has a different name, GitHub Pages will instead use a project URL such as `https://Mikaa-dev.github.io/repository-name/`. The site itself uses relative paths, so it supports either arrangement.

## Customization Guide

### Add a LinkedIn URL or email address

These details are intentionally hidden because no valid values were provided. In `index.html`, find the comment near the Contact section:

```html
<!-- LinkedIn and email are intentionally hidden until valid contact details are supplied. -->
```

Replace it with real links only after you have the correct URL/address. Use `mailto:your-email@example.com` for email and an `https://www.linkedin.com/in/...` URL for LinkedIn.

### Add a project repository URL or live demo

Each project currently links to the verified GitHub profile because individual repository URLs were not supplied. Find the `GitHub profile` link within the relevant `.project-card` in `index.html`, replace its `href` with the confirmed repository URL, and update its visible label to `View repository`.

Add a live demo link only when a real public demo URL is available.

### Replace a project screenshot

1. Export a real screenshot (WebP, PNG, or JPG) and place it in `assets/images/`, for example `assets/images/rfid-attendance.webp`.
2. In the matching `.project-preview` block in `index.html`, replace the placeholder content with:

   ```html
   <img src="assets/images/rfid-attendance.webp" alt="RFID Attendance Management System dashboard" loading="lazy" />
   ```

3. The image sizing rule is already in `css/style.css`. Use a concise, descriptive `alt` value that explains what is visible in the screenshot.

### Add a resume

Place a real PDF at `assets/resume.pdf`. Then replace the resume comment in the Hero section with a link such as:

```html
<a class="button button-secondary" href="assets/resume.pdf" target="_blank">Download resume</a>
```

### Update education

In the Education section of `index.html`, add your verified institution, qualification, and completion date. Do not add credentials or dates until they are accurate.

### Add experience

The Experience section is deliberately hidden to avoid publishing invented or placeholder work history. Search for `Experience is intentionally hidden` in `index.html`, add confirmed roles, companies, dates, and responsibilities, and remove the `is-visually-hidden` class only once the content is ready.

## Contact Configuration

- GitHub: `https://github.com/Mikaa-dev` is configured throughout the site.
- LinkedIn: not yet provided; intentionally not shown.
- Email: not yet provided; intentionally not shown.

## Notes

- The copyright year is updated automatically in `js/script.js`.
- The portfolio respects a visitor’s `prefers-reduced-motion` setting.
- Keep all links relative for assets to preserve GitHub Pages compatibility.
