export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event);
    const wallet_id = getRouterParam(event, 'wallet_id');


    if (isAuthenticated) {
        await prisma.transaction.deleteMany({
            where: {
                walletId: wallet_id,
                userId
            }
        });

        return prisma.wallet.deleteMany({
            where: {
                id: wallet_id,
                userId
            }
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})