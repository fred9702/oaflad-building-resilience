export interface FirstLady {
  id: string;
  countryFlag: string;
  photoPath: string | null;
  isHost?: boolean;
  isFirstGentleman?: boolean;
  /** Confirmed speaker at the conference */
  isSpeaker?: boolean;
  /** Keynote speaker (Sierra Leone / Angola — OAFLAD leadership) */
  isKeynote?: boolean;
  /** Override the default honorific (e.g. "Dr" instead of "Mrs") */
  honorificOverride?: string;
}

export const firstLadies: FirstLady[] = [
  {
    id: "gabon",
    countryFlag: "\u{1F1EC}\u{1F1E6}",
    photoPath: "/images/partners/first-ladies/zita-oligui-nguema.jpeg",
    isHost: true,
  },
  {
    id: "sierraLeone",
    countryFlag: "\u{1F1F8}\u{1F1F1}",
    photoPath: "/images/partners/first-ladies/fatima-maada-bio.jpg",
    honorificOverride: "honorificDr",
    isSpeaker: true,
    isKeynote: true,
  },
  {
    id: "angola",
    countryFlag: "\u{1F1E6}\u{1F1F4}",
    photoPath: "/images/partners/first-ladies/ana-dias-lourenco.jpeg",
    isSpeaker: true,
    isKeynote: true,
  },
  {
    id: "senegal",
    countryFlag: "\u{1F1F8}\u{1F1F3}",
    photoPath: "/images/partners/first-ladies/marie-khone-faye.jpeg",
    isSpeaker: true,
  },
  {
    id: "drc",
    countryFlag: "\u{1F1E8}\u{1F1E9}",
    photoPath: "/images/partners/first-ladies/denise-nyakeru-tshisekedi.jpeg",
  },
  {
    id: "congo",
    countryFlag: "\u{1F1E8}\u{1F1EC}",
    photoPath: "/images/partners/first-ladies/antoinette-sassou-nguesso.jpg",
    isSpeaker: true,
  },
  {
    id: "burundi",
    countryFlag: "\u{1F1E7}\u{1F1EE}",
    photoPath: "/images/partners/first-ladies/angeline-ndayishimiye.jpg",
    isSpeaker: true,
  },
  {
    id: "nigeria",
    countryFlag: "\u{1F1F3}\u{1F1EC}",
    photoPath: "/images/partners/first-ladies/oluremi-tinubu.jpg",
    isSpeaker: true,
  },
  {
    id: "liberia",
    countryFlag: "\u{1F1F1}\u{1F1F7}",
    photoPath: "/images/partners/first-ladies/kartumu-yarta-boakai.jpg",
  },
  {
    id: "coteIvoire",
    countryFlag: "\u{1F1E8}\u{1F1EE}",
    photoPath: "/images/partners/first-ladies/dominique-ouattara.jpg",
  },
  {
    id: "rwanda",
    countryFlag: "\u{1F1F7}\u{1F1FC}",
    photoPath: "/images/partners/first-ladies/jeannette-kagame.jpeg",
  },
  {
    id: "kenya",
    countryFlag: "\u{1F1F0}\u{1F1EA}",
    photoPath: "/images/partners/first-ladies/rachel-ruto.jpg",
    isSpeaker: true,
  },
  {
    id: "saoTome",
    countryFlag: "\u{1F1F8}\u{1F1F9}",
    photoPath: null,
    isSpeaker: true,
  },
  {
    id: "equatorialGuinea",
    countryFlag: "\u{1F1EC}\u{1F1F6}",
    photoPath: "/images/partners/first-ladies/constancia-mangue-de-obiang.jpg",
    isSpeaker: true,
  },
  {
    id: "guinea",
    countryFlag: "\u{1F1EC}\u{1F1F3}",
    photoPath: null,
  },
  {
    id: "car",
    countryFlag: "\u{1F1E8}\u{1F1EB}",
    photoPath: "/images/partners/first-ladies/tina-marguerite-touadera.jpg",
  },
  {
    id: "ghana",
    countryFlag: "\u{1F1EC}\u{1F1ED}",
    photoPath: "/images/partners/first-ladies/lordina-mahama.jpeg",
  },
  {
    id: "namibia",
    countryFlag: "\u{1F1F3}\u{1F1E6}",
    photoPath: null,
    isFirstGentleman: true,
  },
];
