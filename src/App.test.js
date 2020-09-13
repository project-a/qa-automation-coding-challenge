import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import { within } from '@testing-library/dom'
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText("Get Github Repos");
  expect(headerElement).toBeInTheDocument();
});

test('renders search bar', () => {
  const { getByTestId } = render(<App />);
  const searchBarElement = getByTestId("usernameInput");
  expect(searchBarElement).toBeInTheDocument();
  expect(searchBarElement).toBeEmpty();
});

test('renders no search results', () => {
  const { getByTestId } = render(<App />);
  const searchResults = getByTestId("noRepositoriesMessage");
  expect(searchResults).toBeInTheDocument();

  const { getByText } = within(searchResults);
  expect(getByText('No repos')).toBeInTheDocument();
});

test('renders search results', async () => {
  const { getByTestId, findByTestId } = render(<App />);

  const repositoriesResponse = require('./mock/repositories.mock.json');
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => (repositoriesResponse)
  });

  const searchBarElement = getByTestId("usernameInput");
  const goButtonElement = getByTestId("submitButton");

  fireEvent.change(searchBarElement, { target: { value: "oleg-toporkov" } });
  goButtonElement.click();

  const firstRepository = await findByTestId("repositoryRow");
  const { getByText } = within(firstRepository);

  expect(firstRepository).toBeInTheDocument();
  expect(getByText('qa-automation-coding-challenge')).toBeInTheDocument();
});