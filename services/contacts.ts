function getToken() {
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  return token;
}
const {
  public: { AUTH_SERVICE_URL },
} = useRuntimeConfig();
export async function createContact(contactData: any) {
  let token = getToken();
  let resp = await useFetch<any>(`${AUTH_SERVICE_URL}`, {
    method: "POST",
    body: contactData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return resp;
}
