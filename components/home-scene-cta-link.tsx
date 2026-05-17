import Link from "next/link";
import { projectDetailLinkClass } from "@/components/project-panel";

export function HomeSceneCtaLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`${projectDetailLinkClass} min-h-11 px-6 py-2.5`}
    >
      <span>{label}</span>
      <span aria-hidden className="ml-2 translate-y-px text-sm font-normal">
        →
      </span>
    </Link>
  );
}
