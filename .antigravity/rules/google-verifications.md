# Google Verification Files for Documentation

Whenever generating, modifying, or building documentation or new doc slugs/subsites for open source projects (e.g. GitHub Pages docs, project documentation, or static guides):

1. **Source Files**: The verification files are stored in public/verifications/:
   - google5612e1450dc0c1ac.html
   - googlef764ec34bcd1fe4a.html

2. **Mandatory Copy Requirement**:
   - Only when building external doc slugs/subsites, ensure these two verification files (or their exact string contents) are copied to the root of that generated documentation directory (docs/, dist/, or any sub-project doc root).
   - In any HTML templates/layouts for those docs, include the matching `<meta name="google-site-verification" content="..." />` tags in the `<head>`.
   - **DO NOT** copy these files to the root `public/` of this portfolio repository or add them to the portfolio's main `Layout.astro`. They belong solely in `public/verifications/` as reference assets for docs.

