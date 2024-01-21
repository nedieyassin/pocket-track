export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const transaction_id = getRouterParam(event, 'transaction_id');
    const body = await readBody(event)


    if (isAuthenticated) {
        return prisma.transaction.update({
            data: {
                ...body,
                date: new Date(body.date).toISOString()
            },
            where: {
                id: transaction_id,
                userId: userId
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})