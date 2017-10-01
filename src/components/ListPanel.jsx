// @flow

import { Grid, Paper } from 'material-ui'
import Text from './Text'
import styled from 'styled-components'
import * as React from 'react'

const ContentContainer = styled(Paper)`
  padding: 1rem;
  margin: 1rem;
  minheight: 8rem;
`

const HeaderContainer = styled.div`margin-bottom: 1rem;`

type Props = {
  heading: string,
  body: string
}

const ListPanel = ({ heading, body }: Props) => {
  return (
    <Grid item xs={12} lg={4}>
      <ContentContainer>
        <HeaderContainer>
          <Text fontSize={'1.3rem'}>{heading}</Text>
        </HeaderContainer>
        <Text>{body}</Text>
      </ContentContainer>
    </Grid>
  )
}

export default ListPanel
