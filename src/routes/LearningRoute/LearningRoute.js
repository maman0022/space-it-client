import React, { Component } from 'react'
import config from '../../config'
import UserContext from '../../contexts/UserContext'
import TokenService from '../../services/token-service'
import './LearningRoute.css'

class LearningRoute extends Component {
  static contextType = UserContext

  state = {
    currentWord: {},
    answerSubmitted: false,
    error: null,
    inputError: null,
    isCorrect: null,
    guess: null,
    actualWord: null
  }

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
      .then(currentWord => {
        this.setState({ currentWord, inputError: null, error: null, actualWord: currentWord.nextWord })
      })
      .catch(error => this.setState({ error }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const guess = e.target['learn-guess-input'].value
    if (guess.trim() === '') {
      return this.setState({ inputError: 'Answer cannot be blank' })
    }
    const headers = {
      Authorization: `Bearer ${TokenService.getAuthToken()}`,
      "content-type": 'application/json'
    }
    const body = JSON.stringify({ guess })
    fetch(`${config.API_ENDPOINT}/language/guess`, { headers, body, method: 'POST' })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(nextWord => {
        this.setState({
          currentWord: nextWord,
          answerSubmitted: true,
          isCorrect: nextWord.isCorrect,
          guess
        })
      })
      .catch(error => this.setState({ error }))
  }

  handleNextWord = () => {
    this.setState({
      answerSubmitted: false,
      error: null,
      inputError: null,
      isCorrect: null,
      guess: null,
      actualWord: this.state.currentWord.nextWord
    })
  }

  render() {
    return (
      <section>
        {this.state.error && <h2 className='error-message'>{`An error occured: ${this.state.error}`}</h2>}
        {this.state.currentWord && !this.state.answerSubmitted &&
          <>
            <h2 id='learn-title'>Translate the word:</h2>
            <span id='current-word'>{this.state.actualWord}</span>
            <form id='guess-form' onSubmit={this.handleSubmit}>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <input name='learn-guess-input' id='learn-guess-input' type='text' required />
              {this.state.inputError && <p className='error-message'>{this.state.inputError}</p>}
              <button type='submit'>Submit your answer</button>
            </form>
            <p className='word-correct learn-score'>{`You have answered this word correctly ${this.state.currentWord.wordCorrectCount} times.`}</p>
            <p className='word-incorrect learn-score'>{`You have answered this word incorrectly ${this.state.currentWord.wordIncorrectCount} times.`}</p>
            <p id='learn-total' className='total-correct'>{`Your total score is: ${this.state.currentWord.totalScore}`}</p>
          </>
        }
        {this.state.answerSubmitted &&
          <>
            <h2>{this.state.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
            <div className='DisplayScore'>
              <p className='total-correct'>{`Your total score is: ${this.state.currentWord.totalScore}`}</p>
            </div>
            <div className='DisplayFeedback'>
              <p>{`The correct translation for ${this.state.actualWord} was ${this.state.currentWord.answer} and you chose ${this.state.guess}!`}</p>
            </div>
            <button onClick={this.handleNextWord} id='next-word-button'>Try another word!</button>
          </>
        }
      </section>
    );
  }
}

export default LearningRoute
