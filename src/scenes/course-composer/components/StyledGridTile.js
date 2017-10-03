/* @flow */

import styled from 'styled-components'
import { GridListTile } from 'material-ui/GridList'

const StyledGridTile = styled(GridListTile)`
  border: 1px solid grey;
  border-radius: 20px;
  width: 200px !important;
  height: 60px !important;
  margin: 10px 7px 10px 7px;
  background-size: contain;
  background-image: ${({ image }) => image};
  text-align: center;
  vertical-align: middle;
  line-height: 60px !important;
`

export default StyledGridTile
