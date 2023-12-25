"use client";
import { CodeBlock } from "@/types/CodeBlock";
import { useEffect, useState } from "react";
import { dummyCss, dummyHtml } from "./dummyFiles";
import { HTMLView } from "./HTMLView";
import { EditorsView } from "./EditorsView";
import { HTMLDebugger } from "../../../utils/HTMLDebugger";
import { ModuleSettings as Settings } from "./ModuleSettings";
import { ModuleSettings } from "@/types/Modules";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useAtom } from "jotai";
import { userAtom } from "@/app/_jotai/userAtoms";

type Props = {};

export const NewLayout = (props: Props) => {
  
  const params = useSearchParams();
  const router = useRouter()

  const [user] = useAtom(userAtom);
  const [isXl, setIsXl] = useState<boolean>(false);
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [codeBlocks, setCodeBlocks] = useState<Array<CodeBlock>>(
    params.has("edit")
      ? [new CodeBlock("", "css"), new CodeBlock("", "html")]
      : [new CodeBlock(dummyCss, "css"), new CodeBlock(dummyHtml, "html")],
  );
  const [moduleSettings, setModuleSettings] = useState<ModuleSettings | null>();

  type Module = Database["public"]["Tables"]["module"]["Row"];

  useEffect(() => {
    HTMLDebugger(".debug", 4);
    setIsXl(window.innerWidth >= 1280);
    window.addEventListener("resize", () => {
      setIsXl(window.innerWidth >= 1280);
    });

    return () => {
      window.addEventListener("resize", () => {
        setIsXl(window.innerWidth >= 1280);
      });
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1280 && selectedBlock > codeBlocks.length - 1) {
      setSelectedBlock((prev) => prev - 1);
    }
  }, [isXl]);

  useEffect(() => {
    if (!params.has("edit") || !params.get("edit")) return;
    const supabase = createClientComponentClient();
    const id = params.get("edit");
    const getModule = async (id: string) => {
      const { data : moduleData } = (await supabase
        .from("module")
        .select("*")
        .eq("id", id)
        .eq("user_id", user?.id)) as unknown as any;
        const module = moduleData[0];
      if (!module || String(module.user_id) !== String(user?.id)) {
        router.push('/')
        return;
      }
      setModuleSettings({
        title: module.title,
        access_type: module.access_type,
        price: module.price,
        description: module.description,
      });
    };
    if(id) getModule(id);
  }, [params]);

  return (
    <div className="flex h-[95vh] w-full border-t-4 border-secondary bg-background">
      <article className="h-full grow">
        <div className="flex h-[70%] border-x-4 border-secondary gap-1 overflow-auto border-b-4 border-b-secondary bg-secondary">
          <EditorsView
            lang={isXl || selectedBlock == 0 ? "css" : "html"}
            codeBlocks={isXl ? [codeBlocks[0]] : codeBlocks}
            setCodeBlocks={setCodeBlocks}
            selectedBlock={isXl ? 0 : selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
          {isXl && (
            <EditorsView
              lang="html"
              codeBlocks={isXl ? [...codeBlocks].slice(1) : codeBlocks}
              setCodeBlocks={setCodeBlocks}
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
          )}
          <Settings
            isOpen={true}
            codeBlocs={codeBlocks}
            settings={moduleSettings ? moduleSettings : undefined}
          />
        </div>
        <div className="relative flex flex-col">
          <HTMLView
            html={
              codeBlocks[selectedBlock + (isXl || selectedBlock == 0 ? 1 : 0)]
                .code
            }
            css={codeBlocks[0].code}
          />
        </div>
      </article>
    </div>
  );
};
