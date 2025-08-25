// components/ui/SocialButton.tsx
"use client";
import { Theme } from "@/data";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiFiverr, SiUpwork } from "react-icons/si"; // add these icons

interface SocialButtonProps {
  theme: string; // flexible, will normalize
  title: string;
  href: string;
  className?: string;
}

const themeConfig: Record<
  Theme,
  { colors: string; shadow: string; hoverShadow: string; icon: JSX.Element }
> = {
  github: {
    colors: "from-gray-800 to-gray-900",
    shadow: "shadow-[0_6px_0_#111]",
    hoverShadow: "hover:shadow-[0_3px_0_#000]",
    icon: <FaGithub size={20} />,
  },
  facebook: {
    colors: "from-blue-600 to-blue-800",
    shadow: "shadow-[0_6px_0_#1e3a8a]",
    hoverShadow: "hover:shadow-[0_3px_0_#1e40af]",
    icon: <FaFacebook size={20} />,
  },
  instagram: {
    colors: "from-pink-500 via-red-500 to-yellow-500",
    shadow: "shadow-[0_6px_0_#b91c1c]",
    hoverShadow: "hover:shadow-[0_3px_0_#dc2626]",
    icon: <FaInstagram size={20} />,
  },
  linkedin: {
    colors: "from-blue-500 to-blue-700",
    shadow: "shadow-[0_6px_0_#1d4ed8]",
    hoverShadow: "hover:shadow-[0_3px_0_#2563eb]",
    icon: <FaLinkedin size={20} />,
  },
  fiverr: {
    colors: "from-green-500 to-green-700",
    shadow: "shadow-[0_6px_0_#166534]",
    hoverShadow: "hover:shadow-[0_3px_0_#15803d]",
    icon: <SiFiverr size={20} />,
  },
  upwork: {
    colors: "from-emerald-500 to-emerald-700",
    shadow: "shadow-[0_6px_0_#065f46]",
    hoverShadow: "hover:shadow-[0_3px_0_#047857]",
    icon: <SiUpwork size={20} />,
  },
};

export default function SocialButton({
  theme,
  title,
  href,
  className = "",
}: SocialButtonProps) {
  const normalized = theme.toLowerCase() as Theme;
  const config = themeConfig[normalized] || themeConfig.github;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-5 py-3 rounded-lg
        bg-gradient-to-br ${config.colors} text-white font-medium
        transform transition-all duration-200 ease-out
        ${config.shadow} ${config.hoverShadow}
        hover:-translate-y-1 active:translate-y-1
        ${className}
      `}
    >
      <span className="transition-transform duration-300 group-hover:rotate-y-12">
        {config.icon}
      </span>
      <span>{title}</span>
    </a>
  );
}
