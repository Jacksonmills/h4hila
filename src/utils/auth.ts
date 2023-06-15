import { auth } from "@clerk/nextjs";
import { prisma } from "~/server/db";

export const getUserByClerkId = async () => {
  const { userId } = auth();

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });

  return user;
};