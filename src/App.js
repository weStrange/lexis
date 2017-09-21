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
  textColor: 'rgba(0, 0, 0, 0.86)'
}
const theme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.grey
  },
  type: 'dark',
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
    }
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <AppShell />
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
export default App
