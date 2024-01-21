export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const transaction_id = getRouterParam(event, 'transaction_id');


    if (isAuthenticated) {
        return prisma.transaction.findUnique({
            where: {
                id: transaction_id,
                userId
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})