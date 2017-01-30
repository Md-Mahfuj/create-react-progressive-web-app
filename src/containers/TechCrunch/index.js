import './styles.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {
  fetchData
} from './actions';

import { CardComponent } from 'components';
import Paper from 'material-ui/Paper';

const muStyles = {
  padding: 50,
  textAlign: 'center',
  marginBottom: 20,
};

class TechCrunch extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  renderLoading() {
    const { fetching } = this.props;
    return (
      fetching &&
        <Paper style={muStyles} zDepth={1} rounded={false}>
          <CircularProgress />
        </Paper>
    );
  }

  render() {
    const { articles } = this.props;
    return (
      <div className="app">
        {articles.map((item, index) => <CardComponent key={index} {...item} />)}
        {this.renderLoading()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tcState: state.tcReducer,
  articles: state.tcReducer.articles,
  source: state.tcReducer.source,
  fetching: state.tcReducer.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(TechCrunch);
