import madelineGif from "../../assets/celeste-madeline.gif";
import { siReact, siTailwindcss, siCloudflare, siVite } from "simple-icons";
import Badge from "../ui/Badge";
import TextLink from "../ui/TextLink";

const BADGES = [
  {
    top: "Made with",
    bottom: "React",
    href: "https://react.dev",
    icon: siReact,
    tint: "bg-rose-soft",
  },
  {
    top: "Styled with",
    bottom: "Tailwind",
    href: "https://tailwindcss.com",
    icon: siTailwindcss,
    tint: "bg-blue-soft",
  },
  {
    top: "Powered by",
    bottom: "Cloudflare",
    href: "https://www.cloudflare.com",
    icon: siCloudflare,
    tint: "bg-violet-soft",
  },
  {
    top: "Built with",
    bottom: "Vite",
    href: "https://vitejs.dev",
    icon: siVite,
    tint: "bg-orchid-soft",
  },
];

const FOOTER_NOTE = {
  home: "bapanada",
  about: "whoami",
  now: "hey now",
  creations: "WIP",
  credits: "looks inside",
};

function Footer({ active, onNavigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 py-4 md:px-6">
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <img
            src={madelineGif}
            alt="Madeline from Celeste, walking"
            width="136"
            height="144"
            decoding="async"
            className="h-14 w-auto shrink-0 [image-rendering:pixelated]"
          />
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-600">{FOOTER_NOTE[active] ?? ""}</p>
            <p className="text-xs text-gray-600">
              © {year} Noah Park-Nguyen ·{" "}
              <TextLink accent="label" onClick={() => onNavigate("credits")}>
                Credits
              </TextLink>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {BADGES.map((b) => (
            <Badge key={b.bottom} {...b} />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
