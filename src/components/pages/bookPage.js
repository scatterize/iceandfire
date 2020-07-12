import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//import { Col, Row, Container } from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMesage';
//import CharDetails, { Field } from '../charDetails';
import gotService from '../../services/gotService';
//import RowBlock from '../rowBlock';

class BookPage extends Component {
  gotService = new gotService();
  state = {
    //  selectedChar: null,
    error: false,
  };

  // onItemSelected = (id) => {
  //   console.log(id);
  //   this.setState({
  //     selectedChar: id,
  //   });
  // };

  componentDidCatch() {
    console.log('error');
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    // const itemList = (
    //   <ItemList
    //     onItemSelected={this.onItemSelected}
    //     getData={this.gotService.getAllBooks}
    //     renderItem={(item) => `${item.name} `}
    //   />
    // );
    // const charDetails = (
    //   <CharDetails
    //     charId={this.state.selectedChar}
    //     getData={this.gotService.getOneBook}
    //   >
    //     <Field field="authors" label="Authors" />
    //     <Field field="numberOfPages" label="Number of Page" />
    //     <Field field="publisher" label="Publisher" />
    //     <Field field="released" label="Released" />
    //   </CharDetails>
    // );

    // return <RowBlock left={itemList} right={charDetails} />;
    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => `${item.name} `}
      />
    );
  }
}

export default withRouter(BookPage);
