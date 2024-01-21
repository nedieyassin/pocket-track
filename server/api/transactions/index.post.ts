import {prisma} from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.transaction.create({
            data: {
                userId,
                ...body,
                date: new Date(body.date).toISOString()
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})