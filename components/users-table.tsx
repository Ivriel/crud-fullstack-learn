import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/server/users";
import DeleteUserButton from "./delete-user-button";
import UserForm from "./forms/user-form";

export default async function UsersTable() {
  const users = await getUsers();
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              {user.createdAt?.toLocaleString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false // Biar pakai format 24 jam (pake titik dua biasanya)
              })}
            </TableCell>
            <TableCell>{user.updatedAt?.toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false // Biar pakai format 24 jam (pake titik dua biasanya)
            })}</TableCell>
            <TableCell className="text-right">
              <UserForm user={user} />
              <DeleteUserButton userId={user.id} username={user.username} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
