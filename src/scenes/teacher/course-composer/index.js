/* @flow */

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styled from 'styled-components'
import Grid from 'material-ui/Grid'

import {
  Breadcrumbs,
  ContentArea,
  ActivityPicker,
  VideoModal,
  AudioModal,
  SkypeModal,
  TextModal,
  MultiOptionModal,
  WrittenAnswerModal
} from './components'

import type { CourseComposerState } from './types'
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

  render () {
    return (
      <Wrapper container spacing={24}>
        <Breadcrumbs />
        <ContentArea />
        <ActivityPicker selectedItemIdx={0} />

        <VideoModal />
        <AudioModal />
        <SkypeModal />
        <TextModal />
        <MultiOptionModal />
        <WrittenAnswerModal />
      </Wrapper>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {}
}

function mapDispatchToProsp (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProsp)(CourseComposer)
