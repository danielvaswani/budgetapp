import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.transaction.findMany({ where: { userId: ctx.session?.user?.id } });
    }),

    post: protectedProcedure
        .input(z.object({ value: z.number(), name: z.string(), category: z.string() }))
        .mutation(({ input, ctx }) => {
            return ctx.db.transaction.create({
                data: {
                    value: input.value,
                    name: input.name,
                    category: input.category,
                    userId: ctx.session?.user?.id,
                },
            });
        }
        ),
});
