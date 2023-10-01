"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Icons } from "@/components/icon";
import { Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

function LoginWithProvider({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();

  const LoginWithgoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      toast({
        title: "Error Login",
        description: `terjadi kesalahan saat login ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={LoginWithgoogle}
      disabled={isLoading}
      variant={"outline"}
      size={"sm"}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="h-4 w-4 mr-2" />
      )}
      Login dengan Google
    </Button>
  );
}

export default LoginWithProvider;
