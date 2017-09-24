/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styled from 'styled-components'
import Grid from 'material-ui/Grid'

import {
  Navigation,
  ContentArea,
  ActivityPicker,
  VideoModal,
  AudioModal,
  SkypeModal,
  TextModal
} from './components'

import * as actionCreators from './action-creators'

import type { CourseComposerState, ActivityKind } from './types'
import type { AppState } from '../../../types'

const Wrapper = styled(Grid)`
  padding: 2rem;
  width: 100%;
`

type CourseComposerProps = {
  composer: CourseComposerState,
  actions: any
}
export class CourseComposer extends Component {
  props: CourseComposerProps

  componentWillMount () {
    this.props.actions.general.startComposer()
  }

  render () {
    const { composer, actions } = this.props

    return (
      <Wrapper container spacing={24}>
        <Navigation
          breadcrumbs={composer.breadcrumbs}
          mainView={composer.mainView}
          actions={actions}
        />

        <ActivityPicker
          picker={composer.activityPicker}
          activityArea={composer.mainView.selectedActivityArea}
          onItemSelect={actions.activityPicker.select}
        />

        <VideoModal
          video={composer.videoModal}
          onUrlEdit={actions.video.editUrl}
          onClose={actions.video.close}
          onSave={actions.course.setMainActivity}
        />
        <AudioModal
          audio={composer.audioModal}
          onUrlEdit={actions.audio.editUrl}
          onClose={actions.audio.close}
          onSave={
            composer.mainView.selectedActivityArea === 'main' ? (
              actions.course.setMainActivity
            ) : (
              actions.course.setSecondaryActivity
            )
          }
        />
        {/* <SkypeModal />  */}
        {/* <TextModal /> */}
      </Wrapper>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    composer: state.teacher.courseComposer
  }
}

function mapDispatchToProsp (dispatch) {
  return {
    actions: {
      activityPicker: bindActionCreators(
        actionCreators.activityPicker,
        dispatch
      ),
      audio: bindActionCreators(actionCreators.audioActions, dispatch),
      skype: bindActionCreators(actionCreators.skypeActions, dispatch),
      text: bindActionCreators(actionCreators.textActions, dispatch),
      video: bindActionCreators(actionCreators.videoActions, dispatch),
      course: bindActionCreators(actionCreators.courseActions, dispatch),
      exercise: bindActionCreators(actionCreators.exerciseActions, dispatch),
      lesson: bindActionCreators(actionCreators.lessonActions, dispatch),
      level: bindActionCreators(actionCreators.levelActions, dispatch),
      general: bindActionCreators(actionCreators.generalActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProsp)(CourseComposer)
