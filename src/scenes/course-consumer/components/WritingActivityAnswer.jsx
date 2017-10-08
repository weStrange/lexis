// @flow

import * as React from 'react'
import type { Writing } from 'core/types'
import type { WritingActivityAnswer as WritingActivityAnswerType } from '../types'
import { Button, TextField } from 'material-ui'
import Text from 'common-components/Text'
import styled from 'styled-components'

const AnswerInput = styled(TextField)`
  width: 100%;
  margin-bottom: 3rem;
`

type Props = {
  activity: Writing,
  activityAnswer: WritingActivityAnswerType,
  onChange: (studentAnswer: string) => void,
  onSubmit: () => void,
  onStartEdit: () => void
}

class WritingActivityAnswer extends React.Component {
  props: Props

  render () {
    const {
      activity,
      onChange,
      activityAnswer,
      onSubmit,
      onStartEdit
    } = this.props

    return (
      <div>
        <Text>{activity.question}</Text>
        <br />
        <br />
        <AnswerInput
          placeholder='Write you answer here'
          value={activityAnswer.studentAnswer}
          multiline
          disabled={activityAnswer.submitted}
          onChange={ev => {
            onChange(ev.target.value)
          }}
        />
        <br />
        <br />
        <br />
        {activityAnswer.submitted ? (
          <div>
            <Text color={'#28B463'}>Your answer has been submitted</Text>
            <Button color={'primary'} onClick={onStartEdit}>
              Edit answer
            </Button>
          </div>
        ) : (
          <Button color={'primary'} onClick={onSubmit}>
            Submit
          </Button>
        )}
      </div>
    )
  }
}

export default WritingActivityAnswer
