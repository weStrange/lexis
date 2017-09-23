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

import type { Video, VideoModalState } from '../types'

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

type VideoModalProps = {
  video: VideoModalState,
  onUrlEdit: (url: string) => void,
  onClose: () => void,
  onSave: (audio: Video) => void,
  classes: any
}
export function VideoModal ({
  video,
  onUrlEdit,
  onClose,
  onSave,
  classes
}: VideoModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={video.open}
      maxWidth='s'
    >
      <DialogTitle>Add video</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.input}
          label='Url'
          value={video.video.url}
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
            onSave(video.video)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(VideoModal)
