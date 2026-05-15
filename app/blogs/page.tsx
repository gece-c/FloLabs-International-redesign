import { BlogCard } from "@/components/blog-card";
import { HomeScene } from "@/components/home-scene";
import { ScrollReveal } from "@/components/scroll-reveal";
import { blogPosts } from "@/lib/site-data";

export default function BlogsPage() {
  return (
    <HomeScene
      id="blogs"
      background="gradient"
      boldHeadline
      headline="Blogs"
      description="Explore AI breakthroughs, internships, and emerging tech trends — written for students, professionals, and curious minds ready to stay ahead."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {blogPosts.map((post) => (
          <ScrollReveal
            key={post.slug}
            className="h-full"
            duration={300}
            translateY={6}
            threshold={0.01}
            rootMargin="0px 0px 10% 0px"
          >
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </HomeScene>
  );
}
