import React from 'react'
import styled from 'styled-components'
import MuiMenu, { MenuItem } from 'material-ui/Menu'
import { Text, Icon } from 'common-components'
const white = 'rgba(255, 255, 255, 0.86)'

const Menu = styled(MuiMenu)`
  z-index: 10000 !important;
  transform: translate3d(0, 35%, 0) !important;
  position: relative;
  overflow: visible !important;
  &::after {
    content: '';
    position: absolute;
    top: -18px;
    left: 12%;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`

class SettingsMenu extends React.PureComponent {
  state = {
    anchorEl: null,
    open: false
  }
  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render () {
    return (
      <div>
        <Icon
          spacing='12px'
          color={white}
          iconClassName='fa fa-cog'
          size='1.3rem'
          onClick={this.handleClick}
        />
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <Text primary>Profile</Text>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <Text primary>My account</Text>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <Text primary>Logout</Text>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default SettingsMenu
