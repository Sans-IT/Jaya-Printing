'use client'

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database as DatabaseIcon, LogOutIcon, User } from "lucide-react";
import { Button } from "../ui/button";
import { Database } from "../../../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icon";
import axios from "axios";

type Props = {
};

function UserProfile({ }: Props) {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient<Database>();
  const {toast} = useToast();
  const router = useRouter();

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
  
  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if(error) throw new Error(error.message)
    } catch (error){
      toast({
        title: `terjadi kesalahan saat login`,
        description: `error ${error}`
      })
    } 
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    setUserSession(null)
    router.refresh();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          icon={
            userSession?.user.user_metadata.avatar_url ? (
              <Image
                src={userSession?.user.user_metadata.avatar_url}
                alt="userprofile"
                className="rounded-full"
                width={40}
                height={40}
              />
            ) : (
              <User />
            )
          }
          variant={"outline"}
          size={"icon"}
          className="rounded-full"
        ></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {userSession ? (
          <DropdownMenuLabel>{userSession?.user.email}</DropdownMenuLabel>
        ) : (
          ""
        )}
        {!userSession && <DropdownMenuItem onClick={() => login()}><Icons.google className="w-4 h-4 me-2" /> Login</DropdownMenuItem>}
        {userSession && <DropdownMenuItem onClick={() => logout()}><LogOutIcon className="w-4 h-4 me-2 text-red-500" /> Logout</DropdownMenuItem>}        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
