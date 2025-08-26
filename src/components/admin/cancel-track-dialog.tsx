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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  useCancelParcelMutation,
  useUpdateParcelStatusMutation,
} from "@/redux/api/parcel.api/parcelApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { parcelStatus } from "@/types";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStatusSchema } from "@/zod";

export function CancelTrackDialogAdmin({
  trackingNumber,
  id,
}: {
  id: string;
  trackingNumber: string;
}) {
  const form = useForm({ resolver: zodResolver(updateStatusSchema) });
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [cancelParcel, { isLoading }] = useCancelParcelMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateParcelStatusMutation();

  const handleCancel = async () => {
    const loadingToastId = toast.loading("Cancelling Parcel...");
    try {
      const res = await cancelParcel(id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Parcel Successfully cancelled", { id: loadingToastId });
      }
    } catch (error) {
      console.log(error);

      toast.error("Parcel already dispatched, cannot cancel now", {
        id: loadingToastId,
      });
    }
  };

  const handleStatusUpdate = async (data: FieldValues) => {
    const loadingToastId = toast.loading("Updating status...");
    try {
      const res = await updateStatus({ id, data });

      if (res.data?.success) {
        toast.success("Status Updated", { id: loadingToastId });
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status", { id: loadingToastId });
    }
  };
  return (
    <AlertDialog>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/track-parcel?trackingNumber=${trackingNumber}`)
              }
            >
              Track Parcel
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => {}}>
                Update Status
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              {/* <Button variant="ghost">Cancel Parcel</Button> */}
              <DropdownMenuItem onClick={() => {}}>
                Cancel Parcel
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

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
            <AlertDialogAction onClick={handleCancel} disabled={isLoading}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Parcel Status</DialogTitle>
            <DialogDescription>
              Make changes to your parcel here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleStatusUpdate)}
              className="space-y-5"
            >
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a verified status to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(parcelStatus).map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={isUpdating} type="submit">
                  Update Status
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AlertDialog>
  );
}
