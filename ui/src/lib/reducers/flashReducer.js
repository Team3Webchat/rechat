import { RESET_FLASH_MESSAGE } from '../actions/flashActions'

const initialState = {
  message: null,
  type: null,
}

export function flash(state = initialState, action) {
  const { type, flash } = action
  if (type === RESET_FLASH_MESSAGE) {
    console.log('RESET_FLASH_MESSAGE')
    return initialState // reset the flash
  } else if (flash) {
    console.log(flash)
    return { message: flash.message, type: flash.type }
  } 
  return state 
}