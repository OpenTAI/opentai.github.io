"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ContactDialog } from "@/components/contact-dialog";
import { siteBrand } from "@/data/site";
import { Locale, localizeHref, switchLocaleHref, t } from "@/lib/i18n";
import {
  activeNavigationGroup,
  footerNavigationGroups,
  navigationGroups,
} from "@/lib/site-navigation";

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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const desktopNavigationRef = useRef<HTMLDivElement>(null);
  const routePath = pathname === "/zh" ? "/" : pathname.replace(/^\/zh(?=\/)/, "");
  const activeGroup = activeNavigationGroup(routePath);
  const brandLogo = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/logo.png`;

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  useEffect(() => {
    function closeNavigation(event: MouseEvent) {
      if (
        desktopNavigationRef.current &&
        !desktopNavigationRef.current.contains(event.target as Node)
      ) {
        setOpenGroup(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenGroup(null);
      }
    }

    document.addEventListener("mousedown", closeNavigation);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeNavigation);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setOpenGroup(null);
  }

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
            <Link
              className="flex items-center gap-3"
              href={localizeHref(locale, "/")}
              onClick={closeMenus}
            >
              <Image
                alt=""
                height={34}
                priority
                src={brandLogo}
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

            <div
              className="hidden flex-1 items-center justify-center gap-5 lg:flex"
              ref={desktopNavigationRef}
            >
              <Link
                aria-current={routePath === "/" ? "page" : undefined}
                className={`top-tab ${routePath === "/" ? "top-tab-active" : ""}`}
                href={localizeHref(locale, "/")}
                onClick={closeMenus}
              >
                {t(locale, "Home")}
              </Link>
              <nav
                aria-label={locale === "zh" ? "主导航" : "Primary"}
                className="flex items-center gap-5"
              >
                {navigationGroups.map((group) => {
                  const isOpen = openGroup === group.label;
                  const isActive = activeGroup === group.label;

                  return (
                    <div className="relative" key={group.label}>
                      <button
                        aria-expanded={isOpen}
                        className={`top-tab inline-flex items-center gap-1.5 ${isActive ? "top-tab-active" : ""}`}
                        onClick={() => setOpenGroup(isOpen ? null : group.label)}
                        type="button"
                      >
                        {t(locale, group.label)}
                        <span
                          aria-hidden="true"
                          className={`text-[0.65rem] transition-transform ${isOpen ? "rotate-180" : ""}`}
                        >
                          ▾
                        </span>
                      </button>
                      {isOpen ? (
                        <div className="absolute left-1/2 top-[calc(100%+1rem)] z-50 w-60 -translate-x-1/2 rounded-[20px] border border-[#e6eaf1] bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                          <p className="px-3 pb-2 pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#98a2b3]">
                            {t(locale, group.label)}
                          </p>
                          {group.items.map((item) =>
                            item.href ? (
                              <Link
                                aria-current={
                                  routePath === item.href || routePath.startsWith(`${item.href}/`)
                                    ? "page"
                                    : undefined
                                }
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[#344054] transition hover:bg-[#f5f6ff] hover:text-[#4338ca]"
                                href={localizeHref(locale, item.href)}
                                key={item.label}
                                onClick={closeMenus}
                              >
                                {t(locale, item.label)}
                                <span aria-hidden="true" className="text-[#98a2b3]">→</span>
                              </Link>
                            ) : (
                              <div
                                aria-disabled="true"
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[#98a2b3]"
                                key={item.label}
                              >
                                <span>{t(locale, item.label)}</span>
                                <span className="rounded-full bg-[#f2f4f7] px-2 py-0.5 text-[0.65rem] font-medium">
                                  {t(locale, "Coming soon")}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </div>

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
                onClick={closeMenus}
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
                onClick={closeMenus}
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

            <nav
              aria-label={locale === "zh" ? "主导航" : "Primary"}
              className={`${menuOpen ? "block" : "hidden"} order-3 w-full border-t border-[#eef1f5] pt-3 lg:hidden`}
              id="primary-navigation"
            >
              <Link
                aria-current={routePath === "/" ? "page" : undefined}
                className={`block rounded-xl px-3 py-2.5 text-sm font-semibold ${routePath === "/" ? "bg-[#eef2ff] text-[#4338ca]" : "text-[#344054]"}`}
                href={localizeHref(locale, "/")}
                onClick={closeMenus}
              >
                {t(locale, "Home")}
              </Link>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {navigationGroups.map((group) => (
                  <section className="rounded-[18px] border border-[#edf0f5] bg-[#fafbfc] p-2" key={group.label}>
                    <h2 className="px-3 pb-1.5 pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#667085]">
                      {t(locale, group.label)}
                    </h2>
                    {group.items.map((item) =>
                      item.href ? (
                        <Link
                          aria-current={
                            routePath === item.href || routePath.startsWith(`${item.href}/`)
                              ? "page"
                              : undefined
                          }
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#344054] hover:bg-white hover:text-[#4338ca]"
                          href={localizeHref(locale, item.href)}
                          key={item.label}
                          onClick={closeMenus}
                        >
                          {t(locale, item.label)}
                          <span aria-hidden="true" className="text-[#98a2b3]">→</span>
                        </Link>
                      ) : (
                        <div
                          aria-disabled="true"
                          className="flex items-center justify-between px-3 py-2 text-sm text-[#98a2b3]"
                          key={item.label}
                        >
                          <span>{t(locale, item.label)}</span>
                          <span className="text-[0.65rem]">{t(locale, "Coming soon")}</span>
                        </div>
                      ),
                    )}
                  </section>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main id="main" className="flex-1 pt-8 sm:pt-10">{children}</main>

        <footer className="site-footer mx-auto mt-16 w-full max-w-[1480px]">
          <div className="site-footer-top">
            <Link className="site-footer-brand" href={localizeHref(locale, "/")}>
              <Image alt="" height={30} src={brandLogo} width={30} />
              <span>{siteBrand.name}</span>
            </Link>
            <ContactDialog email={siteBrand.contactEmail} locale={locale} />
          </div>

          <nav
            aria-label={locale === "zh" ? "页脚导航" : "Footer"}
            className="site-footer-directory"
          >
            {footerNavigationGroups.map((group) => (
              <section className="site-footer-group" key={group.label}>
                <h2>{t(locale, group.label)}</h2>
                <ul>
                  {group.items.map((item) => {
                    if (!item.href) return null;
                    const external = item.href.startsWith("http");
                    return (
                      <li key={item.label}>
                        <Link
                          href={localizeHref(locale, item.href)}
                          rel={external ? "noreferrer" : undefined}
                          target={external ? "_blank" : undefined}
                        >
                          {t(locale, item.label)}
                          {external ? <span aria-hidden="true">↗</span> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </nav>

          <div className="site-footer-bottom">
            <span>OpenTAI © 2026</span>
            <Link href={localizeHref(locale, "/about#inclusion-attribution")}>
              {t(locale, "Inclusion & Attribution")}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
