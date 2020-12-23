import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  static contextType = UserContext

  state = { error: null }

  handleRegistrationSuccess = (username, password) => {
    AuthApiService.postLogin({ username, password })
      .then(res => {
        this.context.processLogin(res.authToken)
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section>
        <p id='explanation'>
          Practice learning a language with the spaced repetition revision technique.
        </p>
        <h2>Sign up</h2>
        <div role='alert'>
          {error && <p className='error-message'>{error}</p>}
        </div>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
