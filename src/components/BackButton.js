import React from 'react'
import Button from 'material-ui/Button'
import ArrowBackIcon from 'material-ui-icons/ArrowBack'
import styled from 'styled-components'

type ActionButtonProps = {
  color?: string,
  ariaLabel?: string,
  onClick?: () => void,
  style?: any
}
export default function BackButton ({
  color = 'primary',
  ariaLabel = 'back',
  onClick = () => {},
  style = {}
}: ActionButtonProps) {
  return (
    <Button
      raised
      color={color}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        margin: '15px 15px 15px 15px',
        ...style
      }}
    >
      <ArrowBackIcon />
    </Button>
  )
}
