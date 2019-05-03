import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, handleRemove, handleRefresh }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            <i className="fa fa-star" />
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            <i className="fa fa-code-fork" />
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            <i className="fa fa-exclamation-circle" />
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            <i className="fa fa-clock-o" />
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>
        <div className="actions">
          <button onClick={() => handleRefresh(repository)} className="primary" type="button">
            Refresh
          </button>
          <button onClick={() => handleRemove(repository)} className="danger" type="button">
            Delete
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
};

export default CompareList;
