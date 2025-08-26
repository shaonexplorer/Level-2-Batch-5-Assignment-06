import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/user.api/user.api";

export function DialogUserTable({ userId }: { userId: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<undefined | string>();

  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleBlock = async () => {
    const loadingToastId = toast.loading("Updating User...");
    try {
      const res = await blockUser(userId).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("User Successfully Blocked", { id: loadingToastId });
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed To Block Users", {
        id: loadingToastId,
      });
    } finally {
      setOpenDialog(false);
    }
  };

  const handleDelete = async () => {
    const loadingToastId = toast.loading("Updating User...");
    try {
      const res = await deleteUser(userId).unwrap();
      console.log(res);

      if (res.success) {
        toast.success("User Deleted", { id: loadingToastId });
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user", { id: loadingToastId });
    }
  };
  const handleBlockButton = () => {
    setDialogType("block");
    setOpenDialog(true);
  };
  const handleDeleteButton = () => {
    setDialogType("delete");
    setOpenDialog(true);
  };
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleBlockButton}>
            Block User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteButton}>
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialogType == "block" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently block the user
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlock}>
              Block User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {dialogType == "delete" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your
              parcel and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
