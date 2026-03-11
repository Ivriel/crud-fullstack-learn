import UsersTable from "@/components/users-table";

import UserForm from "@/components/forms/user-form";

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex justify-end">
        <UserForm />
      </div>
      <UsersTable />
    </div>
  );
}
