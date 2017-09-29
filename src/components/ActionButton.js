import React from 'react'
import Button from 'material-ui/Button'
import styled from 'styled-components'

type ActionButtonProps = {
  children: any,
  color?: string,
  ariaLabel?: string,
  onClick?: () => void,
  style?: any
}
export default function ActionButton ({
  children,
  color = 'primary',
  ariaLabel = 'add',
  onClick = () => {},
  style = {}
}: ActionButtonProps) {
  return (
    <Button
      fab
      color={color}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '50px',
        ...style
      }}
    >
      {children}
    </Button>
  )
}
