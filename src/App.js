/* flow */

import React, { Component } from 'react'
import './assets/App.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { ThemeProvider } from 'styled-components'
import * as colors from 'material-ui/colors'
import './assets/index.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import 'animate.css/animate.min.css'
import styled from 'styled-components'

const styledTheme = {
  primary: '#FF9800',
  textColor: 'rgba(255, 255, 255, 0.86)'
}
const theme = createMuiTheme({
  palette: {
    primary: colors.orange,
    secondary: colors.grey
  },
  type: 'dark',
  typography: {
    fontFamily: 'Open-sans'
  },
  overrides: {
    MuiGrid: {
      typeContainer: {
        borderRadius: '4px'
      }
    },
    MuiTab: {
      root: {
        transition: 'all 0.5s ease'
      },
      rootPrimary: {
        color: 'rgba(255,255,255, 0.5)'
      },
      rootPrimarySelected: {
        fontWeight: '800',
        letterSpacing: '1px'
      }
    }
  }
})

class App extends Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <div className='App'>
            <div className='App-header'>
              <h2>Welcome to React</h2>
            </div>
            <p className='App-intro'>
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </ThemeProvider>
      </MuiThemeProvider>
    )
  }
}
export default App
