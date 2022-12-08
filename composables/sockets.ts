import { io } from "socket.io-client"
export const useSocketIO = () => {
    const { public: { MESSAGING_SOCKET_URL }} = useRuntimeConfig();
    return io(MESSAGING_SOCKET_URL)
}; 
