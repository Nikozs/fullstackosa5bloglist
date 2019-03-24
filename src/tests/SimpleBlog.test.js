import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'


describe.only('<SimpleBlog />', () => {
    it('renders blog title, author and likes', () => {
        const blog = {
            title: "Testi",
            author: "Testaaja",
            likes: "2"
        }


        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const contentDiv = blogComponent.find('.titleauthor')
        const contentDiv2 = blogComponent.find('.likes')

        expect(contentDiv.text()).toContain(blog.title + ' ' + blog.author)
        expect(contentDiv2.text()).toContain(blog.likes)


    })

})