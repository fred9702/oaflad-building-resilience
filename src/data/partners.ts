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
    website: "https://cap241.org",
    color: "green",
    logoPath: "/images/cap241/cap-241.png",
  },
  {
    id: "bomalab",
    website: "https://chomei.store/bomalab.html",
    color: "orange",
    logoPath: "/images/partners/bomalab-logo.png",
  },
];
