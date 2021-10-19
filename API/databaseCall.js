import { db } from './FirebaseDatabase'

/*
param: userUid, phone number
userId:String
phoneNumber:String
return:nothing 
des:
*/

export const setPhoneMap = async (phoneNumber, userUid) => {
  await db.ref(`/phoneMap/${phoneNumber}/`).set(userUid)
}

export const checkPhoneMap = async (userPhoneNumber) => {
  // let isExist = false
  try {
    await db.ref(`/phoneMap/${userPhoneNumber}`).once('value', (snapShot) => {
      if (snapShot.exists()) {
        isExist = true
      } else {
        isExist = false
      }
    })
  } catch (err) {
    console.log(err)
  }
  return isExist
}

export const setUserData = (payload) => {
  try {
    db.ref(`/users/${payload.uid}/userSharedData/`).set(payload)
  } catch (err) {
    console.log('user ', err)
  }
}
export const getUserData = (uid) => {
  console.log('uid ', uid)
}

export const setSupplyToDatabase = (payload, category) => {
  switch (category) {
    case 'Coffee Beans':
      db.ref(`/productData/Coffee Beans/${payload.name}/`).set(payload)
      break
    case 'Cups':
      db.ref(`/productData/Cups/${payload.name}/`).set(payload)
      break
    default:
      break
  }
}

export const fetchData = (setDataFun) => {
  db.ref('/productData')
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        let productsData = []
        for (let key in snapshot.val()) {
          let title = key
          let data = Object.values(snapshot.val()[`${title}`])
          if (title && data) {
            let payload = {
              title,
              data,
            }
            productsData.push(payload)
          }
        }
        // setData(productsData)
        setDataFun(productsData)
      }
    })
    .catch((err) => {
      console.log(err)
      setDataFun([])
    })
}
