/* @flow */

import courseComposer from '../../scenes/course-composer/reducers'
import courseManager from '../../scenes/course-manager/reducers'
import courseConsumer from '../../scenes/course-consumer/reducers'
import registration from '../../scenes/registration/reducers'
import auth from '../../scenes/login/reducers.js'
import nav from './navigationReducer'

export {
  courseComposer,
  nav,
  courseManager,
  courseConsumer,
  registration,
  auth
}
