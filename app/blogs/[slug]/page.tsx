import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SectionShell } from "@/components/section-shell";
import { blogPosts } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const contentLines = post.content.split("\n");
  const markdownHeadingRegex = /^(#{1,3})\s+(.+)$/;
  const numberedHeadingRegex = /^(\d+\.|[IVX]+\.)\s/;
  const faqQuestionRegex = /^(Q?\d+):\s+.+/i;
  const faqHeadingRegex = /^(FAQs?:\s+.+|Frequently Asked Questions(?:\s*\(FAQ\))?)$/i;
  const labelPrefixRegex = /^(Connection|Obstacle|How to Overcome|Author):\s+(.+)$/i;
  const isNestedBulletStarter = (line: string) => /^\s+[-•●]\s+/.test(line);
  const isBulletStarter = (line: string) =>
    line.startsWith("- ") || line.startsWith("• ") || line.startsWith("● ");
  const getInlineNodes = (text: string) => {
    const segments = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/\S+)/g).filter(Boolean);
    return segments.map((segment, segmentIndex) => {
      if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
        return (
          <strong key={`${text}-${segmentIndex}`} className="font-semibold text-foreground">
            {segment.slice(2, -2)}
          </strong>
        );
      }

      const markdownLink = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (markdownLink) {
        const [, label, href] = markdownLink;
        const isExternal = href.startsWith("http://") || href.startsWith("https://");
        return (
          <Link
            key={`${text}-${segmentIndex}`}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="font-medium text-accent underline decoration-accent/60 underline-offset-2 hover:text-primary"
          >
            {label}
          </Link>
        );
      }

      if (/^https?:\/\/\S+$/.test(segment)) {
        return (
          <Link
            key={`${text}-${segmentIndex}`}
            href={segment}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent underline decoration-accent/60 underline-offset-2 hover:text-primary break-all"
          >
            {segment}
          </Link>
        );
      }

      return <span key={`${text}-${segmentIndex}`}>{segment}</span>;
    });
  };
  const articleNodes: ReactNode[] = [];
  let index = 0;
  let spacerIndex = 0;

  while (index < contentLines.length) {
    const rawLine = contentLines[index];
    const line = rawLine.trim();

    if (!line) {
      spacerIndex += 1;
      articleNodes.push(<div key={`${post.slug}-spacer-${spacerIndex}`} className="h-3" />);
      index += 1;
      continue;
    }

    if (numberedHeadingRegex.test(line)) {
      articleNodes.push(
        <h3
          key={`${post.slug}-${line}-${index}`}
          className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          {line}
        </h3>,
      );
      index += 1;
      continue;
    }

    const markdownHeadingMatch = line.match(markdownHeadingRegex);
    if (markdownHeadingMatch) {
      const [, hashes, title] = markdownHeadingMatch;
      const level = hashes.length;

      if (level === 1) {
        articleNodes.push(
          <h2
            key={`${post.slug}-${line}-${index}`}
            className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {title}
          </h2>,
        );
      } else if (level === 2) {
        articleNodes.push(
          <h3
            key={`${post.slug}-${line}-${index}`}
            className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {title}
          </h3>,
        );
      } else {
        articleNodes.push(
          <h4 key={`${post.slug}-${line}-${index}`} className="mt-4 text-lg font-semibold text-foreground">
            {title}
          </h4>,
        );
      }

      index += 1;
      continue;
    }

    if (faqQuestionRegex.test(line)) {
      const question = line.replace(/^(Q?\d+):\s+/i, "");
      const answers: string[] = [];
      let cursor = index + 1;
      while (cursor < contentLines.length) {
        const candidate = contentLines[cursor].trim();
        if (!candidate) {
          if (answers.length > 0) {
            break;
          }
          cursor += 1;
          continue;
        }
        if (
          faqQuestionRegex.test(candidate) ||
          faqHeadingRegex.test(candidate) ||
          numberedHeadingRegex.test(candidate)
        ) {
          break;
        }
        answers.push(candidate);
        cursor += 1;
      }

      articleNodes.push(
        <details
          key={`${post.slug}-faq-${index}`}
          className="group rounded-lg border border-border/80 bg-card/30 px-4 py-3"
        >
          <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:content-none">
            <span className="inline-flex items-center gap-2">
              <span className="text-muted transition-transform group-open:rotate-90">▸</span>
              {getInlineNodes(question)}
            </span>
          </summary>
          {answers.length > 0 ? (
            <p className="mt-3 text-base leading-8 text-muted">{getInlineNodes(answers.join(" "))}</p>
          ) : null}
        </details>,
      );
      index = cursor;
      continue;
    }

    if (faqHeadingRegex.test(line)) {
      articleNodes.push(
        <h2
          key={`${post.slug}-${line}-${index}`}
          className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {line}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (isBulletStarter(line) && !isNestedBulletStarter(rawLine)) {
      const items: Array<{ text: string; children: string[] }> = [
        { text: line.replace(/^[-•●]\s*/, ""), children: [] },
      ];
      let cursor = index + 1;
      while (cursor < contentLines.length) {
        const rawCandidate = contentLines[cursor];
        const candidate = rawCandidate.trim();
        if (!candidate) {
          break;
        }
        if (isNestedBulletStarter(rawCandidate)) {
          const nestedText = candidate.replace(/^[-•●]\s*/, "");
          const lastItem = items.at(-1);
          if (lastItem) {
            lastItem.children.push(nestedText);
          }
          cursor += 1;
          continue;
        }
        if (!isBulletStarter(candidate)) {
          break;
        }
        items.push({ text: candidate.replace(/^[-•●]\s*/, ""), children: [] });
        cursor += 1;
      }

      articleNodes.push(
        <ul key={`${post.slug}-explicit-list-${index}`} className="ml-6 list-disc space-y-2 text-base leading-8 text-muted">
          {items.map((item, itemIndex) => (
            <li key={`${post.slug}-explicit-${index}-${itemIndex}`}>
              {getInlineNodes(item.text)}
              {item.children.length > 0 ? (
                <ul className="ml-6 mt-1 list-disc space-y-1 text-base leading-8 text-muted">
                  {item.children.map((child, childIndex) => (
                    <li key={`${post.slug}-explicit-${index}-${itemIndex}-child-${childIndex}`}>
                      {getInlineNodes(child)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>,
      );
      index = cursor;
      continue;
    }

    const labelMatch = line.match(labelPrefixRegex);
    if (labelMatch) {
      const [, label, body] = labelMatch;
      articleNodes.push(
        <p key={`${post.slug}-${line}-${index}`} className="text-base leading-8 text-muted">
          <span className="font-semibold text-foreground">{label}:</span> {getInlineNodes(body)}
        </p>,
      );
      index += 1;
      continue;
    }

    articleNodes.push(
      <p key={`${post.slug}-${line}-${index}`} className="text-base leading-8 text-muted">
        {getInlineNodes(line)}
      </p>,
    );
    index += 1;
  }

  return (
    <SectionShell title="">
      <Link
        href="/blogs"
        className="inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
      >
        ← Back to Blog
      </Link>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 space-y-2 text-sm text-muted">
        <p>{post.author}</p>
        <p>{post.date}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={`${post.slug}-${tag}`}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted"
            >
              {tag.replace(/^#/, "")}
            </span>
          ))}
        </div>
      </div>

      <article className="mt-8 space-y-3">
        {articleNodes}
      </article>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Related Articles</h2>
        <div className="mt-4 space-y-4">
          {post.relatedArticles.map((article) => {
            const relatedPost = blogPosts.find((item) => item.slug === article.slug);
            return (
              <Link
                key={article.slug}
                href={`/blogs/${article.slug}`}
                className="group block rounded-xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-background/40"
              >
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                  {article.title}
                </h3>
                {relatedPost ? (
                  <p className="mt-2 text-sm leading-6 text-muted">{relatedPost.excerpt}</p>
                ) : null}
                <p className="mt-2 text-xs text-muted">{article.date}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {post.ctaTitle && post.ctaText && post.ctaLabel && post.ctaHref ? (
        <section className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">{post.ctaTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{post.ctaText}</p>
          <Link
            href={post.ctaHref}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            {post.ctaLabel}
          </Link>
        </section>
      ) : null}
    </SectionShell>
  );
}
