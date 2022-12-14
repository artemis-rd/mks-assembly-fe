export const getUserProfile = async () => {
    const { MESSAGING_SERVICE } = useRuntimeConfig()
    const cookie = useCookie("mks-token");
    let token = cookie.value;
    let brokenToken = token.split(".")[1];
    let id = JSON.parse(atob(brokenToken)).id;
    return useState('userProfile', async function () {
      return JSON.stringify(await useFetch<any>(`${MESSAGING_SERVICE}/contacts/old/list/${id}`, {
            method: "GET",
        }
        ))
        
    })
}