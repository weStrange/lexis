/* eslint-env jest */

import { List } from 'immutable'

import { parseFetchedCourse } from '../parsers'

const fetched = {
  id: 'fasdf24rf',
  name: 'somName',
  description: 'somethingHere',
  difficulty: 'UPPERINTERMEDIATE',
  levels: [
    {
      name: 'example',
      description: 'test',
      lessons: `[{"name":"somethingHere", "activities": [{"type": "header","text": "exampleHeader"},{"type": "video","url": "some-cat-video"}]}]`
    },
    {
      name: 'example',
      description: 'test',
      lessons: `[{"name":"somethingHere", "activities": []}, {"name":"somethingHere", "activities": []}]`
    }
  ]
}

const properResult = {
  id: 'fasdf24rf',
  name: 'somName',
  description: 'somethingHere',
  difficulty: 'Upper-intermediate',
  levels: List([
    {
      name: 'example',
      description: 'test',
      lessons: List([
        {
          name: 'somethingHere',
          activities: List([
            { type: 'header', text: 'exampleHeader' },
            {
              type: 'video',
              url: 'some-cat-video'
            }
          ])
        }
      ])
    },
    {
      name: 'example',
      description: 'test',
      lessons: List([
        { name: 'somethingHere', activities: List() },
        { name: 'somethingHere', activities: List() }
      ])
    }
  ])
}

describe('Parser utils', () => {
  it('parses fetched course to an object of type Course', () => {
    const parsed = parseFetchedCourse(fetched)

    expect(parsed.name).toEqual(properResult.name)
    expect(parsed.difficulty).toEqual(properResult.difficulty)
    expect(parsed.levels).toEqual(properResult.levels)
  })
})
