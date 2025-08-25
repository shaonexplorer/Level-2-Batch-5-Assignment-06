import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  IParcelStatusColor,
  IParcelStatusRibonColor,
  type IParcel,
} from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { CancelTrackDialogAdmin } from "../cancel-track-dialog";

export const columnsAdmin: ColumnDef<IParcel>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    id: "receiver.firstName",
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
      const id = row.original._id;

      return <CancelTrackDialogAdmin id={id} trackingNumber={trackingNumber} />;
    },
  },
];
