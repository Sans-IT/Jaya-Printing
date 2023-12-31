export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Post: {
        Row: {
          authorId: string
          category: Database["public"]["Enums"]["Category"]
          createAt: string
          description: string
          id: string
          source: string
          title: string
          updateAt: string
        }
        Insert: {
          authorId: string
          category?: Database["public"]["Enums"]["Category"]
          createAt?: string
          description: string
          id: string
          source: string
          title: string
          updateAt: string
        }
        Update: {
          authorId?: string
          category?: Database["public"]["Enums"]["Category"]
          createAt?: string
          description?: string
          id?: string
          source?: string
          title?: string
          updateAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_authorId_fkey"
            columns: ["authorId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Pricelist: {
        Row: {
          createAt: string
          id: string
          postId: string
          price: number
          print: number
          size: string
          title: string
          updateAt: string
        }
        Insert: {
          createAt?: string
          id: string
          postId: string
          price: number
          print: number
          size: string
          title: string
          updateAt: string
        }
        Update: {
          createAt?: string
          id?: string
          postId?: string
          price?: number
          print?: number
          size?: string
          title?: string
          updateAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Pricelist_postId_fkey"
            columns: ["postId"]
            referencedRelation: "Post"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          createAt: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          createAt?: string
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          createAt?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Category:
        | "plastik"
        | "sticker"
        | "kemasan"
        | "stationary"
        | "kain"
        | "lainnya"
      Role: "USER" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
