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
  root: {},
  dialog: {
    padding: '20px 20px 20px 20px'
  },
  input: {
    color: 'grey'
  }
})

type VideoModalProps = {
  video: VideoModalState,
  onUrlEdit: (url: string) => void,
  onClose: () => void,
  onSave: (video: Video) => void,
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
      maxWidth='sm'
    >
      <DialogTitle>Input YouTube video ID</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.input}
          label='Video ID'
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
