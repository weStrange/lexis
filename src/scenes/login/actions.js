import 'whatwg-fetch'
export const sendCredential = credentials => dispatch => {
  dispatch({ type: 'sending-credentials' })
  return fetch('./login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(json => json.json())
    .then(data =>
      dispatch({
        type: 'received-login-data',
        payload: data
      })
    )
    .catch(err => dispatch({ type: 'login-error' }))
}
