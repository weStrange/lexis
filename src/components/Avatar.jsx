import React from 'react'
import styled from 'styled-components'
import MuiAvatar from 'material-ui/Avatar'
import stockAvatar from 'assets/default-avatar.svg'

const Avatar = ({ src, ...props }) => (
  <MuiAvatar src={src || stockAvatar} {...props} />
)
export default styled(Avatar)`
  width: ${props => props.size} !important;
  height: ${props => props.size} !important;
  background-color: ${props =>
    props.backgroundColor || props.theme.primary} !important;
`
