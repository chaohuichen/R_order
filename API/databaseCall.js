import { db } from "./FirebaseDatabase";

/*
param: userUid, phone number
userId:String
phoneNumber:String
return:nothing 
des:
*/
export const setPhoneMap = async (phoneNumber, userUid) => {
  await db.ref(`/phoneMap/${phoneNumber}/`).set(userUid);
};

/*
param: userUid
userId:String
phoneNumber:String
return:user videos
des:
*/
