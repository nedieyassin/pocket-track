import {H3Event} from "h3";
import {id} from "postcss-selector-parser";

export const getAuthenticatedUser = async (event: H3Event) => {

    const isAuthenticated = await event.context.kinde.isAuthenticated();
    const user = await event.context.kinde.getUserProfile();
    let userId = user?.id;
    isAuthenticated && userId && await syncUser(userId);

    return {
        isAuthenticated,
        user,
        userId
    }
}

const syncUser = async (id: string) => {
    return prisma.user.upsert({
        create: {
            id
        },
        update: {},
        where: {
            id
        }
    });
}