/* @flow */

import React from 'react'

import { Text } from 'common-components'
import { ContentArea, CourseEditor, LevelEditor } from '.'

import type { BreadcrumbsState, MainViewState } from '../types'

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsState,
  mainView: MainViewState,
  actions: any
}
class Breadcrumbs extends React.Component {
  props: BreadcrumbsProps

  getStepContent (level: string | null, lesson: string | null) {
    let stepIndex = this.getStepIndex(level, lesson)
    const { mainView, actions } = this.props

    switch (stepIndex) {
      case 0:
        // display course edit view
        return (
          <CourseEditor
            course={mainView.course}
            onNameEdit={actions.course.editName}
            onDifficultyEdit={actions.course.editDifficulty}
            onDescriptionEdit={actions.course.editDescription}
            onLevelAdd={actions.level.add}
            onLevelSelect={actions.level.select}
          />
        )

      case 1:
        // display level edit view
        return (
          <LevelEditor
            level={mainView.course.levels.get(mainView.currentLevelIdx)}
            onNameEdit={name =>
              actions.level.editName(name, mainView.currentLevelIdx)}
            onDescriptionEdit={desc =>
              actions.level.editDescription(desc, mainView.currentLevelIdx)}
            onLessonAdd={actions.lesson.add}
            onLessonSelect={actions.lesson.select}
          />
        )

      case 2:
        // display lesson edit view here
        return (
          <ContentArea
            mainView={mainView}
            onExerciseAdd={actions.exercise.add}
            onExerciseSelect={actions.exercise.select}
            onActivitySelect={actions.course.selectActivityArea}
          />
        )

      default:
        return null
    }
  }

  renderContent (level: string | null, lesson: string | null) {
    const contentStyle = { margin: '0 16px', overflow: 'hidden' }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(level, lesson)}</div>
        {/*
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label='Back'
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onClick={this.handleNext}
          />
        </div> */}
      </div>
    )
  }

  getStepIndex (level: string | null, lesson: string | null): number {
    if (level === null && lesson === null) {
      return 0
    } else if (level !== null && lesson === null) {
      return 1
    } else if (level !== null && lesson !== null) {
      return 2
    }

    return 0
  }

  render () {
    const { mainView, actions } = this.props
    let level =
      mainView.currentLevelIdx >= 0 &&
      mainView.course.levels.get(mainView.currentLevelIdx)
        ? mainView.course.levels.get(mainView.currentLevelIdx).name
        : null
    let lesson =
      mainView.currentLessonIdx >= 0 &&
      mainView.currentLevelIdx >= 0 &&
      mainView.course.levels.get(mainView.currentLevelIdx)
        ? mainView.course.levels
            .get(mainView.currentLevelIdx)
            .lessons.get(mainView.currentLessonIdx).name
        : null

    return (
      <div style={{ width: '100%', display: 'block' }}>
        <div>
          <Text
            style={{ cursor: 'pointer' }}
            onClick={() => {
              actions.lesson.select(-1)
              actions.level.select(-1)
            }}
          >
            {mainView.course.name}
          </Text>
          {level ? (
            <span>
              <Text style={{ marginLeft: '20px', marginRight: '20px' }}>></Text>
              <Text
                style={{ cursor: 'pointer' }}
                onClick={() => actions.lesson.select(-1)}
              >
                {level}
              </Text>
            </span>
          ) : null}

          {lesson ? (
            <span>
              <Text style={{ marginLeft: '20px', marginRight: '20px' }}>></Text>
              <Text>{lesson}</Text>
            </span>
          ) : null}
        </div>
        {this.renderContent(level, lesson)}
      </div>
    )
  }
}

export default Breadcrumbs
