import React from 'react';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <RouteHandler />
      </div>
    );
  }
}

var routes = (
  <Route name='app' path='/' handler={App}>
  </Route>
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.body);
});
