import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";

export const DeleteMenu = ({
  data,
  type,
}: {
  data: PostWithUser;
  type: string;
}) => {
  const supabase = createClientComponentClient<Database>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isLoading }: any = useMutation({
    mutationFn: async (id: string) => {
      if (type === "postingan") {
        await supabase.storage.from("source").remove([data?.source ?? ""]);
        const response = await axios.delete(`/api/post?id=${id}`);
        return response.data;
      } else {
        const response = await axios.delete(`/api/pricelist?id=${id}`);
        return response.data;
      }
    },
    onSuccess: async () => {
      toast({
        variant: "success",
        title: `Delete ${type}`,
        description: "post berhasil di hapus",
      });
      if (type === "postingan") {
        await queryClient.invalidateQueries(["adminpost"]);
      } else {
        await queryClient.invalidateQueries(["adminpricelist"]);
      }
      setOpenAlert(false);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: `Delete ${type} error`,
        description: `gagal menghapus ${type} error ` + { err },
      });
    },
  });

  return (
    <AlertDialog open={openAlert}>
      <AlertDialogTrigger onClick={() => void setOpenAlert(true)}>
        <Button variant={"destructive"} size={"icon"}>
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {type}</AlertDialogTitle>
          <AlertDialogDescription>
            Apa kamu yakin menghapus {type} &quot;{data.title}&quot;?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => void setOpenAlert(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(data.id)}
            disabled={isLoading}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
