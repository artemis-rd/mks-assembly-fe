export const useContact = () => useState("receiverContact", () => {});
export const useRoomId = () => useState("createdRoomId", () => Number);
export const useGroupRoomId = () =>
  useState("createdGroupRoomId", () => Number);
