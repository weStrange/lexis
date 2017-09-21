import React from 'react'
import styled from 'styled-components'
import Text from './Text'
import { grey } from 'material-ui/colors'

const HeaderWrapper = styled.div`width: 100%;`
const TextBox = styled.div`text-align: center;`
const Title = styled(Text)`
  font-size: 3rem;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
  }
`
const Subtitle = styled(Text)`
  font-size: 1.5rem;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`
const Header = props => (
  <HeaderWrapper style={props.style}>
    <TextBox>
      <Title medium color={props.color || grey[900]}>
        {props.main}
      </Title>
      <Title medium primary>
        {props.mainColored}
      </Title>
    </TextBox>
    <TextBox>
      <Subtitle light fontSize={'18px'} color={props.color || grey[900]}>
        {props.subtitle}
      </Subtitle>
    </TextBox>
  </HeaderWrapper>
)

export default Header
