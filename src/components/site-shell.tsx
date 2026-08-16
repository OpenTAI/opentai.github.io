"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { navItems, siteBrand } from "@/data/site";
import { Locale, localizeHref, switchLocaleHref, t } from "@/lib/i18n";

export function SiteShell({
  children,
  locale = "en",
}: {
  children: ReactNode;
  locale?: Locale;
  sectionLabel?: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const routePath = pathname === "/zh" ? "/" : pathname.replace(/^\/zh(?=\/)/, "");

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  return (
    <div className="relative min-h-screen" lang={locale === "zh" ? "zh-CN" : "en"}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#111111] focus:shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
      >
        {t(locale, "Skip to content")}
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 pb-20 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-40 border-b border-[#e9edf3] bg-white/88 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-4 py-4">
            <Link href={localizeHref(locale, "/")} className="flex items-center gap-3">
              <Image
                alt=""
                height={34}
                priority
                src="/brand/logo.png"
                width={34}
              />
              <div>
                <span className="block text-[1.2rem] font-semibold tracking-[-0.04em] text-[#111111]">
                  {siteBrand.name}
                </span>
                <p className="hidden text-sm text-[#667085] sm:block">
                  {t(locale, siteBrand.tagline)}
                </p>
              </div>
            </Link>

            <nav
              aria-label={locale === "zh" ? "主导航" : "Primary"}
              className={`${menuOpen ? "flex" : "hidden"} order-3 w-full flex-col gap-1 border-t border-[#eef1f5] pt-3 lg:order-none lg:flex lg:w-auto lg:flex-1 lg:flex-row lg:justify-center lg:gap-5 lg:border-0 lg:pt-0`}
              id="primary-navigation"
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? routePath === "/"
                    : routePath === item.href || routePath.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={localizeHref(locale, item.href ?? "/")}
                    aria-current={isActive ? "page" : undefined}
                    className={`top-tab w-full rounded-xl px-3 py-2 lg:w-auto lg:rounded-none lg:px-0 lg:py-0 ${isActive ? "top-tab-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(locale, item.label)}
                  </Link>
                );
              })}
            </nav>

            <div
              aria-label={locale === "zh" ? "网站语言" : "Site language"}
              className="ml-auto inline-flex shrink-0 rounded-full border border-[#e3e8f2] bg-[#f6f8fc] p-1 lg:ml-0"
              role="group"
            >
              <Link
                aria-current={locale === "en" ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  locale === "en" ? "bg-white text-[#111827] shadow-sm" : "text-[#667085]"
                }`}
                href={switchLocaleHref(pathname, "en")}
                hrefLang="en"
                lang="en"
              >
                EN
              </Link>
              <Link
                aria-current={locale === "zh" ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  locale === "zh" ? "bg-white text-[#111827] shadow-sm" : "text-[#667085]"
                }`}
                href={switchLocaleHref(pathname, "zh")}
                hrefLang="zh-CN"
                lang="zh-CN"
              >
                中文
              </Link>
            </div>

            <button
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              aria-label={t(locale, menuOpen ? "Close navigation" : "Open navigation")}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e3e8f2] bg-white text-[#344054] lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <span aria-hidden="true" className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            </button>
          </div>
        </header>

        <main id="main" className="flex-1 pt-8 sm:pt-10">{children}</main>

        <footer className="mx-auto mt-16 w-full max-w-[1480px] border-t border-[#e9edf3] pt-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Image alt="" height={26} src="/brand/logo.png" width={26} />
                <span className="text-[1rem] font-semibold tracking-[-0.03em] text-[#111827]">
                  {siteBrand.name}
                </span>
              </div>
              <p className="max-w-[36rem] text-sm leading-6 text-[#667085]">
                {t(locale, siteBrand.headline)}
              </p>
            </div>
            <div className="space-y-2 text-sm text-[#667085]">
              <p>
                {t(locale, "Contact")}:{" "}
                <a
                  className="text-[#4f46e5] hover:underline"
                  href={`mailto:${siteBrand.contactEmail}`}
                >
                  {siteBrand.contactEmail}
                </a>
              </p>
              <p>
                {t(locale, "Current site")}:{" "}
                <a
                  className="text-[#4f46e5] hover:underline"
                  href={siteBrand.upstream}
                  rel="noreferrer"
                  target="_blank"
                >
                  {siteBrand.upstream.replace("https://", "")}
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
