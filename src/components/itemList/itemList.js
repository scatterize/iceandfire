import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner/';
//import gotService from '../../services/gotSevice';

export default class ItemList extends Component {
  //gotService = new gotService();
  state = {
    itemList: null,
  };

  renderItems(arr) {
    return arr.map((item, i) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      //console.log(item.id);
      return (
        <li
          id={id}
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({
        itemList,
      });
    });
  }
  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
