// @flow

import * as React from 'react'
import type { WrittenAnswerEx } from 'core/types'
import type { WrittenAnswerActivityAnswer as ActivityAnswer } from '../types'
import { Button, Divider, TextField } from 'material-ui'
import { Check, Error } from 'material-ui-icons'
import Text from 'common-components/Text'
import styled from 'styled-components'

const AnswerItemContainer = styled.div`margin-bottom: 4rem;`

const CorrectAnswerIcon = styled(Check)`
  color: green;
  vertical-align: middle;
`

const WrongAnswerIcon = styled(Error)`
  color: red;
  vertical-align: middle;
`

type Props = {
  activity: WrittenAnswerEx,
  activityAnswer: ActivityAnswer,
  onChange: (studentAnswer: string, itemIdx: number) => void,
  onComplete: (itemIdx: number) => void
}

class WrittenAnswerActivityAnswer extends React.Component {
  props: Props
  renderActivityItem: Function

  constructor (props: Props) {
    super(props)

    this.renderActivityItem = this.renderActivityItem.bind(this)
  }

  handleItemCompletion (charCode: string, itemIdx: number) {
    if (charCode === 13) {
      const { onComplete } = this.props

      onComplete(itemIdx)
    }
  }

  renderAnswerValidation (correct: boolean) {
    return correct ? <CorrectAnswerIcon /> : <WrongAnswerIcon />
  }

  renderActivityItem (item: { question: string, answer: string }, i: number) {
    const { activityAnswer, onChange, onComplete } = this.props
    const itemAnswer = activityAnswer.studentAnswers.get(i)

    return (
      <AnswerItemContainer key={i}>
        <Text>{item.question}</Text>
        <br />
        <br />
        <TextField
          placeholder='Write you answer here'
          value={itemAnswer.studentAnswer}
          onChange={ev => {
            onChange(ev.target.value, i)
          }}
          onKeyPress={({ charCode }) => {
            this.handleItemCompletion(charCode, i)
          }}
        />
        <Button
          color={'primary'}
          onClick={() => {
            onComplete(i)
          }}
        >
          Check
        </Button>
        {itemAnswer.complete
          ? this.renderAnswerValidation(
              itemAnswer.studentAnswer === item.answer
            )
          : null}
        <Divider />
      </AnswerItemContainer>
    )
  }

  render () {
    const { activity } = this.props

    return <div>{activity.items.map(this.renderActivityItem)}</div>
  }
}

export default WrittenAnswerActivityAnswer
