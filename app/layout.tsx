import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // https://mui.com/material-ui/integrations/nextjs/

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Wallet",
  description: "test task",
};

// https://mui.com/material-ui/getting-started/usage/#responsive-meta-tag
// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <CssBaseline />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
