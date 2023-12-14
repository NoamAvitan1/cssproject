export type ModuleType = "public" | "paid" | "private"

export type SearchModule = {
    id: string;
    title: string;
    description: string;
    created_at: string;
    price: number;
    user_id: {
      id: string;
      user_name: string;
    }
  }