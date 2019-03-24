import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      newLikes: 0,
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    this.setState({
      user: window.localStorage.getItem('loggedBlogappUser')
    })

  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      likes: this.state.newLikes,
      user: this.state.user
    }

    blogService
      .create(blogObject)
      .then(newblog => {
        this.setState({
          blogs: this.state.blogs.concat(newblog),
          newBlog: '',
          newTitle: '',
          newAuthor: '',
          newUrl: '',
          newLikes: 0,
        })
      })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    window.location.reload();
    console.log('Kirjauduttu ulos')
  }


  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  /*handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }*/

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {

    const loginForm = () => (
      <div>
        <Togglable buttonLabel="login">
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          />
        </Togglable>

      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <p>Otsikko: </p>
          <input
            name="newTitle"
            value={this.state.newTitle}
            onChange={this.handleBlogChange}
          />
          <p>Blogiteksti:</p>
          <input
            name="newBlog"
            value={this.state.newBlog}
            onChange={this.handleBlogChange}
          />
          <p>Julkaisija:</p>
          <input
            name="newAuthor"
            value={this.state.newAuthor}
            onChange={this.handleBlogChange}
          />
          <p>URL-Osoite:</p>
          <input
            name="newUrl"
            value={this.state.newUrl}
            onChange={this.handleBlogChange}
          />
          <br />

          <button type="submit">Tallenna</button>
        </form>
      </div>
    )

    const logoutForm = () => (
      <div>
        <form onSubmit={this.logout}>
          <button type="submit">Kirjaudu ulos</button>
        </form>
      </div>
    )

    const bloglistForm = () => (


      <div>
        <h2>Blogit</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>

    )

    return (
      <div>
        <h1>Blogit</h1>

        <Notification message={this.state.error} />

        {this.state.user === null && loginForm()}

        {this.state.user !== null && blogForm()}
        {this.state.user !== null && logoutForm()}
        {this.state.user !== null && bloglistForm()}
      </div>
    )
  }
}



export default App;
