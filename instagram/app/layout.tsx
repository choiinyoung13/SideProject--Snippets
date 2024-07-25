import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "./_config/ReactQueryClientProvider";
import { ThemeProvider } from "./_config/material-tailwind-theme-provider";
import MainLayout from "./_components/layouts/MainLayout";
import Auth from "./_components/auth/Index";
import { createServerSupabaseClient } from "./_util/supabase/server";
import AuthProvider from "./_config/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <ReactQueryClientProvider>
      <ThemeProvider>
        {/* @ts-ignore */}
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
              integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </head>
          <AuthProvider accessToken={session?.access_token}>
            <body className={inter.className}>
              {session?.user ? <MainLayout>{children}</MainLayout> : <Auth />}
            </body>
          </AuthProvider>
        </html>
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}
