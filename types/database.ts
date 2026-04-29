export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          cj_product_id: string;
          title: string;
          description: string | null;
          price: number;
          compare_price: number | null;
          cost_price: number | null;
          currency: string;
          images: Json;
          stock: number;
          niche: string | null;
          is_hero: boolean;
          is_active: boolean;
          cj_data: Json | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
