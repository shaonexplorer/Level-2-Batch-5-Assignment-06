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
import { useCancelParcelMutation } from "@/redux/api/parcel.api/parcelApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function CancelAlertDialog({
  trackingNumber,
}: {
  trackingNumber: string;
}) {
  const navigate = useNavigate();
  const [cancelParcel, { isLoading }] = useCancelParcelMutation();
  const handleCancel = async () => {
    const loadingToastId = toast.loading("Cancelling Parcel...");
    try {
      const res = await cancelParcel(trackingNumber).unwrap();
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
  return (
    <AlertDialog>
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
              navigate(`/user/track-parcel?trackingNumber=${trackingNumber}`)
            }
          >
            Track Parcel
          </DropdownMenuItem>
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
    </AlertDialog>
  );
}
