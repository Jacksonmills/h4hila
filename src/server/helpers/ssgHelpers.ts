import { prisma } from '~/server/db';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from '~/server/api/root';

export const generateSSGHelpers = () => createServerSideHelpers({
  router: appRouter,
  ctx: { prisma, userId: null },
  transformer: superjson, // optional - adds superjson serialization
});