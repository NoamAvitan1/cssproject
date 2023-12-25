export type ModuleType = "public" | "paid" | "private";

export type SearchModule = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  price: number;
  user_id: {
    id: string;
    user_name: string;
  };
};

export type ModulesType = {
  examples_count:number;
  access_type: "public" | "private" | "paid";
  created_at: string;
  description: string;
  downloads: number;
  id: string;
  price: number;
  title: string;
  title_description: string | null;
  user_id: {
    id: string;
    user_name: string;
  };
};

export type ModuleSettings = {
  title: string;
  access_type: "public" | "private" | "paid";
  price: number;
  description: string;
};
