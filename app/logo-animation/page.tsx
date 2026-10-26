import type { Metadata } from "next";
import LogoVideo from "@/components/LogoVideo";

// Source for the square social video. Not linked from the site and not indexed.
export const metadata: Metadata = { title: "Logo animation", robots: { index: false, follow: false } };

export default function Page() {
  return <LogoVideo />;
}
