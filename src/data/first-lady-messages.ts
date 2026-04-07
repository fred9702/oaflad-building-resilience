// src/data/first-lady-messages.ts

export interface FirstLadySignature {
  formal: string;
  title: string;
  role?: string;
}

export interface FirstLadyMessage {
  id: string;
  languages: string[];
  signature: Record<string, FirstLadySignature>;
}

/**
 * All message texts indexed by language then by First Lady ID.
 * FR and EN are duplicated here (alongside translation files) so the modal
 * can switch languages without changing the next-intl locale.
 */
export const messageTexts: Record<string, Record<string, string>> = {
  en: {
    gabon: "On this day of April 17, National Women's Day in Gabon, I wish to address each and every one of you.\n\nTo those present here. To those working in our cities, in our villages, in our homes. And to those whose commitment, often unseen, continues to sustain our society.\n\nThis day is a moment of recognition. But also a moment of responsibility.\n\nBecause behind the balances we observe, there is, very often, the silent burden carried by women. When fragilities emerge — social, economic or health-related — they are the ones who absorb, organize, and sustain.\n\nBut the resilience of a Nation cannot rely solely on this silent strength. It must be structured. It must be supported. It must be organized.\n\nIt is in this spirit that Gabon engages in the continental campaign: #BuildingResilience — Strengthening the Resilience of Women and Girls: Climate, Conflict and a Sustainable Future.\n\nThrough the ÉQUILIBRES Programme 2026–2029, which I officially launch today, we choose to act on what sustainably underpins stability: continuity of care, recognition of vulnerabilities, and the rebuilding of life trajectories.\n\nBecause when healthcare systems weaken, it is women and girls who bear the most lasting consequences. Because when a woman falters, an entire chain of balance is affected.",
    angola: "I am committed to supporting this campaign, which highlights the importance of education as a powerful tool to strengthen resilience.\n\nTogether, we are working to create learning opportunities, particularly in communities affected by conflict, so that every girl has the chance to build her own future.",
    sierraLeone: "On the occasion of the national launch of the #BuildingResilience campaign for women and girls in the face of climate change and conflicts, I wish to convey my sincere congratulations and unwavering support.\n\nThis initiative stands as a testament to our shared commitment to advancing women's empowerment, strengthening resilience, and promoting health, education and social inclusion.\n\nYour leadership in championing these values is deeply commendable, and I extend my full solidarity as we work together towards a future where women and girls can thrive despite adversity.",
    nigeria: "I warmly congratulate my dear sister, Her Excellency Mrs Zita Oligui Nguema, and the people of Gabon on the launch of the OAFLAD #BuildingResilience campaign.\n\nHealth and well-being are the quiet strengths that carry women, girls and communities through the storms of conflict and climate change. By protecting them, we safeguard their dignity and offer the promise of a better future.\n\nMay this launch inspire hope and empower every woman and girl to rise, lead and contribute to building a more peaceful and prosperous future for Africa.",
    burundi: "Acting to strengthen the resilience of women and girls in the face of climate change means choosing the most powerful lever to drive lasting transformation across an entire continent.\n\nYour commitment is a beacon of hope for those who, every day, carry the weight of the world on their shoulders.",
    senegal: "It is a great honour to be in Libreville alongside my sister, Her Excellency Mrs Zita Oligui Nguema, First Lady of the Gabonese Republic, on the occasion of the #BuildingResilience event.\n\nHer exemplary commitment is a profound source of inspiration for our shared efforts.\n\nMay this event mark the beginning of new synergies to build together a stronger and more united future, and may our gathering serve as a catalyst for renewed and impactful African solidarity.",
    congo: "Africa's moment is increasingly taking shape, and it is for the youth of our continent to fully embrace their historic responsibility in rising to this challenge.\n\nOur generations have demonstrated resilience in the face of internal and external constraints, keeping Africa afloat despite adversity.\n\nBuilding a new form of resilience, grounded in lasting and irreversible progress, is now the key challenge entrusted to African youth, to make our continent in the 21st century a space of peace and well-being.",
    equatorialGuinea: "",
    kenya: "",
    saoTome: "",
  },
  fr: {
    gabon: "En ce jour du 17 avril, journée nationale de la femme au Gabon, je souhaite m'adresser à chacune d'entre vous.\n\nÀ celles qui sont ici présentes. À celles qui œuvrent dans nos villes, dans nos villages, dans nos foyers. Et à celles dont l'engagement, souvent discret, continue de porter notre société.\n\nCette journée est un repère. Un moment de reconnaissance. Mais aussi un moment de responsabilité.\n\nCar derrière les équilibres que nous observons, il y a, très souvent, le poids silencieux que portent les femmes. Lorsque les fragilités s'installent, qu'elles soient sociales, économiques ou sanitaires, ce sont elles qui absorbent, organisent, maintiennent.\n\nMais la résilience d'une Nation ne peut pas reposer uniquement sur cette force silencieuse. Elle doit être structurée. Elle doit être accompagnée. Elle doit être organisée.\n\nC'est dans cet esprit que s'inscrit l'engagement du Gabon dans la campagne continentale : #BuildingResilience — Renforcer la résilience des femmes et des filles : climat, conflits et avenir durable.\n\nÀ travers le programme ÉQUILIBRES 2026–2029, que je lance officiellement ce jour, nous faisons le choix d'agir sur ce qui fonde durablement la stabilité : la continuité des soins, la prise en compte des fragilités, et la reconstruction des trajectoires.\n\nParce que lorsqu'un système de soins se fragilise, ce sont les femmes et les filles qui en subissent les conséquences les plus durables. Parce que lorsqu'une femme vacille, c'est toute une chaîne d'équilibres qui se trouve affectée.",
    angola: "Je me suis engagée à soutenir cette campagne qui met en lumière l'importance de l'éducation en tant que levier essentiel pour renforcer la résilience.\n\nNous unissons nos efforts pour créer des opportunités d'apprentissage, notamment dans les communautés affectées par les conflits, afin que chaque jeune fille puisse construire son propre avenir.",
    sierraLeone: "À l'occasion du lancement national de la campagne #BuildingResilience, en faveur des femmes et des filles face aux défis liés au changement climatique et aux conflits, je tiens à exprimer mes sincères félicitations ainsi que mon soutien indéfectible.\n\nCette initiative témoigne de notre engagement commun à promouvoir l'autonomisation des femmes, à renforcer la résilience et à favoriser l'accès à la santé, à l'éducation et à l'inclusion sociale.\n\nVotre leadership dans la promotion de ces valeurs est hautement remarquable, et je vous adresse ma pleine solidarité dans notre action commune pour bâtir un avenir où les femmes et les filles pourront s'épanouir malgré les défis.",
    nigeria: "Je tiens à adresser mes chaleureuses félicitations à ma chère sœur, Son Excellence Madame Zita Oligui Nguema, ainsi qu'au peuple gabonais, à l'occasion du lancement de la campagne #BuildingResilience de l'OAFLAD.\n\nLa santé et le bien-être constituent des forces silencieuses qui permettent aux femmes, aux filles et aux communautés de faire face aux défis liés aux conflits et aux changements climatiques. En les protégeant, nous préservons leur dignité et leur offrons la promesse d'un avenir meilleur.\n\nPuisse ce lancement susciter l'espoir et permettre à chaque femme et à chaque fille de s'élever, de diriger et de contribuer à bâtir un avenir plus pacifique et prospère pour l'Afrique.",
    burundi: "Agir pour la résilience des femmes et des filles face aux changements climatiques, c'est choisir le levier le plus puissant pour transformer durablement un continent tout entier.\n\nVotre engagement est une lumière pour celles qui portent déjà, chaque jour, le poids du monde sur leurs épaules.",
    senegal: "C'est un immense honneur d'être à Libreville aux côtés de ma consœur, Son Excellence Madame Zita Oligui Nguema, Première Dame de la République Gabonaise, à l'occasion de l'événement #BuildingResilience.\n\nSon engagement exemplaire constitue une source d'inspiration profonde pour nos efforts communs.\n\nQue cet événement marque le début de nouvelles synergies afin de bâtir ensemble un avenir plus fort et solidaire, et que notre rencontre soit le catalyseur d'une solidarité africaine renouvelée et porteuse d'espoir.",
    congo: "Le moment de l'Afrique se dessine avec force, et il appartient à la jeunesse de notre continent d'en assumer pleinement la responsabilité historique.\n\nNos générations ont su faire preuve de résilience face aux défis internes et externes, maintenant l'Afrique à flot malgré les épreuves.\n\nConstruire une nouvelle résilience, fondée sur un progrès durable et irréversible, constitue désormais le défi majeur qui incombe à la jeunesse africaine, afin de faire de notre continent, au XXIe siècle, un espace de paix et de mieux-être.",
    equatorialGuinea: "",
    kenya: "",
    saoTome: "",
  },
  pt: {
    angola: "Comprometi-me a apoiar esta campanha que destaca a importância da educação, como ferramenta poderosa para fortalecer a resiliência.\n\nUnimos esforços para a criação de oportunidades de aprendizagem, especialmente em comunidades afectadas por conflitos, para que todas as meninas tenham a chance de construir seu próprio futuro.",
  },
};

export const firstLadyMessages: FirstLadyMessage[] = [
  {
    id: "gabon",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Zita Oligui Nguema", title: "First Lady of the Gabonese Republic" },
      fr: { formal: "S.E. Mme Zita Oligui Nguema", title: "Première Dame de la République Gabonaise" },
    },
  },
  {
    id: "angola",
    languages: ["pt", "fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Ana Dias Lourenço", title: "First Lady of Angola" },
      fr: { formal: "S.E. Mme Ana Dias Lourenço", title: "Première Dame de la République d'Angola" },
      pt: { formal: "S.E. Sra. Ana Dias Lourenço", title: "Primeira-Dama da República de Angola" },
    },
  },
  {
    id: "sierraLeone",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Dr Fatima Maada Bio", title: "First Lady of Sierra Leone", role: "President, OAFLAD" },
      fr: { formal: "S.E. Dr Fatima Maada Bio", title: "Première Dame de la République de Sierra Leone", role: "Présidente en exercice de l'OPDAD" },
    },
  },
  {
    id: "nigeria",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Senator Oluremi Tinubu, CON", title: "First Lady of the Federal Republic of Nigeria", role: "Member, Steering Committee, OAFLAD" },
      fr: { formal: "S.E. Sénatrice Oluremi Tinubu, CON", title: "Première Dame de la République Fédérale du Nigéria", role: "Membre du Comité directeur de l'OPDAD" },
    },
  },
  {
    id: "burundi",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Angéline Ndayishimiye Ndayubaha", title: "First Lady of the Republic of Burundi" },
      fr: { formal: "S.E. Mme Angéline Ndayishimiye Ndayubaha", title: "Première Dame de la République du Burundi" },
    },
  },
  {
    id: "senegal",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Marie Khone Faye", title: "First Lady of the Republic of Senegal" },
      fr: { formal: "S.E. Mme Marie Khone Faye", title: "Première Dame de la République du Sénégal" },
    },
  },
  {
    id: "congo",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Antoinette Sassou N'Guesso", title: "First Lady of the Republic of the Congo" },
      fr: { formal: "S.E. Mme Antoinette Sassou N'Guesso", title: "Première Dame de la République du Congo" },
    },
  },
  {
    id: "equatorialGuinea",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Constancia Mangue de Obiang", title: "First Lady of Equatorial Guinea" },
      fr: { formal: "S.E. Mme Constancia Mangue de Obiang", title: "Première Dame de la Guinée équatoriale" },
    },
  },
  {
    id: "kenya",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Rachel Ruto", title: "First Lady of the Republic of Kenya" },
      fr: { formal: "S.E. Mme Rachel Ruto", title: "Première Dame de la République du Kenya" },
    },
  },
  {
    id: "saoTome",
    languages: ["fr", "en"],
    signature: {
      en: { formal: "H.E. Mrs Maria de Fátima Vila Nova", title: "First Lady of São Tomé and Príncipe" },
      fr: { formal: "S.E. Mme Maria de Fátima Vila Nova", title: "Première Dame de São Tomé-et-Príncipe" },
    },
  },
];

/** Set of IDs that have a message, for quick lookup */
export const firstLadyMessageIds = new Set(firstLadyMessages.map((m) => m.id));

/** Get message data by First Lady ID */
export function getFirstLadyMessage(id: string): FirstLadyMessage | undefined {
  return firstLadyMessages.find((m) => m.id === id);
}
