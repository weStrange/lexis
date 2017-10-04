// registration reducer
const initState = {
  message: '',
  loading: false,
  registered: false,
  error: false
}
const registrationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'registration-error-message':
      return { ...state, message: action.payload.message }
    case 'sending-registration-data':
      return { ...state, loading: true, error: false }
    case 'received-registration-data':
      return { ...state, loading: false, error: false, registered: true }
    case 'error-registration':
      return {
        ...state,
        loading: false,
        error: true,
        message: 'Failed to register. Try again'
      }
    default:
      return state
  }
}
export default registrationReducer
