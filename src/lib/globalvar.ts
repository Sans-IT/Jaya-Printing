import { Category } from "@prisma/client";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import currency from "currency.js";
import {
  BadgeHelp,
  BookMarked,
  LucideSaveAll,
  Plus,
  Popcorn,
  Shirt,
  ShoppingBag,
  Sticker,
} from "lucide-react";

export const CompanyName = "Jaya Printing";

export const IDcurrency = (value: number) =>
  currency(value, {
    symbol: "Rp, ",
    separator: ".",
    decimal: ",",
    precision: 0,
  }).format() + " ,-";

export const categoryArray = Object.values(Category).map((item) => {
  return item;
});

export const filterCategory: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "plastik",
    label: "Plastik",
    icon: Popcorn,
  },
  {
    value: "sticker",
    label: "Sticker",
    icon: Sticker,
  },
  {
    value: "kemasan",
    label: "Kemasan",
    icon: ShoppingBag,
  },
  {
    value: "stationary",
    label: "Stationary",
    icon: BookMarked,
  },
  {
    value: "kain",
    label: "Kain",
    icon: Shirt,
  },
  {
    value: "lainnya",
    label: "Lainnya",
  },
];

export const urlImage =
  "https://yrsecamqzlgnlgkkaoda.supabase.co/storage/v1/object/public/source/";
