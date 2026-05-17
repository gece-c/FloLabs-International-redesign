import Link from "next/link";
import type { ReactNode } from "react";
import { projectPanelBodyClass, projectPanelShellClass } from "@/components/project-panel";
import type { BlogPost } from "@/lib/site-data";

const bodyClass = `${projectPanelBodyClass} text-xl leading-9`;
/** Top spacing for headings is applied on the article wrapper; keep headings mt-0 here. */
const headingH2Class =
  "mt-0 text-4xl font-semibold tracking-tight text-foreground dark:text-white sm:text-5xl";
const headingH3Class =
  "mt-0 text-3xl font-semibold tracking-tight text-foreground dark:text-white sm:text-4xl";
const headingH4Class = "mt-0 text-2xl font-semibold text-foreground dark:text-white";

/** Spacing between blocks: extra margin only before headings / section blocks, tight stacking for body paragraphs. */
const articleStackClass = [
  "break-words",
  // Normal paragraphs: closer together (no global space-y on the article).
  "[&>p+p]:mt-5",
  // Section titles (semibold headings): more air above when not the first node.
  "[&>h2:not(:first-child)]:mt-14",
  "[&>h3:not(:first-child)]:mt-12",
  "[&>h4:not(:first-child)]:mt-11",
  // Space after a heading into body text or lists.
  "[&>h2+p]:mt-7 [&>h3+p]:mt-7 [&>h4+p]:mt-7",
  "[&>h2+ul]:mt-6 [&>h3+ul]:mt-6 [&>h4+ul]:mt-6",
  "[&>p+ul]:mt-6 [&>ul+p]:mt-6 [&>ul+ul]:mt-6",
  // FAQ / disclosure blocks.
  "[&>details:not(:first-child)]:mt-9",
  "[&>p+details]:mt-8 [&>ul+details]:mt-8 [&>details+details]:mt-8",
].join(" ");
const inlineLinkClass =
  "font-medium text-primary underline decoration-primary/50 underline-offset-2 hover:text-primary/85 dark:text-white/90 dark:decoration-white/40 dark:hover:text-white";

const faqShellClass = `${projectPanelShellClass} px-4 py-3`;

type BlogArticleContentProps = {
  post: BlogPost;
};

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  const contentLines = post.content.split("\n");
  const markdownHeadingRegex = /^(#{1,3})\s+(.+)$/;
  const numberedHeadingRegex = /^(\d+\.|[IVX]+\.)\s/;
  const faqQuestionRegex = /^(Q?\d+):\s+.+/i;
  const faqHeadingRegex = /^(FAQs?:\s+.+|Frequently Asked Questions(?:\s*\(FAQ\))?)$/i;
  const labelPrefixRegex = /^(Connection|Obstacle|How to Overcome|Author):\s+(.+)$/i;
  const projectSubheadingRegex =
    /^(Project Summary|Components Needed|Difficulty Level|Instructions|Tips & Insights)(?::.*)?$/i;
  const sectionHeadingLeadRegex =
    /^(?:Why|What|How|Where|When|Top \d+|Key Takeaway|Final Thoughts|Conclusion|Types of|Skills and|Benefits of|Obstacles and|Keys To|Internship Duration|Core Technical|Soft Skills|Real-World Applications|The Role of|Post AI Internship|Where Robots|Why Robots|Why the Future|Why AI internship|How FloLabs|How to Find)/i;
  const paragraphStarterRegex =
    /^(?:In |The |At |This |Whether |If you|If |Nowadays|Thanks|With robots|Meet |An AI|Completing|Curiosity|Deploy |Scale |Access |In short|Explore |Stay |Humanoid|Yes\.|AI will |Begin with|Healthcare,|Landing your|Learn more|Want to|Are you)/i;
  const isNestedBulletStarter = (line: string) => /^\s+[-•●]\s+/.test(line);
  const isBulletStarter = (line: string) =>
    line.startsWith("- ") || line.startsWith("• ") || line.startsWith("● ");

  const hasNumberedHeadingAhead = (fromIndex: number, maxScan = 8) => {
    let cursor = fromIndex + 1;
    let scanned = 0;
    while (cursor < contentLines.length && scanned < maxScan) {
      const candidate = contentLines[cursor].trim();
      if (!candidate) {
        cursor += 1;
        continue;
      }
      if (numberedHeadingRegex.test(candidate)) {
        return true;
      }
      scanned += 1;
      cursor += 1;
    }
    return false;
  };

  const isImplicitSectionHeading = (line: string, index: number, inFaqSection: boolean) => {
    if (inFaqSection || faqHeadingRegex.test(line)) {
      return false;
    }
    if (line.length > 110) {
      return false;
    }
    if (projectSubheadingRegex.test(line)) {
      return false;
    }
    if (/^https?:\/\//.test(line)) {
      return false;
    }
    if (/:\s*$/.test(line) && !sectionHeadingLeadRegex.test(line)) {
      return false;
    }
    if (/\.\s+\S/.test(line) && line.endsWith(".")) {
      return false;
    }
    if (sectionHeadingLeadRegex.test(line)) {
      return true;
    }
    if (/^(?:What|Why|How|Where|When)\s.+\?$/.test(line) && line.length < 90) {
      return true;
    }
    if (!line.endsWith(".") && line.length <= 85 && !line.includes("http")) {
      if (paragraphStarterRegex.test(line)) {
        return false;
      }
      if (hasNumberedHeadingAhead(index)) {
        return true;
      }
    }
    if (!line.endsWith(".") && line.length <= 72 && /^[A-Z]/.test(line) && !paragraphStarterRegex.test(line)) {
      return true;
    }
    return false;
  };

  const getInlineNodes = (text: string) => {
    const segments = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/\S+)/g).filter(Boolean);
    return segments.map((segment, segmentIndex) => {
      if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
        return (
          <strong
            key={`${text}-${segmentIndex}`}
            className="font-semibold text-foreground dark:text-white"
          >
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
            className={inlineLinkClass}
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
            className={`${inlineLinkClass} break-all`}
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
  let inFaqSection = false;
  let inNumberedProjectSection = false;

  while (index < contentLines.length) {
    const rawLine = contentLines[index];
    const line = rawLine.trim();

    if (!line) {
      spacerIndex += 1;
      articleNodes.push(<div key={`${post.slug}-spacer-${spacerIndex}`} className="h-3" />);
      index += 1;
      continue;
    }

    if (faqHeadingRegex.test(line)) {
      inFaqSection = true;
    } else if (
      inFaqSection &&
      (sectionHeadingLeadRegex.test(line) ||
        /^Final Thoughts$/i.test(line) ||
        /^Conclusion$/i.test(line) ||
        markdownHeadingRegex.test(line))
    ) {
      inFaqSection = false;
    }

    if (projectSubheadingRegex.test(line) && inNumberedProjectSection) {
      articleNodes.push(
        <h4 key={`${post.slug}-${line}-${index}`} className={headingH4Class}>
          {line}
        </h4>,
      );
      index += 1;
      continue;
    }

    if (isImplicitSectionHeading(line, index, inFaqSection)) {
      inNumberedProjectSection = false;
      articleNodes.push(
        <h2 key={`${post.slug}-${line}-${index}`} className={headingH2Class}>
          {getInlineNodes(line)}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (numberedHeadingRegex.test(line)) {
      inNumberedProjectSection = /^\d+\.\s/.test(line) && line.length < 120;
      articleNodes.push(
        <h3 key={`${post.slug}-${line}-${index}`} className={headingH3Class}>
          {getInlineNodes(line)}
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
          <h2 key={`${post.slug}-${line}-${index}`} className={headingH2Class}>
            {title}
          </h2>,
        );
      } else if (level === 2) {
        articleNodes.push(
          <h3 key={`${post.slug}-${line}-${index}`} className={headingH3Class}>
            {title}
          </h3>,
        );
      } else {
        articleNodes.push(
          <h4 key={`${post.slug}-${line}-${index}`} className={headingH4Class}>
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
        <details key={`${post.slug}-faq-${index}`} className={`${faqShellClass} group`}>
          <summary className="cursor-pointer list-none text-xl font-semibold text-foreground marker:content-none dark:text-white">
            <span className="inline-flex items-center gap-2">
              <span className="text-muted transition-transform group-open:rotate-90 dark:text-white/70">
                ▸
              </span>
              {getInlineNodes(question)}
            </span>
          </summary>
          {answers.length > 0 ? (
            <p className={`mt-5 ${bodyClass}`}>{getInlineNodes(answers.join(" "))}</p>
          ) : null}
        </details>,
      );
      index = cursor;
      continue;
    }

    if (faqHeadingRegex.test(line)) {
      articleNodes.push(
        <h2 key={`${post.slug}-${line}-${index}`} className={headingH2Class}>
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
        <ul
          key={`${post.slug}-explicit-list-${index}`}
          className={`ml-6 list-disc space-y-2 ${bodyClass}`}
        >
          {items.map((item, itemIndex) => (
            <li key={`${post.slug}-explicit-${index}-${itemIndex}`}>
              {getInlineNodes(item.text)}
              {item.children.length > 0 ? (
                <ul className={`ml-6 mt-3 list-disc space-y-1 ${bodyClass}`}>
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
        <p key={`${post.slug}-${line}-${index}`} className={bodyClass}>
          <span className="font-semibold text-foreground dark:text-white">{label}:</span>{" "}
          {getInlineNodes(body)}
        </p>,
      );
      index += 1;
      continue;
    }

    articleNodes.push(
      <p key={`${post.slug}-${line}-${index}`} className={bodyClass}>
        {getInlineNodes(line)}
      </p>,
    );
    index += 1;
  }

  return (
    <section className={`${projectPanelShellClass} w-full px-5 py-5 text-left sm:px-6 sm:py-6`}>
      <article className={articleStackClass}>{articleNodes}</article>
    </section>
  );
}
