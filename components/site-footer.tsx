import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FOOTER_BG = "#0B0B0B";
const FOOTER_MUTED = "#8A8A8A";
const footerLinkClass =
  "text-[15px] text-white underline underline-offset-2 transition-colors hover:text-[#2E6BE6]";

const columnHeadingClass =
  "text-[13px] font-bold uppercase tracking-[0.2em] text-white";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

function FooterAnchor({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        className={footerLinkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={footerLinkClass}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={footerLinkClass}>
      {label}
    </a>
  );
}

function FooterLinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {links.map((link) => (
        <li key={link.label}>
          <FooterAnchor {...link} />
        </li>
      ))}
    </ul>
  );
}

const navigationLinks: FooterLink[] = [
  { label: "Who we are", href: "/#home" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Get recruited", href: "/#recruited" },
  { label: "Explore projects", href: "/#projects" },
];

const companyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Careers",
    href: "https://hephaestus.international/internships",
    external: true,
  },
  { label: "Apply now", href: "/internships" },
  {
    label: "Merch",
    href: "https://flolabsrd.notion.site/merch-background",
    external: true,
  },
];

const checkMoreColumns: FooterLink[][] = [
  [
    { label: "CAIPO", href: "https://www.caipo.ai/", external: true },
    { label: "MoodChanger", href: "https://moodchanger.ai/", external: true },
    // TODO: set real href when RoboCollective URL is confirmed
    { label: "RoboCollective", href: "#" },
    {
      label: "Athletic Performance",
      href: "https://www.athleticperformanceintelligence.com/#cta",
      external: true,
    },
  ],
  [
    { label: "FloBrain", href: "https://flobrain.vercel.app/", external: true },
    { label: "FloTravel", href: "https://www.flomadtravel.com/", external: true },
    {
      label: "Space Ventures Institute",
      href: "https://www.spaceventuresinstitute.com/",
      external: true,
    },
    {
      label: "Connecting the dots",
      href: "https://www.youtube.com/playlist?list=PLwvFs7_Vcdwvn4eiECTY8tAB-M6cB5_B9",
      external: true,
    },
  ],
  [
    {
      label: "Hephaestus International",
      href: "https://hephaestus.international/",
      external: true,
    },
    { label: "FloStudio", href: "https://www.flostudios.ai/", external: true },
  ],
];

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="mt-auto w-full py-16 sm:py-20"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16 xl:gap-20">
          {/* Left: brand, newsletter, social */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/flolabs-logo.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(42%) sepia(79%) saturate(2476%) hue-rotate(205deg) brightness(97%) contrast(91%)",
                    }}
                  />
                  <span className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                    FloLabs International
                  </span>
                </Link>
              </div>
              <p className="mt-2 text-[13px]" style={{ color: FOOTER_MUTED }}>
                | a FloLabs project
              </p>
            </div>

            <div>
              <p className={columnHeadingClass}>Newsletter</p>
              <p className="mt-3 text-[13px]" style={{ color: FOOTER_MUTED }}>
                Receive the newest FloLabs International updates at:
              </p>
              <form
                className="mt-4 flex w-full max-w-[340px] items-center bg-[#D1D1D1] p-1"
                action="#"
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email..."
                  className="min-h-10 flex-1 bg-transparent px-4 text-[15px] text-gray-800 outline-none placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-black text-white transition-colors hover:bg-[#2E6BE6]"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </button>
              </form>
            </div>

            <div>
              <p className={columnHeadingClass}>Social media</p>
              <div className="mt-4">
                <a
                  href="https://www.youtube.com/@FloLabsInnovation"
                  className="inline-flex text-white transition-colors hover:text-[#2E6BE6]"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FloLabs on YouTube"
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Right: navigation grids */}
          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              <div>
                <p className={columnHeadingClass}>Navigation</p>
                <div className="mt-4">
                  <FooterLinkList links={navigationLinks} />
                </div>
              </div>
              <div>
                <p className={columnHeadingClass}>Company</p>
                <div className="mt-4">
                  <FooterLinkList links={companyLinks} />
                </div>
              </div>
            </div>

            <div>
              <p className={columnHeadingClass}>Check more</p>
              <div className="mt-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                {checkMoreColumns.map((column, columnIndex) => (
                  <FooterLinkList
                    key={columnIndex}
                    links={column}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-14 border-t pt-8 sm:mt-16"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <p
            className="text-center text-[13px] tracking-[0.15em]"
            style={{ color: FOOTER_MUTED }}
          >
            Live long and prosper.
          </p>
        </div>
      </div>
    </footer>
  );
}
