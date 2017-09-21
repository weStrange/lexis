import React from 'react'
import styled from 'styled-components'
import { Paper } from 'common-components'
import { grey } from 'material-ui/colors'

const Wrapper = styled(Paper)`
  height: 100vh;
  width: 110px;
  position: fixed;
  top: 0;
  left: 0;
  background: ${grey[800]};
`
const SideNavigation = props => <Wrapper elevation={3} />
export default SideNavigation
