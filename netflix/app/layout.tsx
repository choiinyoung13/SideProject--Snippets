import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "./_config/ReactQueryClientProvider";
import { ThemeProvider } from "./_config/material-tailwind-theme-provider";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import RecoilProvider from "./_config/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <RecoilProvider>
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
            <body className={inter.className}>
              <Header />
              {children}
              <Footer />
            </body>
          </html>
        </ThemeProvider>
      </RecoilProvider>
    </ReactQueryClientProvider>
  );
}
