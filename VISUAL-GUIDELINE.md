# OAFLAD #BuildingResilience — Visual Branding Guideline

> Warm Theme · Version B

This document defines the complete visual identity for the **Building Resilience** campaign website. All values are derived from the `feat/version-b` branch implementation.

---

## 1. Brand Overview

| Field | Value |
|-------|-------|
| **Campaign** | OAFLAD #BuildingResilience |
| **Aesthetic** | Warm, earthy, premium — glass-morphism meets African heritage tones |
| **Mood** | Confident, approachable, institutional yet modern |
| **Background** | Warm Cream (`#FBF0E6`) across the entire site body |

---

## 2. Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Orange** | `#E07B39` | `--color-orange` | Primary CTAs, accent highlights, focus rings, badges |
| **Crimson** | `#9B1C37` | `--color-crimson` | Headings (h1), active nav states, CTA banner background, secondary-dark button borders |
| **Brown** | `#6B3417` | `--color-brown` | Body text on dark sections, countdown background, nav link default color, dot grid patterns |

### Secondary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Green** | `#2D7B3F` | `--color-green` | Hero stripe accent only |
| **Navy** | `#1F4E79` | `--color-navy` | Focus ring offsets on dark backgrounds |

### Neutral Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Warm Cream** | `#FBF0E6` | `--color-warm-cream` | Site background, countdown text on dark bg |
| **Light Beige** | `#F5EDE0` | `--color-light-beige` | Hero gradient midpoint |
| **Mid Grey** | `#8A8A8A` | `--color-mid-grey` | Reserved for muted content |
| **Near Black** | `#2D2D2D` | `--color-near-black` | Default body text color |

### Usage Guidelines

- **Do**: Use Orange for all primary interactive elements; use Crimson for headings and emphasis
- **Do**: Pair Brown text on Warm Cream backgrounds for body copy
- **Don't**: Use raw black (`#000`) — always use Near Black (`#2D2D2D`)
- **Don't**: Mix Navy and Crimson in the same visual element
- **Don't**: Use Green outside of the hero stripe accent

---

## 3. Typography

### Font System

Two fonts only. Playfair Display is the brand voice — it unifies the site with the campaign logo, which uses Playfair Display Bold. Source Sans 3 handles body text where a serif would slow reading at paragraph length.

| Role | Family | CSS Variable | Fallback |
|------|--------|--------------|----------|
| **Headings / UI / Nav / Buttons / Labels** | Playfair Display | `--font-heading` / `font-heading` | Georgia, serif |
| **Body paragraphs / descriptions** | Source Sans 3 | `--font-body` / `font-body` | sans-serif |
| **Monospace** | Source Code Pro | `--font-mono` / `font-mono` | monospace |

**Rule of thumb:** if it's a UI element, heading, or label → `font-heading` (Playfair Display). If it's a body paragraph or long description → `font-body` (Source Sans 3).

### Weight Scale (Playfair Display)

| Context | Tailwind class | Weight |
|---------|---------------|--------|
| Hero H1 / campaign title | `font-extrabold` | 800 |
| Section H2 | `font-extrabold` | 800 |
| H3 / subsection | `font-bold` | 700 |
| Subtitles | `font-bold` | 700 |
| Nav links | `font-semibold` | 600 |
| Buttons / CTAs | `font-semibold` | 600 |
| Labels / badges | `font-semibold` | 600 |

### Heading Hierarchy

| Element | Size (mobile) | Size (desktop) | Weight | Color | Extra |
|---------|--------------|----------------|--------|-------|-------|
| **h1 (hero)** | `text-5xl` | `text-7xl` | `font-extrabold` (800) | Crimson | `leading-tight`, `letter-spacing: -0.01em` |
| **h2 (section)** | `text-2xl` | `text-4xl` | `font-extrabold` (800) | White (on Crimson bg) or Crimson | `letter-spacing: -0.01em` |
| **Subtitle** | `text-2xl` | `text-3xl` | `font-bold` (700) | Orange | Uses `font-heading` |
| **Body large** | `text-lg` | `text-xl` | normal (400) | `brown/90` or `near-black/70` | `line-height: 1.7` |
| **Body** | `text-lg` | `text-lg` | normal (400) | Near Black | `line-height: 1.7` |
| **Label/Badge** | `text-sm` | `text-sm` | `font-semibold` (600) | Orange | `uppercase tracking-widest` |

### Global Text Styles

```css
h1, h2, h3 { letter-spacing: -0.01em; }
p { line-height: 1.7; }
```

> **Note on letter-spacing:** Playfair Display is a serif with generous built-in optical spacing. `-0.01em` is used (rather than the tighter `-0.02em` common for sans-serif display fonts) to preserve legibility and the natural character of the typeface.

---

## 4. Gradients & Effects

### Hero Gradient

```css
background: linear-gradient(135deg, #FBF0E6 0%, #F5E6D3 50%, #FBF0E6 100%);
```

A subtle warm-cream-to-beige sweep across the hero section.

### Glass-morphism (Dark)

```css
/* .glass */
background: rgba(107, 52, 23, 0.5);          /* brown at 50% */
backdrop-filter: blur(16px) saturate(180%);
-webkit-backdrop-filter: blur(16px) saturate(180%);
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
```

Used for: countdown timer cards on brown backgrounds. Hover state adds `shadow-[0_0_30px_rgba(224,123,57,0.15)]`.

### Glass-morphism (Light / Cream)

```css
/* .glass-cream */
background: rgba(251, 240, 230, 0.85);       /* warm-cream at 85% */
backdrop-filter: blur(16px) saturate(180%);
-webkit-backdrop-filter: blur(16px) saturate(180%);
box-shadow: 0 2px 8px rgba(224, 123, 57, 0.15);
```

Used for: navbar on scroll (replacing solid `bg-warm-cream`). Adds `shadow-lg` on transition.

### Gradient Divider

```css
/* Decorative gradient line */
background: linear-gradient(to right, #E07B39, #9B1C37);  /* orange → crimson */
width: 6rem; height: 0.25rem; border-radius: 9999px;
```

Used as a decorative separator in Coming Soon pages.

### Button Shimmer Overlay

```css
/* Applied to primary, secondary, secondary-dark buttons */
background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
```

Positioned absolutely over buttons; animates via `hover-shimmer`.

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| Button shadow | `shadow-lg shadow-orange/30` | Primary button depth |
| Navbar shadow | `shadow-lg` | Scrolled navbar state |
| Glass hover | `0 0 30px rgba(224,123,57,0.15)` | Countdown card hover glow |
| Glass-cream | `0 2px 8px rgba(224,123,57,0.15)` | Scrolled navbar glass |

---

## 5. Spacing & Layout

### Container

| Property | Value |
|----------|-------|
| Max width | `max-w-7xl` (80rem / 1280px) — hero, navbar |
| Narrow max | `max-w-4xl` (56rem / 896px) — CTA banner |
| Narrowest | `max-w-3xl` (48rem / 768px) — countdown, coming soon |
| Horizontal padding | `px-4` default, `lg:px-8` on large screens |

### Section Padding

| Section | Vertical Padding |
|---------|-----------------|
| Hero | `py-20`, `min-h-[80vh]` |
| Countdown | `py-12` |
| CTA Banner | `py-16` |
| Coming Soon | `py-24 md:py-32` |
| Navbar | `py-4` |

### Responsive Breakpoints

Standard Tailwind breakpoints are used:

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| `sm` | 640px | Button stacking → horizontal row |
| `md` | 768px | Hero: single-col → two-col; text sizes scale up |
| `lg` | 1024px | Navbar: hamburger → full desktop nav; padding increases |

---

## 6. Component Styles

### Buttons

All buttons share a common base:

```
font-heading font-semibold text-lg rounded
transition-all duration-200
focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
min-h-[44px]
```

| Variant | Text | Background/Border | Hover | Focus Offset | Extra |
|---------|------|-------------------|-------|--------------|-------|
| **primary** | White | `bg-orange` | `bg-orange/90`, `scale-[1.02]` | `ring-offset-navy` | `shadow-lg shadow-orange/30`, shimmer overlay |
| **secondary** | White | `border-2 border-white` | `bg-white/10`, `scale-[1.02]` | `ring-offset-navy` | shimmer overlay |
| **secondary-dark** | Crimson | `border-2 border-crimson` | `bg-crimson/10`, `scale-[1.02]` | `ring-offset-warm-cream` | shimmer overlay |
| **ghost** | White | none | `text-orange` | `ring-offset-navy` | `underline underline-offset-4` |

Active state (all non-ghost): `active:scale-[0.98]`

### Navbar Register CTA (inline)

```
font-heading text-base font-semibold text-white bg-orange hover:bg-orange/90
px-4 py-2 rounded
focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-warm-cream
```

### Badge

```
font-heading text-sm font-semibold uppercase tracking-widest
text-orange bg-orange/10 px-4 py-1.5 rounded-full
```

### Hero Stripe (left-edge accent)

A vertical 4-color stripe on the far left of the hero:

```
width: w-3 (12px) / md:w-4 (16px)
position: absolute left-0 top-0 bottom-0
colors (top → bottom): orange → crimson → brown → green (each 25%)
```

### Geometric Overlay (CTA Banner)

SVG triangle pattern repeated at `opacity-10` over the crimson background:

```
background-size: 40px 32px
fill: white
```

### Dot Grid Background (Coming Soon)

```css
background-image: radial-gradient(circle, var(--color-brown) 1px, transparent 1px);
background-size: 40px 40px;
opacity: 0.04;
```

### Countdown Cards

Glass cards (`glass` class) on `bg-brown` section:
- `rounded-xl p-4 md:p-6`
- Number: `font-heading text-4xl md:text-6xl font-extrabold text-warm-cream tabular-nums`
- Label: `font-body text-xs md:text-sm text-warm-cream/90 uppercase tracking-wider`
- Decorative separators: `w-2 h-2 rounded-full bg-orange` (hidden on mobile)

---

## 7. Animation & Motion

### Framer Motion — Fade Up

```ts
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.6, delay: <staggered>, ease: "easeOut" }
```

Used for hero elements with staggered delays: 0.6s, 0.8s, 1.0s, 1.2s.

### Framer Motion — Logo Scale

```ts
initial: { opacity: 0, scale: 0.9 }
animate: { opacity: 1, scale: 1 }
transition: { duration: 0.8, ease: "easeOut" }
```

### ScrollReveal (viewport-triggered)

```ts
initial: { opacity: 0, y: 24 }
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, margin: "-64px" }
transition: { duration: 0.6, delay: <optional>, ease: "easeOut" }
```

Falls back to a plain `<div>` when reduced motion is preferred.

### CSS Keyframes

| Name | Effect | Duration |
|------|--------|----------|
| `gradient-shift` | Background position oscillates `0% 50%` ↔ `100% 50%` | Used for animated gradients |
| `shimmer` | `translateX(-100%)` → `translateX(100%)` | Button hover shimmer |
| `float-pattern` | `translateY(0)` → `translateY(-10px) rotate(1deg)` | Subtle floating decorations |

### CSS Transitions

| Element | Property | Duration | Timing |
|---------|----------|----------|--------|
| Buttons | all | 200ms | default (ease) |
| Navbar | all | 300ms | default |
| Glass hover | box-shadow | 300ms | default |
| Mobile menu | opacity, transform | 300ms | ease-in-out |

### Reduced Motion

All animation respects `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Framer Motion components check `useReducedMotion()` and return static elements when true.

---

## 8. Navbar & Navigation

### Structure

- **Sticky**: `sticky top-0 z-50`
- **Border**: `border-b border-orange/20`
- **Logo**: `h-12 w-auto`, links to home

### Scroll States

| State | Background | Shadow |
|-------|-----------|--------|
| **Default** (top) | `bg-warm-cream` | none |
| **Scrolled** (> 10px) | `glass-cream` (85% warm-cream + blur) | `shadow-lg` |

Transition: `transition-all duration-300`

### Desktop Link Styles

```
font-heading text-base font-semibold
border-b-2 transition-colors px-1 py-1
```

| State | Text Color | Border |
|-------|-----------|--------|
| Default | `text-brown` | `border-transparent` |
| Hover | `text-crimson` | `border-crimson` |
| Active | `text-crimson` | `border-crimson` |

### Language Switcher

```
font-heading text-sm font-semibold text-brown/90
border border-brown/30 hover:border-brown
min-h-[44px] min-w-[44px] px-3 py-1 rounded
```

### Mobile Menu

- Trigger: hamburger at `lg:hidden`, 44×44px minimum touch target
- Overlay: `fixed inset-x-0 top-[68px] bottom-0`
- Background: `bg-warm-cream/95 backdrop-blur-sm`
- Animation: `opacity-100 translate-y-0` ↔ `opacity-0 -translate-y-2`, 300ms ease-in-out
- Links: `font-heading text-lg font-semibold`, separated by `border-b border-brown/10`
- Register CTA at bottom: full-width orange button, `text-center mt-4`
- Features: Escape to close, outside-click to close, focus trap within menu

---

## 9. Accessibility

### Focus Indicators

All interactive elements use a consistent focus ring:

```
focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
```

Offset color adapts to background:
- On dark backgrounds: `focus:ring-offset-navy`
- On light backgrounds: `focus:ring-offset-warm-cream`

### Touch Targets

All interactive elements maintain a minimum 44×44px touch target (`min-h-[44px]`, `min-w-[44px]`).

### Screen Reader Support

- Decorative elements use `aria-hidden="true"`
- Countdown timer uses `aria-live="polite"` with `role="status"`, updating only on minute changes (not every second) to avoid excessive announcements
- Mobile menu uses `role="dialog"`, `aria-modal="true"`, and `aria-label` when open
- Hamburger button uses `aria-expanded` and `aria-controls`
- Navbar has `role="banner"` and `aria-label="Main navigation"`
- Images use descriptive `alt` text; decorative images use `alt=""` with `aria-hidden`
- Language switcher has descriptive `aria-label` (e.g., "Switch to EN")

### Reduced Motion

- CSS: Global `prefers-reduced-motion` media query disables all animations and transitions
- JS: `useReducedMotion()` from Framer Motion; components render static markup when true
- `scroll-behavior: auto` replaces `smooth` under reduced motion

### Color Contrast

- White text on Crimson (`#9B1C37`): ≥ 4.5:1 ✓
- White text on Orange (`#E07B39`): verify per usage — use for large text only where ratio may be borderline
- Near Black (`#2D2D2D`) on Warm Cream (`#FBF0E6`): ≥ 7:1 ✓
- Warm Cream text on Brown (`#6B3417`): ≥ 4.5:1 ✓

---

## 10. Asset Reference

Logo variants, favicon, and OG images are documented in [`ASSET-PLAN.md`](./ASSET-PLAN.md).

### Key Image Paths

| Asset | Path | Notes |
|-------|------|-------|
| Campaign logo (FR) | `/images/fr/campaign-logo.svg` | Hero section |
| Navbar logo (FR) | `/images/fr/campaign-navbar.png` | Navbar, 160×48 rendered |
| Mark (fallback) | `/images/common/mark.svg` | Used when locale logo is unavailable |

---

*Source of truth: `feat/font-system` branch — `layout.tsx` (font imports), `globals.css` (CSS variables + heading styles), `HeroSection.tsx`, `CTABanner.tsx`, `Navbar.tsx`, `Button.tsx`, `ComingSoonPage.tsx`, `ScrollReveal.tsx`*
