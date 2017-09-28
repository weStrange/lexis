// @flow

import * as React from 'react'
import { List } from 'immutable'
import type { PromoEvent } from 'core/types'
import { Grid, Paper } from 'material-ui'
import { Text, Carousel } from 'common-components'
import { withStyles } from 'material-ui/styles'
import { FlightTakeoff } from 'material-ui-icons'

const styles = theme => ({
  eventPanel: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: '10px',
    minHeight: '260px'
  }),
  panelContainer: theme.mixins.gutters({
    padding: theme.spacing.unit
  }),
  promoImageContainer: theme.mixins.gutters({
    textAlign: 'center',
    width: '100%',
    marginBottom: theme.spacing.unit
  }),
  promoImage: theme.mixins.gutters({
    color: '#FF00CC',
    width: '100%',
    height: '120px',
    display: 'block !important',
    margin: 'auto'
  })
})

type Props = {
  events: List<PromoEvent>,
  classes: any
}

const nEventsPerView = 3

class EventPanel extends React.Component {
  props: Props
  state: {
    selectedViewIdx: number
  }
  handleChangeIndex: Function

  constructor (props: Props) {
    super(props)

    this.state = {
      selectedViewIdx: 0
    }

    this.handleChangeIndex = this.handleChangeIndex.bind(this)
  }

  handleChangeIndex (idx: number) {
    this.setState({
      selectedViewIdx: idx
    })
  }

  renderEventPanels (offset: number, nCourses: number) {
    const { classes, events } = this.props
    let coursePanels = []

    const coursesEndIndex =
      offset + nCourses > events.size ? events.size : offset + nCourses

    for (let i = offset; i < coursesEndIndex; i++) {
      coursePanels.push(
        <Grid item xs={12} lg={4}>
          <Paper className={classes.eventPanel} key={i}>
            <Grid container>
              <Grid item sm={9}>
                <div className={classes.promoImageContainer}>
                  <FlightTakeoff className={classes.promoImage} />
                </div>
                <div>
                  <Text fontSize={'1.0rem'}>{events.get(i).name}</Text>
                  <br />
                  <br />
                  <Text fontSize={'0.8rem'}>{events.get(i).description}</Text>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    }

    return coursePanels
  }

  renderEventPanelViews () {
    const { events, classes } = this.props

    const nViews = Math.floor(events.size / nEventsPerView) + 1

    let views = []

    for (let i = 0; i < nViews; i++) {
      views.push(
        <Grid container spacing={0} key={i} className={classes.panelContainer}>
          {this.renderEventPanels(i * nEventsPerView, nEventsPerView)}
        </Grid>
      )
    }

    return views
  }

  render () {
    const { events } = this.props
    const { selectedViewIdx } = this.state
    const nViews = Math.floor(events.size / nEventsPerView)

    return (
      <div>
        <Text fontSize='1.5em'>Events</Text>
        <Carousel
          nViews={nViews}
          children={this.renderEventPanelViews()}
          onChangeIndex={this.handleChangeIndex}
          viewIdx={selectedViewIdx}
        />
      </div>
    )
  }
}

export default withStyles(styles)(EventPanel)
