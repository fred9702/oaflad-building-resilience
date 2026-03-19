# #BuildingResilience — Website Asset Plan

## Status Legend
- ✅ Done
- 🔲 Needed — Route A (you, in Illustrator)
- ⚙️ Needed — I generate once Route A exports are dropped here

---

## What We Have

| File | Format | Notes |
|------|--------|-------|
| `oaflad-logo-clean.svg` | SVG | Clean vector, exact brand colours |
| `oaflad-logo-white.svg` | SVG | All paths white, for dark backgrounds |
| `logo-assets/oaflad-logo-transparent.png` | PNG | White bg removed |
| `logo-assets/oaflad-logo-white-reversed.png` | PNG | White on transparent |
| `logo-assets/oaflad-logo-on-navy.png` | PNG | For dark section use |
| `logo-assets/navbar-logo-96h@2x.png` | PNG | 192px file → renders 96px @2x |
| `logo-assets/navbar-logo-on-navy-96h@2x.png` | PNG | Navy bg navbar variant |
| `logo-assets/social-profile-400x400.png` | PNG | Twitter/LinkedIn profile |
| `logo-assets/favicon-{16–512}px.png` | PNG | 8 sizes |
| `logo-assets/oaflad-social-banner-1200x630.png` | PNG | OG image for OAFLAD |
| `transparent OAFLAD Logo Eng Fre High resolution-1 2.png` | PNG | Bilingual lockup — ready to use as-is |
| `oc-assets/BuildResilience-Logo-FINAL-FR-01.png` | PNG | French mark only (high-res source) |
| `oc-assets/BuildResilience-Logo-FINAL-FR.ai` | AI | ✏️ Vector source — text editable |
| `oc-assets/RR-LOGO-FULL-FR-01.png` | PNG | French full logo with subtitle |
| `oc-assets/RR-LOGO-FULL-FR.ai` | AI | ✏️ Vector source — text editable |

---

## What's Needed

### 1. Campaign SVGs — core set

| File to produce | Source .ai | What changes |
|----------------|-----------|--------------|
| 🔲 `campaign-mark.svg` | Either .ai | Export the Venus symbol **with no text** as a standalone SVG |
| 🔲 `campaign-logo-fr.svg` | `BuildResilience-Logo-FINAL-FR.ai` | Export as-is (French is already correct) |
| 🔲 `campaign-logo-en.svg` | `BuildResilience-Logo-FINAL-FR.ai` | Change `#Renforcer` → `#Building` and `La Résilience` → `Resilience` |
| 🔲 `campaign-logo-full-fr.svg` | `RR-LOGO-FULL-FR.ai` | Export as-is |
| 🔲 `campaign-logo-full-en.svg` | `RR-LOGO-FULL-FR.ai` | Change hashtag lines + subtitle (see translations below) |

**Exact English text strings:**

```
Line 1:  #Building
Line 2:  Resilience

Subtitle (full logo only, two lines, uppercase):
OF WOMEN AND GIRLS FACING
CLIMATE CHANGE AND CONFLICT
```

### 2. Campaign PNG derivatives — I generate these
*(Drop the SVG exports above into `oc-assets/` and I'll run the pipeline)*

| File | Size | Use |
|------|------|-----|
| ⚙️ `campaign-favicon-{16–512}px.png` | 8 sizes | Browser tab, PWA icons |
| ⚙️ `campaign-mark-400x400.png` | 400×400 | Social profile (campaign accounts) |
| ⚙️ `campaign-og-1200x630.png` | 1200×630 | OG/Twitter Card `og:image` |
| ⚙️ `campaign-hero-1920x600.png` | 1920×600 | Website hero/header section |
| ⚙️ `campaign-navbar-96h@2x.png` | ~96px tall | Light navbar (transparent bg) |
| ⚙️ `campaign-navbar-white-96h@2x.png` | ~96px tall | Dark navbar (white reversed) |

---

## Route A — Step-by-Step (Illustrator)

### Before you start

1. Confirm the fonts are installed on your machine. The logos use:
   - **Playfair Display Bold** — the `#Renforcer / #Building` line and `La Résilience / Resilience` line
   - **Montserrat SemiBold or Bold (uppercase)** — the subtitle in the full logo
   - Both are free on [Google Fonts](https://fonts.google.com) if not already installed.

2. Open each `.ai` file and immediately check: click on the text — if it highlights as a text box, fonts are live and editable. If clicking selects a group of paths, the text has been **outlined** (converted to shapes). If outlined, message me and I'll switch to Route B reconstruction instead.

---

### File 1 — `BuildResilience-Logo-FINAL-FR.ai`

**Goal:** Produce `campaign-logo-fr.svg`, `campaign-logo-en.svg`, and `campaign-mark.svg`

**Steps:**

1. Open the file in Illustrator.
2. **Export French version first (no changes needed):**
   - `File → Export As → SVG`
   - Settings: Styling = **Presentation Attributes**, Font = **Convert to Outlines**, Images = **Embed**, Decimal = **3**, check **Minify** off (keep readable)
   - Save as `campaign-logo-fr.svg` into `oc-assets/`
3. **Edit for English version:**
   - Select the `#Renforcer` text object → change to `#Building`
   - Select the `La Résilience` text object → change to `Resilience`
   - Check alignment — `Resilience` is shorter than `La Résilience` so you may need to re-centre or left-align to match the mark
4. Export as `campaign-logo-en.svg` into `oc-assets/`
5. **Export mark only:**
   - Hide or delete both text layers (or move them off-artboard)
   - Export as `campaign-mark.svg` into `oc-assets/`
   - Undo / revert so text layers are restored

---

### File 2 — `RR-LOGO-FULL-FR.ai`

**Goal:** Produce `campaign-logo-full-fr.svg` and `campaign-logo-full-en.svg`

**Steps:**

1. Open the file in Illustrator.
2. **Export French version first:**
   - Same SVG export settings as above
   - Save as `campaign-logo-full-fr.svg` into `oc-assets/`
3. **Edit for English version:**
   - Change the hashtag/title text (same edits as File 1 above)
   - Select the subtitle text block and change to:
     ```
     OF WOMEN AND GIRLS FACING
     CLIMATE CHANGE AND CONFLICT
     ```
   - Keep the same uppercase styling and line breaks. The English is slightly shorter than the French so check it doesn't look too narrow — nudge letter-spacing up slightly if needed.
4. Export as `campaign-logo-full-en.svg` into `oc-assets/`

---

### SVG Export Settings (reference)

Use these settings consistently in the Illustrator SVG export dialog:

| Setting | Value |
|---------|-------|
| Styling | Presentation Attributes |
| Font | Convert to Outlines |
| Images | Embed |
| Object IDs | Minimal |
| Decimal places | 3 |
| Minify | Off |
| Responsive | On (removes fixed width/height, uses viewBox only) |

---

## Once Route A Is Done

Drop the 5 SVG files into `oc-assets/` and I'll immediately generate the full PNG derivative set (favicons, OG image, hero banner, navbar versions) for both EN and FR.
