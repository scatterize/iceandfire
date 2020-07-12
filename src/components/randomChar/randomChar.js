import React, { Component } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';
import ErrorMessage from '../errorMesage';

export default class RandomChar extends Component {
  // constructor() {
  //   console.log('constructor');
  //   super();
  // }

  gotSevice = new gotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  updateChar = () => {
    // console.log('update');
    const id = Math.floor(Math.random() * 100 + 25);
    //const id = 130000;
    this.gotSevice
      .getOneCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  onError = (er) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, this.props.interval);
    console.log('DidMount');
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    console.log('WillUnmount');
  }

  render() {
    console.log('render');
    const { char, loading, error } = this.state;
    const errorMesage = error ? <ErrorMessage /> : null;

    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="random-block rounded">
        {errorMesage}
        {spinner}
        {content}
      </div>
    );
  }
}
RandomChar.defaultProps = {
  interval: 15000,
};

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  );
};
