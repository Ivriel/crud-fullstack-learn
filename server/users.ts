"use server"

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
   try {
     const allUsers = await db.select().from(users);
    return allUsers;
   } catch (error) {
    console.error(error);
    return {error: "Failed to fetch users"}
   }
}

export async function createUser(user:Omit<User, 'id' | 'createdAt' | 'updatedAt'> ) { // omit membuang id, createdAt, updatedAt. jadi user yang masuk cuma username, email, password. beda lagi dengan Pick. Pick kebalikannya omit. dia mengambil apa yang kita mau. kalau omit mengambil semua kecuali yang udah di define.
    try {
        const newUser = await db.insert(users).values(user);
        return newUser;
    } catch (error) {
        console.error(error);
        return {error: "Failed to create user"}
    }
}

export async function updateUser(id: string, user:Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
        const updatedUser = await db.update(users).set(user).where(eq(users.id, id));
        return updatedUser;
    } catch (error) {
        console.error(error);
        return {error: "Failed to update user"}
    }
}

export async function deleteUser(id:string) {
    try {
        const deletedUser = await db.delete(users).where(eq(users.id, id));
        return deletedUser;
    } catch (error) {
        console.error(error);
        return {error: "Failed to delete user"}
    }
}