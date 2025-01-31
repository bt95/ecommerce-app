import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start font-[family-name:var(--font-geist-mono)]">
        Welcome to the{" "}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={90}
          height={19}
          priority
        />{" "}
        E-Commerce Store demo!
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] hover:bg-[#f2f2f2] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/store"
            rel="noopener noreferrer"
          >
            Access the Store
          </a>

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="http://localhost:3001/store-dashboard"
            rel="noopener noreferrer"
          >
            Access the Store Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
