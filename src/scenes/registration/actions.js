import 'whatwg-fetch'
export const registrationError = message => ({
  type: 'registration-error-message',
  payload: {
    message
  }
})
export const register = inputs => dispatch => {
  dispatch({ type: 'sending-registration-data' })
  const inputData = {
    email: inputs.email.value,
    firstName: inputs.fullName.value.split(' ')[0],
    lastName: inputs.fullName.value.split(' ')[1],
    birthDay: inputs.birthDay.value,
    password: inputs.password.value
  }
  fetch(`./register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })
    .then(json => json.json())
    // server should sent a code if registration is complete
    .then(data =>
      dispatch({
        type: 'received-registration-data',
        payload: {
          data
        }
      })
    )
    .catch(err => {
      console.log(err)
      dispatch({ type: 'error-registration' })
    })
}
