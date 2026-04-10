// src/data/dignitary-messages.ts

export interface DignitarySignature {
  formal: string;
  title: string;
  role?: string;
}

export interface DignitaryMessage {
  id: string;
  signature: Record<string, DignitarySignature>;
}

export const dignitaryMessageTexts: Record<string, Record<string, string>> = {
  en: {
    drNardos:
      "At the Organisation of African First Ladies for Development (OAFLAD/OPDAD), we firmly believe that the resilience of women and girls is essential to building sustainable and inclusive societies.\n\nIn the face of the combined impacts of climate change and conflict, women and girls are among the most affected. It is our collective responsibility to strengthen both their capacities and the systems that support them, so that they can better withstand and adapt to shocks, and fully play their role as key agents of change.\n\nThrough the #BuildingResilience campaign, African First Ladies are calling for concrete action: investing in strong health and education systems, protecting their rights, and advancing their economic empowerment.\n\nBy joining our efforts, we can make resilience a fundamental right for all, and ensure that women and girls are fully at the heart of sustainable solutions for a more just and resilient future for Africa.",
  },
  fr: {
    drNardos:
      "À l'Organisation des Premières Dames d'Afrique pour le Développement (OAFLAD/OPDAD), nous sommes convaincues que la résilience des femmes et des filles est essentielle pour bâtir des sociétés durables et inclusives.\n\nFace aux effets combinés du changement climatique et des conflits, elles sont parmi les plus affectées. Il est de notre responsabilité collective de renforcer leurs capacités ainsi que les systèmes qui les soutiennent, afin qu'elles puissent mieux résister et s'adapter aux chocs, et jouer pleinement leur rôle d'actrices clés du changement.\n\nDans le cadre de la campagne #RenforcerLaRésilience, les Premières Dames africaines appellent à des actions concrètes : investir dans des systèmes de santé et d'éducation solides, protéger leurs droits et renforcer leur autonomisation économique.\n\nEn unissant nos efforts, nous pouvons faire de la résilience un droit fondamental pour toutes et tous, et garantir que les femmes et les filles soient pleinement au cœur des solutions durables pour un avenir plus juste et résilient pour l'Afrique.",
  },
};

export const dignitaryMessages: DignitaryMessage[] = [
  {
    id: "drNardos",
    signature: {
      en: {
        formal: "Dr Nardos Berhanu",
        title: "Executive Secretary",
        role: "OAFLAD/OPDAD",
      },
      fr: {
        formal: "Dr Nardos Berhanu",
        title: "Secrétaire Exécutive",
        role: "OAFLAD/OPDAD",
      },
    },
  },
];

export const dignitaryMessageIds = new Set(dignitaryMessages.map((m) => m.id));

export function getDignitaryMessage(id: string): DignitaryMessage | undefined {
  return dignitaryMessages.find((m) => m.id === id);
}
