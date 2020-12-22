import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'
import './DashboardRoute.css'

class DashboardRoute extends Component {
  static contextType = UserContext

  state = {
    language: {},
    words: []
  }

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    }
    fetch(`${config.API_ENDPOINT}/language`, { headers })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(({ language, words }) => {
        this.setState({ language, words })
      })
  }

  render() {
    return (
      <section>
        <h2 id='dashboard-language'>{this.state.language.name}</h2>
        <h3 id='dashboard-title'>Words to practice</h3>
        <ul id='dashboard-words'>
          {this.state.words.map((word, index) =>
            <li key={index}>
              <h4 className='dashboard-word'>
                {word.original}
              </h4>
              <p className='word-correct'>{`correct answer count: ${word.correct_count}`}</p>
              <p className='word-incorrect'>{`incorrect answer count: ${word.incorrect_count}`}</p>
            </li>
          )}
        </ul>
        <p className='total-correct'>{`Total correct answers: ${this.state.language.total_score}`}</p>
        <Link to='/learn' id='dashboard-start'>Start practicing</Link>
      </section>
    );
  }
}

export default DashboardRoute
