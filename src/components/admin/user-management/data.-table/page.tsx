import { useGetAllUsersQuery } from "@/redux/api/user.api/user.api";
import { columnsUser } from "./columns";
import { DataTableForUserTable } from "./data-table";
import { SkeletonTable } from "@/components/skeleton/skeleton-table";

export default function UsersPageAdmin() {
  const { data, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl py-10">
        <SkeletonTable />
      </div>
    );
  }

  if (data?.data.length > 0)
    return (
      <div className="container mx-auto max-w-4xl py-10  ">
        <DataTableForUserTable columns={columnsUser} data={data.data} />
      </div>
    );
}
