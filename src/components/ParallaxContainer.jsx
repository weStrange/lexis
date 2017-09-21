import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Layer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`
const BackLayer = styled(Layer)`
  transform: translateZ(-1px) scale(2);
  z-index: -1;
`
const BaseLayer = styled(Layer)`transform: translateZ(0) scale(1);`
const ParallaxContainer = styled.div`
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`
const Group = styled.div`
  position: relative;
  height: ${props => props.height || '100vh'};
`
export const ParallaxGroup = props => (
  <Group height={props.height}>
    <BackLayer>{props.backLayer}</BackLayer>
    <BaseLayer>{props.children}</BaseLayer>
  </Group>
)
export default ParallaxContainer
