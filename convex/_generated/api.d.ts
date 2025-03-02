/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as aboutMe from "../aboutMe.js";
import type * as auth from "../auth.js";
import type * as contact from "../contact.js";
import type * as education from "../education.js";
import type * as experience from "../experience.js";
import type * as files from "../files.js";
import type * as photos from "../photos.js";
import type * as projects from "../projects.js";
import type * as socials from "../socials.js";
import type * as techStacks from "../techStacks.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  aboutMe: typeof aboutMe;
  auth: typeof auth;
  contact: typeof contact;
  education: typeof education;
  experience: typeof experience;
  files: typeof files;
  photos: typeof photos;
  projects: typeof projects;
  socials: typeof socials;
  techStacks: typeof techStacks;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
