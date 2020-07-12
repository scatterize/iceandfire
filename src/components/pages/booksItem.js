import React, { Component } from 'react';
import gotService from '../../services/gotService';
import CharDetails, { Field } from '../charDetails';

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {
    return (
      <CharDetails
        charId={this.props.bookId}
        getData={this.gotService.getOneBook}
      >
        <Field field="authors" label="Authors" />
        <Field field="numberOfPages" label="Number of Page" />
        <Field field="publisher" label="Publisher" />
        <Field field="released" label="Released" />
      </CharDetails>
    );
  }
}
