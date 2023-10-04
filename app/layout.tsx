import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "./globals.css";
import { cookies } from "next/headers";
import { UserSetter } from "./_components/login/UserSetter";
import { NavBar } from "./_navbar/Navbar";
import Script from "next/script";
import { JotaiProvider } from "./_jotai/JotaiProvider";

export const metadata = {
  title: "CSStore",
  description: "Find your CSS needs, all in one place",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <Script src="https://unpkg.com/prettier@3.0.3/standalone.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/postcss.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/html.js" />
      <body>
        <JotaiProvider>
          <main className="min-h-screen bg-background flex flex-col items-center text-text">
            <NavBar />
            <UserSetter user={user} />
            {children}
          </main>
        </JotaiProvider>
      </body>
    </html>
  );
}
