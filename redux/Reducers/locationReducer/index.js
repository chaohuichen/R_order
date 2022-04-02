import produce from 'immer'

const EDIT_LOCATION = 'EDIT_LOCATION'

export const editLocation = (userLocation) => ({
  type: EDIT_LOCATION,
  userLocation,
})

const defaultLocation = ''

const locationReducer = produce((draft, action) => {
  switch (action.type) {
    case EDIT_LOCATION:
      draft = action.userLocation
      return draft
    default:
      return draft
  }
}, defaultLocation)

export default locationReducer
