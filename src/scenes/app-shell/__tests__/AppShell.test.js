/* eslint-env jest */
/* flow */


import React from 'react'
import { AppShell } from '../AppShell'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('AppShell Component', () => {
  it('renders a snapshot', () => {
    const wrapper = shallow(<AppShell />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
