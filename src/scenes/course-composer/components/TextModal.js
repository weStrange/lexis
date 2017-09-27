/* @flow */

import React from 'react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

import type { Text, TextModalState } from '../types'

const styles = theme => ({
  dialog: {
    width: '100%',
    padding: '20px 20px 20px 20px'
  },
  input: {
    color: 'grey'
  }
})

type TextModalProps = {
  text: TextModalState,
  onTextEdit: (text: string) => void,
  onClose: () => void,
  onSave: (text: Text) => void,
  classes: any
}
export function TextModal ({
  text,
  onTextEdit,
  onClose,
  onSave,
  classes
}: TextModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={text.open}
      maxWidth='sm'
    >
      <DialogTitle>Paste your text content below</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.input}
          multiline
          rows={20}
          maxRows={7000}
          label='Text content'
          value={text.text.content}
          onChange={ev => onTextEdit(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            onSave(text.text)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(TextModal)
