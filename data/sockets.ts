import { io , Socket } from "socket.io-client";

const { public: { MESSAGING_SOCKET_URL }  } = useRuntimeConfig();

export const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);
