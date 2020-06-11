import React, { useState } from 'react';

import './App.css';

class UserNotFoundError extends Error {}
class UnknownError extends Error {}

const LOADING_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
};

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  FAILURE: 'failure',
};

const createSuccessMessage = (message) => ({
  type: MESSAGE_TYPE.SUCCESS,
  message,
});
const createFailureMessage = (message) => ({
  type: MESSAGE_TYPE.FAILURE,
  message,
});

function App() {
  const [repos, setRepos] = useState([]);

  const [username, setUsername] = useState('');
  const [dataState, setDataState] = useState(LOADING_STATE.IDLE);
  const [message, setMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setDataState(LOADING_STATE.LOADING);

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(throwErrorIfNeeded)
      .then((response) => response.json())
      .then(onSuccess)
      .catch(onFailure)
      .finally(afterFetch);
  };

  const throwErrorIfNeeded = (response) => {
    if (response.ok) {
      return response;
    }

    if (response.status === 404) {
      throw new UserNotFoundError('Github user not found');
    }

    throw new UnknownError('Something went wrong');
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const onSuccess = (repos) => {
    showMessage(createSuccessMessage('Success!'));
    setRepos(repos);
  };

  const onFailure = (error) => {
    if (error instanceof UserNotFoundError) {
      showMessage(createFailureMessage(error.message));
    } else {
      showMessage(createFailureMessage('Something went wrong'));
    }

    setRepos([]);
  };

  const afterFetch = () => {
    setDataState(LOADING_STATE.IDLE);
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="app">
      <header>
        <h1>Get Github Repos</h1>
      </header>

      <main>
        <section className="message-area">
          {message && (
            <p className={`message-${message.type}`}>
              <strong>{message.message}</strong>
            </p>
          )}
        </section>

        <form className="input-area">
          <div className="field-username">
            <label htmlFor="username">Github Username</label>
            <input id="username" onChange={handleChange}></input>
          </div>

          <button className="submit" type="submit" onClick={handleSubmit}>
            Go
          </button>
        </form>

        <section className="output-area">
          {dataState === LOADING_STATE.LOADING && (
            <div className="circle"></div>
          )}
          {dataState === LOADING_STATE.IDLE && !repos.length && (
            <p className="output-status-text">No repos</p>
          )}
          {dataState === LOADING_STATE.IDLE && repos.length > 0 && (
            <div className="repo-list-container">
              <p className="repo-amount">Found {repos.length} Repos</p>
              <ul>
                {repos &&
                  repos.map(({ id, name, description, html_url }) => (
                    <li className="repo-row" key={id}>
                      <p>
                        <a
                          href={html_url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {name}
                        </a>
                      </p>

                      <p className="repo-description">{description || '–'}</p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
