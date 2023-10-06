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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ImagePlusIcon, Loader2, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { useMutation} from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../database.types";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

function Post({}: Props) {
  const supabase = createClientComponentClient<Database>();
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>();
  const [modifiedImage, setModifiedImage] = useState<string>("");
  const [ImagePreview, setImagePreview] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserSession(session);
      }
    };
    getSession();
  }, []);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "judul harus lebih dari 1 karakter.",
      })
      .toLowerCase(),
    source: z.string().default(`${userSession?.user.id}/${modifiedImage}`),
    category: z.string(),
    authorId: z.string().default(`${userSession?.user.id}`),
    description: z.string().min(1, {
      message: "deskripsi minimal lebih dari 1.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "plastik",
      authorId: userSession?.user.id,
      description: "",
    },
  });

  // 2. Define a submit handler.
  const { mutate: onSubmit, isLoading }: any = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const { data, error } = await supabase.storage
        .from("source")
        .upload(String(values.source), uploadedImage as File, {
          cacheControl: "3600",
          upsert: false,
        });
      if (ImagePreview.length === 0) {
        throw new Error("harus ada gambar yang diupload!");
      }
      if (error) {
        throw new Error(error.message);
      }
      const response = await axios.post("/api/post", values);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Berhasil",
        description: "berhasil mengupload catatan",
        variant: "success",
      });
      router.back();
    },
    onError: (error) => {
      toast({
        title: "Error Upload Catatan",
        description:
          "terjadi kesalahan saat mengupload catatan hubungi owner server! " +
          error,
        variant: "destructive",
      });
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement | any>) => {
    if (e.target.files?.length !== 0) {
      setUploadedImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setModifiedImage(e.target.files[0].lastModified.toString());
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Input
          type="file"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleImage}
          ref={ref}
        />
        <div className="aspect-video relative p-2 border-dashed rounded-md border-4 cursor-pointer border-blue-400">
          <div
            onClick={() => {
              setImagePreview("");
              setUploadedImage(null);
            }}
            className="z-10 absolute right-4 top-4 rounded-full p-1 text-white bg-slate-500 hover:bg-slate-400"
          >
            <X />
          </div>
          <div
            onClick={() => void ref.current?.click()}
            className="w-full h-full  hover:opacity-80"
          >
            {ImagePreview === "" ? (
              <div className="bg-zinc-800 w-full h-full text-white">
                <div className="h-full flex items-center justify-center flex-col gap-2">
                  <ImagePlusIcon className="rounded-full bg-zinc-700 p-4 w-20 h-20" />
                  <h2 className="font-semibold">Upload Foto</h2>
                  <p>untuk menambahkan foto klik bagian ini</p>
                </div>
              </div>
            ) : (
              <Image
                src={ImagePreview}
                height={1000}
                width={1000}
                className="mx-auto w-full h-full object-contain"
                alt="dummyimage"
              />
            )}
          </div>
        </div>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Deskripsi" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="pilih kategori untuk postingan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Category).map((item) => {
                    return (
                      <SelectItem value={item} key={item}>
                        {item}
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
          disabled={isLoading}
          icon={
            isLoading ? <Loader2 className="animate-spin w-5 h-5 me-2" /> : ""
          }
        >
          Buat Postingan
        </Button>
      </form>
    </Form>
  );
}

export default Post;
