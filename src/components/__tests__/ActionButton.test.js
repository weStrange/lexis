/* eslint-env jest */

import React from 'react'
import ActionButton from '../ActionButton'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('ActionButton Component', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(<ActionButton />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
