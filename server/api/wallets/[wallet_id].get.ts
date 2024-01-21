export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const wallet_id = getRouterParam(event, 'wallet_id');


    if (isAuthenticated) {
        return prisma.wallet.findUnique({
            where: {
                id: wallet_id,
                userId: userId
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})