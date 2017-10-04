import React from 'react'
import Topbar from './Topbar'
import SideNavigation from './SideNavigation'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _isNil from 'lodash'

const Content = styled.div`
  width: calc(100% - 265px);
  height: calc(100% - 88px);
  padding: 100px 0 0 250px;
`

class AppShell extends React.Component {
  render () {
    if (!this.props.authorized) {
      this.props.dispatch({
        type: 'set-redirect',
        payload: this.props.currentUrl
      })
      return <Redirect to='/login' />
    }
    return (
      <div>
        <Topbar />
        <SideNavigation />
        <Content>{this.props.children}</Content>
      </div>
    )
  }
}

export default connect(state => ({
  authorized: state.auth.credential,
  currentUrl: state.router.location.pathname
}))(AppShell)
