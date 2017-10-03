/* eslint-env jest */

import React from 'react'
import BackButton from '../BackButton'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('BackButton Component', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(<BackButton />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
