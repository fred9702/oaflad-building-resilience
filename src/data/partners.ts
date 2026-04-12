export interface Partner {
  id: string;
  website: string;
  color: "crimson" | "brown" | "green" | "orange";
  expandable?: boolean;
  logoPath?: string;
}

export const partners: Partner[] = [
  {
    id: "oaflad",
    website: "https://oaflad.org",
    color: "crimson",
    expandable: true,
    logoPath: "/images/partners/oaflad-logo.png",
  },
  {
    id: "fondation",
    website: "https://mabanniere.ga/",
    color: "brown",
    logoPath: "/images/partners/ma-banniere-logo.png",
  },
  {
    id: "cap241",
    website: "",
    color: "green",
    logoPath: "/images/cap241/cap-241.png",
  },
  {
    id: "bomalab",
    website: "https://chomei.store/bomalab.html",
    color: "orange",
    logoPath: "/images/partners/bomalab-logo.png",
  },
  {
    id: "rougeDelEst",
    website: "",
    color: "crimson",
    logoPath: "/images/partners/rouge-de-lest-logo.jpg",
  },
  {
    id: "westAlliance",
    website: "",
    color: "brown",
    logoPath: "/images/partners/westalliance-logo.jpg",
  },
  {
    id: "revesVoyages",
    website: "",
    color: "green",
    logoPath: "/images/partners/reves-voyages-logo.jpg",
  },
];
