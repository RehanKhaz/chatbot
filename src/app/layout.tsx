import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rehance Chatbot",
  description: "Created By Rehan Khan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  ${geistMono.variable}  antialiased`}
      >
        <header className="px-4 bg-black/90 py-2 w-full flex items-center justify-between">
          <div className="text-2xl max-sm:text-xl text-white uppercase font-semibold">
          🤖 Rehance Chatbot
          </div>
          <div className="flex items-center gap-4">
            <Image src={'/mypic.webp'} height={600} width={500} className="size-[3em] max-sm:size-[1.7em] overflow-hidden rounded-full object-center  pointer-events-none" alt="Rehan Khan Pic" />
          
          </div>
        </header>
        {children}
        <hr className="w-full text-white/50 h-[1.2px]" />
        <footer className="bg-black/90 text-white  flex flex-row items-center max-sm:flex-col justify-between px-4 py-2">
       <p className=" font-medium text-[1em] tracking-wide">
       © All Rights Reserved.
       </p>
       <p className="text-[1em] font-medium tracking-wide">
        Made by Rehan Khan with ❤.
       </p>

        </footer>
      </body>
    </html>
  );
}
