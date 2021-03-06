import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMesage';
import CharDetails, { Field } from '../charDetails';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
  gotService = new gotService();
  state = {
    selectedChar: null,
    error: false,
  };

  onItemSelected = (id) => {
    console.log(id);
    this.setState({
      selectedChar: id,
    });
  };

  componentDidCatch() {
    console.log('error');
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => `${item.name} (${item.gender})`}
      />
    );
    const charDetails = (
      <CharDetails
        charId={this.state.selectedChar}
        getData={this.gotService.getOneCharacter}
      >
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </CharDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
