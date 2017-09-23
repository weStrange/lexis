/* @flow */

import React, { Component } from 'react'

import type { MainViewState } from '../types'

type ContentAreaProps = {
  mainView: MainViewState,
  actions: any
}

export default class ContentArea extends Component {
  prop: ContentAreaProps

  render () {
    return <div>Placeholder</div>
  }
}
