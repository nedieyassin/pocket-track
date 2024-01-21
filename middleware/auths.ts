export default defineNuxtRouteMiddleware(async (to, _from) => {
    const {loggedIn, user} = useAuth();

    if (!loggedIn) {
        return navigateTo({
            path: '/',
            query: {redirect: to.path, message: 'No active session found. You must log in to continue.'},
        });
    }
});

