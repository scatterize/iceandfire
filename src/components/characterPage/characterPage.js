import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMesage';
import CharDetails from '../charDetails';

export default class CharacterPage extends Component {
  state = {
    selectedChar: null,
    error: false,
  };

  onCharSelected = (id) => {
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
    return (
      <Row>
        <Col md="6">
          <ItemList onCharSelected={this.onCharSelected} />
        </Col>
        <Col md="6">
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    );
  }
}
