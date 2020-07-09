import React, { Component } from 'react';
import './itemList.css';
import gotService from '../../services/gotSevice';
import Spinner from '../spinner/';

export default class ItemList extends Component {
  gotService = new gotService();
  state = {
    charList: null,
  };

  renderItems(arr) {
    return arr.map((item, i) => {
      //console.log(item.id);
      return (
        <li
          key={item.id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(item.id)}
        >
          {item.name}
        </li>
      );
    });
  }

  componentDidMount() {
    this.gotService.getAllCharacters().then((charList) => {
      this.setState({
        charList,
      });
    });
  }
  render() {
    const { charList } = this.state;

    if (!charList) {
      return <Spinner />;
    }
    const items = this.renderItems(charList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
