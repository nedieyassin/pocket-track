import {prisma} from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.wallet.create({
            data: {
                userId,
                ...body
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})