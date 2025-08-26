import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { userStatusColor, userStatusRibonColor, type IUser } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { DialogUserTable } from "../dialog-user-table";

export const columnsUser: ColumnDef<IUser>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "PhoneNumber",
  },
  {
    accessorKey: "userId.email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-center ">
          <Badge
            className={cn(
              {
                [userStatusColor.active]: status == "active",
                [userStatusColor.blocked]: status == "blocked",
                [userStatusColor.deleted]: status == "deleted",
                [userStatusColor.inactive]: status == "inactive",
              },
              " gap-1.5"
            )}
          >
            <span
              className={`size-1.5 mt-0.5 rounded-full ${
                userStatusRibonColor[status as keyof typeof userStatusColor]
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
      const userId = row.original.userId._id;

      return <DialogUserTable userId={userId} />;
    },
  },
];
