import React, { Component } from 'react'
import config from '../../config'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = UserContext

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${TokenService.getAuthToken()}`
    }
    fetch(`${config.API_ENDPOINT}/language/head`, { headers })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(word => {
        this.context.setCurrentWord(word)
      })
  }

  render() {
    return (
      <section>
        {this.context.currentWord &&
          <>
            <h2 id='learn-title'>Translate the word:</h2>
            <span id='current-word'>{this.context.currentWord.nextWord}</span>
            <form id='guess-form'>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <input name='learn-guess-input' id='learn-guess-input' type='text' required />
              <button type='submit'>Submit your answer</button>
            </form>
            <p className='word-correct learn-score'>{`You have answered this word correctly ${this.context.currentWord.wordCorrectCount} times.`}</p>
            <p className='word-incorrect learn-score'>{`You have answered this word incorrectly ${this.context.currentWord.wordIncorrectCount} times.`}</p>
            <p id='learn-total' className='total-correct'>{`Your total score is: ${this.context.currentWord.totalScore}`}</p>
          </>
        }
      </section>
    );
  }
}

export default LearningRoute
