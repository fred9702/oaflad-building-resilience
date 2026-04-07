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

// Ordered by role seniority: Host → OAFLAD leadership → Speakers (by tenure) → Attending (by tenure)
export const firstLadies: FirstLady[] = [
  // Host
  {
    id: "gabon",
    countryFlag: "\u{1F1EC}\u{1F1E6}",
    photoPath: "/images/partners/first-ladies/zita-oligui-nguema.jpeg",
    isHost: true,
  },
  // Keynote — OAFLAD President (since 2018)
  {
    id: "sierraLeone",
    countryFlag: "\u{1F1F8}\u{1F1F1}",
    photoPath: "/images/partners/first-ladies/fatima-maada-bio.jpg",
    honorificOverride: "honorificDr",
    isSpeaker: true,
    isKeynote: true,
  },
  // Keynote — OAFLAD Vice-President (since 2017)
  {
    id: "angola",
    countryFlag: "\u{1F1E6}\u{1F1F4}",
    photoPath: "/images/partners/first-ladies/ana-dias-lourenco.jpeg",
    isSpeaker: true,
    isKeynote: true,
  },
  // Speakers — ordered by tenure (earliest first)
  {
    id: "equatorialGuinea", // since 1979
    countryFlag: "\u{1F1EC}\u{1F1F6}",
    photoPath: "/images/partners/first-ladies/constancia-mangue-de-obiang.jpg",
    isSpeaker: true,
  },
  {
    id: "congo", // since 1997
    countryFlag: "\u{1F1E8}\u{1F1EC}",
    photoPath: "/images/partners/first-ladies/antoinette-sassou-nguesso.jpg",
    isSpeaker: true,
  },
  {
    id: "burundi", // since June 2020
    countryFlag: "\u{1F1E7}\u{1F1EE}",
    photoPath: "/images/partners/first-ladies/angeline-ndayishimiye.jpg",
    isSpeaker: true,
  },
  {
    id: "saoTome", // since October 2021
    countryFlag: "\u{1F1F8}\u{1F1F9}",
    photoPath: null,
    isSpeaker: true,
  },
  {
    id: "kenya", // since September 2022
    countryFlag: "\u{1F1F0}\u{1F1EA}",
    photoPath: "/images/partners/first-ladies/rachel-ruto.jpg",
    isSpeaker: true,
  },
  {
    id: "nigeria", // since May 2023
    countryFlag: "\u{1F1F3}\u{1F1EC}",
    photoPath: "/images/partners/first-ladies/oluremi-tinubu.jpg",
    isSpeaker: true,
  },
  {
    id: "senegal", // since April 2024
    countryFlag: "\u{1F1F8}\u{1F1F3}",
    photoPath: "/images/partners/first-ladies/marie-khone-faye.jpeg",
    isSpeaker: true,
  },
  // Attending — ordered by tenure (earliest first)
  {
    id: "rwanda", // since April 2000
    countryFlag: "\u{1F1F7}\u{1F1FC}",
    photoPath: "/images/partners/first-ladies/jeannette-kagame.jpeg",
  },
  {
    id: "coteIvoire", // since April 2011
    countryFlag: "\u{1F1E8}\u{1F1EE}",
    photoPath: "/images/partners/first-ladies/dominique-ouattara.jpg",
  },
  {
    id: "car", // since March 2016
    countryFlag: "\u{1F1E8}\u{1F1EB}",
    photoPath: "/images/partners/first-ladies/tina-marguerite-touadera.jpg",
  },
  {
    id: "drc", // since January 2019
    countryFlag: "\u{1F1E8}\u{1F1E9}",
    photoPath: "/images/partners/first-ladies/denise-nyakeru-tshisekedi.jpeg",
  },
  {
    id: "guinea", // since September 2021
    countryFlag: "\u{1F1EC}\u{1F1F3}",
    photoPath: null,
  },
  {
    id: "liberia", // since January 2024
    countryFlag: "\u{1F1F1}\u{1F1F7}",
    photoPath: "/images/partners/first-ladies/kartumu-yarta-boakai.jpg",
  },
  {
    id: "ghana", // since January 2025
    countryFlag: "\u{1F1EC}\u{1F1ED}",
    photoPath: "/images/partners/first-ladies/lordina-mahama.jpeg",
  },
  {
    id: "namibia", // since March 2025
    countryFlag: "\u{1F1F3}\u{1F1E6}",
    photoPath: null,
    isFirstGentleman: true,
  },
];
