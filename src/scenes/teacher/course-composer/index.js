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
        <ActivityPicker />

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
