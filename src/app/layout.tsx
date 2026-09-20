import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Copyright Act 2023 - বাংলাদেশ কপিরাইট আইন",
  description: "বাংলাদেশের কপিরাইট আইন ২০২৩ এর সহজ বাংলা ব্যাখ্যা, ডিজিটাল কনটেন্ট, এআই, ও অন্যান্য কপিরাইট নিয়মকানুন জানুন।",
  metadataBase: new URL('https://copyright-act-bd.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Copyright Act 2023 Bangladesh',
    description: 'বাংলাদেশের কপিরাইট আইনের সহজ বাংলা ব্যাখ্যা',
    url: 'https://copyright-act-bd.example.com',
    siteName: 'Copyright Act BD',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
