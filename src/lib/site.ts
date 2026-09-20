import { profile } from "@/data/profile";

export const SITE_URL = profile.website;
export const SITE_NAME = profile.fullName;
export const CONTACT_EMAIL = profile.email;
export const LINKEDIN_URL = profile.linkedin;
export const GITHUB_URL = profile.github;

export const SITE_DESCRIPTION =
  "Software engineer focused on outcomes, not frameworks. I design systems, ship products, and optimize what's slow across APIs, web apps, AI integrations, and infrastructure.";

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
