export default defineEventHandler(async (event) => {
    const {userId, isAuthenticated} = await getAuthenticatedUser(event)
    if (isAuthenticated) {
        return prisma.user.findUnique({
            where: {
                id: userId
            },
        });
    } else {
        throw createError({statusCode: 401, statusMessage: 'Unauthorized'})
    }
})