import Link from "next/link";

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
      className="inline-flex min-h-11 items-center border border-white/90 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:bg-white hover:text-black"
    >
      <span>{label}</span>
      <span aria-hidden className="ml-2 translate-y-px text-sm font-normal">
        →
      </span>
    </Link>
  );
}
