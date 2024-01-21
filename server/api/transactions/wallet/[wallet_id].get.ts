export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    const walletId = getRouterParam(event, 'wallet_id');
    const {date_start, date_end} = getQuery(event);

    if (isAuthenticated) {
        return prisma.transaction.findMany({
            where: {
                userId,
                walletId,
                date: {
                    gte: new Date(date_start!.toString() + ' 00:00:00'),
                    lte: new Date(date_end!.toString() + ' 23:59:59'),
                }
            },
            include: {
                transactionCategory: true
            },
            orderBy: {
                date: 'desc'
            },
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})