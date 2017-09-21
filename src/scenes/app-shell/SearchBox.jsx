import React from 'react'
import styled from 'styled-components'
import { Text, Icon, CenterBox } from 'common-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0 1rem 0 1rem;
  width: 100%;
`
const SearchBox = props => (
  <Container>
    <Icon iconClassName='fa fa-search' size='1.5em' spacing={'18px'} />
    <Text primary normal fontSize={'1.2rem'}>
      {' '}
      Type to search{' '}
    </Text>
  </Container>
)

export default SearchBox
