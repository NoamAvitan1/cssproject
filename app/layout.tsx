import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "./globals.css";
import { cookies } from "next/headers";
import { UserSetter } from "./_components/login/UserSetter";
import { NavBar } from "./_navbar/Navbar";
import Script from "next/script";
import { JotaiProvider } from "./_jotai/JotaiProvider";
import { inspectify } from "../utils/inspectify"

export const metadata = {
  title: "CSStore",
  description: "Find your CSS, tailored just for you",
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

  // const data = await supabase.from("package").select(`
  // *,
  // module(*)`);
  // inspectify(data)

  return (
    <html lang="en">
      <Script src="https://unpkg.com/prettier@3.0.3/standalone.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/postcss.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/html.js" />
      <body>
        <JotaiProvider>
          <main className="flex min-h-screen flex-col items-center bg-background text-text">
            <NavBar />
            <UserSetter user={user} />
            {children}
          </main>
        </JotaiProvider>
      </body>
    </html>
  );
}
