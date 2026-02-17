"use client";

import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Link2,
  Mail,
  Github,
  Linkedin,
  User,
} from "lucide-react";
import {
  heroContactConfig,
  type HeroSocialItem,
  type ContactMode,
} from "@/data/hero-contact";

export type { HeroSocialItem, ContactMode };

export type HeroContactWidgetProps = {
  emailLocalPart?: string;
  emailDomainFirst?: string;
  emailDomainRest?: string;
  emailTld?: string;
  mailtoUrl?: string;
  socials?: HeroSocialItem[];
};

/** X (Twitter) brand icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Instagram brand icon */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/** Telegram brand icon */
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function getIcon(iconName: HeroSocialItem["icon"], className: string): React.ReactNode {
  const base = "w-5 h-5 shrink-0";
  const cn = `${base} ${className || ""}`.trim();
  switch (iconName) {
    case "link":
      return <Link2 className={cn} aria-hidden />;
    case "mail":
      return <Mail className={cn} aria-hidden />;
    case "github":
      return <Github className={cn} aria-hidden />;
    case "linkedin":
      return <Linkedin className={cn} aria-hidden />;
    case "x":
      return <XIcon className={cn} />;
    case "instagram":
      return <InstagramIcon className={cn} />;
    case "telegram":
      return <TelegramIcon className={cn} />;
    case "user":
      return <User className={cn} aria-hidden />;
    default:
      return <Link2 className={cn} aria-hidden />;
  }
}

const MUTED = "text-gray-500 dark:text-[#66768f] opacity-25";
const ACCENT = "text-[#ffe400] opacity-100 -translate-y-0.5";
const ACCENT_STATIC = "text-[#ffe400] opacity-100";

/** Which parts are highlighted per mode (sameerasw mapping) */
function getPartClasses(
  mode: ContactMode
): Record<"local" | "at" | "domainFirst" | "domainRest" | "dot" | "tld", string> {
  const muted = MUTED;
  const accent = ACCENT;
  const all = ACCENT_STATIC;
  switch (mode) {
    case "all":
      return { local: all, at: all, domainFirst: all, domainRest: all, dot: all, tld: all };
    case "domain":
      return {
        local: muted,
        at: muted,
        domainFirst: accent,
        domainRest: accent,
        dot: accent,
        tld: accent,
      };
    case "handle":
    case "linkedin":
    case "telegram":
      return {
        local: muted,
        at: accent,
        domainFirst: accent,
        domainRest: accent,
        dot: muted,
        tld: muted,
      };
    case "local":
      return {
        local: muted,
        at: muted,
        domainFirst: accent,
        domainRest: muted,
        dot: muted,
        tld: muted,
      };
    case "twitter":
    case "instagram":
      return {
        local: muted,
        at: accent,
        domainFirst: accent,
        domainRest: accent,
        dot: accent,
        tld: accent,
      };
    default:
      return getPartClasses("all");
  }
}

/** Config is loaded from data/hero-contact.json via data/hero-contact.ts */
export const HERO_CONTACT_SOCIALS = heroContactConfig.socials;

export function HeroContactWidget({
  emailLocalPart = heroContactConfig.email.localPart,
  emailDomainFirst = heroContactConfig.email.domainFirst,
  emailDomainRest = heroContactConfig.email.domainRest,
  emailTld = heroContactConfig.email.tld,
  mailtoUrl = heroContactConfig.email.mailtoUrl,
  socials = heroContactConfig.socials,
}: HeroContactWidgetProps) {
  const firstId = socials[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(firstId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const currentMode = useMemo(() => {
    const id = hoveredId ?? selectedId;
    const item = socials.find((s) => s.id === id);
    return item?.mode ?? "all";
  }, [hoveredId, selectedId, socials]);

  const partClasses = useMemo(() => getPartClasses(currentMode), [currentMode]);

  const isHoverDevice = useCallback(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: HeroSocialItem) => {
      if (isHoverDevice()) return;
      e.preventDefault();
      setSelectedId(item.id);
    },
    [isHoverDevice]
  );

  const handleEmailClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isHoverDevice()) return;
      e.preventDefault();
      const selected = socials.find((s) => s.id === selectedId);
      if (selected?.url && selected.url !== "javascript:void(0)") {
        if (selected.url.startsWith("mailto:")) {
          window.location.href = selected.url;
        } else {
          window.open(selected.url, selected.url.startsWith("http") ? "_blank" : "_self");
        }
      }
    },
    [isHoverDevice, socials, selectedId]
  );

  const showHint =
    hoveredId !== null &&
    socials.some(
      (s) => s.id === hoveredId && s.id !== "website" && s.id !== "name"
    );

  return (
    <div className="flex flex-col items-center gap-4 text-center">
   
      {/* Main link: sameerasw-style parts, highlight by mode */}
      <a
        href={mailtoUrl}
        onClick={handleEmailClick}
        className="inline-flex items-baseline gap-0 text-xl font-bold tracking-tight no-underline outline-none rounded focus-visible:ring-2 focus-visible:ring-[#ffe400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101010] dark:focus-visible:ring-offset-[#0f172a] cursor-pointer select-none transition-[color,opacity,transform] duration-200"
        aria-label={`Contact: ${emailLocalPart} at ${emailDomainFirst}${emailDomainRest}.${emailTld}`}
      >
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.local}`}>
          {emailLocalPart}
        </span>
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.at}`}>
          @
        </span>
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.domainFirst}`}>
          {emailDomainFirst}
        </span>
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.domainRest}`}>
          {emailDomainRest}
        </span>
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.dot}`}>
          .
        </span>
        <span className={`transition-[color,opacity,transform] duration-200 ${partClasses.tld}`}>
          {emailTld}
        </span>
      </a>

      {/* Pill bar: hover = expand + glow, active state, neighbor rounding */}
      <div
        className="inline-flex border border-gray-400/80 dark:border-[#66768f]/80 overflow-visible bg-transparent rounded-[20px]"
        role="group"
        aria-label="Contact shortcuts"
      >
        {socials.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === socials.length - 1;
          const isActive =
            hoveredId === item.id || (hoveredId === null && selectedId === item.id);
          const isHovered = hoveredId === item.id;
          const isPrevOfHovered = hoveredId !== null && socials[index + 1]?.id === hoveredId;
          const isNextOfHovered = hoveredId !== null && socials[index - 1]?.id === hoveredId;

          const roundedClass = isActive
            ? "rounded-[12px]"
            : isPrevOfHovered
              ? "rounded-r-[12px]"
              : isNextOfHovered
                ? "rounded-l-[12px]"
                : isFirst
                  ? "rounded-l-[20px]"
                  : isLast
                    ? "rounded-r-[20px]"
                    : "";

          return (
            <Link
              key={item.id}
              href={item.url}
              target={item.url.startsWith("http") ? "_blank" : undefined}
              rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => handleLinkClick(e, item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              className={`
                group inline-flex items-center justify-center h-10 min-w-[2.5rem] px-3 gap-0
                border-r border-gray-400/80 dark:border-[#66768f]/80 last:border-r-0
                transition-all duration-200 ease-out
                ${roundedClass}
                ${
                  isActive
                    ? "bg-[#ffe400] text-[#101010] border-[#ffe400]"
                    : "bg-transparent text-gray-500 dark:text-[#66768f] hover:bg-[#ffe400] hover:text-[#101010] hover:border-[#ffe400]"
                }
                ${isHovered ? "scale-105 shadow-[0_0_0_2px_rgba(255,228,0,0.4),0_0_20px_rgba(255,228,0,0.25)]" : "scale-100 shadow-none"}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe400] focus-visible:ring-inset
              `}
              aria-label={item.label}
              aria-selected={isActive}
            >
              {getIcon(item.icon, "")}
              <span
                className={`
                  opacity-0 max-w-0 overflow-hidden whitespace-nowrap ml-0
                  transition-[opacity,max-width,margin] duration-300 ease-out
                  ${isActive ? "!opacity-100 !max-w-[100px] !ml-2" : ""}
                  group-hover:opacity-100 group-hover:max-w-[100px] group-hover:ml-2
                `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
