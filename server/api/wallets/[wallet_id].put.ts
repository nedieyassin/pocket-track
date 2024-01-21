export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const wallet_id = getRouterParam(event, 'wallet_id');
    const body = await readBody(event)


    if (isAuthenticated) {
        return prisma.wallet.update({
            data: {
                ...body
            },
            where: {
                id: wallet_id,
                userId: userId
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})