import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Route exact path="/" component={Home} />
        </Container>
      </Router>
    );
  }
}

export default App;
