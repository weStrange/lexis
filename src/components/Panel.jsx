// @flow

import React, { cloneElement } from 'react'
import styled from 'styled-components'
import Text from './Text'
import { grey } from 'material-ui/colors'
import { getPulsateRipple } from '../utils'
import ButtonBase from 'material-ui/ButtonBase'

// styled-components
const FullSizeWrapper = styled.div`
  padding: 24px;
  padding-left: 40px;
  border-left: 1px white solid;
  position: relative;
  transition: width 0.7s ease;
`
const CollapsibleWrapper = styled.div`
  transition: all 0.7s ease;
  max-height: ${props => (props.open ? '500px' : '0px')};
  overflow: hidden;
`
const Body = styled.div`
  width: 100%;
  margin-bottom: 12px;
`
const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`
const HeaderWrapper = styled(ButtonBase)`
  cursor: pointer !important;
  display: flex !important;
  flex-direction: row !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  position: relative !important;
  background-color: transparent !important;
  justify-content: flex-start !important;
  width: 100% !important;
  transition: background-color 0.3s ease !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }
  &::after {
    display: ${props => (props.hasDot ? 'block' : 'none')};
    transition: 0.7s ease;
    content: '';
    position: absolute;
    transform: translateX(calc(-55% - 40px));
    left: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px white solid;
    animation-name: ${props => props.active && getPulsateRipple('white')};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    background-color: ${({ active }) => (active ? 'white' : grey[900])};
  }
`
const HeaderIcon = styled.div`margin-right: 12px;`
const HeaderLabel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`
const SkillTag = styled(Text)`
  padding: 5px;
  margin-right: 12px;
  margin-bottom: 2px;
  background-color: transparent;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
  &::after {
    transition: all 0.3s ease;
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    z-index: 3;
    border-bottom: 2px transparent solid;
  }
  &:hover {
    letter-spacing: 2px;
    &::after {
      width: 100%;
      border-color: ${({ theme }) => theme.primary};
    }
  }
`

const AnchorRoot = styled.div`
  align-self: center;
  position: absolute;
  left: 0;
  transform: translate3d(calc(-100% - 56px), 0, 0);
`
const Timestamp = props => (
  <AnchorRoot>
    <Text light fontSize={'14px'} style={{ marginRight: 8 }}>
      {props.children}
    </Text>
  </AnchorRoot>
)
export const Header = props => (
  <HeaderWrapper
    onClick={props.onClick}
    disabled={!props.onClick}
    active={props.open}
    hasDot={props.hasDot}
    fullWidth
  >
    {props.hasDot && <Timestamp>{props.timestamp}</Timestamp>}
    {props.leftIcon && <HeaderIcon> {props.leftIcon} </HeaderIcon>}
    <HeaderLabel>
      <Text
        style={{ textAlign: 'left' }}
        medium
        fontSize={'20px'}
        color={props.headerColor}
      >
        {props.title}
      </Text>
      <Text
        style={{ textAlign: 'left' }}
        normal
        light
        color={props.headerColor}
        fontSize={'14px'}
      >
        {props.subtitle}
      </Text>
    </HeaderLabel>
  </HeaderWrapper>
)
const Panel = props => (
  <FullSizeWrapper>
    <Header
      hasDot={props.hasDot ? props.hasDot : true}
      onClick={props.onClick}
      leftIcon={props.leftIcon}
      title={props.title}
      subtitle={props.subtitle}
      open={props.open}
      timestamp={props.timestamp}
      headerColor={props.headerColor || 'white'}
    />
    <CollapsibleWrapper open={props.open}>
      <Body>{props.children}</Body>
      <Footer>
        {props.open &&
          props.tags &&
          props.tags.map((tag, index) => (
            <SkillTag key={`tag-${index}`} bold fontSize={'14px'}>
              #{tag}
            </SkillTag>
          ))}
      </Footer>
    </CollapsibleWrapper>
  </FullSizeWrapper>
)

export default Panel
