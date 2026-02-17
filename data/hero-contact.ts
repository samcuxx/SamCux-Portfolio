/**
 * Hero contact widget config – edit data/hero-contact.json to change email and social links.
 * This file loads the JSON and types it for the component.
 */

import raw from "./hero-contact.json";

export type ContactMode =
  | "all"
  | "domain"
  | "handle"
  | "linkedin"
  | "telegram"
  | "local"
  | "twitter"
  | "instagram";

export type HeroSocialItem = {
  id: string;
  icon: "link" | "mail" | "github" | "linkedin" | "x" | "instagram" | "telegram" | "user";
  url: string;
  label: string;
  mode: ContactMode;
};

export type HeroContactConfig = {
  email: {
    localPart: string;
    domainFirst: string;
    domainRest: string;
    tld: string;
    mailtoUrl: string;
  };
  socials: HeroSocialItem[];
};

export const heroContactConfig = raw as HeroContactConfig;
