import * as React from 'react'
import { shallow } from 'enzyme'
import Story from './Story'

describe('Story', () => {
    it('should not crash when rendering', () => {
        expect(() => shallow(<Story />))
    });

    it('should show the title of the story', () => {
        const TITLE = `TITLE:${Date.now()}`
        expect(shallow(<Story storyData={{ title: TITLE }} />).text())
            .toContain(TITLE)
    })
})