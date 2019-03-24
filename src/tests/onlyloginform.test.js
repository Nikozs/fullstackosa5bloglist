import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
jest.mock('../services/blogs')


describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeAll(() => {
      app = mount(<App />)
      app.user = null
    })


    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })
})
