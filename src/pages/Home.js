import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as reducer from '../reducers/templates';
import Templates from '../components/templates/Templates';

class Home extends Component {
  componentDidMount() {
    this.props.loadTemplates();
    this.props.loadHouses();
  }

  render() {
    const { templates, houses, loading, error } = this.props;

    if (error) {
      return <div>{ error }</div>;
    }

    const isResponse = templates.length && houses.length;

    return (
      <div className="home">
        {loading && <div>Loading...</div>}
        {!loading && !isResponse && <div>No data for a moment</div>}
        {!loading && !!isResponse && <Templates templates={templates} houses={houses} />}
      </div>
    );
  }
}

Home.propTypes = {
  templates: PropTypes.array.isRequired,
  houses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadTemplates: PropTypes.func.isRequired,
  loadHouses: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default connect(
  ({ templatesReducer: { templates, houses, loading, error } }) => ({ templates, houses, loading, error }),
  dispatch => ({
    loadTemplates: () => {dispatch(reducer.onTemplatesFetch())},
    loadHouses: () => {dispatch(reducer.onHousesFetch())}
  })
)(Home);
