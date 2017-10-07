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

import { BlockedTextField } from '.'

import type { Writing, WritingModalState } from '../types'

const styles = theme => ({
  root: {},
  dialog: {
    padding: '20px 20px 20px 20px'
  },
  input: {
    color: 'grey'
  }
})

type WritingModalProps = {
  writing: WritingModalState,
  onQuestionEdit: (question: string) => void,
  onMaxWordsEdit: (words: number) => void,
  onMinWordsEdit: (words: number) => void,
  onClose: () => void,
  onSave: (writing: Writing) => void,
  classes: any
}
export function VideoModal ({
  writing,
  onQuestionEdit,
  onMaxWordsEdit,
  onMinWordsEdit,
  onClose,
  onSave,
  classes
}: WritingModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={writing.open}
      maxWidth='sm'
    >
      <DialogTitle>Create a new writing exercise</DialogTitle>
      <DialogContent>
        <BlockedTextField
          id='writing-question'
          label='Question to be answered'
          multiline
          rows='2'
          rowsMax='20'
          value={writing.writing.question}
          onChange={ev => onQuestionEdit(ev.target.value)}
          margin='normal'
        />
        <TextField
          id='number'
          label='Min. number of words'
          value={writing.writing.minWords}
          onChange={ev => onMinWordsEdit(ev.target.value)}
          type='number'
          InputLabelProps={{
            shrink: true
          }}
          margin='normal'
        />
        <TextField
          id='number'
          label='Max. number of words'
          value={writing.writing.maxWords}
          onChange={ev => onMaxWordsEdit(ev.target.value)}
          type='number'
          InputLabelProps={{
            shrink: true
          }}
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            onSave(writing.writing)
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
