/* flow */

import React from 'react'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'

const dimBlack = 'rgba(0,0,0, .25)'
const dimmerBlack = 'rgba(0,0,0, .22)'

const getSpread = (elevation: number): { first: string, second: string } => {
  switch (elevation) {
    case 2:
      return {
        first: '0 3px 6px',
        second: '0 3px 6px'
      }
    case 3:
      return {
        first: '0 10px 20px',
        second: '0 6px 6px '
      }
    case 4:
      return {
        first: '0 14px 28px',
        second: '0 10px 10px'
      }
    case 5:
      return {
        first: '0 19px 38px',
        second: '0 15px 12px'
      }
    default:
      return {
        first: '0px 1px 3px',
        second: '0 1px 2px'
      }
  }
}

export const Paper = styled.div`
  box-shadow: ${props => getSpread(props.elevation).first}
      ${props =>
        tinycolor(props.shadowColor)
          .setAlpha(0.25)
          .toRgbString() || dimBlack},
    ${props => getSpread(props.elevation).second}
      ${props =>
        tinycolor(props.shadowColor)
          .setAlpha(0.22)
          .toRgbString() || dimmerBlack};
`
