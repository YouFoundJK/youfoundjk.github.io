# Google Verification Files for Documentation

Whenever generating, modifying, or building documentation or new doc slugs/subsites for open source projects (e.g. GitHub Pages docs, project documentation, or static guides):

1. **Source Files**: The verification files are stored in public/verifications/:
   - google5612e1450dc0c1ac.html
   - googlef764ec34bcd1fe4a.html

2. **Mandatory Copy Requirement**:
   - When building external doc slugs/subsites, ensure these two verification files (`google5612e1450dc0c1ac.html` and `googlef764ec34bcd1fe4a.html`) are copied to the root directory of that generated documentation site (docs/, dist/, or any sub-project doc root).
   - Google checks purely for the HTTP presence of these HTML files at the site root. Do NOT invent or add `<meta name="google-site-verification">` tags.
   - **DO NOT** copy these files to the root `public/` of this portfolio repository or touch the portfolio's `Layout.astro`. They belong solely in `public/verifications/` as reference assets for external docs.


