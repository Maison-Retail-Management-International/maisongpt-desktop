# MaisonGPT Desktop

Build a minimal desktop app for `https://chat.maisonrmi.com` using Pake.

## Quick Start
- Install CLI: `npm install -g pake-cli`
- Icons are in `assets/icons/`.
- Titlebar is visible by default (omit `--hide-title-bar`).
- Drag-and-drop of files works by default.

## macOS (DMG)
```bash
pake "https://chat.maisonrmi.com" \
  --name "MaisonGPT" \
  --icon assets/icons/logo-1024.png \
  --app-version 1.0.0
```

## Windows (MSI)
```powershell
pake "https://chat.maisonrmi.com" \
  --name "MaisonGPT" \
  --icon assets/icons/maison.ico \
  --app-version 1.0.0
```

## Notes
- macOS outputs `MaisonGPT.dmg` in the project folder.
- Windows outputs `MaisonGPT.msi` in the project folder.
- Use `npx pake-cli` if you prefer not to install globally.