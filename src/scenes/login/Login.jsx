import React from 'react'
import styled from 'styled-components'
import loginArt from './loginIllustration.svg'
import { Text, Icon } from 'common-components'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { red } from 'material-ui/colors'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { sendCredential } from './actions'

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #5b86e5;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`
const Illustration = styled.img`
  right: 5rem;
  width: 600px;
  height: auto;
  animation: fadeIn 1s ease 1;
`
const ContentBox = styled.div`
  height: auto;
  margin-top: 10vh;
`
const TextBox = styled.div`margin-bottom: 3rem;`

const FormBox = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  height: auto;
`
const ErrorText = styled(Text)`
  color: ${red[500]};
  ${props => props.hasError && 'animation: shake 0.3s ease 1'};
`
// utilities functions
function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
class Login extends React.Component {
  state = {
    email: {
      value: '',
      error: ''
    },
    password: {
      value: ''
    }
  }
  handleEmailInput = value => {
    this.setState({
      email: {
        value,
        error: !validateEmail(value)
      }
    })
  }
  handlePasswordInput = value => {
    this.setState({
      password: {
        value
      }
    })
  }
  handleSubmit = () => {
    if (
      this.state.email.value === '' ||
      this.state.email.error ||
      this.state.password.value === 0
    ) {
      this.setState({ errorMessage: 'Email or password is lacking' })
      return
    }
    // if everything is ok, dispatch action requiring user info and the token!
    this.props.dispatch(
      sendCredential({
        email: this.state.email.value,
        password: this.state.password.value
      })
    )
  }
  render () {
    if (this.props.authorized)
      return <Redirect to={this.props.redirectUrl || '/dashboard'} />
    return (
      <Wrapper>
        <ContentBox>
          <TextBox>
            <Text color={'white'} medium fontSize={'5rem'}>
              LEXIS{' '}
            </Text>
            <br />
            <Text normal color={'white'} light fontSize={'2rem'}>
              An online language course platform
            </Text>
          </TextBox>
          <Illustration src={loginArt} />
          <FormBox>
            <Text color={'white'} light fontSize={'1.5rem'}>
              Welcome to Lexis
            </Text>
            {this.props.hasError && (
              <ErrorText> Incorrect username or password </ErrorText>
            )}
            {this.state.errorMessage && (
              <ErrorText>{this.state.errorMessage}</ErrorText>
            )}
            <TextField
              style={{ marginTop: '1rem' }}
              inputProps={{ style: { color: 'white' }, borderColor: 'white' }}
              label={<Text color='white'>Email</Text>}
              type='email'
              fullWidth
              onChange={e => this.handleEmailInput(e.target.value)}
              error={this.state.email.error}
              helperText={this.state.email.error && 'Not a valid email'}
              value={this.state.email.value}
            />
            <TextField
              style={{ marginTop: '1rem' }}
              label={<Text color='white'>Password</Text>}
              inputProps={{ style: { color: 'white' }, borderColor: 'white' }}
              type='password'
              fullWidth
              onChange={e => this.handlePasswordInput(e.target.value)}
              value={this.state.password.value}
              error={this.state.errorMessage}
              helperText={this.state.errorMessage && 'Forgot password?'}
            />
            <Button
              raised
              style={{
                marginTop: '1rem',
                background: ' linear-gradient(to left, #36d1dc, #5b86e5)',
                padding: '1.5rem'
              }}
              onClick={this.handleSubmit}
              disabled={this.props.loading}
            >
              <Text color={'white'} bold>
                {this.props.loading ? 'LOGINING IN...' : 'LOGIN'}
              </Text>
            </Button>
          </FormBox>
        </ContentBox>
      </Wrapper>
    )
  }
}

export default connect(state => ({
  loading: state.auth.loading,
  hasError: state.auth.error,
  authorized: state.auth.credential !== undefined,
  redirectUrl: state.auth.redirectUrl
}))(Login)
