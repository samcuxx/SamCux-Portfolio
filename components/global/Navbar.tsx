"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";
import MagneticLink from "../ui/MagneticLink";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    // {
    //   title: "Blog",
    //   href: "/blog",
    // },
    {
      title: "Photos",
      href: "/photos",
    },
  ];

  return (
    <UnmountStudio>
      <header className={`text-sm py-6 z-30 md:mb-28 mb-10 fixed top-0 left-0 w-full px-8 transition-all duration-300 ${hasScrolled ? 'backdrop-blur-md bg-sa-light-bg/30 dark:bg-sa-dark-bg/30' : ''}`}>
        <div className="mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src={Logo} width={35} height={35} alt="logo" />
          </Link>

          <nav className="md:block hidden">
            <ul className="flex items-center gap-x-8">
              {data.map((link, id) => (
                <li key={id}>
                  <MagneticLink
                    href={link.href}
                    className="font-incognito dark:text-sa-dark-text-low  dark:hover:text-sa-blue2 hover:text-sa-blue duration-300 text-base"
                  >
                    {link.title}
                  </MagneticLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-x-4">
            <Theme />
            <MobileMenu />
          </div>
        </div>
      </header>
    </UnmountStudio>
  );
}
