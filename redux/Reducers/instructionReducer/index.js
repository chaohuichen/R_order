import produce from 'immer'

const EDIT_INSTRUCTION = 'EDIT_INSTRUCTION'

export const editInstruction = (userInput) => ({
  type: EDIT_INSTRUCTION,
  userInput,
})

const defaultInstruction = ''

const instructionReducer = produce((draft, action) => {
  switch (action.type) {
    case EDIT_INSTRUCTION:
      draft = action.userInput
      return draft
    default:
      return draft
  }
}, defaultInstruction)

export default instructionReducer
