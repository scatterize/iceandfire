import React, { Component } from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };
export default class CharDetails extends Component {
  gotService = new gotService();
  state = {
    char: null,
  };

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    const { getData } = this.props;
    getData(charId).then((char) => {
      this.setState({ char });
    });
    // this.foo.bar.test = 0;
  }
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.updateChar();
    }
  }

  render() {
    if (!this.state.char) {
      return <span className="select-error">please select a character</span>;
    }
    const { char } = this.state;
    const { name, gender, born, died, culture } = char;
    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}
