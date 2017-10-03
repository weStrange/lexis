import React from 'react'
import styled from 'styled-components'
import registrationArt from './registration.svg'
import { Text, Icon } from 'common-components'
import TextField from 'material-ui/TextField'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fed756;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 5rem;
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

const Registration = props => (
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
      <Illustration src={registrationArt} />
      <FormBox>
        <Text color={'rgba(0,0,0, .76)'} light fontSize={'1.5rem'}>
          Welcome to Lexis
        </Text>
        <Text
          style={{ marginBottom: '1rem' }}
          color={'rgba(0,0,0, .76)'}
          light
          fontSize={'1rem'}
        >
          We need a few information from you. Please fill them all in
        </Text>
        <TextField label='Email' type='email' fullWidth required />
        <TextField label='Full name' type='text' fullWidth required />
        <TextField
          label='Birth date'
          type='date'
          fullWidth
          defaultValue={'2017-10-03'}
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
            // value={this.state.value}
            // onChange={this.handleChange}
          >
            <FormControlLabel value='male' control={<Radio />} label='Male' />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel value='other' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
        <TextField label='Password' type='password' fullWidth required />
        <TextField label='Confirm' type='password' fullWidth required />
        <Button
          raised
          style={{
            marginTop: '1rem',
            background: ' linear-gradient(to left, #36d1dc, #5b86e5)',
            padding: '1.5rem'
          }}
        >
          <Text color={'white'} bold>
            SIGN UP
          </Text>
        </Button>
      </FormBox>
    </ContentBox>
  </Wrapper>
)

export default Registration
