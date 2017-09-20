import React from 'react'
import styled from 'styled-components'
import MuiIconButton from 'material-ui/IconButton'
import { getPulsateRipple } from '../utils'

export const IconBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const RawIcon = styled.i`
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: ${({ size }) => size || '32px'};
  width: ${({ size }) => size || '32px'};
  height: ${({ size }) => size || '32px'};
  color: ${({ color, theme }) => color || theme.textColor};
  &:hover {
    transform: scale(1.5);
    animation: ${({ color, theme }) =>
        color ? getPulsateRipple(color) : getPulsateRipple(theme.textColor)}
      1.3s 1;
  }
`
const SvgIconWrapper = styled.div`
    border-radius: 50%;
    transition: all 0.3s ease;
    width: ${({ size }) => size || '46px'}; 
    height: ${({ size }) => size || '46px'};    
    margin: ${({ spacing }) => spacing};
    &:hover {
        transform: scale(1.5);
        animation: ${({ color, theme }) =>
          color
            ? getPulsateRipple(color)
            : getPulsateRipple(theme.textColor)} 1.3s 1;
`
const IconButton = styled(MuiIconButton)`
  justify-content: center;
  align-items: center;
  margin: ${props => props.spacing || '24px'};
`
const Icon = ({ onTouchTap, className, iconClassName, href, ...props }) => {
  if (onTouchTap || href) {
    return (
      <IconButton
        className={className}
        onTouchTap={onTouchTap}
        href={href}
        target='_blank'
      >
        <RawIcon className={iconClassName} {...props} />
      </IconButton>
    )
  }
  return (
    <RawIcon
      className={iconClassName}
      style={{ margin: props.spacing || 24 }}
      {...props}
    />
  )
}
export const SvgIcon = ({
  onTouchTap,
  className,
  iconClassName,
  href,
  children,
  ...props
}) => {
  if (onTouchTap || href) {
    return (
      <IconButton className={className} onTouchTap={onTouchTap} href={href}>
        {children}
      </IconButton>
    )
  }
  return (
    <SvgIconWrapper {...props} className={className}>
      {children}
    </SvgIconWrapper>
  )
}
export default Icon
