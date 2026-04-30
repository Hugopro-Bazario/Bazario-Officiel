export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          reference: string;
          stripe_session_id: string | null;
          stripe_payment_intent_id: string | null;
          customer_email: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          shipping_address: Json | null;
          items: Json | null;
          subtotal: number | null;
          shipping_cost: number | null;
          tax: number | null;
          total: number | null;
          currency: string;
          status: string;
          cj_order_id: string | null;
          cj_tracking_number: string | null;
          cj_fulfillment_attempts: number | null;
          cj_last_error: string | null;
          tracking_event_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
      };
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
