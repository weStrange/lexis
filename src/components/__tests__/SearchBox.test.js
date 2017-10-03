/* eslint-env jest */

import React from 'react'
import SearchBox from '../SearchBox'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('SearchBox Component', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(<SearchBox />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
