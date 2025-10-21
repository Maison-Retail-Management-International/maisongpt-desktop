# MaisonGPT Desktop — Minimal Build Repo

This repository is intentionally minimal. It contains only assets and a single GitHub Actions workflow to build macOS and Windows desktop apps using `pake-cli`.

- Assets live in `assets/icons/` (default icon: `assets/icons/logo-1024-white.png`).
- CI workflow: `.github/workflows/build-app.yml`.
- No app source code is kept here; builds wrap a website URL into native packages.

## Build via GitHub Actions

The workflow can be triggered in two ways:

### 1. Automatic Release (Tag Push)
Push a version tag to automatically create a GitHub release with built apps:
```bash
git tag v1.0.0
git push origin v1.0.0
```
- Creates a GitHub release with the tag name
- Builds and uploads `.dmg` (macOS) and `.msi` (Windows) files to the release
- Uses default settings: `https://chat.maisonrmi.com`, name `MaisonGPT`, default icon

### 2. Manual Build (workflow_dispatch)
Trigger manually via GitHub Actions with custom inputs:
- `url` — Website to package (default: `https://chat.maisonrmi.com`)
- `name` — Application name (default: `MaisonGPT`)
- `icon` — Path to icon PNG file (default: `assets/icons/logo-1024-white.png`)

#### Steps to run manually:
1. Go to the repo's `Actions` tab
2. Select "Build MaisonGPT Desktop (macOS & Windows)"
3. Click "Run workflow", optionally adjust inputs, and start
4. When done, artifacts appear under the workflow run as downloadable files

## Local Build (Optional)
If you want to build locally instead of CI:

```bash
npm install -g pake-cli
pake "https://chat.maisonrmi.com" \
  --name "MaisonGPT" \
  --icon assets/icons/logo-1024-white.png
```

Outputs will be placed in the `pake-cli` output directory.

## Icons
- Default icon: `assets/icons/logo-1024-white.png` (optimized for desktop apps)
- Alternative: `assets/icons/logo-1024.png` (dark background version)
- Platform-specific icons: `maison.icns` (macOS), `maison.ico` (Windows)

## Notes
- **Releases**: Tag pushes create GitHub releases with built binaries automatically
- **Manual runs**: Use workflow_dispatch for testing or custom builds
- **Codesigning**: Not configured in this minimal setup. Artifacts are unsigned
- **Technology**: `pake-cli` wraps web apps into native packages via Tauri
- **Compatibility**: Supports both macOS and Windows builds in parallel

## Troubleshooting
- If the icon doesn't apply, ensure the PNG file exists at the specified path
- If builds fail, check the workflow logs for `pake-cli` output and errors
- Windows antivirus may flag unsigned binaries; consider code signing for distribution
- For release builds, ensure you have proper repository permissions for creating releases