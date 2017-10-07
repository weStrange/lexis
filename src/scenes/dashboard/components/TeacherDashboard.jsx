// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { Wrapper, Text } from 'common-components'
import { Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import EventPanel from './EventPanel'
import FinancialDetails from './FinancialDetails'
import GeneralAchievements from './GeneralAchievements'
// import CategoryAchievements from './CategoryAchievements'
import { List } from 'immutable'
import type { PromoEvent } from '../types'
import type { Achievement, AppState, AchievementCategory } from 'core/types'
import CategoryAchievements from './CategoryAchievements'

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
  events: List<PromoEvent>,
  generalAchievements: List<Achievement>,
  categoryAchievements: List<AchievementCategory>
}

class TeacherDashboard extends React.Component {
  props: Props

  constructor (props: Props) {
    super(props)
  }

  render () {
    const {
      classes,
      events,
      generalAchievements,
      categoryAchievements
    } = this.props

    return (
      <Wrapper container spacing={24}>
        <Paper className={classes.panel}>
          <EventPanel events={events} />
        </Paper>
        <Paper className={classes.panel}>
          <FinancialDetails />
        </Paper>
        <Paper className={classes.panel}>
          <GeneralAchievements achievements={generalAchievements} />
        </Paper>
        <Paper className={classes.panel}>
          <Text fontSize='1.5em'>Category Achievements</Text>
        </Paper>
        <CategoryAchievements achievementCategories={categoryAchievements} />
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
    ]),
    generalAchievements: List([
      {
        name: 'Teacher of The Year',
        description:
          'Be stronger than any other teacher in the world for a duration of 1 year'
      },
      {
        name: 'God of Education',
        description: 'Earn more than 1 000 000 euro in one day'
      },
      {
        name: 'Good Teacher Bad Teacher',
        description:
          'Kick 1 000 students out of your course and train your dog to give paw'
      },
      {
        name: 'The Egghead',
        description: 'Replace your head with an egg'
      }
    ]),
    categoryAchievements: List([
      {
        name: 'Finance',
        achievements: [
          {
            name: 'Millioner',
            description: 'Earn your first million in your currency',
            unlocked: true
          },
          {
            name: 'Charitable',
            description: 'Create 3 courses with the price less than 30 euros',
            unlocked: true
          },
          {
            name: 'Millioner',
            description: 'Earn your first million in your currency',
            unlocked: false
          },
          {
            name: 'Charitable',
            description: 'Create 3 courses with the price less than 30 euros',
            unlocked: false
          }
        ]
      },
      {
        name: 'Reputation',
        achievements: [
          {
            name: 'Kind Guy',
            description:
              'Grant course completion certificates with 100% score to 100 students',
            unlocked: true
          },
          {
            name: 'Success',
            description:
              'Get the highest evaluation of one of your courses from 100 students',
            unlocked: true
          },
          {
            name: 'Genius',
            description: 'Publish 7 courses with difficulty set to Proficient',
            unlocked: false
          },
          {
            name: 'Average teacher',
            description:
              'Publish 15 courses with difficulty set to Intermediate',
            unlocked: false
          }
        ]
      }
    ])
  }
}

export default connect(mapStateToProps)(StyledTeacherDashboard)
