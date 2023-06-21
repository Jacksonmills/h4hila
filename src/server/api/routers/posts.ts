import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/server";
import { z } from "zod";

import validateText from "~/utils/validateText";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const postsRouter = createTRPCRouter({
  getOneByAuthorId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;

    const post = await ctx.prisma.post.findFirst({
      where: {
        authorId,
      },
    });

    const user = await clerkClient.users.getUser(authorId);

    return {
      post,
      author: user
    };
  }),
  getAllWithCursor: publicProcedure
    .input(
      z.object({
        cursor: z.object({
          id: z.string().optional(),
          createdAt: z.string().optional(),
        }).optional(),
        take: z.number().optional().default(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const cursor = input.cursor;
      if (!cursor || (cursor?.id === undefined && cursor?.createdAt === undefined)) return;
      const cursorWhere = {
        createdAt: new Date(cursor.createdAt as string),
        id: cursor.id,
      };
      const posts = await ctx.prisma.post.findMany({
        take: input.take,
        cursor: cursorWhere,
        orderBy: [
          { createdAt: 'asc' },
          { id: 'asc' },
        ],
        skip: input.cursor ? 1 : undefined,
      });

      const users = (await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: input.take,
      })).map(filterUserForClient);

      return posts.map((post) => ({
        post,
        author: users.find((user) => user.id === post.authorId),
      }));
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
    })).map(filterUserForClient);

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),
  create: privateProcedure
    .input(
      z.object({
        username: z.string().min(2).max(32),
        content: z.string().min(1).max(140),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      // both username and content must be valid text (no slurs, etc.) to be saved
      const isValid = validateText(input.content) && validateText(input.username);

      if (!isValid) throw new Error("Invalid content");

      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          username: input.username,
          content: input.content,
        }
      });

      return post;
    }),
  update: privateProcedure
    .input(
      z.object({
        username: z.string().min(2).max(32),
        content: z.string().min(1).max(140),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const isValid = validateText(input.content) && validateText(input.username);

      if (!isValid) throw new Error("Invalid content");

      const post = await ctx.prisma.post.findFirst({
        where: {
          authorId,
        },
      });

      if (!post) throw new Error("Post not found");

      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          authorId,
          username: input.username,
          content: input.content,
        }
      });

      return updatedPost;
    }
    ),
});
