import React from 'react'
import Button from 'material-ui/Button'
import styled from 'styled-components'

const AddButton = styled(Button)`
  position: fixed !important;
  bottom: 50px;
  right: 50px;
`
type ActionButtonProps = {
  children: any,
  color?: string,
  ariaLabel?: string
}
export default function ActionButton ({
  children,
  color = 'primary',
  ariaLabel = 'add'
}: ActionButtonProps) {
  return (
    <AddButton fab color={color} aria-label={ariaLabel}>
      {children}
    </AddButton>
  )
}
