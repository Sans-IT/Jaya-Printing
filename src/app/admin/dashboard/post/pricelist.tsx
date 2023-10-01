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
import { useRouter } from "next/navigation";
import { IDcurrency } from "@/lib/globalvar";

type Props = {};

function Pricelist({}: Props) {
  const router = useRouter();

  const formSchema = z.object({
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
    defaultValues: {
      title: "",
      price: "0",
      print: "0",
    },
  });

  // 2. Define a submit handler.
  const { mutate: onSubmit, isLoading }: any = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post("/api/pricelist", values);
      return response.data;
    },
    onSuccess: () => {
      router.back();
    },
  });

  const { data: getAllPost, isLoading: isLoadingPost } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/post`);
      return response.data;
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

        <FormField
          control={form.control}
          name="postId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postingan Harga</FormLabel>
              <Select onValueChange={field.onChange} disabled={isLoadingPost}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pricelist yang ingin ditambah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getAllPost &&
                    getAllPost?.map((item: PostWithUser) => {
                      return (
                        <SelectItem value={item.id} key={item.id}>
                          {item.title}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isLoadingPost}
          icon={
            isLoading ? <Loader2 className="animate-spin w-5 h-5 me-2" /> : ""
          }
        >
          Buat Pricelist
        </Button>
      </form>
    </Form>
  );
}

export default Pricelist;
