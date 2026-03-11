"use client"
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteUser } from "@/server/users";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteUserButtonProps {
    userId: string;
    username: string;
}

export default function DeleteUserButton({ userId, username }: DeleteUserButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteUser(userId)
            toast.success("User deleted successfully")
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete user")
        } finally {
            setIsLoading(false)
            setIsOpen(false)
            router.refresh()
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost"><Trash2 className="size-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure to delete {username}?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}


