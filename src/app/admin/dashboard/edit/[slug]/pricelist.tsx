"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import { IDcurrency } from "@/lib/globalvar";

type Props = {
  params: {
    slug: string;
  };
};

function Pricelist({ params }: Props) {
  const router = useRouter();

  const formSchema = z.object({
    id: z.string().default(params.slug),
    title: z
      .string()
      .min(1, {
        message: "judul harus lebih dari 1 karakter.",
      })
      .toLowerCase(),
    size: z.string(),
    price: z.string(),
    print: z.string(),
    postId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  const { mutate: onSubmit, isLoading }: any = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.patch("/api/pricelist", values);
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });

  const { data: getAllPost, isLoading: isLoadingPost } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await axios.get(`/api/pricelist?id=${params.slug}`);
      console.log(response.data);
      return response.data;
    },
    onSuccess: (item: PricelistWithPost) => {
      form.setValue("title", item.title);
      form.setValue("postId", item.postId);
      form.setValue("print", item.print.toString());
      form.setValue("price", item.price.toString());
      form.setValue("size", item.size);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input placeholder="Tuliskan Judul disini" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ukuran</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ukuran" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Harga Barang - {IDcurrency(parseInt(field.value))}
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Harga barang" type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="print"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Harga Cetak / Sablon - {IDcurrency(parseInt(field.value))}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Harga 
              cetak / sablon"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Postingan Harga</FormLabel>
          <Select disabled={true}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={getAllPost?.post.title} />
              </SelectTrigger>
            </FormControl>
            <SelectContent></SelectContent>
          </Select>
          <FormMessage />
        </FormItem>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isLoadingPost}
          icon={
            isLoading ? <Loader2 className="animate-spin w-5 h-5 me-2" /> : ""
          }
        >
          Edit Pricelist
        </Button>
      </form>
    </Form>
  );
}

export default Pricelist;
