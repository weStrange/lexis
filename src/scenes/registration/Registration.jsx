import React from 'react'
import styled from 'styled-components'
import registrationArt from './registration.svg'
import winner from './winner.svg'
import { Text } from 'common-components'
import muiTextField from 'material-ui/TextField'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import moment from 'moment'
import { registrationError, register } from './actions'
import { Redirect, Link } from 'react-router-dom'

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fed756;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 5rem;
  animation: slideInLeft 0.7s ease 1;
`
const Illustration = styled.img`
  right: 5rem;
  width: 500px;
  height: auto;
  animation: fadeIn 1s ease 1;
  margin-left: auto;
  margin-right: auto;
`
const ContentBox = styled.div`
  height: auto;
  margin-top: 5vh;
`
const TextBox = styled.div`margin-bottom: 3rem;`

const FormBox = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  height: auto;
  animation: fadeInBottom 1s ease 1;
`
const TextField = styled(muiTextField)`margin-top: 1rem !important;`
const CountdownBox = styled(FormBox)`animation: zoomInTop 0.7s ease 1;`

// utilities functions
function validateEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
function checkPassword (str) {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters that are letters, numbers or the underscore
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
  return re.test(str)
}

class Registration extends React.Component {
  state = {
    input: {
      email: {
        value: '',
        error: false
      },
      fullName: {
        value: '',
        error: false
      },
      birthDay: {
        value: null,
        error: false
      },
      gender: {
        value: null
      },
      password: {
        value: null,
        error: false
      },
      confirmPassword: {
        value: null,
        error: false
      }
    },
    counterLeft: 5
  }
  componentWillUnmount = () => {
    window.clearInterval(this.state.timer)
  }
  componentWillReceiveProps (nextProps) {
    // if registration success, hide all input, show success screen for 5 second, then redirect user to login

    if (nextProps.success) {
      const timer = window.setInterval(() => {
        this.setState(prev => ({ counterLeft: prev.counterLeft - 1 }))
      }, 1000)
      this.setState({ timer })
    }
  }
  validate = {
    email: value => validateEmail(value),
    password: value => checkPassword(value),
    fullName: value => {
      return !(value === '')
    },
    confirmPassword: (value, password) => password && password === value,
    birthDay: value => {
      const parsedTime = moment(value)
      // birthday cannot be in the future
      if (parsedTime.isAfter(moment())) return false
      // application is for people who is above 5 years old, and is within human longevity
      const fiveYearsAgo = moment().subtract(5, 'years')
      const oneHundredTwentyYearsAgo = moment().subtract(120, 'years')
      return parsedTime.isBetween(oneHundredTwentyYearsAgo, fiveYearsAgo)
    },
    gender: value => true
  }
  onInputChange = (e, inputType) => {
    let isError = false
    let value = e.target.value
    if (inputType === 'confirmPassword')
      isError = !this.validate[inputType](
        this.state.input.password.value,
        value
      )
    else isError = !this.validate[inputType](e.target.value)
    this.setState(prev => ({
      input: {
        ...prev.input,
        [inputType]: {
          value: value,
          error: isError
        }
      }
    }))
  }
  submit = e => {
    // check if theres any error
    const inputs = Object.keys(this.state.input)
    let isError = false
    inputs.forEach(name => {
      // run all validation on existing input again
      const localError = !this.validate[name](this.state.input[name].value)
      console.log(name, localError)
      isError = localError && isError
      this.setState(prev => ({
        input: {
          ...prev.input,
          [name]: { ...prev.input[name], error: localError }
        }
      }))
    })
    // if there is a error, flash the message
    this.props.dispatch(registrationError('Please correct all of your input'))
    // if input is clean, then dispatch it to the store to make asynchronous call
    this.props.dispatch(register(this.state.input))
  }
  render () {
    return (
      <Wrapper>
        <ContentBox>
          <TextBox>
            <Text color={'white'} medium fontSize={'5rem'}>
              LEXIS{' '}
            </Text>
            <Text normal color={'white'} light fontSize={'3rem'}>
              Registration
            </Text>
          </TextBox>
          {/* if registration is complete, change artwork */}
          <Illustration src={this.props.success ? winner : registrationArt} />
          {!this.props.success ? ( // if successfully registered, hide the inputs, and show redirection countdown
            <FormBox>
              <Text color={'rgba(0,0,0, .76)'} light fontSize={'1.5rem'}>
                Welcome to Lexis
              </Text>
              <Text
                style={{ marginBottom: '1rem' }}
                color={!this.props.message ? 'rgba(0,0,0, .76)' : 'red'}
                light
                fontSize={'1rem'}
              >
                {!this.props.message
                  ? 'We need a few information from you. Please fill them all in'
                  : this.props.message}
              </Text>
              <Text
                style={{ marginBottom: '1rem' }}
                color={!this.props.message ? 'rgba(0,0,0, .76)' : 'red'}
                light
                fontSize={'0.8rem'}
              >
                Already have an account?{' '}
                <Link
                  to='/login'
                  style={{ fontWeight: 'bold', color: 'white' }}
                >
                  Log in here
                </Link>
              </Text>
              <TextField
                error={this.state.input.email.error}
                onChange={e => this.onInputChange(e, 'email')}
                label='Email'
                type='email'
                fullWidth
                required
                value={this.state.input.email.value}
                helperText={
                  this.state.input.email.error && 'Email is wrong format'
                }
              />
              <TextField
                error={this.state.input.fullName.error}
                onChange={e => this.onInputChange(e, 'fullName')}
                label='Full name'
                type='text'
                fullWidth
                required
                value={this.state.input.fullName.value}
                helperText={
                  this.state.input.fullName.error && 'Full name is required!'
                }
              />
              <TextField
                error={this.state.input.birthDay.error}
                onChange={e => this.onInputChange(e, 'birthDay')}
                label='Birth date'
                type='date'
                fullWidth
                required
                defaultValue={'2017-10-03'}
                value={this.state.input.birthDay.value}
                helperText={
                  this.state.input.birthDay.error &&
                  'Birthday cannot be in the future. You must be above 5 and under 120 years old'
                }
              />
              <FormControl
                style={{ marginTop: '16px' }}
                component='fieldset'
                error={false}
              >
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup
                  aria-label='gender'
                  name='gender'
                  row
                  value={this.state.input.gender.value}
                  onChange={e => this.onInputChange(e, 'gender')}
                >
                  <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='Male'
                  />
                  <FormControlLabel
                    value='female'
                    control={<Radio />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='other'
                    control={<Radio />}
                    label='Other'
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                error={this.state.input.password.error}
                onChange={e => this.onInputChange(e, 'password')}
                label='Password'
                type='password'
                fullWidth
                required
                value={this.state.input.password.value}
                helperText={
                  this.state.input.password.error &&
                  'at least one number, one lowercase and one uppercase letter. Minimum 6 characters'
                }
              />
              <TextField
                error={this.state.input.confirmPassword.error}
                onChange={e => this.onInputChange(e, 'confirmPassword')}
                label='Confirm'
                type='password'
                fullWidth
                required
                value={this.state.input.confirmPassword.value}
                helperText={
                  this.state.input.confirmPassword.error &&
                  'Does not match with password'
                }
              />
              <Button
                raised
                style={{
                  marginTop: '1rem',
                  background: ' linear-gradient(to left, #36d1dc, #5b86e5)',
                  padding: '1.5rem'
                }}
                onClick={this.submit}
                disabled={this.props.loading}
              >
                <Text color={'white'} bold>
                  {!this.props.loading ? 'SIGN UP' : 'SIGNING UP...'}
                </Text>
              </Button>
            </FormBox>
          ) : (
            <CountdownBox>
              <Text color={'white'} medium fontSize={'2rem'}>
                Congratulations!
              </Text>
              <Text color={'green'} medium fontSize={'1.5rem'}>
                You have successfully registered!
              </Text>
              <Text color={'white'} medium fontSize={'1rem'}>
                You will be redirected to the login page in{' '}
                <Text bold fontSize={'1.3rem'} color='white'>
                  {this.state.counterLeft}
                </Text>
              </Text>
              {this.state.counterLeft < 0 && <Redirect to='./login' />}
            </CountdownBox>
          )}
        </ContentBox>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  message: state.registration.message,
  loading: state.registration.loading,
  success: state.registration.registered,
  failure: state.registration.error
})

export default connect(mapStateToProps)(Registration)
