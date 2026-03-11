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
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import DeleteUserButton from "./delete-user-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <Pencil className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit user {user.username}</DialogTitle>
                    {/* pakai user buat populate datayang sudah ada buat diedit */}
                    <UserForm user={user} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <DeleteUserButton userId={user.id} username={user.username} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
