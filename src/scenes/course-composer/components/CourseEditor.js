/* @flow */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { graphql, compose } from 'react-apollo'
import { findDOMNode } from 'react-dom'

import defaultCourseImage from '../../../assets/course-space.svg'
import yellowBackground from '../../../assets/yellow-abstract-background.png'
import redBackground from '../../../assets/red-abstract-background.png'
import { handleFileUpload } from 'core/utils/image'
import { CourseUtils } from 'core/type-methods'

import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { GridList, GridListTileBar } from 'material-ui/GridList'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { grey } from 'material-ui/colors'
import SaveIcon from 'material-ui-icons/Save'

import { Text, ActionButton, StyledPopover } from 'common-components'
import { StyledGridTile, BlockedTextField, InputForm, PlainLink } from '.'

import * as actionCreators from '../action-creators'

import { addCourseMutation, updateCourseMutation } from '../mutations'
import { Course as CourseQuery } from '../queries'

import type { CourseEditorState } from '../types'
import type { CourseDifficulty, AppState, Course } from 'core/types'

type LevelEditorProps = {
  courseEditor: CourseEditorState,
  addCourse: any,
  updateCourse: any,
  match: any,
  data: any,
  actions: any
}
type EditorState = {
  popoverOpen: boolean,
  anchorEl: any
}
export class CourseEditor extends Component {
  props: LevelEditorProps
  state: EditorState

  constructor (props: LevelEditorProps) {
    super(props)

    this.state = {
      popoverOpen: false,
      anchorEl: null
    }

    this.props.actions.course.start()
  }
  /*
  componentWillReceiveProps (newProps: LevelEditorProps) {
    if (
      !this.props.data.course &&
      newProps.data.course &&
      newProps.data.course[0]
    ) {
      this.props.actions.course.start(newProps.data.course[0])
    }
  }
*/
  persistChanges (course: Course, imageFile: any) {
    const { updateCourse, addCourse } = this.props

    if (course.id) {
      updateCourse({
        variables: {
          id: course.id,
          name: course.name,
          description: course.description,
          difficulty: CourseUtils.difficultyToStored(course.difficulty),
          levels: course.levels.map(p => ({
            name: p.name,
            description: p.description,
            lessons: JSON.stringify(p.lessons)
          })),
          image: imageFile
        }
      })
        .then(rs => {
          this.handlePopoverOpen()
        })
        .catch(error => console.error(error))
    } else {
      addCourse({
        variables: {
          name: course.name,
          description: course.description,
          difficulty: CourseUtils.difficultyToStored(course.difficulty),
          levels: course.levels.map(p => ({
            name: p.name,
            description: p.description,
            lessons: JSON.stringify(p.lessons)
          })),
          image: imageFile
        }
      })
        .then(rs => {
          this.props.actions.course.editId(rs.data.addCourse.id)

          this.handlePopoverOpen()
        })
        .catch(error => console.error(error))
    }
  }

  handlePopoverOpen () {
    this.setState(prev => ({
      ...prev,
      popoverOpen: true,
      // $FlowIgnore
      anchorEl: findDOMNode(this.saveButton)
    }))

    setTimeout(
      () =>
        this.setState(prev => ({
          ...prev,
          popoverOpen: false
        })),
      3000
    )
  }

  handleRequestClose = () => {
    this.setState({
      popoverOpen: false
    })
  }

  saveButton = null

  render () {
    const { courseEditor, updateCourse, addCourse, actions, match } = this.props
    const { course, imageFile } = courseEditor

    return (
      <div style={{ marginLeft: '5%' }}>
        <Text
          style={{
            textDecoration: 'underline'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Course details
        </Text>
        <InputForm>
          <div>
            <div
              style={{
                float: 'left',
                width: '300px',
                height: '300px',
                backgroundImage: `url('${course.imageUrl ||
                  defaultCourseImage}')`
              }}
            />
            <input
              accept='jpg,jpeg,JPG,JPEG,png,PNG,svg,SVG,ico,ICO'
              style={{ display: 'none' }}
              id='file'
              onChange={e =>
                handleFileUpload(
                  e,
                  actions.course.editImageFile,
                  actions.course.editImageUrl
                )}
              type='file'
            />
            <label htmlFor='file'>
              <Button raised component='span'>
                Upload image
              </Button>
            </label>
          </div>
          <BlockedTextField
            id='course-name'
            label='Course name'
            value={course.name}
            onChange={ev => actions.course.editName(ev.target.value)}
          />
          <BlockedTextField
            id='course-description'
            label='Course description'
            multiline
            rows='10'
            rowsMax='20'
            value={course.description}
            onChange={ev => actions.course.editDescription(ev.target.value)}
            margin='normal'
          />
          <FormControl
            style={{
              width: '40%',
              marginTop: '30px'
            }}
          >
            <InputLabel htmlFor='course-difficulty'>Difficulty</InputLabel>
            <Select
              value={course.difficulty}
              onChange={ev => actions.course.editDifficulty(ev.target.value)}
              input={<Input id='course-difficulty' />}
            >
              <MenuItem value={'Beginner'}>Beginner</MenuItem>
              <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
              <MenuItem value={'Upper-intermediate'}>
                Upper-intermediate
              </MenuItem>
              <MenuItem value={'Advanced'}>Advanced</MenuItem>
              <MenuItem value={'Proficient'}>Proficient</MenuItem>
            </Select>
            <FormHelperText>Assess difficulty of the course</FormHelperText>
          </FormControl>
        </InputForm>
        <Text
          style={{
            textDecoration: 'underline',
            marginTop: '50px'
          }}
          primary
          medium
          fontSize={'1.3em'}
        >
          Chapters
        </Text>

        <GridList style={{ marginLeft: '30px' }}>
          {course.levels.map((p, i) => (
            <PlainLink
              to={'/course-composer/' + match.params.courseId + '/' + i}
            >
              <StyledGridTile
                key={i}
                image={`url('${yellowBackground}')`}
                onClick={() => actions.level.startEdit(p)}
                button
              >
                {p.name}
              </StyledGridTile>
            </PlainLink>
          ))}

          <PlainLink
            to={'/course-composer/' + match.params.courseId + '/' + 'new'}
          >
            <StyledGridTile image={`url('${redBackground}')`} button>
              Add new
            </StyledGridTile>
          </PlainLink>
        </GridList>

        <ActionButton
          ref={node => {
            this.saveButton = node
          }}
          onClick={() => this.persistChanges(course, imageFile)}
        >
          <SaveIcon />
        </ActionButton>
        <StyledPopover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Text>The changes have been saved</Text>
        </StyledPopover>
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    courseEditor: state.courseComposer.courseEditor
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      course: bindActionCreators(actionCreators.courseActions, dispatch),
      level: bindActionCreators(actionCreators.levelActions, dispatch)
    }
  }
}

const connetedComposer = connect(mapStateToProps, mapDispatchToProps)(
  CourseEditor
)

export default compose(
  graphql(addCourseMutation, { name: 'addCourse' }),
  graphql(updateCourseMutation, { name: 'updateCourse' }),
  graphql(CourseQuery, {
    options: ({ match }) => ({ variables: { id: match.params.courseId } })
  })
)(connetedComposer)
