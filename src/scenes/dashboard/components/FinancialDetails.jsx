// @flow

import React from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Grid } from 'material-ui'
import { Text } from 'common-components'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  chartContainer: theme.mixins.gutters({
    textAlign: 'center'
  }),
  chart: theme.mixins.gutters({
    marginTop: theme.spacing.unit
  })
})

type Props = {
  classes: any
}

class FinancialDetails extends React.Component {
  props: Props

  renderStudentEnrollmentChart () {
    return (
      <Bar
        data={{
          labels: [
            'Basics of English',
            'Spanish',
            'Advanced Seppo',
            'Alien Communication'
          ],
          datasets: [
            {
              data: [75, 55, 15, 100],
              backgroundColor: [
                'rgba(88, 214, 141, 1)',
                'rgba(236, 112, 99, 1)',
                'rgba(93, 173, 226, 1)',
                'rgba(243, 156, 18, 1)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  renderIncomeRateChart () {
    return (
      <Bar
        data={{
          labels: [
            'Basics of English',
            'Spanish',
            'Advanced Seppo',
            'Alien Communication'
          ],
          datasets: [
            {
              data: [7500, 20500, 12500, 10000],
              backgroundColor: [
                'rgba(88, 214, 141, 1)',
                'rgba(236, 112, 99, 1)',
                'rgba(93, 173, 226, 1)',
                'rgba(243, 156, 18, 1)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  renderLine () {
    return (
      <Line
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              data: [7, 5, 1, 0, 2],
              backgroundColor: [
                'rgba(88, 214, 141, 0)',
                'rgba(200, 200, 200, 0.2)'
              ],
              borderColor: [
                'rgba(88, 214, 141, 0.7)',
                'rgba(200, 200, 200, 0.2)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  renderDonut () {
    return (
      <Doughnut
        data={{
          labels: ['Alien', 'English', 'Amharic'],
          datasets: [
            {
              data: [7444, 5000, 20000],
              backgroundColor: [
                'rgba(236, 112, 99, 1)',
                'rgba(93, 173, 226, 1)',
                'rgba(243, 156, 18, 1)'
              ]
            }
          ]
        }}
        options={{
          legend: {
            display: false
          }
        }}
      />
    )
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Text fontSize='1.5em'>Financial Details</Text>

        <Grid container>
          <Grid item xs={12} lg={6} className={classes.chartContainer}>
            <Text>Students enrollment</Text>
            <div className={classes.chart}>
              {this.renderStudentEnrollmentChart()}
            </div>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.chartContainer}>
            <Text>Income per course for last month</Text>
            <div className={classes.chart}>{this.renderIncomeRateChart()}</div>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.chartContainer}>
            <Text>Income per month</Text>
            <div className={classes.chart}>{this.renderLine()}</div>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.chartContainer}>
            <Text>Courses with highest income</Text>
            <div className={classes.chart}>{this.renderDonut()}</div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(FinancialDetails)
