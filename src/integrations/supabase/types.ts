export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          event_name: string
          event_data: Json | null
          page_path: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          event_name: string
          event_data?: Json | null
          page_path?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          event_name?: string
          event_data?: Json | null
          page_path?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          service_id: string | null
          project_id: string | null
          title: string
          description: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          type: string | null
          start_at: string
          end_at: string
          location: string | null
          meeting_url: string | null
          notes: string | null
          reminder_sent: boolean | null
          cancelled_at: string | null
          cancel_reason: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          service_id?: string | null
          project_id?: string | null
          title: string
          description?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: string | null
          start_at: string
          end_at: string
          location?: string | null
          meeting_url?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          cancelled_at?: string | null
          cancel_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          service_id?: string | null
          project_id?: string | null
          title?: string
          description?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: string | null
          start_at?: string
          end_at?: string
          location?: string | null
          meeting_url?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          cancelled_at?: string | null
          cancel_reason?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      availability_exceptions: {
        Row: {
          id: string
          user_id: string
          date: string
          start_time: string | null
          end_time: string | null
          is_available: boolean | null
          reason: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          start_time?: string | null
          end_time?: string | null
          is_available?: boolean | null
          reason?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          start_time?: string | null
          end_time?: string | null
          is_available?: boolean | null
          reason?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      availability_rules: {
        Row: {
          id: string
          user_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number | null
          is_active: boolean | null
          meta_title: string | null
          meta_description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string | null
          parent_id: string | null
          author_name: string | null
          author_email: string | null
          body: string
          status: Database["public"]["Enums"]["moderation_status"] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          user_id?: string | null
          parent_id?: string | null
          author_name?: string | null
          author_email?: string | null
          body: string
          status?: Database["public"]["Enums"]["moderation_status"] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string | null
          parent_id?: string | null
          author_name?: string | null
          author_email?: string | null
          body?: string
          status?: Database["public"]["Enums"]["moderation_status"] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          id: string
          post_id: string
          tag_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          post_id: string
          tag_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          post_id?: string
          tag_id?: string
          created_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: Json | null
          featured_image: string | null
          author_id: string | null
          category_id: string | null
          status: Database["public"]["Enums"]["blog_status"] | null
          is_featured: boolean | null
          reading_time: number | null
          view_count: number | null
          meta_title: string | null
          meta_description: string | null
          og_image: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: Json | null
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: Database["public"]["Enums"]["blog_status"] | null
          is_featured?: boolean | null
          reading_time?: number | null
          view_count?: number | null
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: Json | null
          featured_image?: string | null
          author_id?: string | null
          category_id?: string | null
          status?: Database["public"]["Enums"]["blog_status"] | null
          is_featured?: boolean | null
          reading_time?: number | null
          view_count?: number | null
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          parent_id: string | null
          name: string
          slug: string
          description: string | null
          image_url: string | null
          icon: string | null
          sort_order: number | null
          is_active: boolean | null
          is_featured: boolean | null
          meta_title: string | null
          meta_description: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          parent_id?: string | null
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          parent_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          icon?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          sort_order: number | null
          meta_title: string | null
          meta_description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          id: string
          code: string
          description: string | null
          discount_type: Database["public"]["Enums"]["discount_type"]
          discount_value: number
          minimum_order_cents: number | null
          maximum_discount_cents: number | null
          usage_limit: number | null
          used_count: number | null
          per_user_limit: number | null
          starts_at: string | null
          expires_at: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          code: string
          description?: string | null
          discount_type: Database["public"]["Enums"]["discount_type"]
          discount_value: number
          minimum_order_cents?: number | null
          maximum_discount_cents?: number | null
          usage_limit?: number | null
          used_count?: number | null
          per_user_limit?: number | null
          starts_at?: string | null
          expires_at?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          description?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"]
          discount_value?: number
          minimum_order_cents?: number | null
          maximum_discount_cents?: number | null
          usage_limit?: number | null
          used_count?: number | null
          per_user_limit?: number | null
          starts_at?: string | null
          expires_at?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_addresses: {
        Row: {
          id: string
          user_id: string
          label: string | null
          first_name: string
          last_name: string
          company: string | null
          address_line1: string
          address_line2: string | null
          city: string
          postal_code: string
          country_code: string
          phone: string | null
          is_default: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          label?: string | null
          first_name: string
          last_name: string
          company?: string | null
          address_line1: string
          address_line2?: string | null
          city: string
          postal_code: string
          country_code?: string
          phone?: string | null
          is_default?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          label?: string | null
          first_name?: string
          last_name?: string
          company?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          postal_code?: string
          country_code?: string
          phone?: string | null
          is_default?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      customer_profiles: {
        Row: {
          id: string
          loyalty_points: number | null
          total_spent_cents: number | null
          order_count: number | null
          average_order_cents: number | null
          first_order_at: string | null
          last_order_at: string | null
          tags: string[] | null
          notes: string | null
          referred_by: string | null
          referral_code: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          loyalty_points?: number | null
          total_spent_cents?: number | null
          order_count?: number | null
          average_order_cents?: number | null
          first_order_at?: string | null
          last_order_at?: string | null
          tags?: string[] | null
          notes?: string | null
          referred_by?: string | null
          referral_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          loyalty_points?: number | null
          total_spent_cents?: number | null
          order_count?: number | null
          average_order_cents?: number | null
          first_order_at?: string | null
          last_order_at?: string | null
          tags?: string[] | null
          notes?: string | null
          referred_by?: string | null
          referral_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          id: string
          name: string
          subject: string
          html_body: string
          text_body: string | null
          variables: Json | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          subject: string
          html_body: string
          text_body?: string | null
          variables?: Json | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          html_body?: string
          text_body?: string | null
          variables?: Json | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory: {
        Row: {
          id: string
          product_id: string
          variant_id: string | null
          quantity: number
          reserved: number
          available: number | null
          low_stock_threshold: number | null
          reorder_point: number | null
          reorder_quantity: number | null
          location: string | null
          last_counted_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          variant_id?: string | null
          quantity?: number
          reserved?: number
          available?: number | null
          low_stock_threshold?: number | null
          reorder_point?: number | null
          reorder_quantity?: number | null
          location?: string | null
          last_counted_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          variant_id?: string | null
          quantity?: number
          reserved?: number
          available?: number | null
          low_stock_threshold?: number | null
          reorder_point?: number | null
          reorder_quantity?: number | null
          location?: string | null
          last_counted_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          id: string
          inventory_id: string
          type: Database["public"]["Enums"]["movement_type"]
          quantity: number
          reference: string | null
          note: string | null
          created_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          inventory_id: string
          type: Database["public"]["Enums"]["movement_type"]
          quantity: number
          reference?: string | null
          note?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          inventory_id?: string
          type?: Database["public"]["Enums"]["movement_type"]
          quantity?: number
          reference?: string | null
          note?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          id: string
          user_id: string | null
          file_name: string
          file_type: string
          file_size: number
          url: string
          alt: string | null
          caption: string | null
          folder: string | null
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          file_name: string
          file_type: string
          file_size: number
          url: string
          alt?: string | null
          caption?: string | null
          folder?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          file_name?: string
          file_type?: string
          file_size?: number
          url?: string
          alt?: string | null
          caption?: string | null
          folder?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          id: string
          menu_id: string
          parent_id: string | null
          label: string
          url: string | null
          page_id: string | null
          product_id: string | null
          category_id: string | null
          icon: string | null
          target: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          menu_id: string
          parent_id?: string | null
          label: string
          url?: string | null
          page_id?: string | null
          product_id?: string | null
          category_id?: string | null
          icon?: string | null
          target?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          menu_id?: string
          parent_id?: string | null
          label?: string
          url?: string | null
          page_id?: string | null
          product_id?: string | null
          category_id?: string | null
          icon?: string | null
          target?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      menus: {
        Row: {
          id: string
          name: string
          slug: string
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          id: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          email_enabled: boolean | null
          push_enabled: boolean | null
          in_app_enabled: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          email_enabled?: boolean | null
          push_enabled?: boolean | null
          in_app_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          email_enabled?: boolean | null
          push_enabled?: boolean | null
          in_app_enabled?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          body: string | null
          data: Json | null
          channel: string | null
          read_at: string | null
          sent_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: Database["public"]["Enums"]["notification_type"]
          title: string
          body?: string | null
          data?: Json | null
          channel?: string | null
          read_at?: string | null
          sent_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
          title?: string
          body?: string | null
          data?: Json | null
          channel?: string | null
          read_at?: string | null
          sent_at?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      order_coupons: {
        Row: {
          id: string
          order_id: string
          coupon_id: string
          discount_cents: number
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          coupon_id: string
          discount_cents: number
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          coupon_id?: string
          discount_cents?: number
          created_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          variant_id: string | null
          name: string
          sku: string | null
          quantity: number
          unit_price_cents: number
          discount_cents: number | null
          tax_cents: number | null
          total_cents: number
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          variant_id?: string | null
          name: string
          sku?: string | null
          quantity?: number
          unit_price_cents: number
          discount_cents?: number | null
          tax_cents?: number | null
          total_cents: number
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          variant_id?: string | null
          name?: string
          sku?: string | null
          quantity?: number
          unit_price_cents?: number
          discount_cents?: number | null
          tax_cents?: number | null
          total_cents?: number
          metadata?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      order_status_history: {
        Row: {
          id: string
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
          note: string | null
          changed_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
          note?: string | null
          changed_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          note?: string | null
          changed_by?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          currency: string | null
          subtotal_cents: number
          discount_cents: number | null
          shipping_cents: number | null
          tax_cents: number | null
          total_cents: number
          notes: string | null
          internal_notes: string | null
          shipping_address: Json | null
          billing_address: Json | null
          payment_method: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          payment_reference: string | null
          paid_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          cancelled_at: string | null
          cancel_reason: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          currency?: string | null
          subtotal_cents?: number
          discount_cents?: number | null
          shipping_cents?: number | null
          tax_cents?: number | null
          total_cents?: number
          notes?: string | null
          internal_notes?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_reference?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          cancel_reason?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          currency?: string | null
          subtotal_cents?: number
          discount_cents?: number | null
          shipping_cents?: number | null
          tax_cents?: number | null
          total_cents?: number
          notes?: string | null
          internal_notes?: string | null
          shipping_address?: Json | null
          billing_address?: Json | null
          payment_method?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_reference?: string | null
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
          cancel_reason?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          id: string
          page_id: string
          type: string
          title: string | null
          content: Json | null
          image_url: string | null
          sort_order: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          page_id: string
          type: string
          title?: string | null
          content?: Json | null
          image_url?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          page_id?: string
          type?: string
          title?: string | null
          content?: Json | null
          image_url?: string | null
          sort_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          user_id: string | null
          session_id: string
          page_path: string
          page_title: string | null
          referrer: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          device_type: string | null
          browser: string | null
          os: string | null
          country: string | null
          city: string | null
          duration_ms: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id: string
          page_path: string
          page_title?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          city?: string | null
          duration_ms?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string
          page_path?: string
          page_title?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          city?: string | null
          duration_ms?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: Json | null
          excerpt: string | null
          template: string | null
          status: Database["public"]["Enums"]["page_status"] | null
          featured_image: string | null
          meta_title: string | null
          meta_description: string | null
          og_image: string | null
          sort_order: number | null
          published_at: string | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: Json | null
          excerpt?: string | null
          template?: string | null
          status?: Database["public"]["Enums"]["page_status"] | null
          featured_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          sort_order?: number | null
          published_at?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: Json | null
          excerpt?: string | null
          template?: string | null
          status?: Database["public"]["Enums"]["page_status"] | null
          featured_image?: string | null
          meta_title?: string | null
          meta_description?: string | null
          og_image?: string | null
          sort_order?: number | null
          published_at?: string | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          id: string
          name: string
          resource: string
          action: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          resource: string
          action: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          resource?: string
          action?: string
          description?: string | null
        }
        Relationships: []
      }
      product_attributes: {
        Row: {
          id: string
          product_id: string
          key: string
          value: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          product_id: string
          key: string
          value: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          product_id?: string
          key?: string
          value?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      product_collections: {
        Row: {
          id: string
          product_id: string
          collection_id: string
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          collection_id: string
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          collection_id?: string
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          alt: string | null
          sort_order: number | null
          is_primary: boolean | null
          width: number | null
          height: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          alt?: string | null
          sort_order?: number | null
          is_primary?: boolean | null
          width?: number | null
          height?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          alt?: string | null
          sort_order?: number | null
          is_primary?: boolean | null
          width?: number | null
          height?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      product_suppliers: {
        Row: {
          id: string
          product_id: string
          supplier_id: string
          cost_cents: number | null
          lead_days: number | null
          is_primary: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          supplier_id: string
          cost_cents?: number | null
          lead_days?: number | null
          is_primary?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          supplier_id?: string
          cost_cents?: number | null
          lead_days?: number | null
          is_primary?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price_cents: number
          compare_at_cents: number | null
          cost_cents: number | null
          attributes: Json | null
          stock_quantity: number | null
          weight_grams: number | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price_cents: number
          compare_at_cents?: number | null
          cost_cents?: number | null
          attributes?: Json | null
          stock_quantity?: number | null
          weight_grams?: number | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price_cents?: number
          compare_at_cents?: number | null
          cost_cents?: number | null
          attributes?: Json | null
          stock_quantity?: number | null
          weight_grams?: number | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      product_views: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          session_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          user_id?: string | null
          session_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string | null
          session_id?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          sku: string | null
          short_description: string | null
          description: string | null
          price_cents: number
          compare_at_cents: number | null
          currency: string | null
          cost_cents: number | null
          materials: Json | null
          dimensions: string | null
          weight_grams: number | null
          color: string | null
          finish: string | null
          care_instructions: string | null
          warranty_info: string | null
          status: Database["public"]["Enums"]["product_status"] | null
          is_featured: boolean | null
          is_new: boolean | null
          is_digital: boolean | null
          requires_shipping: boolean | null
          tax_rate: number | null
          rating_avg: number | null
          rating_count: number | null
          meta_title: string | null
          meta_description: string | null
          slug_id: string | null
          sort_order: number | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          sku?: string | null
          short_description?: string | null
          description?: string | null
          price_cents?: number
          compare_at_cents?: number | null
          currency?: string | null
          cost_cents?: number | null
          materials?: Json | null
          dimensions?: string | null
          weight_grams?: number | null
          color?: string | null
          finish?: string | null
          care_instructions?: string | null
          warranty_info?: string | null
          status?: Database["public"]["Enums"]["product_status"] | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_digital?: boolean | null
          requires_shipping?: boolean | null
          tax_rate?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          meta_title?: string | null
          meta_description?: string | null
          slug_id?: string | null
          sort_order?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          sku?: string | null
          short_description?: string | null
          description?: string | null
          price_cents?: number
          compare_at_cents?: number | null
          currency?: string | null
          cost_cents?: number | null
          materials?: Json | null
          dimensions?: string | null
          weight_grams?: number | null
          color?: string | null
          finish?: string | null
          care_instructions?: string | null
          warranty_info?: string | null
          status?: Database["public"]["Enums"]["product_status"] | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_digital?: boolean | null
          requires_shipping?: boolean | null
          tax_rate?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          meta_title?: string | null
          meta_description?: string | null
          slug_id?: string | null
          sort_order?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          locale: string | null
          timezone: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          email_verified: boolean | null
          phone_verified: boolean | null
          last_login_at: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          locale?: string | null
          timezone?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          email_verified?: boolean | null
          phone_verified?: boolean | null
          last_login_at?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          locale?: string | null
          timezone?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          email_verified?: boolean | null
          phone_verified?: boolean | null
          last_login_at?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      project_files: {
        Row: {
          id: string
          project_id: string
          name: string
          url: string
          type: string
          size_bytes: number | null
          uploaded_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          url: string
          type: string
          size_bytes?: number | null
          uploaded_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          url?: string
          type?: string
          size_bytes?: number | null
          uploaded_by?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          room_id: string | null
          url: string
          caption: string | null
          type: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          room_id?: string | null
          url: string
          caption?: string | null
          type?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          room_id?: string | null
          url?: string
          caption?: string | null
          type?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      project_messages: {
        Row: {
          id: string
          project_id: string
          user_id: string
          body: string
          attachment_url: string | null
          read_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          body: string
          attachment_url?: string | null
          read_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          body?: string
          attachment_url?: string | null
          read_at?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      project_rooms: {
        Row: {
          id: string
          project_id: string
          name: string
          area_sqm: number | null
          notes: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          area_sqm?: number | null
          notes?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          name?: string
          area_sqm?: number | null
          notes?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      project_timeline: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string | null
          status: string | null
          due_date: string | null
          completed_at: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description?: string | null
          status?: string | null
          due_date?: string | null
          completed_at?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string | null
          status?: string | null
          due_date?: string | null
          completed_at?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          user_id: string | null
          reference: string
          title: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          priority: Database["public"]["Enums"]["project_priority"] | null
          rooms: Json | null
          style: string | null
          budget_min_cents: number | null
          budget_max_cents: number | null
          surface_sqm: number | null
          description: string | null
          address: Json | null
          city: string | null
          assigned_to: string | null
          quoted_at: string | null
          quote_cents: number | null
          accepted_at: string | null
          started_at: string | null
          completed_at: string | null
          notes: string | null
          internal_notes: string | null
          metadata: Json | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          reference: string
          title?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          priority?: Database["public"]["Enums"]["project_priority"] | null
          rooms?: Json | null
          style?: string | null
          budget_min_cents?: number | null
          budget_max_cents?: number | null
          surface_sqm?: number | null
          description?: string | null
          address?: Json | null
          city?: string | null
          assigned_to?: string | null
          quoted_at?: string | null
          quote_cents?: number | null
          accepted_at?: string | null
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          internal_notes?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          reference?: string
          title?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          priority?: Database["public"]["Enums"]["project_priority"] | null
          rooms?: Json | null
          style?: string | null
          budget_min_cents?: number | null
          budget_max_cents?: number | null
          surface_sqm?: number | null
          description?: string | null
          address?: Json | null
          city?: string | null
          assigned_to?: string | null
          quoted_at?: string | null
          quote_cents?: number | null
          accepted_at?: string | null
          started_at?: string | null
          completed_at?: string | null
          notes?: string | null
          internal_notes?: string | null
          metadata?: Json | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      review_images: {
        Row: {
          id: string
          review_id: string
          url: string
          alt: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          review_id: string
          url: string
          alt?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          review_id?: string
          url?: string
          alt?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      review_votes: {
        Row: {
          id: string
          review_id: string
          user_id: string
          helpful: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          review_id: string
          user_id: string
          helpful: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          review_id?: string
          user_id?: string
          helpful?: boolean
          created_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          product_id: string | null
          service_id: string | null
          project_id: string | null
          order_id: string | null
          rating: number
          title: string | null
          body: string | null
          pros: string | null
          cons: string | null
          status: Database["public"]["Enums"]["moderation_status"] | null
          is_verified: boolean | null
          helpful_count: number | null
          reported_at: string | null
          moderated_at: string | null
          moderated_by: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          product_id?: string | null
          service_id?: string | null
          project_id?: string | null
          order_id?: string | null
          rating: number
          title?: string | null
          body?: string | null
          pros?: string | null
          cons?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
          is_verified?: boolean | null
          helpful_count?: number | null
          reported_at?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string | null
          service_id?: string | null
          project_id?: string | null
          order_id?: string | null
          rating?: number
          title?: string | null
          body?: string | null
          pros?: string | null
          cons?: string | null
          status?: Database["public"]["Enums"]["moderation_status"] | null
          is_verified?: boolean | null
          helpful_count?: number | null
          reported_at?: string | null
          moderated_at?: string | null
          moderated_by?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: string
          role_id: string
          permission_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          role_id: string
          permission_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          role_id?: string
          permission_id?: string
          created_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          is_system: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          is_system?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          is_system?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          id: string
          user_id: string | null
          query: string
          results_count: number | null
          clicked_product_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          query: string
          results_count?: number | null
          clicked_product_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          query?: string
          results_count?: number | null
          clicked_product_id?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      service_addons: {
        Row: {
          id: string
          service_id: string
          name: string
          description: string | null
          price_cents: number
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          service_id: string
          name: string
          description?: string | null
          price_cents: number
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          service_id?: string
          name?: string
          description?: string | null
          price_cents?: number
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      service_packages: {
        Row: {
          id: string
          service_id: string
          name: string
          description: string | null
          price_cents: number
          features: Json | null
          is_popular: boolean | null
          sort_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          service_id: string
          name: string
          description?: string | null
          price_cents: number
          features?: Json | null
          is_popular?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          service_id?: string
          name?: string
          description?: string | null
          price_cents?: number
          features?: Json | null
          is_popular?: boolean | null
          sort_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string | null
          description: string | null
          icon: string | null
          image_url: string | null
          price_cents: number | null
          price_type: string | null
          duration_minutes: number | null
          is_active: boolean | null
          is_featured: boolean | null
          sort_order: number | null
          meta_title: string | null
          meta_description: string | null
          created_at: string | null
          updated_at: string | null
          deleted_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description?: string | null
          description?: string | null
          icon?: string | null
          image_url?: string | null
          price_cents?: number | null
          price_type?: string | null
          duration_minutes?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string | null
          description?: string | null
          icon?: string | null
          image_url?: string | null
          price_cents?: number | null
          price_type?: string | null
          duration_minutes?: number | null
          is_active?: boolean | null
          is_featured?: boolean | null
          sort_order?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string | null
          updated_at?: string | null
          deleted_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          group_name: string
          key: string
          value: Json | null
          type: string | null
          label: string | null
          description: string | null
          is_public: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          group_name: string
          key: string
          value?: Json | null
          type?: string | null
          label?: string | null
          description?: string | null
          is_public?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          group_name?: string
          key?: string
          value?: Json | null
          type?: string | null
          label?: string | null
          description?: string | null
          is_public?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          id: string
          name: string
          contact_name: string | null
          email: string | null
          phone: string | null
          address: Json | null
          notes: string | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          notes?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          notes?: string | null
          is_active?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role_id: string
          granted_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role_id: string
          granted_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role_id?: string
          granted_by?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          id: string
          wishlist_id: string
          product_id: string
          note: string | null
          added_at: string | null
        }
        Insert: {
          id?: string
          wishlist_id: string
          product_id: string
          note?: string | null
          added_at?: string | null
        }
        Update: {
          id?: string
          wishlist_id?: string
          product_id?: string
          note?: string | null
          added_at?: string | null
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          name: string | null
          is_public: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          is_public?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          is_public?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      order_summaries: {
        Row: {
          id: string | null
          order_number: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_cents: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          created_at: string | null
          first_name: string | null
          last_name: string | null
          email: string | null
          item_count: number | null
        }
        Relationships: []
      }
      product_stats: {
        Row: {
          id: string | null
          name: string | null
          slug: string | null
          total_sold: number | null
          total_revenue: number | null
          rating_avg: number | null
          rating_count: number | null
          stock_quantity: number | null
          stock_available: number | null
        }
        Relationships: []
      }
      public_categories: {
        Row: {
          id: string | null
          name: string | null
          slug: string | null
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number | null
          product_count: number | null
        }
        Relationships: []
      }
      public_products: {
        Row: {
          id: string | null
          name: string | null
          slug: string | null
          short_description: string | null
          description: string | null
          price_cents: number | null
          compare_at_cents: number | null
          currency: string | null
          materials: Json | null
          dimensions: string | null
          is_new: boolean | null
          is_featured: boolean | null
          rating_avg: number | null
          rating_count: number | null
          category_name: string | null
          category_slug: string | null
          primary_image_url: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_order_total: {
        Args: {
        }
        Returns: unknown
      }
      calculate_product_rating: {
        Args: {
        }
        Returns: unknown
      }
      generate_order_number: {
        Args: {
        }
        Returns: unknown
      }
      generate_product_slug: {
        Args: {
        }
        Returns: unknown
      }
      has_permission: {
        Args: {
          p_user_id: string
          p_permission_name: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          p_user_id: string
          p_role_name: string
        }
        Returns: boolean
      }
      reserve_inventory: {
        Args: {
          p_product_id: string
          p_quantity: number
        }
        Returns: boolean
      }
      update_updated_at: {
        Args: {
        }
        Returns: unknown
      }
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show"
      blog_status: "draft" | "review" | "published" | "archived"
      discount_type: "percentage" | "fixed_amount"
      moderation_status: "pending" | "approved" | "rejected" | "spam"
      movement_type: "purchase" | "sale" | "return" | "adjustment" | "transfer"
      notification_type: "order_confirmed" | "order_shipped" | "order_delivered" | "order_cancelled" | "review_approved" | "review_rejected" | "project_updated" | "appointment_reminder" | "appointment_confirmed" | "low_stock" | "new_order" | "new_review" | "new_project" | "payment_received" | "system" | "marketing"
      order_status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "completed" | "cancelled" | "refunded" | "on_hold"
      page_status: "draft" | "review" | "published" | "archived"
      payment_status: "pending" | "authorized" | "captured" | "partially_refunded" | "refunded" | "failed" | "cancelled"
      product_status: "draft" | "pending" | "published" | "archived"
      project_priority: "low" | "normal" | "high" | "urgent"
      project_status: "new" | "contacted" | "quoted" | "accepted" | "in_progress" | "review" | "completed" | "cancelled"
      user_status: "active" | "inactive" | "suspended" | "deleted"
    }
  }
}
