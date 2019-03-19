import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Carousel } from 'react-bootstrap';

import Paginator from '../paginator/Paginator';
import './Templates.scss';

const types = {
  IMAGE: 'IMAGE',
  ADDRESS: 'ADDRESS',
  PRICE: 'PRICE',
  AREA: 'AREA'
};

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: []
    };
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems });
  };

  getCard = (house, template) => template.map(({ component, field, children }) => {
    const key = `${field}-${house.id}`;

    switch (component) {
      case types.IMAGE:
        return (
          <Carousel key={key} indicators={false} controls={house[field].length > 1}>
            {house[field].map((img) =>
              <Carousel.Item key={img}>
                <img className="d-block w-100" src={img} alt="img" />
                <Carousel.Caption>{children && this.getCard(house, children)}</Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        );

      case types.PRICE:
        return <Card.Title key={key}>Price: { house[field] }</Card.Title>;

      case types.ADDRESS:
        return <Card.Text key={key} className="mb-2 text-muted">Address: { house[field] }</Card.Text>;

      case types.AREA:
        return <Card.Text key={key} className="mb-2 text-muted">Area: { house[field] } sq. fr.</Card.Text>;

      default:
        return null;
    }
  });

  render() {
    const { templates, houses } = this.props;

    return (
      <React.Fragment>
        {this.state.pageOfItems.map((house, i) => {
          const { template } = templates[i % 3];
          const card = this.getCard(house, template);

          return (
            <Card key={house.id} className="template">
              <Card.Body>{ card }</Card.Body>
            </Card>
          )}
        )}
        <Paginator items={houses} onChangePage={(pageOfItems) => this.onChangePage(pageOfItems)}/>
      </React.Fragment>
    );
  }
}

Templates.propTypes = {
  templates: PropTypes.array.isRequired,
  houses: PropTypes.array.isRequired
};

export default Templates;
