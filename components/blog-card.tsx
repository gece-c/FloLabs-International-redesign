import Link from "next/link";
import { projectPanelShellClass } from "@/components/project-panel";
import type { BlogPost } from "@/lib/site-data";

const cardShellGridClass = `group flex h-full flex-col ${projectPanelShellClass} transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-card/72 hover:shadow-md px-5 py-5 dark:hover:border-white/40 dark:hover:bg-[#081e32]/96 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-6 sm:py-6`;

const titleClass =
  "min-w-0 text-base font-semibold uppercase leading-snug tracking-[0.2em] text-foreground dark:text-white [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const metaClass =
  "text-xs font-normal text-muted dark:text-white/70 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const excerptClass =
  "mt-3 min-w-0 flex-1 text-sm font-normal leading-relaxed text-muted dark:text-white/82 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const tagClass =
  "rounded-full border border-primary/35 bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary dark:border-[#4d8fd4]/50 dark:bg-[#00349b]/40 dark:text-[#c5daf5]";

const readPostButtonClass =
  "inline-flex min-h-10 w-full items-center justify-center border border-[#00349b] bg-[#00349b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-[#002a7a] hover:bg-[#002a7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00349b]";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={`${cardShellGridClass} w-full min-h-[20rem] sm:min-h-[21rem]`}>
      <h3 className={titleClass}>
        <span className="line-clamp-3">{post.title}</span>
      </h3>

      <div className="mt-3 space-y-1">
        <p className={metaClass}>{post.author}</p>
        <p className={metaClass}>{post.date}</p>
      </div>

      {post.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={`${post.slug}-${tag}`} className={tagClass}>
              {tag.replace(/^#/, "")}
            </span>
          ))}
        </div>
      ) : null}

      <p className={excerptClass}>
        <span className="line-clamp-4">{post.excerpt}</span>
      </p>

      <div className="mt-auto pt-6">
        <Link
          href={`/blogs/${post.slug}`}
          className={readPostButtonClass}
        >
          <span>Read post</span>
          <span
            aria-hidden
            className="ml-2 translate-y-px text-sm font-normal normal-case tracking-normal"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
