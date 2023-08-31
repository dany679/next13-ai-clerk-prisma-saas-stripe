import ProviderCrisp from "@/components/providers/crisp-provider";
import ProviderModal from "@/components/providers/modal-provider";
import ProviderToaster from "@/components/providers/tost-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genius",
  description: "Ai generate prompts",
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* <html lang="en" className='min-h-full'>
      <body className={inter.className}>{children}</body>
    </html> */}

      <html lang="en" className="h-full ">
        <body className={cn("h-full", inter)}>
          <ProviderModal />
          <ProviderToaster />
          <ProviderCrisp />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
