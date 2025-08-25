import { useGetAllParcelQuery } from "@/redux/api/parcel.api/parcelApi";

import { DataTableAdmin } from "./data-table";
import { columnsAdmin } from "./columns";

export default function ParcelsPageAdmin() {
  const { data } = useGetAllParcelQuery(undefined);

  if (data?.data.length > 0)
    return (
      <div className="container mx-auto max-w-6xl py-10  ">
        <DataTableAdmin columns={columnsAdmin} data={data.data} />
      </div>
    );
}
