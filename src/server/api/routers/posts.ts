import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/server";
import { z } from "zod";

import validateText from "~/utils/validateText";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

// (3 requests per minute)
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getOneByAuthorId: privateProcedure.query(async ({ ctx }) => {
    const authorId = ctx.userId;

    const post = await ctx.prisma.post.findFirst({
      where: {
        authorId,
      },
    });

    const user = filterUserForClient(await clerkClient.users.getUser(authorId));

    if (!post) throw new Error("Post not found");

    return {
      post,
      author: user,
    };
  }),
  getAllWithCursor: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        take: z.number().optional().default(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const cursor = input.cursor;

      const posts = await ctx.prisma.post.findMany({
        take: input.take,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [
          { id: 'asc' },
        ],
        skip: cursor ? 1 : undefined,
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

      if (!isValid) throw new TRPCError({ code: "UNPROCESSABLE_CONTENT" });

      const { success } = await ratelimit.limit(authorId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

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
      }).superRefine((val, ctx) => {
        if (!validateText(val.content) || !validateText(val.username)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid content 🤬🧹",
          });
        }
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);

      if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many requests" });
      }

      const post = await ctx.prisma.post.findFirst({
        where: {
          authorId,
        },
      });

      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });

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
