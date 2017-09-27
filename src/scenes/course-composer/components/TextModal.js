/* @flow */

import React from 'react'

import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import type { Text, TextModalState } from '../types'

type AudioModalProps = {
  text: TextModalState,
  onContentEdit: (content: string) => void,
  onClose: () => void,
  onSave: (text: Text) => void
}
export default function AudioModal ({
  text,
  onContentEdit,
  onClose,
  onSave
}: AudioModalProps) {
  const actions = [
    <Button label='Cancel' primary={true} onClick={onClose} />,
    <Button label='Save' primary={true} disabled={true} onClick={onSave} />
  ]

  return (
    <Dialog title='Add video' actions={actions} modal={true} open={text.open}>
      <TextField hintText='Insert the text' value={text.text.content} />
    </Dialog>
  )
}
