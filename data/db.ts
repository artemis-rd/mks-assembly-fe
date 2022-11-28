import Dexie , {Table } from 'dexie'

export interface UserMessages{
    id?:number,
    message?:string,
    timeStamp?:string,
    sender?: any,
    receiver?:any,
    roomId?:number
}
export interface Rooms{
    id?:number
    startTime?:string,
    participants?:string
}
export interface User { 
    id?:number,
    name?:string
}

export class MySubClassedDexie extends Dexie {
  userMessages!: Table<UserMessages>;
  rooms!:Table<Rooms>;
  user!:Table<User>;

  constructor(){
    super('messageDatabase');
    this.version(2).stores({
        userMessages:'++id, message, timestamp',
        rooms:'id, startTime, participants',
        user:'id,name'
    })
  }
}
export const db = new MySubClassedDexie();
