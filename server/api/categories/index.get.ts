export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.transactionCategory.findMany({
            where: {
                OR: [
                    {
                        userId
                    },
                    {
                        userId: null
                    }
                ]
            },
            orderBy: {
                name: 'asc'
            },
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})