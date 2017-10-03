/* @flow */

import React from 'react'
import styled from 'styled-components'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import { Icon, CenterBox } from '.'

const Container = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0 2rem 0 1rem;
  width: 100%;
`

type SearchBoxProps = {
  text: string,
  onChange: (val: string) => void
}

const SearchBox = ({ text, onChange }: SearchBoxProps) => (
  <Container elevation={3}>
    <Icon iconClassName='fa fa-search' size='1.5em' spacing={'18px'} />
    <TextField
      id='full-width'
      placeholder='Search'
      value={text}
      onChange={ev => onChange(ev.target.value)}
      fullWidth
      margin='normal'
    />
  </Container>
)

export default SearchBox
