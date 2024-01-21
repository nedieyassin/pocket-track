export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.wallet.findMany({
            where: {
                userId
            },
            orderBy: {
                name: 'asc'
            },
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})