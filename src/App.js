/* flow */

import React, { Component } from 'react'
import 'assets/App.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import * as colors from 'material-ui/colors'
import 'assets/index.css'
import 'assets/font-awesome-4.7.0/css/font-awesome.min.css'
import 'animate.css/animate.min.css'
import tinyColor from 'tinycolor2'
import AppShell from './scenes/app-shell/AppShell'

const primaryColor = '#5B86E5'
const styledTheme = {
  primary: primaryColor,
  textColor: 'rgba(91, 134, 229, 0.86)'
}
const muiTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.grey
  },
  typography: {
    fontFamily: 'Open-sans'
  },
  overrides: {
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: tinyColor('#36d1dc')
            .setAlpha(0.8)
            .toRgbString()
        }
      }
    },
    MuiPopover: {
      paper: {
        boxShadow:
          '0px 8px 9px -5px rgba(91, 134, 229, 0.4),0px 15px 22px 2px rgba(91, 134, 229, 0.28),0px 6px 28px 5px rgba(91, 134, 229, 0.24) !important'
      }
    }
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={styledTheme}>
          <AppShell />
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
export default App
