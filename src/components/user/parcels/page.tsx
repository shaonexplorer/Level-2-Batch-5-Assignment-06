import { useGetMyParcelsQuery } from "@/redux/api/parcel.api/parcelApi";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { DialogCreateParcel } from "../dialog.create.parcel";
import { SkeletonTable } from "@/components/skeleton/skeleton-table";

export default function ParcelsPage() {
  const { data, isLoading } = useGetMyParcelsQuery(undefined);

  if (isLoading)
    return (
      <div className="container mx-auto max-w-6xl py-10  ">
        <SkeletonTable />
      </div>
    );

  if (!isLoading && data.data.length == 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="py-10">No Parcel Found</p>
        <DialogCreateParcel />
      </div>
    );

  if (data?.data.length > 0)
    return (
      <div className="container mx-auto max-w-6xl py-10  ">
        <DataTable columns={columns} data={data.data} />
      </div>
    );
}
