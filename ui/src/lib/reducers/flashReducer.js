import { RESET_FLASH_MESSAGE } from '../actions/flashActions'

const initialState = {
  message: null,
  type: null,
}

export default function flash(state = initialState, action) {
  const { type } = action
  if (type === RESET_FLASH_MESSAGE) {
    console.log('RESET_FLASH_MESSAGE')
    return initialState // reset the flash
  } else if (action.payload && action.payload.flash) {
    const { flash } = action.payload 
    console.log('WE HAVE A FLASH HOUSTON',flash)
    return { message: flash.message, type: flash.type }
  } 
  return state 
}