import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { blogPosts } from "@/lib/site-data";

export default function BlogsPage() {
  return (
    <SectionShell
      eyebrow="Blogs"
      title="Explore Blogs on AI Breakthroughs, Internships & Emerging Tech Trends"
      description="Welcome to FloLabs Innovations Group Blogs- your gateway to the world of AI innovation, hands-on internships, and cutting-edge tech trends. Whether you're a student, professional, or tech enthusiast, our blogs are here to inform, inspire, and power up your tech journey into the future of technology. Dive in and stay ahead!"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
            <div className="mt-2 space-y-1 text-xs text-muted">
              <p>{post.author}</p>
              <p>{post.date}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="rounded-full border border-border px-2 py-1 text-[11px] text-muted"
                >
                  {tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
            <Link
              href={`/blogs/${post.slug}`}
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
