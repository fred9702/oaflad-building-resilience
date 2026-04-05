# First Lady Messages Modal — Design Spec

## Overview

Add a modal to the Speakers page that displays personal messages from First Ladies about the #BuildingResilience campaign. Only the 6 First Ladies who submitted messages get a CTA button on their card. Clicking opens a modal with their photo, name, and message text with a language toggle.

## Messages available

From the PDF "Messages from First Ladies":

| # | Country | First Lady | Languages |
|---|---------|-----------|-----------|
| 1 | Angola | H.E. Mrs Ana Dias Lourenco | PT, FR, EN |
| 2 | Sierra Leone | H.E. Dr Fatima Maada Bio | EN, FR |
| 3 | Nigeria | H.E. Senator Oluremi Tinubu, CON | EN, FR |
| 4 | Burundi | H.E. Mrs Angeline Ndayishimiye Ndayubaha | FR, EN |
| 5 | Senegal | H.E. Mrs Marie Khone Faye | FR, EN |
| 6 | Congo | H.E. Mrs Antoinette Sassou N'Guesso | FR, EN |

## Data layer

### New file: `src/data/first-lady-messages.ts`

```ts
interface FirstLadyMessage {
  id: string;              // matches FirstLady.id from first-ladies.ts
  languages: string[];     // available language codes, e.g. ["pt", "fr", "en"]
  originalTexts?: Record<string, string>; // non-FR/EN texts keyed by lang code (e.g. "pt")
  signature: {
    formal: string;        // e.g. "H.E. Senator Oluremi Tinubu, CON"
    title: string;         // e.g. "First Lady of the Federal Republic of Nigeria"
    role?: string;          // e.g. "Member, Steering Committee, OAFLAD"
    roleSecondary?: string; // e.g. "President, OAFLAD"
  };
}
```

- FR and EN message texts go into `messages/fr.json` and `messages/en.json` under `speakers.firstLadies.<id>.message`
- Original-language texts (e.g. Portuguese for Angola) are stored in `originalTexts` in the data file since they don't belong to either locale

### IDs to match (from `src/data/first-ladies.ts`)

- `angola`
- `sierraLeone`
- `nigeria`
- `burundi`
- `senegal`
- `congo`

## Card changes

### `FirstLadyCard` component

New optional props:
- `hasMessage?: boolean` — when true, renders a CTA button
- `onReadMessage?: () => void` — callback to open the modal

CTA button:
- Text: "Read message" (EN) / "Lire le message" (FR) — from translation key `speakers.readMessage`
- Positioned at the bottom of the card
- Only rendered when `hasMessage` is true
- Cards without messages remain visually unchanged

## Modal component

### New file: `src/components/speakers/FirstLadyMessageModal.tsx`

Props:
```ts
{
  lady: FirstLady;
  message: FirstLadyMessage;
  isOpen: boolean;
  onClose: () => void;
}
```

Layout (top to bottom):
1. **Close button** — X icon, top-right corner
2. **Header** — Small circular photo, name, title badge, country flag (compact card identity)
3. **Language toggle** — Pill-style tabs showing available languages. Labels: "Portugues", "Francais", "English". Current locale pre-selected on open. Active tab uses crimson accent color
4. **Message body** — Message text in Source Sans 3, readable size, scrollable within `max-h-[85vh]`
5. **Signature block** — Formal name, title, role(s) from the PDF

Behavior:
- Framer Motion `AnimatePresence` with scale transition (matching `LegalModal` pattern)
- Backdrop: `bg-black/60 backdrop-blur-sm`
- Close on: X button click, Esc key, backdrop click
- Body overflow prevented when open
- `max-w-lg` width, centered
- `z-50`

## Section wiring

### `FirstLadiesSection` changes

- Becomes a client component (`"use client"`)
- Manages state: `selectedLady: string | null`
- Checks each First Lady's `id` against the messages data to determine `hasMessage`
- Passes `hasMessage` and `onReadMessage` to relevant `FirstLadyCard` instances
- Renders `FirstLadyMessageModal` when `selectedLady` is set
- Speakers page (`page.tsx`) remains unchanged

## Translation keys to add

In both `messages/fr.json` and `messages/en.json`:

```
speakers.readMessage — CTA button text
speakers.firstLadies.<id>.message — message body for each of the 6 First Ladies
speakers.messageModal.title — modal section title if needed
```

Language toggle labels are not locale-dependent (always show native names: "Portugues", "Francais", "English").

## Language toggle behavior

- On modal open, the active tab matches the current locale (FR or EN)
- Selecting FR or EN reads the message from the corresponding translation file (`messages/fr.json` or `messages/en.json`)
- Selecting a non-FR/EN language (e.g. PT for Angola) reads from `originalTexts` in the data file
- The signature block remains the same regardless of selected language

## Files to create/modify

| File | Action |
|------|--------|
| `src/data/first-lady-messages.ts` | Create — message data + signatures + original texts |
| `src/components/speakers/FirstLadyMessageModal.tsx` | Create — modal component |
| `src/components/speakers/FirstLadyCard.tsx` | Modify — add `hasMessage` + `onReadMessage` props, CTA button |
| `src/components/speakers/FirstLadiesSection.tsx` | Modify — add client state, wire modal |
| `messages/fr.json` | Modify — add FR message texts + CTA label |
| `messages/en.json` | Modify — add EN message texts + CTA label |
