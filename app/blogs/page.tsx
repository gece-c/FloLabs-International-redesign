import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

const blogPosts = [
  {
    slug: "future-of-ai-robotics",
    title: "The Future of AI and Robotics Learning",
    excerpt:
      "How experiential programs can close the gap between classroom theory and industry outcomes.",
  },
  {
    slug: "collaborative-methodology",
    title: "Why Collaborative Learning Works",
    excerpt:
      "A practical look at recorded meetings, brainwriting, and AI-assisted teamwork.",
  },
];

export default function BlogsPage() {
  return (
    <SectionShell
      eyebrow="Blogs"
      title="Latest Insights"
      description="Learn about the latest trends in technology, AI, robotics, and education."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
            <Link
              href="#"
              className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
            >
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
