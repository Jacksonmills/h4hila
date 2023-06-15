import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();

    return users;
  }),

  createUser: publicProcedure.mutation({
    input: z.object({
      clerkId: z.string(),
      bio: z.string().optional(),
    }),
    resolve: async ({ input }, { ctx }) => {
      const match = await ctx.prisma.user.findUnique({
        where: {
          clerkId: input.clerkId,
        }
      });

      if (!match) {
        await ctx.prisma.user.create({
          data: {
            clerkId: input.clerkId,
            bio: input.bio,
          }
        });
      }

      return { status: 'success' };
    },
  }),
});
