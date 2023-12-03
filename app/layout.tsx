import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import "./globals.css";
import "./css/VFX.css";
import { cookies } from "next/headers";
import { NavBar } from "./_navbar/Navbar";
import Script from "next/script";
import { JotaiProvider } from "./_jotai/JotaiProvider";
import { SideBarMenu } from "./_components/sideBar/SideBarMenu";
import { Teller } from "./_components/teller/Teller";
import { UserSetter } from "./_components/login/UserSetter";

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

  return (
    <html lang="en">
      <Script src="https://unpkg.com/prettier@3.0.3/standalone.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/postcss.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/html.js" />
      <body>
        <Teller />
        <JotaiProvider>
          <main className="flex min-h-screen flex-col items-center bg-background text-text">
            <NavBar />
            <UserSetter user={user} />
            <div className="w-full flex lg:w-11/12 2xl:10/12 grow gap-2">
              <div className="hidden xs:block">
                <SideBarMenu />
              </div>
              {children}
            </div>
          </main>
        </JotaiProvider>
      </body>
    </html>
  );
}
