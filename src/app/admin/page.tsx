import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginWithEmail from "./LoginWithEmail";
import Image from "next/image";
import LoginWithProvider from "./LoginWithProvider";

type Props = {};

function Page({}: Props) {
  return (
    <div className="max-w-lg mx-auto w-full my-5">
      <Image
        src="/image/logo.png"
        width={100}
        height={100}
        alt="logo"
        className="mx-auto rounded-full shadow-md"
      />
      <h1 className="text-3xl my-5 text-center font-black">
        Login Admin Jayaprinting
      </h1>
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="provider">Provider</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <LoginWithEmail />
        </TabsContent>
        <TabsContent value="provider">
          <LoginWithProvider />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
