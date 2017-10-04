import React from 'react'
import styled from 'styled-components'
import loginArt from './loginIllustration.svg'
import { Text, Icon } from 'common-components'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

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

const Login = props => (
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
        <TextField
          style={{ marginTop: '1rem' }}
          inputProps={{ style: { color: 'white' }, borderColor: 'white' }}
          label={<Text color='white'>Email</Text>}
          type='email'
          fullWidth
          required
        />
        <TextField
          style={{ marginTop: '1rem' }}
          label={<Text color='white'>Password</Text>}
          inputProps={{ style: { color: 'white' }, borderColor: 'white' }}
          type='password'
          fullWidth
          required
        />
        <Button
          raised
          style={{
            marginTop: '1rem',
            background: ' linear-gradient(to left, #36d1dc, #5b86e5)',
            padding: '1.5rem'
          }}
        >
          <Text color={'white'} bold>
            LOGIN
          </Text>
        </Button>
      </FormBox>
    </ContentBox>
  </Wrapper>
)

export default Login
