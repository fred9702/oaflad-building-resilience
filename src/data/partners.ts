export interface Partner {
  id: string;
  website: string;
  color: "crimson" | "brown" | "green" | "orange";
  expandable?: boolean;
}

export const partners: Partner[] = [
  {
    id: "oaflad",
    website: "https://oaflad.org",
    color: "crimson",
    expandable: true,
  },
  {
    id: "fondation",
    website: "https://mabanniere.ga/",
    color: "brown",
  },
  {
    id: "cap241",
    website: "https://cap241.org",
    color: "green",
  },
  {
    id: "bomalab",
    website: "https://bomalab.com",
    color: "orange",
  },
];
