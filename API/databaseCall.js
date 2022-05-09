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

export const fetchData = (setDataFun, offset) => {
  const ting = offset || 1
  db.ref('/ProductData')
    // .orderByKey()
    // .limitToFirst(ting)
    .once('value', (snapshot) => {
      if (snapshot.exists()) {
        let productsData = []
        const data = snapshot.val()
        for (let item in data) {
          productsData.push({
            category: item,
            data: Object.values(data[`${item}`]).sort((a, b) => {
              if (a.rank > b.rank) {
                return 1
              } else if (a.rank < b.rank) {
                return -1
              } else {
                return 0
              }
              return 0
            }),
          })
        }

        setDataFun(productsData)
      }
    })
    .catch((err) => {
      console.log(err)
      setDataFun([])
    })
}

export const userLogin = async (userName, password) => {
  const ref = db.ref(`/users/${userName}`)
  const result = await ref.once('value')

  if (result.exists() && String(result.val().password) === String(password)) {
    return result
  } else {
    return false
  }
}

export const getUsers = async () => {
  try {
    const ref = db.ref(`/users/`)
    const result = await ref.once('value')
    if (result.exists()) {
      return result
    } else {
      return false
    }
  } catch (err) {
    console.log(err)
  }
}
