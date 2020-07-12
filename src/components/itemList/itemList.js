import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';
//import gotService from '../../services/gotService';

function ItemList({ getData, onItemSelected, renderItem }) {
  const [itemList, updateList] = useState([]);
  //gotService = new gotService();
  useEffect(() => {
    getData().then((data) => {
      updateList(data);
    });
  }, []);

  function renderItems(arr) {
    return arr.map((item, i) => {
      const { id } = item;
      const label = renderItem(item);
      //console.log(item.id);
      return (
        <li
          id={id}
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  if (!itemList) {
    return <Spinner />;
  }
  const items = renderItems(itemList);
  return <ul className="item-list list-group">{items}</ul>;
}

export default ItemList;
