'use client'

import { Module } from "@/app/_module/Module";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Modules = Database['public']['Tables']['module']['Row'];
type Props = {

};

export const page = (props: Props) => {
  
  return (
    <div>
        
    </div>
  );
};
