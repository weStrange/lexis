// @flow

import * as React from 'react'
import type { User, AppState } from 'core/types'
import TeacherDashboard from './TeacherDashboard'
import StudentDashboard from './StudentDashboard'
import { connect } from 'react-redux'
import type { NavigationState } from 'core/types'

type Props = {
  nav: NavigationState
}

class Dashboard extends React.Component {
  render () {
    const { nav } = this.props

    return (
      <div>
        {nav.userRole === 'TEACHER' ? (
          <TeacherDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    nav: state.nav
  }
}

export default connect(mapStateToProps)(Dashboard)
