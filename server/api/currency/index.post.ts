import {prisma} from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.user.update({
            data: {
                ...body
            },
            where: {
                id: userId,
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})