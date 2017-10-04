export default function logout (dispatch) {
  window.localStorage.removeItem('credentials')
  return {
    type: 'log-out'
  }
}
