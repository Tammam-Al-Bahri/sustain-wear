import { clerkClient } from "@clerk/nextjs/server";

export async function countUsersByRole(role: string) {
  const client = await clerkClient();
  const response = await client.users.getUserList();
  const users = response.data;
  return users.filter((user) => user.publicMetadata.role === role).length;
}



