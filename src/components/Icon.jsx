import React from 'react'
import styled from 'styled-components'
import MuiIconButton from 'material-ui/IconButton'

export const IconBox = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const RawIcon = styled.i`
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: ${({ size }) => size || '32px'};
  color: ${({ color, theme }) => color || theme.primary};
  margin: ${({ spacing }) => spacing || '1rem'};
`
const SvgIconWrapper = styled.div`
  border-radius: 50%;
  transition: all 0.3s ease;
  width: ${({ size }) => size || '46px'};
  height: ${({ size }) => size || '46px'};
  margin: ${({ spacing }) => spacing};
`
const IconButton = styled(MuiIconButton)`
  justify-content: center;
  align-items: center;
  margin: ${props => props.spacing || '1rem'};
`
export const Icon = ({
  onClick,
  className,
  iconClassName,
  href,
  spacing,
  ...props
}) => {
  if (onClick || href) {
    return (
      <IconButton
        className={className}
        onClick={onClick}
        href={href}
        target='_blank'
        style={{ margin: spacing || '0rem' }}
      >
        <RawIcon spacing={'0'} className={iconClassName} {...props} />
      </IconButton>
    )
  }
  return <RawIcon className={iconClassName} {...props} />
}
export const SvgIcon = ({
  onClick,
  className,
  iconClassName,
  href,
  children,
  ...props
}) => {
  if (onClick || href) {
    return (
      <IconButton className={className} onClick={onClick} href={href}>
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
