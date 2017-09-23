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

import type { Audio, AudioModalState } from '../types'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  dialog: {
    width: '80%',
    maxHeight: 435
  },
  input: {
    color: 'grey'
  }
})

type AudioModalProps = {
  audio: AudioModalState,
  onUrlEdit: (url: string) => void,
  onClose: () => void,
  onSave: (audio: Audio) => void,
  classes: any
}
export function AudioModal ({
  audio,
  onUrlEdit,
  onClose,
  onSave,
  classes
}: AudioModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={audio.open}
      maxWidth='s'
    >
      <DialogTitle>Add audio</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.input}
          label='Url'
          value={audio.audio.url}
          onChange={ev => onUrlEdit(ev.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            onSave(audio.audio)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(AudioModal)
