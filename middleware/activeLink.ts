import { Style } from "~~/.nuxt/components"

export default defineNuxtRouteMiddleware((to, from)=>{

  const storedRoomId = useState("storeRoomId")
  if(to.fullPath.includes(`/dashboard/messenger/groups/${storedRoomId}`)){

  }
    
})