import { Fragment, ReactNode } from "react";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteShell } from "@/components/site-shell";
import { termsOfUseMarkdown } from "@/content/terms-of-use";
import { Locale } from "@/lib/i18n";

function inlineMarkdown(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
      }

      return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    });
}

function MarkdownDocument() {
  const lines = termsOfUseMarkdown.trim().split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (!listItems.length) return;
    const items = listItems;
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {items.map((item) => (
          <li key={item}>{inlineMarkdown(item)}</li>
        ))}
      </ul>,
    );
    listItems = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("* ")) {
      listItems.push(line.slice(2));
      continue;
    }

    flushList();

    if (!line) continue;
    if (line === "---") {
      blocks.push(<hr key={`rule-${blocks.length}`} />);
    } else if (line.startsWith("## ")) {
      blocks.push(<h2 key={line}>{line.slice(3)}</h2>);
    } else if (line.startsWith("# ")) {
      blocks.push(<h1 key={line}>{line.slice(2)}</h1>);
    } else {
      blocks.push(<p key={`paragraph-${blocks.length}`}>{inlineMarkdown(line)}</p>);
    }
  }

  flushList();
  return blocks;
}

export function TermsPageView({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale}>
      <div className="page-frame terms-page">
        <PageBreadcrumb items={["Home", "Terms Of Use"]} locale={locale} />
        <article className="terms-document" lang="en">
          <MarkdownDocument />
        </article>
      </div>
    </SiteShell>
  );
}
