// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import type { AppState } from '../../../types'
import { Wrapper } from 'common-components'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import EventPanel from './EventPanel'
import FinancialDetails from './FinancialDetails'
import GeneralAchievements from './GeneralAchievements'
// import CategoryAchievements from './CategoryAchievements'
import { List } from 'immutable'
import type { PromoEvent } from '../types'

const styles = theme => ({
  panel: theme.mixins.gutters({
    marginBottom: '30px',
    paddingTop: 16,
    paddingBottom: 16,
    width: '100%'
  })
})

type Props = {
  classes: any,
  events: List<PromoEvent>
}

class TeacherDashboard extends React.Component<Props, void> {
  props: Props

  constructor (props: Props) {
    super(props)
  }

  render () {
    const { classes, events } = this.props

    return (
      <Wrapper container spacing={24}>
        <Paper className={classes.panel}>
          <EventPanel events={events} />
        </Paper>
        <Paper className={classes.panel}>
          <FinancialDetails />
        </Paper>
        <Paper className={classes.panel}>
          <GeneralAchievements />
        </Paper>
        {/*<CategoryAchievements />*/}
      </Wrapper>
    )
  }
}

const StyledTeacherDashboard = withStyles(styles)(TeacherDashboard)

function mapStateToProps (state: AppState) {
  return {
    events: List([
      {
        name: 'Hot Promo',
        description: 'Boost your course!'
      },
      {
        name: 'Cool Promo',
        description: 'Earn 1 000 000 000 euro in one weekend'
      },
      {
        name: 'Fun Promo',
        description: 'Tickets to Las Vegas!11 50% teacher discount'
      },
      {
        name: 'Amazing Promo',
        description: 'Good luck and have fun!'
      }
    ])
  }
}

export default connect(mapStateToProps)(StyledTeacherDashboard)
