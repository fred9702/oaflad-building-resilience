export interface SocialPost {
  platform: "twitter" | "instagram" | "facebook";
  text: string;
  date: string;
  url: string;
}

export const socialPosts: SocialPost[] = [
  {
    platform: "twitter",
    text: "19 First Ladies. 4 Pillars. 1 Day. The #BuildingResilience conference is coming to Libreville on April 17, 2026.",
    date: "2026-04-10",
    url: "https://x.com/resilience241",
  },
  {
    platform: "instagram",
    text: "CAP 241 — A strategic framework for resilience. Health. Women. Youth. Education. #BuildingResilience #Resilience241",
    date: "2026-04-08",
    url: "https://instagram.com/resilience_241",
  },
  {
    platform: "facebook",
    text: "Her Excellency Mrs. Zita Oligui Nguema invites African leaders to build resilience for women and girls across the continent.",
    date: "2026-04-05",
    url: "https://www.facebook.com/share/1B4pNuGHt7/",
  },
];
