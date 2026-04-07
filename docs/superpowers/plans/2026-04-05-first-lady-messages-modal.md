# First Lady Messages Modal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add clickable message modals to 6 First Lady cards on the Speakers page, showing their bilingual/trilingual campaign messages with a language toggle.

**Architecture:** New data file for message content + signatures, new modal component following LegalModal pattern, CTA button added to FirstLadyCard, state managed in FirstLadiesSection (already a client component).

**Tech Stack:** Next.js 15, next-intl, Framer Motion, Phosphor Icons, Tailwind CSS v4

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/data/first-lady-messages.ts` | Create | Message metadata, original-language texts, signatures |
| `messages/en.json` | Modify | EN message texts + CTA label |
| `messages/fr.json` | Modify | FR message texts + CTA label |
| `src/components/speakers/FirstLadyMessageModal.tsx` | Create | Modal component |
| `src/components/speakers/FirstLadyCard.tsx` | Modify | Add CTA button with `hasMessage` + `onReadMessage` props |
| `src/components/speakers/FirstLadiesSection.tsx` | Modify | Wire modal state, pass props to cards |

---

### Task 1: Create message data file

**Files:**
- Create: `src/data/first-lady-messages.ts`

- [ ] **Step 1: Create the data file with types and message entries**

```ts
// src/data/first-lady-messages.ts

export interface FirstLadySignature {
  formal: string;
  title: string;
  role?: string;
}

export interface FirstLadyMessage {
  id: string;
  languages: string[];
  signature: FirstLadySignature;
}

/**
 * All message texts indexed by language then by First Lady ID.
 * FR and EN are duplicated here (alongside translation files) so the modal
 * can switch languages without changing the next-intl locale.
 */
export const messageTexts: Record<string, Record<string, string>> = {
  en: {
    angola: "I am committed to supporting this campaign, which highlights the importance of education as a powerful tool to strengthen resilience.\n\nTogether, we are working to create learning opportunities, particularly in communities affected by conflict, so that every girl has the chance to build her own future.",
    sierraLeone: "On the occasion of the national launch of the #BuildingResilience campaign for women and girls in the face of climate change and conflicts, I wish to convey my sincere congratulations and unwavering support.\n\nThis initiative stands as a testament to our shared commitment to advancing women's empowerment, strengthening resilience, and promoting health, education and social inclusion.\n\nYour leadership in championing these values is deeply commendable, and I extend my full solidarity as we work together towards a future where women and girls can thrive despite adversity.",
    nigeria: "I warmly congratulate my dear sister, Her Excellency Mrs Zita Oligui Nguema, and the people of Gabon on the launch of the OAFLAD #BuildingResilience campaign.\n\nHealth and well-being are the quiet strengths that carry women, girls and communities through the storms of conflict and climate change. By protecting them, we safeguard their dignity and offer the promise of a better future.\n\nMay this launch inspire hope and empower every woman and girl to rise, lead and contribute to building a more peaceful and prosperous future for Africa.",
    burundi: "Acting to strengthen the resilience of women and girls in the face of climate change means choosing the most powerful lever to drive lasting transformation across an entire continent.\n\nYour commitment is a beacon of hope for those who, every day, carry the weight of the world on their shoulders.",
    senegal: "It is a great honour to be in Libreville alongside my sister, Her Excellency Mrs Zita Oligui Nguema, First Lady of the Gabonese Republic, on the occasion of the #BuildingResilience event.\n\nHer exemplary commitment is a profound source of inspiration for our shared efforts.\n\nMay this event mark the beginning of new synergies to build together a stronger and more united future, and may our gathering serve as a catalyst for renewed and impactful African solidarity.",
    congo: "Africa's moment is increasingly taking shape, and it is for the youth of our continent to fully embrace their historic responsibility in rising to this challenge.\n\nOur generations have demonstrated resilience in the face of internal and external constraints, keeping Africa afloat despite adversity.\n\nBuilding a new form of resilience, grounded in lasting and irreversible progress, is now the key challenge entrusted to African youth, to make our continent in the 21st century a space of peace and well-being.",
  },
  fr: {
    angola: "Je me suis engagée à soutenir cette campagne qui met en lumière l'importance de l'éducation en tant que levier essentiel pour renforcer la résilience.\n\nNous unissons nos efforts pour créer des opportunités d'apprentissage, notamment dans les communautés affectées par les conflits, afin que chaque jeune fille puisse construire son propre avenir.",
    sierraLeone: "À l'occasion du lancement national de la campagne #BuildingResilience, en faveur des femmes et des filles face aux défis liés au changement climatique et aux conflits, je tiens à exprimer mes sincères félicitations ainsi que mon soutien indéfectible.\n\nCette initiative témoigne de notre engagement commun à promouvoir l'autonomisation des femmes, à renforcer la résilience et à favoriser l'accès à la santé, à l'éducation et à l'inclusion sociale.\n\nVotre leadership dans la promotion de ces valeurs est hautement remarquable, et je vous adresse ma pleine solidarité dans notre action commune pour bâtir un avenir où les femmes et les filles pourront s'épanouir malgré les défis.",
    nigeria: "Je tiens à adresser mes chaleureuses félicitations à ma chère sœur, Son Excellence Madame Zita Oligui Nguema, ainsi qu'au peuple gabonais, à l'occasion du lancement de la campagne #BuildingResilience de l'OAFLAD.\n\nLa santé et le bien-être constituent des forces silencieuses qui permettent aux femmes, aux filles et aux communautés de faire face aux défis liés aux conflits et aux changements climatiques. En les protégeant, nous préservons leur dignité et leur offrons la promesse d'un avenir meilleur.\n\nPuisse ce lancement susciter l'espoir et permettre à chaque femme et à chaque fille de s'élever, de diriger et de contribuer à bâtir un avenir plus pacifique et prospère pour l'Afrique.",
    burundi: "Agir pour la résilience des femmes et des filles face aux changements climatiques, c'est choisir le levier le plus puissant pour transformer durablement un continent tout entier.\n\nVotre engagement est une lumière pour celles qui portent déjà, chaque jour, le poids du monde sur leurs épaules.",
    senegal: "C'est un immense honneur d'être à Libreville aux côtés de ma consœur, Son Excellence Madame Zita Oligui Nguema, Première Dame de la République Gabonaise, à l'occasion de l'événement #BuildingResilience.\n\nSon engagement exemplaire constitue une source d'inspiration profonde pour nos efforts communs.\n\nQue cet événement marque le début de nouvelles synergies afin de bâtir ensemble un avenir plus fort et solidaire, et que notre rencontre soit le catalyseur d'une solidarité africaine renouvelée et porteuse d'espoir.",
    congo: "Le moment de l'Afrique se dessine avec force, et il appartient à la jeunesse de notre continent d'en assumer pleinement la responsabilité historique.\n\nNos générations ont su faire preuve de résilience face aux défis internes et externes, maintenant l'Afrique à flot malgré les épreuves.\n\nConstruire une nouvelle résilience, fondée sur un progrès durable et irréversible, constitue désormais le défi majeur qui incombe à la jeunesse africaine, afin de faire de notre continent, au XXIe siècle, un espace de paix et de mieux-être.",
  },
  pt: {
    angola: "Comprometi-me a apoiar esta campanha que destaca a importância da educação, como ferramenta poderosa para fortalecer a resiliência.\n\nUnimos esforços para a criação de oportunidades de aprendizagem, especialmente em comunidades afectadas por conflitos, para que todas as meninas tenham a chance de construir seu próprio futuro.",
  },
};

export const firstLadyMessages: FirstLadyMessage[] = [
  {
    id: "angola",
    languages: ["pt", "fr", "en"],
    signature: {
      formal: "H.E. Mrs Ana Dias Lourenço",
      title: "First Lady of Angola",
    },
  },
  {
    id: "sierraLeone",
    languages: ["fr", "en"],
    signature: {
      formal: "H.E. Dr Fatima Maada Bio",
      title: "First Lady of Sierra Leone",
      role: "President, OAFLAD",
    },
  },
  {
    id: "nigeria",
    languages: ["fr", "en"],
    signature: {
      formal: "H.E. Senator Oluremi Tinubu, CON",
      title: "First Lady of the Federal Republic of Nigeria",
      role: "Member, Steering Committee, OAFLAD",
    },
  },
  {
    id: "burundi",
    languages: ["fr", "en"],
    signature: {
      formal: "H.E. Mrs Angéline Ndayishimiye Ndayubaha",
      title: "First Lady of the Republic of Burundi",
    },
  },
  {
    id: "senegal",
    languages: ["fr", "en"],
    signature: {
      formal: "H.E. Mrs Marie Khone Faye",
      title: "First Lady of the Republic of Senegal",
    },
  },
  {
    id: "congo",
    languages: ["fr", "en"],
    signature: {
      formal: "H.E. Mrs Antoinette Sassou N'Guesso",
      title: "First Lady of the Republic of the Congo",
    },
  },
];

/** Set of IDs that have a message, for quick lookup */
export const firstLadyMessageIds = new Set(firstLadyMessages.map((m) => m.id));

/** Get message data by First Lady ID */
export function getFirstLadyMessage(id: string): FirstLadyMessage | undefined {
  return firstLadyMessages.find((m) => m.id === id);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/data/first-lady-messages.ts
git commit -m "feat(speakers): add First Lady message data with signatures"
```

---

### Task 2: Add translation keys for CTA and modal UI

**Files:**
- Modify: `messages/en.json` (speakers section, around line 361)
- Modify: `messages/fr.json` (speakers section, around line 361)

Note: Message body texts are stored in `messageTexts` in the data file (Task 1), not in translation files. This allows the language toggle to switch between FR/EN/PT without changing the next-intl locale.

- [ ] **Step 1: Add CTA label and modal close label to `messages/en.json`**

In the `speakers` section (after `"honorificMr": "H.E Mr"`), add:

```json
"readMessage": "Read message",
"closeModal": "Close",
```

- [ ] **Step 2: Add CTA label and modal close label to `messages/fr.json`**

In the `speakers` section (after `"honorificMr": "S.E M."`), add:

```json
"readMessage": "Lire le message",
"closeModal": "Fermer",
```

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/fr.json
git commit -m "feat(speakers): add readMessage and closeModal translation keys"
```

---

### Task 3: Create the modal component

**Files:**
- Create: `src/components/speakers/FirstLadyMessageModal.tsx`

- [ ] **Step 1: Create the modal component**

```tsx
// src/components/speakers/FirstLadyMessageModal.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import type { FirstLady } from "@/data/first-ladies";
import { messageTexts, type FirstLadyMessage } from "@/data/first-lady-messages";

const LANGUAGE_LABELS: Record<string, string> = {
  pt: "Português",
  fr: "Français",
  en: "English",
};

interface FirstLadyMessageModalProps {
  lady: FirstLady;
  message: FirstLadyMessage;
  isOpen: boolean;
  onClose: () => void;
}

export function FirstLadyMessageModal({
  lady,
  message,
  isOpen,
  onClose,
}: FirstLadyMessageModalProps) {
  const t = useTranslations("speakers");
  const locale = useLocale();
  const [activeLang, setActiveLang] = useState(locale);

  // Reset to current locale when modal opens
  useEffect(() => {
    if (isOpen) setActiveLang(locale);
  }, [isOpen, locale]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Get message text based on active language — all texts live in messageTexts
  const messageText = messageTexts[activeLang]?.[lady.id] ?? "";

  const name = t(`firstLadies.${lady.id}.name`);
  const country = t(`firstLadies.${lady.id}.country`);
  const honorific = lady.isFirstGentleman ? t("honorificMr") : t("honorificMrs");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${honorific} ${name}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-near-black/60 hover:text-near-black hover:bg-near-black/10 transition-colors"
              aria-label={t("closeModal")}
            >
              <X size={24} weight="bold" />
            </button>

            {/* Header: photo + name */}
            <div className="flex items-center gap-4 mb-6 pr-8">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-light-beige">
                {lady.photoPath ? (
                  <Image
                    src={lady.photoPath}
                    alt={name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl">{lady.countryFlag}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-near-black leading-tight">
                  {honorific} {name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-base leading-none">{lady.countryFlag}</span>
                  <span className="font-body text-sm text-near-black/60">{country}</span>
                </div>
              </div>
            </div>

            {/* Language toggle */}
            <div className="flex gap-1 mb-6 p-1 bg-near-black/5 rounded-full w-fit">
              {message.languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-colors ${
                    activeLang === lang
                      ? "bg-crimson text-white"
                      : "text-near-black/60 hover:text-near-black"
                  }`}
                >
                  {LANGUAGE_LABELS[lang] ?? lang}
                </button>
              ))}
            </div>

            {/* Message body */}
            <div className="font-body text-near-black/90 leading-relaxed whitespace-pre-line mb-8">
              {messageText}
            </div>

            {/* Signature */}
            <div className="border-t border-near-black/10 pt-4">
              <p className="font-heading text-sm font-bold text-near-black">
                {message.signature.formal}
              </p>
              <p className="font-body text-sm text-near-black/60">
                {message.signature.title}
              </p>
              {message.signature.role && (
                <p className="font-body text-sm text-near-black/60">
                  {message.signature.role}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/speakers/FirstLadyMessageModal.tsx
git commit -m "feat(speakers): add FirstLadyMessageModal component"
```

---

### Task 4: Add CTA button to FirstLadyCard

**Files:**
- Modify: `src/components/speakers/FirstLadyCard.tsx`

- [ ] **Step 1: Add `hasMessage` and `onReadMessage` props, render CTA button**

Add props to the component signature (line 7):

```tsx
export function FirstLadyCard({
  lady,
  featured = false,
  hasMessage = false,
  onReadMessage,
}: {
  lady: FirstLady;
  featured?: boolean;
  hasMessage?: boolean;
  onReadMessage?: () => void;
}) {
```

Add the CTA button inside the `{/* Info */}` div of the standard (non-featured) card, after line 106 (`{honorific} {name}`), before the closing `</div>` of the info section:

```tsx
        {hasMessage && (
          <button
            onClick={onReadMessage}
            className="mt-2 font-heading text-xs font-semibold text-crimson hover:text-crimson/80 transition-colors"
          >
            {t("readMessage")}
          </button>
        )}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/speakers/FirstLadyCard.tsx
git commit -m "feat(speakers): add CTA button to FirstLadyCard for message modal"
```

---

### Task 5: Wire modal state in FirstLadiesSection

**Files:**
- Modify: `src/components/speakers/FirstLadiesSection.tsx`

- [ ] **Step 1: Add state and modal rendering**

Add imports at the top (after existing imports):

```tsx
import { useState } from "react";
import { firstLadyMessageIds, getFirstLadyMessage } from "@/data/first-lady-messages";
import { FirstLadyMessageModal } from "./FirstLadyMessageModal";
```

Add state inside the component (after `const t = ...`):

```tsx
const [selectedLadyId, setSelectedLadyId] = useState<string | null>(null);
const selectedLady = selectedLadyId
  ? firstLadies.find((l) => l.id === selectedLadyId)
  : null;
const selectedMessage = selectedLadyId
  ? getFirstLadyMessage(selectedLadyId)
  : null;
```

Update the `FirstLadyCard` in the attendees grid (line 40) to pass props:

```tsx
<FirstLadyCard
  lady={lady}
  hasMessage={firstLadyMessageIds.has(lady.id)}
  onReadMessage={() => setSelectedLadyId(lady.id)}
/>
```

Add the modal before the closing `</section>` tag:

```tsx
{selectedLady && selectedMessage && (
  <FirstLadyMessageModal
    lady={selectedLady}
    message={selectedMessage}
    isOpen={!!selectedLadyId}
    onClose={() => setSelectedLadyId(null)}
  />
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/speakers/FirstLadiesSection.tsx
git commit -m "feat(speakers): wire modal state in FirstLadiesSection"
```

---

### Task 6: Build and verify

- [ ] **Step 1: Run the build**

```bash
cd /home/chomei/bomalab/resilience241 && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Fix any build errors if present**

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix(speakers): resolve build errors for message modal"
```

- [ ] **Step 4: Push for Vercel preview**

```bash
git push
```
