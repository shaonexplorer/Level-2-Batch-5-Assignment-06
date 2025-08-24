import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  IParcelStatusColor,
  IParcelStatusRibonColor,
  type IParcel,
} from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { CancelAlertDialog } from "../cancel-dialog";
export const columns: ColumnDef<IParcel>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "receiver.firstName",
    header: "Reciever Name",
  },
  {
    accessorKey: "receiver.phoneNumber",
    header: "Reciever Phone",
  },
  {
    accessorKey: "packageDetails.description",
    header: "Parcel Description",
  },
  {
    id: "packageDetails.weightKg",
    accessorKey: "packageDetails.weightKg",
    header: () => <div className="text-center">Parcel Weight</div>,
    cell: ({ row }) => {
      const weight = row.getValue("packageDetails.weightKg") as number;
      return <div className="text-center">{weight} kg</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Parcel Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-center ">
          <Badge
            className={cn(
              {
                [IParcelStatusColor.pending_pickup]: status == "pending_pickup",
                [IParcelStatusColor.picked_up]: status == "picked_up",
                [IParcelStatusColor.out_for_delivery]:
                  status == "out_for_delivery",
                [IParcelStatusColor.in_transit]: status == "in_transit",
                [IParcelStatusColor.failed_delivery]:
                  status == "failed_delivery",
                [IParcelStatusColor.delivered]: status == "delivered",
                [IParcelStatusColor.cancelled]: status == "cancelled",
              },
              " gap-1.5"
            )}
          >
            <span
              className={`size-1.5 mt-0.5 rounded-full ${
                IParcelStatusRibonColor[
                  status as keyof typeof IParcelStatusColor
                ]
              }`}
              aria-hidden="true"
            ></span>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const trackingNumber = row.original.trackingNumber;

      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuItem
        //       onClick={() => navigator.clipboard.writeText(payment._id)}
        //     >
        //       Track Parcel
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <CancelAlertDialog trackingNumber={trackingNumber} />
      );
    },
  },
];
