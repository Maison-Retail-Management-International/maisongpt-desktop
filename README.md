# MaisonGPT Desktop — Minimal Build Repo

This repository is intentionally minimal. It contains only assets and a single GitHub Actions workflow to build macOS and Windows desktop apps using `pake-cli`.

- Assets live in `assets/icons/` (default icon: `assets/icons/logo-1024-white.png`).
- CI workflow: `.github/workflows/build-app.yml`.
- No app source code is kept here; builds wrap a website URL into native packages.

## Build via GitHub Actions

The workflow is triggered manually via `workflow_dispatch` and accepts inputs:
- `url` — Website to package (default: `https://chat.maisonrmi.com`).
- `name` — Application name (default: `MaisonGPT`).
- `icon` — Path or URL to icon (default: `assets/icons/logo-1024-white.png`).
- `width` — Window width (default: `1200`).
- `height` — Window height (default: `780`).

### Steps to run
1. Go to the repo’s `Actions` tab.
2. Select "Build MaisonGPT (macOS & Windows)".
3. Click "Run workflow", optionally adjust inputs, and start.
4. When done, artifacts appear under the workflow run:
   - macOS DMG under `node_modules/pake-cli/output/*` (uploaded as artifacts).
   - Windows EXE/MSI under `node_modules/pake-cli/output/*` (uploaded as artifacts).

## Local Build (Optional)
If you want to build locally instead of CI:

```bash
npm install -g pake-cli
pake "https://chat.maisonrmi.com" \
  --name "MaisonGPT" \
  --icon assets/icons/logo-1024-white.png \
  --width 1200 \
  --height 780
```

Outputs will be placed in `node_modules/pake-cli/output/` when using the local npm install; if you use the global install, `pake` will print the output path.

## Icons
- Default icon: `assets/icons/logo-1024-white.png` (recommended for crisp white background across platforms).
- You can supply a custom icon path or a remote URL via the workflow input.

## Notes
- Codesigning/notarization is not configured in this minimal setup. Artifacts are unsigned.
- `pake-cli` wraps your web app URL into a native package via Tauri under the hood.
- For advanced options (tray, user agent, custom menus, etc.), extend the workflow or use `pake-cli` flags.

## Troubleshooting
- If the icon doesn’t apply, ensure the path exists or use a direct URL.
- If artifacts are empty, check the workflow logs for `pake-cli` output and errors.
- Some antivirus tools on Windows may flag unsigned binaries; distribute with caution or add signing later.