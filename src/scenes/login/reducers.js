const initState = {
  loading: false,
  credential: undefined,
  redirectUrl: undefined,
  error: false
}
const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'sending-credentials':
      return { ...state, loading: true, error: false }
    case 'received-login-data':
      return {
        ...state,
        credential: action.payload,
        loading: false,
        error: false
      }
    case 'login-error':
      return { ...state, loading: false, error: true }
    case 'log-out':
      return {
        ...state,
        loading: false,
        credential: undefined,
        redirectUrl: '/login',
        error: false
      }
    case 'set-redirect':
      return {
        ...state,
        redirectUrl: action.payload
      }
    default:
      return state
  }
}
export default loginReducer
