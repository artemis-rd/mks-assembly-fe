export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.includes('/dashboard/messenger')) {
        const token = useCookie('mks-token');
        if (token.value == undefined || !tokenIsValid(token.value) ) return navigateTo('/sign-in');
    }
    if (to.fullPath === '/') return navigateTo('/dashboard/messenger');
    // return navigateTo('/sign-in')
})

function tokenIsValid(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const timestamp = payload.exp * 1000;

    const now = Date.now();

    if (now > timestamp) {
        // the token has expired
        return false;
    }
    return true;
}
