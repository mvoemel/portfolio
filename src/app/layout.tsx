import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Michael Voemel | Portfolio",
  description:
    "Explore my collection of projects, showcasing my skills and experience. Discover how my expertise and creative solutions can bring value to your next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
