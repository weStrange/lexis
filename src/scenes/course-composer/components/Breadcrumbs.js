/* @flow */

import React from 'react'

import { Text } from 'common-components'
import { CourseEditor, LevelEditor } from '.'

import type { BreadcrumbsState, MainViewState } from '../types'

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsState,
  mainView: MainViewState,
  actions: any
}
export function Breadcrumbs ({}) {
  return null
  /*
  return (
    <div
      style={{
        width: '100%',
        marginLeft: '50px',
        marginTop: '30px',
        display: 'block'
      }}
    >
      <div
        style={{
          marginBottom: '18px'
        }}
      >
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
  ) */
}

export default Breadcrumbs
