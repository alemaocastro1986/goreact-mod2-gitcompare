import React, { Component } from 'react';
import moment from 'moment';
import logo from '../../assets/gitcompare-logo.png';

import { Container, Form } from './styles';
import api from '../../services/api';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
  };

  componentDidMount() {
    if (localStorage.getItem('@storage')) {
      this.setState({
        repositories: JSON.parse(localStorage.getItem('@storage')),
      });
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      localStorage.setItem('@storage', JSON.stringify([...repositories, repository]));
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRemoveRepository = async ({ id }) => {
    const { repositories } = this.state;
    const repos = repositories.filter(repository => repository.id !== id);
    this.setState({
      repositories: repos,
    });

    await localStorage.setItem('@storage', JSON.stringify(repos));
  };

  handleRefreshRepository = async ({ id }) => {
    const { repositories } = this.state;

    const repository = repositories.find(rep => rep.id === id);
    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositories: repositories.map(rep => (rep.id === data.id ? data : rep)),
        repositoryInput: '',
      });

      await localStorage.setItem('@storage', JSON.stringify(repositories));
    } catch (err) {
      this.setState({
        repositoryError: true,
      });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repository"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          handleRemove={this.handleRemoveRepository}
          handleRefresh={this.handleRefreshRepository}
          repositories={repositories}
        />
      </Container>
    );
  }
}
