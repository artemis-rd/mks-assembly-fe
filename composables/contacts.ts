export const useCreateContact = async (contactData: any) => {
  const { AUTH_SERVICE_URL } = useRuntimeConfig();
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  console.log(AUTH_SERVICE_URL, "ni mimi");
  return useState("contact", async () => {
    await useFetch<any>(`${AUTH_SERVICE_URL}contacts`, {
      method: "POST",
      body: contactData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });
};
export const getContacts = async () => {
  const { AUTH_SERVICE_URL } = useRuntimeConfig();
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  // console.log(AUTH_SERVICE_URL, "url");
  return useState("contacts", async () => {
    return await useFetch<any>(`${AUTH_SERVICE_URL}/contacts/old/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  });
};
