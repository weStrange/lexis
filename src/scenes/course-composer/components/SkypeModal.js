/* @flow */

import React from 'react'
import moment from 'moment'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import styled from 'styled-components'

import { BlockedTextField } from '.'

import type { Skype, SkypeModalState } from '../types'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  dialog: {
    width: '100%',
    maxHeight: 435,
    padding: '20px 20px 20px 20px'
  },
  input: {
    color: 'grey'
  }
})

type SkypeModalProps = {
  skype: SkypeModalState,
  onTopicEdit: (url: string) => void,
  onGroupToggle: () => void,
  onStartTimeChange: (time: number) => void,
  onDurationChange: (duration: number) => void,
  onClose: () => void,
  onSave: (skype: Skype) => void,
  classes: any
}
export function SkypeModal ({
  skype,
  onTopicEdit,
  onGroupToggle,
  onStartTimeChange,
  onDurationChange,
  onClose,
  onSave,
  classes
}: SkypeModalProps) {
  return (
    <Dialog
      className={classes.dialog}
      ignoreBackdropClick
      ignoreEscapeKeyUp
      open={skype.open}
      maxWidth='sm'
    >
      <DialogTitle>Skype session details</DialogTitle>
      <DialogContent>
        <form
          style={{
            padding: '25px 25px 25px 25px'
          }}
        >
          <TextField
            style={{ display: 'block', marginBottom: '15px' }}
            className={classes.input}
            label='Session topic'
            value={skype.skype.topic}
            onChange={ev => onTopicEdit(ev.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={skype.skype.group}
                onChange={ev => onGroupToggle()}
              />
            }
            label='Group session'
          />
          <BlockedTextField
            id='session-start-time'
            label='Start time'
            type='datetime-local'
            value={skype.skype.startTime}
            onChange={ev => {
              console.log(ev.target.value)
              onStartTimeChange(ev.target.value)
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <FormControl
            style={{
              display: 'block',
              width: '100%',
              marginTop: '30px'
            }}
          >
            <InputLabel htmlFor='duration'>Duration</InputLabel>
            <Select
              value={skype.skype.duration}
              onChange={ev => onDurationChange(ev.target.value)}
              input={<Input id='duration' />}
            >
              <MenuItem value={0}>No duration limit</MenuItem>
              <MenuItem value={30 * 60}>30 minutes</MenuItem>
              <MenuItem value={45 * 60}>45 minutes</MenuItem>
              <MenuItem value={1 * 60 * 60}>1 hour</MenuItem>
              <MenuItem value={1.5 * 60 * 60}>1.5 hour</MenuItem>
              <MenuItem value={2 * 60 * 60}>2 hours</MenuItem>
              <MenuItem value={2.5 * 60 * 60}>2.5 hours</MenuItem>
              <MenuItem value={3 * 60 * 60}>3 hours</MenuItem>
            </Select>
            <FormHelperText>Assess duration of the session</FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onClose}>
          Cancel
        </Button>
        <Button
          color='primary'
          onClick={() => {
            onSave(skype.skype)
            onClose()
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(SkypeModal)
