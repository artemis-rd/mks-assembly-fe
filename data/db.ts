import Dexie , {Table } from 'dexie'

export interface UserMessages{
    id?:number,
    message?:string,
    timeStamp?:string,
    sender?: any,
    receiver?:number,
    roomId?:number
}


export class MySubClassedDexie extends Dexie {
  userMessages!: Table<UserMessages>;

  constructor(){
    super('messageDatabase');
    this.version(1).stores({
        userMessages:'++id, message, timestamp'
    })
  }
}
export const db = new MySubClassedDexie();
