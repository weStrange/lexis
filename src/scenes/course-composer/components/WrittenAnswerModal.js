/* @flow */

import React from 'react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import CloseIcon from 'material-ui-icons/Close'

import { Text } from 'common-components'
import { BlockedTextField } from '.'

import type { WrittenAnswerEx, WrittenAnswerModal } from '../types'

const styles = theme => ({
  root: {},
  dialog: {
    padding: '20px 20px 20px 20px'
  },
  input: {
    color: 'grey'
  }
})

type WrittenAnswerModalProps = {
  writtenAnswer: WrittenAnswerModal,
  onAdd: () => void,
  onRemove: (idx: number) => void,
  onQuestionEdit: (question: string, idx: number) => void,
  onAnswerEdit: (answer: string, idx: number) => void,
  onClose: () => void,
  onSave: (writtenAnswer: WrittenAnswerEx) => void,
  classes: any
}
export function WrittenAnswer ({
  writtenAnswer,
  onQuestionEdit,
  onAnswerEdit,
  onAdd,
  onRemove,
  onClose,
  onSave,
  classes
}: WrittenAnswerModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={writtenAnswer.open}
      maxWidth='sm'
    >
      <DialogTitle>New "Full Written Answer" exercise</DialogTitle>
      <DialogContent>
        <div>
          <Text style={{ display: 'block' }}>Questions</Text>
          {writtenAnswer.exercise.items.map((p, i) => (
            <div key={i}>
              <CloseIcon
                style={{ float: 'right' }}
                onClick={e => onRemove(i)}
              />
              <Divider />
              <BlockedTextField
                id='writing-question'
                label='Question to be answered'
                multiline
                rows='2'
                rowsMax='20'
                value={p.question}
                onChange={ev => onQuestionEdit(ev.target.value, i)}
                margin='normal'
              />
              <TextField
                id='number'
                label='Correct answer'
                value={p.answer}
                onChange={ev => onAnswerEdit(ev.target.value, i)}
                InputLabelProps={{
                  shrink: true
                }}
                margin='normal'
              />
            </div>
          ))}
          <Button color='primary' raised onClick={e => onAdd()}>
            Add
          </Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            onSave(writtenAnswer.exercise)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(WrittenAnswer)
