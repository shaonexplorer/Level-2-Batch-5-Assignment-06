import { useGetMyParcelsQuery } from "@/redux/api/parcel.api/parcelApi";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ParcelsPage() {
  const { data } = useGetMyParcelsQuery(undefined);

  if (data?.data.length > 0)
    return (
      <div className="container mx-auto max-w-6xl py-10  ">
        <DataTable columns={columns} data={data.data} />
      </div>
    );
}
