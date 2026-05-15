import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleContent } from "@/components/blog-article-content";
import { HomeScene } from "@/components/home-scene";
import {
  ProjectDetailExitLink,
  ProjectPanel,
  projectVisitSiteButtonClass,
} from "@/components/project-panel";
import { blogPosts } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

const tagClass =
  "rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-base font-medium text-primary dark:border-[#4d8fd4]/50 dark:bg-[#00349b]/40 dark:text-[#c5daf5]";

const blogMetaClass = "text-lg sm:text-xl";

const relatedLinkClass = `group block border border-border/80 bg-card/40 p-4 transition-[border-color,background-color] duration-200 hover:border-primary/40 hover:bg-card/60 dark:border-white/22 dark:bg-white/5 dark:hover:border-white/40 dark:hover:bg-white/10`;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <HomeScene
      id={`blog-${post.slug}`}
      background="gradient"
      boldHeadline
      headline={post.title}
      description={
        <div className="space-y-3">
          <p className={blogMetaClass}>{post.author}</p>
          <p className={blogMetaClass}>{post.date}</p>
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span key={`${post.slug}-${tag}`} className={tagClass}>
                  {tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      }
      centerContent
      centerIntroMaxWidthClass="max-w-5xl"
      headerAside={<ProjectDetailExitLink href="/blogs" label="Back to blogs" />}
    >
      <div className="flex w-full max-w-5xl flex-col gap-4 text-left md:gap-5">
        <BlogArticleContent post={post} />

        {post.relatedArticles.length > 0 ? (
          <ProjectPanel title="Related Articles" className="[&_h2]:text-xl">
            <div className="space-y-4">
              {post.relatedArticles.map((article) => {
                const relatedPost = blogPosts.find((item) => item.slug === article.slug);
                return (
                  <Link
                    key={article.slug}
                    href={`/blogs/${article.slug}`}
                    className={relatedLinkClass}
                  >
                    <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-white/90">
                      {article.title}
                    </h3>
                    {relatedPost ? (
                      <p className="mt-2 text-lg leading-relaxed">{relatedPost.excerpt}</p>
                    ) : null}
                    <p className="mt-2 text-base opacity-80">{article.date}</p>
                  </Link>
                );
              })}
            </div>
          </ProjectPanel>
        ) : null}

        {post.ctaTitle && post.ctaText && post.ctaLabel && post.ctaHref ? (
          <>
            <ProjectPanel title={post.ctaTitle} className="[&_h2]:text-xl">
              <p className="text-lg leading-relaxed">{post.ctaText}</p>
            </ProjectPanel>
            <div className="pt-1">
              <Link href={post.ctaHref} className={projectVisitSiteButtonClass}>
                <span>{post.ctaLabel}</span>
                <span
                  aria-hidden
                  className="ml-2.5 translate-y-px text-base font-normal normal-case tracking-normal"
                >
                  →
                </span>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </HomeScene>
  );
}
