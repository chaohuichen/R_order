import { db } from './FirebaseDatabase'
import axios from 'axios'
const api_key =
  'lchB_tLREOYMayRaMKrDlFKQIWgEAg0d1y_Nf5kxCG_B6vuptHAXv2E-OA9G7Mw1KBqZ4ycq8Kv3d2RwMUUXxVToUQXgx625w_WkXSWQf7WHhLX6vhbpPUU8fKlwYHYx'

const yelpUrl = 'https://api.yelp.com/v3/businesses'
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
  db.ref('/locations')
    .once('value', async (snapshot) => {
      if (snapshot.exists()) {
        let productsData = []
        const data = snapshot.val()

        for (let item in data) {
          // console.log(data[`${item}`])

          let dataObj = data[`${item}`]
          let dataInObj = Object.values(dataObj.ResData).filter(
            (singleEle) => singleEle !== undefined
          )
          // console.log(dataObj)
          //call yelp api

          const config = {
            headers: {
              Authorization: `Bearer ${api_key}`,
            },
            params: {
              location: 'NYC',
            },
          }
          // console.log('hello', dataObj)
          // for (let singleData of dataObj.ResData) {
          //   if (singleData.yelpID) {
          //     const response = await axios.get(
          //       `${yelpUrl}/${singleData.yelpID}`,
          //       config
          //     )
          //     singleData.is_closed = response.data.is_closed
          //     singleData.hours = response.data.hours
          //   }
          // }

          productsData.push({
            category: item,
            data: dataInObj.sort((a, b) => {
              if (a.rank > b.rank) {
                return 1
              } else if (a.rank < b.rank) {
                return -1
              } else {
                return 0
              }
            }),
            rank: dataObj.rank,
          })
        }
        productsData.sort((a, b) => {
          if (a.rank > b.rank) {
            return 1
          } else if (a.rank < b.rank) {
            return -1
          } else {
            return 0
          }
        })
        // call the yelp

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

export const fetchReceviers = async (setReceivers, handleReceiverChange) => {
  try {
    const ref = db.ref('/receivers/')
    const result = await ref.once('value')

    if (result.exists()) {
      const receiversArr = Array.from(result.val()).filter(
        (val) => val !== undefined
      )
      receiversArr.forEach((singleRec) => {
        if (singleRec.selected) {
          handleReceiverChange(singleRec)
        }
      })
      setReceivers(receiversArr)
    }
  } catch (err) {
    console.log(err)
  }
}
