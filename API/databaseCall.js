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

export const checkPhoneMap = async (userPhoneNumber) => {
  let isExist = false;
  try {
    await database()
      .ref(`/phoneMap/${userPhoneNumber}`)
      .once("value", (snapSnap) => {
        if (snapSnap.exists()) {
          isExist = true;
        } else {
          isExist = false;
        }
      });
  } catch (err) {
    console.log(err);
  }
  return isExist;
};
