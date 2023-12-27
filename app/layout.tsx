import "./globals.css";
import "./css/VFX.css";
import "./css/loader.css";
import "./css/backgrounds.css";
import { cookies } from "next/headers";
import { NavBar } from "./_navbar/Navbar";
import Script from "next/script";
import { JotaiProvider } from "./_jotai/JotaiProvider";
import { SideBarMenu } from "./_components/sideBar/SideBarMenu";
import { Teller } from "./_components/teller/Teller";
import { UserSetter } from "./_components/login/UserSetter";
import Footer from "./_components/footer/Footer";
import ServerClient from "@/supabase/ServerClient";

export const metadata = {
  title: "CSStore",
  description: "Find your CSS, tailored just for you",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    data: { user },
  } = await ServerClient().auth.getUser();

  return (
    <html lang="en">
      <Script src="https://unpkg.com/prettier@3.0.3/standalone.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/postcss.js" />
      <Script src="https://unpkg.com/prettier@3.0.3/plugins/html.js" />
      <body>
        <Teller />
        <JotaiProvider>
          <div className="flex flex-col gap-10 bg-background">
            <main className="flex min-h-screen flex-col items-center overflow-y-auto text-text">
              <NavBar />
              <UserSetter user={user} />
              <div className="2xl:10/12 flex w-full grow lg:w-11/12">
                <div className="hidden xs:block">
                  <SideBarMenu />
                </div>
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
}
