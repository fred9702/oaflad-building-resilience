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
  /** CSS object-position for photo thumbnails (e.g. "center 20%") */
  photoPosition?: string;
}

// Ordered by role seniority: Host → OAFLAD leadership → Speakers (by tenure) → Attending (by tenure)
export const firstLadies: FirstLady[] = [
  // Host
  {
    id: "gabon",
    countryFlag: "\u{1F1EC}\u{1F1E6}",
    photoPath: "/images/partners/first-ladies/zita-oligui-nguema.jpeg",
    photoPosition: "center 20%",
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
    id: "coteIvoire", // since April 2011
    countryFlag: "\u{1F1E8}\u{1F1EE}",
    photoPath: "/images/partners/first-ladies/dominique-ouattara.jpg",
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
    photoPath: "/images/partners/first-ladies/maria-de-fatima-vila-nova.jpg",
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
    id: "car", // since March 2016
    countryFlag: "\u{1F1E8}\u{1F1EB}",
    photoPath: "/images/partners/first-ladies/brigitte-touadera.jpg",
  },
  {
    id: "ghana", // since January 2025
    countryFlag: "\u{1F1EC}\u{1F1ED}",
    photoPath: "/images/partners/first-ladies/lordina-mahama.jpeg",
  },
];
